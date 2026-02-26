import { Question } from '@/types';

// S/N Dimension - 36 questions total
// Main dimension: 18 questions (Concrete vs Abstract)
// 6 facets: 3 questions each (Concrete, Realistic, Traditional, Experiential, Practical, Present)

const snQuestions: Question[] = [
  // ===== MAIN DIMENSION QUESTIONS (18) =====
  {
    id: 'sn-001',
    dimension: 'SN',
    text: '在学习新知识时，我更喜欢',
    options: [
      { value: 2, text: '具体的实例和实际操作' },
      { value: 1, text: '偏向具体案例' },
      { value: 0, text: '两者都可以' },
      { value: -1, text: '偏向理论概念' },
      { value: -2, text: '抽象的理论框架' }
    ]
  },
  {
    id: 'sn-002',
    dimension: 'SN',
    text: '我认为自己是',
    options: [
      { value: 2, text: '非常务实的人' },
      { value: 1, text: '比较务实' },
      { value: 0, text: '适中' },
      { value: -1, text: '比较有想象力' },
      { value: -2, text: '非常富有想象力' }
    ]
  },
  {
    id: 'sn-003',
    dimension: 'SN',
    text: '在解决问题时，我更依赖',
    options: [
      { value: 2, text: '过去的经验和已知方法' },
      { value: 1, text: '偏向经验方法' },
      { value: 0, text: '不确定' },
      { value: -1, text: '直觉和灵感' },
      { value: -2, text: '创新的解决方案' }
    ]
  },
  {
    id: 'sn-004',
    dimension: 'SN',
    text: '我更关注',
    options: [
      { value: 2, text: '现实和当下' },
      { value: 1, text: '偏向现实' },
      { value: 0, text: '不确定' },
      { value: -1, text: '可能性和未来' },
      { value: -2, text: '未来的愿景和梦想' }
    ]
  },
  {
    id: 'sn-005',
    dimension: 'SN',
    text: '面对新信息，我更倾向于',
    options: [
      { value: 2, text: '关注具体细节' },
      { value: 1, text: '偏向细节' },
      { value: 0, text: '不确定' },
      { value: -1, text: '关注整体模式' },
      { value: -2, text: '关注宏观概念' }
    ]
  },
  {
    id: 'sn-006',
    dimension: 'SN',
    text: '我更喜欢的工作方式是',
    options: [
      { value: 2, text: '按部就班，遵循既定流程' },
      { value: 1, text: '偏向常规方法' },
      { value: 0, text: '不确定' },
      { value: -1, text: '尝试新方法' },
      { value: -2, text: '创新和实验' }
    ]
  },
  {
    id: 'sn-007',
    dimension: 'SN',
    text: '在做决定时，我更依赖',
    options: [
      { value: 2, text: '确凿的事实和数据' },
      { value: 1, text: '偏向事实依据' },
      { value: 0, text: '不确定' },
      { value: -1, text: '直觉和预感' },
      { value: -2, text: '灵感和洞察' }
    ]
  },
  {
    id: 'sn-008',
    dimension: 'SN',
    text: '我更喜欢',
    options: [
      { value: 2, text: '实际的、有形的事物' },
      { value: 1, text: '偏向具体事物' },
      { value: 0, text: '不确定' },
      { value: -1, text: '抽象的概念和想法' },
      { value: -2, text: '理论和理念' }
    ]
  },
  {
    id: 'sn-009',
    dimension: 'SN',
    text: '在描述事物时，我更倾向于',
    options: [
      { value: 2, text: '详细描述具体特征' },
      { value: 1, text: '偏向具体描述' },
      { value: 0, text: '不确定' },
      { value: -1, text: '使用隐喻和类比' },
      { value: -2, text: '抽象概括其本质' }
    ]
  },
  {
    id: 'sn-010',
    dimension: 'SN',
    text: '我对',
    options: [
      { value: 2, text: '实践和应用非常感兴趣' },
      { value: 1, text: '偏向实际应用' },
      { value: 0, text: '不确定' },
      { value: -1, text: '理论和原理感兴趣' },
      { value: -2, text: '纯粹理论和概念很着迷' }
    ]
  },
  {
    id: 'sn-011',
    dimension: 'SN',
    text: '在规划未来时，我更注重',
    options: [
      { value: 2, text: '具体的步骤和计划' },
      { value: 1, text: '偏向具体规划' },
      { value: 0, text: '不确定' },
      { value: -1, text: '总体方向和愿景' },
      { value: -2, text: '远大的理想和可能性' }
    ]
  },
  {
    id: 'sn-012',
    dimension: 'SN',
    text: '我更喜欢',
    options: [
      { value: 2, text: '确定性和可预测性' },
      { value: 1, text: '偏向确定性' },
      { value: 0, text: '不确定' },
      { value: -1, text: '变化和新鲜感' },
      { value: -2, text: '未知和可能性' }
    ]
  },
  {
    id: 'sn-013',
    dimension: 'SN',
    text: '在阅读时，我更偏好',
    options: [
      { value: 2, text: '事实报道和纪实作品' },
      { value: 1, text: '偏向非虚构类' },
      { value: 0, text: '不确定' },
      { value: -1, text: '想象力和创意作品' },
      { value: -2, text: '科幻和奇幻小说' }
    ]
  },
  {
    id: 'sn-014',
    dimension: 'SN',
    text: '我认为自己更擅长',
    options: [
      { value: 2, text: '处理实际问题' },
      { value: 1, text: '偏向实际操作' },
      { value: 0, text: '不确定' },
      { value: -1, text: '构思抽象概念' },
      { value: -2, text: '理论思考和创新' }
    ]
  },
  {
    id: 'sn-015',
    dimension: 'SN',
    text: '在面对复杂情况时，我倾向于',
    options: [
      { value: 2, text: '分解为具体步骤处理' },
      { value: 1, text: '偏向具体分析' },
      { value: 0, text: '不确定' },
      { value: -1, text: '寻找整体模式' },
      { value: -2, text: '洞察深层含义' }
    ]
  },
  {
    id: 'sn-016',
    dimension: 'SN',
    text: '我更喜欢',
    options: [
      { value: 2, text: '传统和经过验证的方法' },
      { value: 1, text: '偏向传统方式' },
      { value: 0, text: '不确定' },
      { value: -1, text: '尝试新的方法' },
      { value: -2, text: '创新和革命性方法' }
    ]
  },
  {
    id: 'sn-017',
    dimension: 'SN',
    text: '在交流中，我更倾向于',
    options: [
      { value: 2, text: '陈述事实和细节' },
      { value: 1, text: '偏向事实描述' },
      { value: 0, text: '不确定' },
      { value: -1, text: '表达想法和概念' },
      { value: -2, text: '分享理论和见解' }
    ]
  },
  {
    id: 'sn-018',
    dimension: 'SN',
    text: '我认为',
    options: [
      { value: 2, text: '现实比梦想更重要' },
      { value: 1, text: '偏向现实' },
      { value: 0, text: '不确定' },
      { value: -1, text: '梦想驱动现实' },
      { value: -2, text: '想象力改变世界' }
    ]
  },

  // ===== FACET: CONCRETE (3 questions) =====
  {
    id: 'sn-019',
    dimension: 'SN',
    facet: 'concrete',
    text: '在理解概念时，我更喜欢',
    options: [
      { value: 2, text: '通过具体例子学习' },
      { value: 1, text: '偏向实例说明' },
      { value: 0, text: '不确定' },
      { value: -1, text: '通过抽象定义理解' },
      { value: -2, text: '直接理解抽象概念' }
    ]
  },
  {
    id: 'sn-020',
    dimension: 'SN',
    facet: 'concrete',
    text: '我对事物的关注更倾向于',
    options: [
      { value: 2, text: '具体、可观察的特征' },
      { value: 1, text: '偏向具体细节' },
      { value: 0, text: '不确定' },
      { value: -1, text: '抽象、隐含的意义' },
      { value: -2, text: '深层抽象内涵' }
    ]
  },
  {
    id: 'sn-021',
    dimension: 'SN',
    facet: 'concrete',
    text: '在讨论中，我更喜欢',
    options: [
      { value: 2, text: '谈论具体的事情' },
      { value: 1, text: '偏向具体话题' },
      { value: 0, text: '不确定' },
      { value: -1, text: '探讨抽象概念' },
      { value: -2, text: '深入理论讨论' }
    ]
  },

  // ===== FACET: REALISTIC (3 questions) =====
  {
    id: 'sn-022',
    dimension: 'SN',
    facet: 'realistic',
    text: '我更倾向于',
    options: [
      { value: 2, text: '接受事物的本来面目' },
      { value: 1, text: '偏向现实主义' },
      { value: 0, text: '不确定' },
      { value: -1, text: '想象事物可能的样子' },
      { value: -2, text: '构想理想化的世界' }
    ]
  },
  {
    id: 'sn-023',
    dimension: 'SN',
    facet: 'realistic',
    text: '在设定目标时，我更注重',
    options: [
      { value: 2, text: '现实可达的目标' },
      { value: 1, text: '偏向现实可行' },
      { value: 0, text: '不确定' },
      { value: -1, text: '远大的理想' },
      { value: -2, text: '宏大的愿景' }
    ]
  },
  {
    id: 'sn-024',
    dimension: 'SN',
    facet: 'realistic',
    text: '我认为自己',
    options: [
      { value: 2, text: '非常现实和脚踏实地' },
      { value: 1, text: '比较现实' },
      { value: 0, text: '不确定' },
      { value: -1, text: '比较富有想象力' },
      { value: -2, text: '充满幻想和创意' }
    ]
  },

  // ===== FACET: TRADITIONAL (3 questions) =====
  {
    id: 'sn-025',
    dimension: 'SN',
    facet: 'traditional',
    text: '对于传统方法，我通常',
    options: [
      { value: 2, text: '非常信任和遵循' },
      { value: 1, text: '偏向传统方式' },
      { value: 0, text: '不确定' },
      { value: -1, text: '愿意尝试改进' },
      { value: -2, text: '寻求革命性改变' }
    ]
  },
  {
    id: 'sn-026',
    dimension: 'SN',
    facet: 'traditional',
    text: '在做事时，我更喜欢',
    options: [
      { value: 2, text: '按照既定规则' },
      { value: 1, text: '偏向遵循规范' },
      { value: 0, text: '不确定' },
      { value: -1, text: '探索新方法' },
      { value: -2, text: '创新和突破' }
    ]
  },
  {
    id: 'sn-027',
    dimension: 'SN',
    facet: 'traditional',
    text: '我认为改变',
    options: [
      { value: 2, text: '应该谨慎和渐进' },
      { value: 1, text: '偏向保守改变' },
      { value: 0, text: '不确定' },
      { value: -1, text: '应该积极尝试' },
      { value: -2, text: '越快越好，拥抱创新' }
    ]
  },

  // ===== FACET: EXPERIENTIAL (3 questions) =====
  {
    id: 'sn-028',
    dimension: 'SN',
    facet: 'experiential',
    text: '在获取知识时，我更倾向于',
    options: [
      { value: 2, text: '通过实际经验学习' },
      { value: 1, text: '偏向实践体验' },
      { value: 0, text: '不确定' },
      { value: -1, text: '通过理论学习' },
      { value: -2, text: '通过研究和阅读' }
    ]
  },
  {
    id: 'sn-029',
    dimension: 'SN',
    facet: 'experiential',
    text: '我相信',
    options: [
      { value: 2, text: '经验是最好的老师' },
      { value: 1, text: '偏向经验主义' },
      { value: 0, text: '不确定' },
      { value: -1, text: '理论指导实践' },
      { value: -2, text: '理论优于经验' }
    ]
  },
  {
    id: 'sn-030',
    dimension: 'SN',
    facet: 'experiential',
    text: '在评价事物时，我更依赖',
    options: [
      { value: 2, text: '个人经验和观察' },
      { value: 1, text: '偏向经验判断' },
      { value: 0, text: '不确定' },
      { value: -1, text: '逻辑分析和理论' },
      { value: -2, text: '纯粹理性推理' }
    ]
  },

  // ===== FACET: PRACTICAL (3 questions) =====
  {
    id: 'sn-031',
    dimension: 'SN',
    facet: 'practical',
    text: '我更注重',
    options: [
      { value: 2, text: '实用性和效果' },
      { value: 1, text: '偏向实用性' },
      { value: 0, text: '不确定' },
      { value: -1, text: '创意和独特性' },
      { value: -2, text: '理想和完美' }
    ]
  },
  {
    id: 'sn-032',
    dimension: 'SN',
    facet: 'practical',
    text: '在做选择时，我更看重',
    options: [
      { value: 2, text: '实际效用' },
      { value: 1, text: '偏向务实' },
      { value: 0, text: '不确定' },
      { value: -1, text: '潜在可能性' },
      { value: -2, text: '理想和愿景' }
    ]
  },
  {
    id: 'sn-033',
    dimension: 'SN',
    facet: 'practical',
    text: '我认为自己',
    options: [
      { value: 2, text: '非常务实和实际' },
      { value: 1, text: '比较务实' },
      { value: 0, text: '不确定' },
      { value: -1, text: '有些理想主义' },
      { value: -2, text: '非常理想主义' }
    ]
  },

  // ===== FACET: PRESENT (3 questions) =====
  {
    id: 'sn-034',
    dimension: 'SN',
    facet: 'present',
    text: '我的注意力更多集中在',
    options: [
      { value: 2, text: '当下时刻' },
      { value: 1, text: '偏向当下' },
      { value: 0, text: '不确定' },
      { value: -1, text: '未来可能性' },
      { value: -2, text: '长远未来' }
    ]
  },
  {
    id: 'sn-035',
    dimension: 'SN',
    facet: 'present',
    text: '在生活态度上，我更倾向于',
    options: [
      { value: 2, text: '享受现在' },
      { value: 1, text: '偏向当下' },
      { value: 0, text: '不确定' },
      { value: -1, text: '为未来规划' },
      { value: -2, text: '追求未来理想' }
    ]
  },
  {
    id: 'sn-036',
    dimension: 'SN',
    facet: 'present',
    text: '我认为',
    options: [
      { value: 2, text: '现在最重要' },
      { value: 1, text: '偏向当下' },
      { value: 0, text: '不确定' },
      { value: -1, text: '未来更重要' },
      { value: -2, text: '为未来牺牲现在' }
    ]
  }
];

export default snQuestions;
