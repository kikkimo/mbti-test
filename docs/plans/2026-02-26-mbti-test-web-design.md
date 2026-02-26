# MBTI 测试网页设计文档

## 项目概述

构建一个专业的 MBTI 人格测试网页，支持完整版 MBTI Step II 测试（约144题），提供温暖治愈的动画体验，生成详细的测试分析报告，支持链接分享和导出功能。

## 需求总结

| 项目 | 选择 |
|------|------|
| 部署方案 | 纯前端 + Vercel (KV 存储) |
| 题库来源 | 公开权威题目 + 原创题目 |
| 题目数量 | 约 144 题（完整版） |
| 动画风格 | 温暖治愈系 |
| 语言支持 | 仅中文 |
| 分享功能 | 链接分享(180天) + 图片/PDF导出 |
| 报告内容 | 人格类型+描述、维度图表、刻面雷达图、职业/成长建议 |

## 技术选型

| 层面 | 技术 | 理由 |
|------|------|------|
| 前端框架 | React 18 + TypeScript | 类型安全，生态丰富 |
| 样式方案 | Tailwind CSS + CSS Modules | 快速开发 + 组件隔离 |
| 动画库 | Framer Motion | 声明式动画，与 React 完美集成 |
| 图表库 | Recharts | React 原生，轻量级 |
| PDF导出 | html2canvas + jsPDF | 纯前端实现，无需后端 |
| 部署平台 | Vercel | 免费托管，支持 Serverless |
| 数据存储 | Vercel KV (Redis) | 免费额度，用于分享链接存储 |
| 构建工具 | Vite | 快速冷启动，HMR |

## 架构设计

### 系统架构

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
├─────────────┬─────────────┬─────────────┬───────────────┤
│  测试页面   │  结果页面   │  分享页面   │   动画系统    │
│  (答题流程) │  (报告展示) │  (链接访问) │(Framer Motion)│
└─────────────┴─────────────┴─────────────┴───────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Vercel Serverless Functions                 │
├──────────────────────┬──────────────────────────────────┤
│   结果计算/存储 API   │       分享链接解析 API           │
│   /api/save-result   │       /api/get-result           │
└──────────────────────┴──────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Vercel KV (Redis) 存储                      │
│         - 测试结果缓存 (TTL: 180天)                      │
│         - 分享链接映射                                   │
└─────────────────────────────────────────────────────────┘
```

### 目录结构

```
mbti-test/
├── src/
│   ├── components/           # UI 组件
│   │   ├── test/            # 测试相关组件
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── AnswerOptions.tsx
│   │   ├── result/          # 结果相关组件
│   │   │   ├── DimensionChart.tsx
│   │   │   ├── FacetRadar.tsx
│   │   │   ├── PersonalityReport.tsx
│   │   │   ├── CareerAdvice.tsx
│   │   │   └── ShareCard.tsx
│   │   └── common/          # 通用组件
│   │       ├── AnimatedPage.tsx
│   │       ├── Button.tsx
│   │       └── Modal.tsx
│   ├── pages/               # 页面
│   │   ├── Home.tsx         # 首页/介绍页
│   │   ├── Test.tsx         # 测试页面
│   │   ├── Result.tsx       # 结果页面
│   │   └── Share.tsx        # 分享页面
│   ├── hooks/               # 自定义 Hooks
│   │   ├── useTestState.ts  # 测试状态管理
│   │   └── useAnimation.ts  # 动画配置
│   ├── data/                # 题库和描述数据
│   │   ├── questions/       # 题目数据
│   │   │   ├── ei-questions.json   # E-I 维度题目
│   │   │   ├── sn-questions.json   # S-N 维度题目
│   │   │   ├── tf-questions.json   # T-F 维度题目
│   │   │   ├── jp-questions.json   # J-P 维度题目
│   │   │   └── step2-facets.json   # Step II 刻面题目
│   │   └── descriptions/    # 人格描述
│   │       ├── types.json       # 16型人格描述
│   │       ├── facets.json      # 刻面描述
│   │       └── careers.json     # 职业建议
│   ├── lib/                 # 工具函数
│   │   ├── calculator.ts    # 分数计算
│   │   ├── pdf-export.ts    # PDF导出
│   │   └── share.ts         # 分享链接生成
│   ├── api/                 # API 函数
│   │   ├── save-result.ts   # 保存结果
│   │   └── get-result.ts    # 获取结果
│   ├── styles/              # 全局样式
│   │   ├── theme.css        # 主题变量
│   │   └── animations.css   # 动画定义
│   └── types/               # TypeScript 类型
│       └── index.ts         # 类型定义
├── public/
│   └── assets/              # 静态资源
├── vercel.json              # Vercel 配置
└── package.json
```

## 核心功能模块

### 1. 测试引擎

#### 题目结构

```typescript
interface Question {
  id: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  facet?: string;  // Step II 刻面标识
  text: string;
  options: {
    value: number;  // -2 到 +2
    text: string;
  }[];
}
```

#### 测试流程

1. **欢迎页** - 简短介绍，设置期望
2. **基础测试** - 约 72 题，测定 4 维度倾向（每维度 18 题）
3. **Step II 测试** - 约 72 题，细分 20 刻面（每刻面 3-4 题）
4. **结果计算** - 完成后实时计算
5. **结果展示** - 多维度报告

### 2. 计分系统

#### 维度得分

- E-I: 外向 vs 内向
- S-N: 感觉 vs 直觉
- T-F: 思考 vs 情感
- J-P: 判断 vs 知觉

每个维度得分范围: -100 到 +100

#### Step II 刻面

每个维度细分为 5 个刻面:

| 维度 | 刻面1 | 刻面2 | 刻面3 | 刻面4 | 刻面5 |
|------|-------|-------|-------|-------|-------|
| EI | Initiating (主动型) | Receiving (接受型) | Expressive (表达型) | Intimate (亲密型) | Energetic (活力型) |
| SN | Concrete (具体型) | Realistic (现实型) | Practical (实践型) | Experiential (经验型) | Traditional (传统型) |
| TF | Logical (逻辑型) | Reasonable (合理型) | Questioning (质疑型) | Critical (批判型) | Tough (坚毅型) |
| JP | Systematic (系统型) | Planful (计划型) | Early Starting (早始型) | Scheduled (有序型) | Methodical (有条理型) |

### 3. 报告系统

#### 报告内容

1. **人格类型** - 如 INTJ (建筑师)，包含性格描述
2. **维度图表** - 4 维度柱状图，展示倾向程度
3. **刻面雷达图** - 20 刻面详细展示
4. **优势/挑战** - 个人成长建议
5. **职业建议** - 适合的职业方向

#### 导出功能

- PDF 格式导出
- 图片格式导出 (PNG)
- 社交媒体分享卡片

### 4. 分享系统

#### 链接格式

```
https://your-domain.com/share/{shareId}
```

- shareId: 8 位短码，如 `aB3xK9mN`
- 有效期: 180 天
- 存储内容: 测试结果数据

### 5. 动画系统

#### 设计风格

温暖治愈系动画特点:
- 柔和的渐变色彩 (粉、蓝、紫)
- 缓慢流畅的过渡动画
- 呼吸感的脉动效果
- 温馨的插画风格

#### 动画场景

1. **页面切换** - 淡入淡出 + 轻微缩放
2. **题目切换** - 滑动 + 渐变
3. **进度条** - 平滑填充动画
4. **结果展示** - 逐元素依次出现
5. **图表渲染** - 数据生长动画

## 数据流设计

```
用户答题 → 本地状态存储 → 完成测试
    ↓
计算分数 → 生成报告 → 展示结果
    ↓
用户分享 → 生成 shareId → 存储到 KV
    ↓
他人访问 → 解析 shareId → 从 KV 读取 → 展示结果
```

## UI/UX 设计要点

### 色彩方案

```css
--primary: #7C3AED;      /* 主色 - 柔和紫 */
--secondary: #EC4899;    /* 辅色 - 温暖粉 */
--accent: #06B6D4;       /* 点缀 - 清新蓝 */
--background: #FDF4FF;   /* 背景 - 淡紫白 */
--text: #1F2937;         /* 文字 - 深灰 */
```

### 响应式设计

- 移动端优先 (375px+)
- 平板适配 (768px+)
- 桌面优化 (1024px+)

### 无障碍支持

- 语义化 HTML
- ARIA 标签
- 键盘导航
- 足够的颜色对比度

## 部署配置

### Vercel 配置 (vercel.json)

```json
{
  "functions": {
    "api/*.ts": {
      "runtime": "@vercel/node@3"
    }
  },
  "kv": [
    {
      "name": "mbti-results"
    }
  ]
}
```

### 环境变量

```
KV_REST_API_URL=
KV_REST_API_TOKEN=
```

## 性能优化

1. **代码分割** - 路由级别懒加载
2. **图片优化** - WebP 格式，懒加载
3. **缓存策略** - 静态资源 CDN 缓存
4. **首屏优化** - 关键 CSS 内联

## 题库设计

### 题目分布（共 144 题）

| 维度 | 基础题 | Step II 刻面题 | 小计 |
|------|--------|----------------|------|
| E-I | 18 题 | 20 题 (5刻面×4题) | 38 题 |
| S-N | 18 题 | 20 题 (5刻面×4题) | 38 题 |
| T-F | 18 题 | 20 题 (5刻面×4题) | 38 题 |
| J-P | 18 题 | 12 题 (5刻面×~2-3题) | 30 题 |
| **总计** | **72 题** | **72 题** | **144 题** |

### 答题选项

采用 5 点 Likert 量表:
- 非常同意 (+2)
- 同意 (+1)
- 不确定 (0)
- 不同意 (-1)
- 非常不同意 (-2)

## 后续扩展

- 暗色模式
- 更多测试类型 (九型人格等)
- 用户反馈系统
