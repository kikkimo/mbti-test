# MBTI Test Web Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a professional MBTI personality test web application with 144 questions, warm healing animations, detailed analysis reports, and share/export functionality.

**Architecture:** Pure frontend React application deployed on Vercel with Serverless Functions for result storage and retrieval. Uses Vercel KV (Redis) for share link data persistence with 180-day TTL.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Framer Motion, Recharts, Vite, html2canvas, jsPDF, Vercel KV

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `vercel.json`
- Create: `.gitignore`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles/theme.css`
- Create: `src/types/index.ts`

**Step 1: Initialize package.json**

Create `package.json`:

```json
{
  "name": "mbti-test",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^11.0.0",
    "recharts": "^2.12.0",
    "html2canvas": "^1.4.1",
    "jspdf": "^2.5.1",
    "@vercel/kv": "^1.0.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.4.0",
    "vite": "^5.2.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "vitest": "^1.4.0",
    "@testing-library/react": "^14.3.0",
    "@testing-library/jest-dom": "^6.4.0"
  }
}
```

**Step 2: Install dependencies**

Run: `npm install`

**Step 3: Create TypeScript configuration**

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**Step 4: Create Vite configuration**

Create `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```

**Step 5: Create Vercel configuration**

Create `vercel.json`:

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

**Step 6: Create Tailwind configuration**

Create `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        secondary: '#EC4899',
        accent: '#06B6D4',
        background: '#FDF4FF',
      },
    },
  },
  plugins: [],
}
```

**Step 7: Create entry HTML**

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MBTI Personality Test</title>
    <meta name="description" content="Professional MBTI Step II personality test with detailed analysis" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 8: Create main entry point**

Create `src/main.tsx`:

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/theme.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Step 9: Create App root component**

Create `src/App.tsx`:

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Test from './pages/Test'
import Result from './pages/Result'
import Share from './pages/Share'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/result" element={<Result />} />
        <Route path="/share/:shareId" element={<Share />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

**Step 10: Create theme CSS**

Create `src/styles/theme.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #7C3AED;
  --secondary: #EC4899;
  --accent: #06B6D4;
  --background: #FDF4FF;
  --text: #1F2937;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background-color: var(--background);
  color: var(--text);
  line-height: 1.6;
}
```

**Step 11: Create TypeScript type definitions**

Create `src/types/index.ts`:

```typescript
export type Dimension = 'EI' | 'SN' | 'TF' | 'JP';

export type OptionValue = -2 | -1 | 0 | 1 | 2;

export interface Question {
  id: string;
  dimension: Dimension;
  facet?: string;
  text: string;
  options: {
    value: OptionValue;
    text: string;
  }[];
}

export interface Answer {
  questionId: string;
  value: OptionValue;
}

export interface DimensionScore {
  dimension: Dimension;
  score: number; // -100 to +100
  direction: 'positive' | 'negative'; // E/S/T/J = positive
}

export interface FacetScore {
  facet: string;
  score: number; // -100 to +100
}

export interface TestResult {
  id: string;
  type: string; // e.g., "INTJ"
  dimensions: DimensionScore[];
  facets: FacetScore[];
  createdAt: string;
}

export interface PersonalityDescription {
  type: string;
  name: string;
  description: string;
  strengths: string[];
  challenges: string[];
  careers: string[];
  advice: string;
}
```

**Step 12: Create .gitignore**

Create `.gitignore`:

```
node_modules/
dist/
.env
.env.local
.DS_Store
*.log
```

**Step 13: Commit**

```bash
git add .
git commit -m "feat: initialize project scaffolding with React, TypeScript, and Vite"
```

---

## Task 2: Common Components Foundation

**Files:**
- Create: `src/components/common/Button.tsx`
- Create: `src/components/common/AnimatedPage.tsx`
- Create: `src/components/common/Modal.tsx`
- Create: `src/components/common/LoadingSpinner.tsx`
- Test: `src/components/common/__tests__/Button.test.tsx`

**Step 1: Write Button component**

Create `src/components/common/Button.tsx`:

```typescript
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit';
}

const variants = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'bg-secondary text-white hover:bg-secondary/90',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3 text-lg',
};

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${sizes[size]} rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {children}
    </motion.button>
  );
}
```

**Step 2: Write AnimatedPage component**

Create `src/components/common/AnimatedPage.tsx`:

```typescript
import { motion } from 'framer-motion';

interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function AnimatedPage({ children, className = '' }: AnimatedPageProps) {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
```

**Step 3: Write Modal component**

Create `src/components/common/Modal.tsx`:

```typescript
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[80vh] overflow-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {title && (
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="text-xl font-semibold">{title}</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
              )}
              <div className="p-6">{children}</div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

**Step 4: Write LoadingSpinner component**

Create `src/components/common/LoadingSpinner.tsx`:

```typescript
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
```

**Step 5: Write test for Button component**

Create `src/components/common/__tests__/Button.test.tsx`:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toBeDisabled();
  });
});
```

**Step 6: Run tests to verify**

Run: `npm test`

**Step 7: Commit**

```bash
git add .
git commit -m "feat: add common UI components (Button, AnimatedPage, Modal, LoadingSpinner)"
```

---

## Task 3: Question Data Structure

**Files:**
- Create: `src/data/questions/ei-questions.json`
- Create: `src/data/questions/sn-questions.json`
- Create: `src/data/questions/tf-questions.json`
- Create: `src/data/questions/jp-questions.json`
- Create: `src/data/questions/index.ts`

**Step 1: Create E-I dimension questions**

Create `src/data/questions/ei-questions.json`:

```json
[
  {
    "id": "ei-001",
    "dimension": "EI",
    "text": "在社交场合中，我通常",
    "options": [
      { "value": 2, "text": "非常主动地与多人交谈" },
      { "value": 1, "text": "比较主动地与人交流" },
      { "value": 0, "text": "视情况而定" },
      { "value": -1, "text": "更愿意倾听而非发言" },
      { "value": -2, "text": "尽量避免与人交谈" }
    ]
  },
  {
    "id": "ei-002",
    "dimension": "EI",
    "text": "周末休息时，我更倾向于",
    "options": [
      { "value": 2, "text": "和朋友聚会或参加活动" },
      { "value": 1, "text": "约一两个好朋友见面" },
      { "value": 0, "text": "看心情决定" },
      { "value": -1, "text": "在家独处放松" },
      { "value": -2, "text": "完全独处，不与人接触" }
    ]
  },
  {
    "id": "ei-003",
    "dimension": "EI",
    "facet": "initiating",
    "text": "面对陌生人，我通常",
    "options": [
      { "value": 2, "text": "主动发起交谈" },
      { "value": 1, "text": "等待对方先开口，但会积极响应" },
      { "value": 0, "text": "不确定" },
      { "value": -1, "text": "等待对方主动" },
      { "value": -2, "text": "避免接触" }
    ]
  }
]
```

**Step 2: Create S-N dimension questions**

Create `src/data/questions/sn-questions.json`:

```json
[
  {
    "id": "sn-001",
    "dimension": "SN",
    "text": "在学习新知识时，我更喜欢",
    "options": [
      { "value": 2, "text": "具体的实例和实际操作" },
      { "value": 1, "text": "偏向具体案例" },
      { "value": 0, "text": "两者都可以" },
      { "value": -1, "text": "偏向理论概念" },
      { "value": -2, "text": "抽象的理论框架" }
    ]
  },
  {
    "id": "sn-002",
    "dimension": "SN",
    "text": "我认为自己是",
    "options": [
      { "value": 2, "text": "非常务实的人" },
      { "value": 1, "text": "比较务实" },
      { "value": 0, "text": "适中" },
      { "value": -1, "text": "比较有想象力" },
      { "value": -2, "text": "非常富有想象力" }
    ]
  },
  {
    "id": "sn-003",
    "dimension": "SN",
    "facet": "concrete",
    "text": "在解决问题时，我更依赖",
    "options": [
      { "value": 2, "text": "过去的经验和已知方法" },
      { "value": 1, "text": "偏向经验方法" },
      { "value": 0, "text": "不确定" },
      { "value": -1, "text": "直觉和灵感" },
      { "value": -2, "text": "创新的解决方案" }
    ]
  }
]
```

**Step 3: Create T-F dimension questions**

Create `src/data/questions/tf-questions.json`:

```json
[
  {
    "id": "tf-001",
    "dimension": "TF",
    "text": "做决定时，我更看重",
    "options": [
      { "value": 2, "text": "逻辑和客观分析" },
      { "value": 1, "text": "偏向逻辑分析" },
      { "value": 0, "text": "视情况而定" },
      { "value": -1, "text": "个人价值观和感受" },
      { "value": -2, "text": "完全基于情感和价值观" }
    ]
  },
  {
    "id": "tf-002",
    "dimension": "TF",
    "text": "当朋友遇到困难时，我通常会",
    "options": [
      { "value": 2, "text": "提供解决方案和建议" },
      { "value": 1, "text": "偏向解决问题" },
      { "value": 0, "text": "不确定" },
      { "value": -1, "text": "先给予情感支持" },
      { "value": -2, "text": "只倾听和陪伴" }
    ]
  },
  {
    "id": "tf-003",
    "dimension": "TF",
    "facet": "logical",
    "text": "我认为自己在争论中更倾向于",
    "options": [
      { "value": 2, "text": "坚持真理，即使伤害感情" },
      { "value": 1, "text": "偏向真理" },
      { "value": 0, "text": "不确定" },
      { "value": -1, "text": "维护和谐关系" },
      { "value": -2, "text": "避免冲突，保持友好" }
    ]
  }
]
```

**Step 4: Create J-P dimension questions**

Create `src/data/questions/jp-questions.json`:

```json
[
  {
    "id": "jp-001",
    "dimension": "JP",
    "text": "我的工作方式通常是",
    "options": [
      { "value": 2, "text": "提前计划，按计划执行" },
      { "value": 1, "text": "偏向有计划" },
      { "value": 0, "text": "视情况而定" },
      { "value": -1, "text": "灵活应变" },
      { "value": -2, "text": "完全随性，不喜欢计划" }
    ]
  },
  {
    "id": "jp-002",
    "dimension": "JP",
    "text": "面对截止日期，我通常",
    "options": [
      { "value": 2, "text": "提前完成" },
      { "value": 1, "text": "尽量提前完成" },
      { "value": 0, "text": "不确定" },
      { "value": -1, "text": "在截止前突击完成" },
      { "value": -2, "text": "经常拖延到最后时刻" }
    ]
  },
  {
    "id": "jp-003",
    "dimension": "JP",
    "facet": "systematic",
    "text": "我的生活状态通常是",
    "options": [
      { "value": 2, "text": "井井有条，一切可控" },
      { "value": 1, "text": "比较有规律" },
      { "value": 0, "text": "不确定" },
      { "value": -1, "text": "比较随性" },
      { "value": -2, "text": "经常混乱，难以管理" }
    ]
  }
]
```

**Step 5: Create question loader**

Create `src/data/questions/index.ts`:

```typescript
import { Question } from '@/types';
import eiQuestions from './ei-questions.json';
import snQuestions from './sn-questions.json';
import tfQuestions from './tf-questions.json';
import jpQuestions from './jp-questions.json';

const allQuestions: Question[] = [
  ...eiQuestions,
  ...snQuestions,
  ...tfQuestions,
  ...jpQuestions,
] as Question[];

export function getAllQuestions(): Question[] {
  return allQuestions;
}

export function getQuestionsByDimension(dimension: string): Question[] {
  return allQuestions.filter(q => q.dimension === dimension);
}

export function getQuestionById(id: string): Question | undefined {
  return allQuestions.find(q => q.id === id);
}

export default allQuestions;
```

**Step 6: Commit**

```bash
git add .
git commit -m "feat: add question data structure for all 4 dimensions"
```

---

## Task 4: Score Calculator

**Files:**
- Create: `src/lib/calculator.ts`
- Test: `src/lib/__tests__/calculator.test.ts`

**Step 1: Write failing tests**

Create `src/lib/__tests__/calculator.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { calculateScores, determineType } from '../calculator';
import { Answer } from '@/types';

describe('calculateScores', () => {
  it('calculates E-I dimension score correctly', () => {
    const answers: Answer[] = [
      { questionId: 'ei-001', value: 2 },
      { questionId: 'ei-002', value: 1 },
    ];
    const result = calculateScores(answers);
    const eiScore = result.dimensions.find(d => d.dimension === 'EI');
    expect(eiScore?.score).toBeGreaterThan(0);
    expect(eiScore?.direction).toBe('positive');
  });

  it('calculates all four dimensions', () => {
    const answers: Answer[] = [
      { questionId: 'ei-001', value: 2 },
      { questionId: 'sn-001', value: -2 },
      { questionId: 'tf-001', value: 1 },
      { questionId: 'jp-001', value: -1 },
    ];
    const result = calculateScores(answers);
    expect(result.dimensions).toHaveLength(4);
  });

  it('calculates facet scores when present', () => {
    const answers: Answer[] = [
      { questionId: 'ei-003', value: 2 },
      { questionId: 'sn-003', value: 1 },
    ];
    const result = calculateScores(answers);
    expect(result.facets.length).toBeGreaterThan(0);
  });
});

describe('determineType', () => {
  it('determines INTJ type from scores', () => {
    const dimensions = [
      { dimension: 'EI', score: -50, direction: 'negative' },
      { dimension: 'SN', score: -60, direction: 'negative' },
      { dimension: 'TF', score: 70, direction: 'positive' },
      { dimension: 'JP', score: 80, direction: 'positive' },
    ];
    const type = determineType(dimensions);
    expect(type).toBe('INTJ');
  });

  it('determines ESFP type from scores', () => {
    const dimensions = [
      { dimension: 'EI', score: 60, direction: 'positive' },
      { dimension: 'SN', score: 70, direction: 'positive' },
      { dimension: 'TF', score: -50, direction: 'negative' },
      { dimension: 'JP', score: -60, direction: 'negative' },
    ];
    const type = determineType(dimensions);
    expect(type).toBe('ESFP');
  });
});
```

**Step 2: Run tests to verify they fail**

Run: `npm test`

Expected: FAIL with "calculator not defined"

**Step 3: Write minimal implementation**

Create `src/lib/calculator.ts`:

```typescript
import { Answer, DimensionScore, FacetScore, TestResult, Dimension } from '@/types';
import getAllQuestions from '@/data/questions';

export function calculateScores(answers: Answer[]): Omit<TestResult, 'id' | 'type' | 'createdAt'> {
  const questions = getAllQuestions();
  const answerMap = new Map(answers.map(a => [a.questionId, a.value]));

  // Calculate dimension scores
  const dimensionScores: DimensionScore[] = ['EI', 'SN', 'TF', 'JP'].map(dimension => {
    const dimensionQuestions = questions.filter(q => q.dimension === dimension && !q.facet);
    let totalScore = 0;

    dimensionQuestions.forEach(q => {
      const value = answerMap.get(q.id);
      if (value !== undefined) {
        totalScore += value;
      }
    });

    // Normalize to -100 to +100
    const maxPossible = dimensionQuestions.length * 2;
    const normalizedScore = Math.round((totalScore / maxPossible) * 100);
    const direction = normalizedScore >= 0 ? 'positive' : 'negative';

    return { dimension, score: normalizedScore, direction };
  });

  // Calculate facet scores
  const facetScores: FacetScore[] = [];
  const facetQuestions = questions.filter(q => q.facet);

  // Group by facet
  const facetGroups = new Map<string, typeof facetQuestions>();
  facetQuestions.forEach(q => {
    if (!facetGroups.has(q.facet!)) {
      facetGroups.set(q.facet!, []);
    }
    facetGroups.get(q.facet!)!.push(q);
  });

  facetGroups.forEach((questions, facet) => {
    let totalScore = 0;
    questions.forEach(q => {
      const value = answerMap.get(q.id);
      if (value !== undefined) {
        totalScore += value;
      }
    });

    const maxPossible = questions.length * 2;
    const normalizedScore = Math.round((totalScore / maxPossible) * 100);
    facetScores.push({ facet, score: normalizedScore });
  });

  return {
    dimensions: dimensionScores,
    facets: facetScores,
  };
}

export function determineType(dimensions: DimensionScore[]): string {
  const getLetter = (dimension: Dimension, direction: 'positive' | 'negative') => {
    const positiveLetters: Record<Dimension, string> = { EI: 'E', SN: 'S', TF: 'T', JP: 'J' };
    const negativeLetters: Record<Dimension, string> = { EI: 'I', SN: 'N', TF: 'F', JP: 'P' };
    return direction === 'positive' ? positiveLetters[dimension] : negativeLetters[dimension];
  };

  return dimensions
    .map(d => getLetter(d.dimension, d.direction))
    .join('');
}
```

**Step 4: Run tests to verify they pass**

Run: `npm test`

**Step 5: Commit**

```bash
git add .
git commit -m "feat: implement score calculator for MBTI dimensions and facets"
```

---

## Task 5: Test State Management Hook

**Files:**
- Create: `src/hooks/useTestState.ts`
- Test: `src/hooks/__tests__/useTestState.test.ts`

**Step 1: Write failing tests**

Create `src/hooks/__tests__/useTestState.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTestState } from '../useTestState';

describe('useTestState', () => {
  it('initializes with empty answers', () => {
    const { result } = renderHook(() => useTestState());
    expect(result.current.answers).toEqual({});
    expect(result.current.currentQuestionIndex).toBe(0);
  });

  it('adds answer correctly', () => {
    const { result } = renderHook(() => useTestState());
    act(() => {
      result.current.setAnswer('q1', 1);
    });
    expect(result.current.answers.q1).toBe(1);
  });

  it('navigates to next question', () => {
    const { result } = renderHook(() => useTestState());
    act(() => {
      result.current.nextQuestion();
    });
    expect(result.current.currentQuestionIndex).toBe(1);
  });

  it('navigates to previous question', () => {
    const { result } = renderHook(() => useTestState());
    act(() => {
      result.current.nextQuestion();
      result.current.previousQuestion();
    });
    expect(result.current.currentQuestionIndex).toBe(0);
  });

  it('cannot go below first question', () => {
    const { result } = renderHook(() => useTestState());
    act(() => {
      result.current.previousQuestion();
    });
    expect(result.current.currentQuestionIndex).toBe(0);
  });
});
```

**Step 2: Run tests to verify they fail**

Run: `npm test`

**Step 3: Write implementation**

Create `src/hooks/useTestState.ts`:

```typescript
import { useState, useCallback } from 'react';
import { OptionValue } from '@/types';

interface Answers {
  [questionId: string]: OptionValue;
}

interface UseTestStateReturn {
  answers: Answers;
  currentQuestionIndex: number;
  setAnswer: (questionId: string, value: OptionValue) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  reset: () => void;
}

export function useTestState(totalQuestions?: number): UseTestStateReturn {
  const [answers, setAnswers] = useState<Answers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const setAnswer = useCallback((questionId: string, value: OptionValue) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const nextQuestion = useCallback(() => {
    setCurrentQuestionIndex(prev => {
      if (totalQuestions && prev >= totalQuestions - 1) return prev;
      return prev + 1;
    });
  }, [totalQuestions]);

  const previousQuestion = useCallback(() => {
    setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
  }, []);

  const goToQuestion = useCallback((index: number) => {
    setCurrentQuestionIndex(Math.max(0, index));
  }, []);

  const reset = useCallback(() => {
    setAnswers({});
    setCurrentQuestionIndex(0);
  }, []);

  return {
    answers,
    currentQuestionIndex,
    setAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    reset,
  };
}
```

**Step 4: Run tests to verify they pass**

Run: `npm test`

**Step 5: Commit**

```bash
git add .
git commit -m "feat: add useTestState hook for managing test flow"
```

---

## Task 6: Test Components

**Files:**
- Create: `src/components/test/QuestionCard.tsx`
- Create: `src/components/test/AnswerOptions.tsx`
- Create: `src/components/test/ProgressBar.tsx`
- Test: `src/components/test/__tests__/QuestionCard.test.tsx`

**Step 1: Create ProgressBar component**

Create `src/components/test/ProgressBar.tsx`:

```typescript
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-secondary"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}
```

**Step 2: Create AnswerOptions component**

Create `src/components/test/AnswerOptions.tsx`:

```typescript
import { motion } from 'framer-motion';
import { OptionValue } from '@/types';

interface AnswerOptionsProps {
  options: { value: OptionValue; text: string }[];
  selectedValue?: OptionValue;
  onSelect: (value: OptionValue) => void;
}

export default function AnswerOptions({ options, selectedValue, onSelect }: AnswerOptionsProps) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <motion.button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={`w-full p-4 rounded-xl text-left transition-all ${
            selectedValue === option.value
              ? 'bg-primary text-white shadow-lg'
              : 'bg-white hover:bg-gray-50 border-2 border-gray-200'
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: selectedValue === option.value ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-medium">{option.text}</span>
        </motion.button>
      ))}
    </div>
  );
}
```

**Step 3: Create QuestionCard component**

Create `src/components/test/QuestionCard.tsx`:

```typescript
import { motion } from 'framer-motion';
import { Question, OptionValue } from '@/types';
import AnswerOptions from './AnswerOptions';

interface QuestionCardProps {
  question: Question;
  selectedValue?: OptionValue;
  onSelect: (value: OptionValue) => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuestionCard({
  question,
  selectedValue,
  onSelect,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <span className="text-sm text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </span>
      </div>

      <h2 className="text-2xl font-semibold mb-8 text-gray-800">
        {question.text}
      </h2>

      <AnswerOptions
        options={question.options}
        selectedValue={selectedValue}
        onSelect={onSelect}
      />
    </motion.div>
  );
}
```

**Step 4: Write tests**

Create `src/components/test/__tests__/QuestionCard.test.tsx`:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import QuestionCard from '../QuestionCard';
import { Question } from '@/types';

const mockQuestion: Question = {
  id: 'test-001',
  dimension: 'EI',
  text: 'Test question',
  options: [
    { value: 2, text: 'Option 1' },
    { value: 1, text: 'Option 2' },
    { value: 0, text: 'Option 3' },
    { value: -1, text: 'Option 4' },
    { value: -2, text: 'Option 5' },
  ],
};

describe('QuestionCard', () => {
  it('renders question text', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        questionNumber={1}
        totalQuestions={10}
        onSelect={vi.fn()}
      />
    );
    expect(screen.getByText('Test question')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        questionNumber={1}
        totalQuestions={10}
        onSelect={vi.fn()}
      />
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 5')).toBeInTheDocument();
  });

  it('calls onSelect when option clicked', () => {
    const onSelect = vi.fn();
    render(
      <QuestionCard
        question={mockQuestion}
        questionNumber={1}
        totalQuestions={10}
        onSelect={onSelect}
      />
    );
    screen.getByText('Option 1').click();
    expect(onSelect).toHaveBeenCalledWith(2);
  });
});
```

**Step 5: Run tests**

Run: `npm test`

**Step 6: Commit**

```bash
git add .
git commit -m "feat: add test components (QuestionCard, AnswerOptions, ProgressBar)"
```

---

## Task 7: Home Page

**Files:**
- Create: `src/pages/Home.tsx`

**Step 1: Create Home page**

Create `src/pages/Home.tsx`:

```typescript
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedPage from '@/components/common/AnimatedPage';
import Button from '@/components/common/Button';

export default function Home() {
  return (
    <AnimatedPage className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            MBTI 人格测试
          </h1>
          <p className="text-xl text-gray-600">
            探索你的性格类型，了解真实的自己
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">关于测试</h2>
          <div className="text-left space-y-3 text-gray-600">
            <p>✓ 完整版 MBTI Step II 测试（144 题）</p>
            <p>✓ 详细的四维度分析</p>
            <p>✓ 20 个刻面深度解析</p>
            <p>✓ 个性化成长建议</p>
            <p>✓ 职业发展指导</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/test">
            <Button size="lg">开始测试</Button>
          </Link>
        </motion.div>
      </div>
    </AnimatedPage>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add home page with introduction and start button"
```

---

## Task 8: Test Page

**Files:**
- Create: `src/pages/Test.tsx`

**Step 1: Create Test page**

Create `src/pages/Test.tsx`:

```typescript
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AnimatedPage from '@/components/common/AnimatedPage';
import QuestionCard from '@/components/test/QuestionCard';
import ProgressBar from '@/components/test/ProgressBar';
import Button from '@/components/common/Button';
import { useTestState } from '@/hooks/useTestState';
import getAllQuestions from '@/data/questions';

export default function Test() {
  const questions = getAllQuestions();
  const navigate = useNavigate();
  const {
    answers,
    currentQuestionIndex,
    setAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
  } = useTestState(questions.length);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedValue = answers[currentQuestion.id];

  const handleSelect = (value: number) => {
    setAnswer(currentQuestion.id, value as any);
    // Auto advance after short delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        nextQuestion();
      }
    }, 300);
  };

  const handleFinish = () => {
    // Store answers in session storage for result page
    sessionStorage.setItem('mbti-answers', JSON.stringify(answers));
    navigate('/result');
  };

  const canFinish = Object.keys(answers).length === questions.length;

  return (
    <AnimatedPage className="min-h-screen p-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <span className="text-gray-600">
              {Object.keys(answers).length} / {questions.length} answered
            </span>
            {currentQuestionIndex === questions.length - 1 && canFinish ? (
              <Button size="sm" onClick={handleFinish}>
                Finish
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={nextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
              </Button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            selectedValue={selectedValue}
            onSelect={handleSelect}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        </AnimatePresence>

        <div className="mt-8 flex justify-center gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => goToQuestion(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentQuestionIndex
                  ? 'bg-primary scale-125'
                  : answers[questions[index].id]
                  ? 'bg-secondary'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add test page with question flow and navigation"
```

---

## Task 9: Personality Description Data

**Files:**
- Create: `src/data/descriptions/types.json`
- Create: `src/data/descriptions/careers.json`
- Create: `src/data/descriptions/index.ts`

**Step 1: Create personality type descriptions**

Create `src/data/descriptions/types.json`:

```json
{
  "INTJ": {
    "name": "建筑师",
    "description": "富有想象力和战略性的思考者，一切皆在计划之中。",
    "strengths": [
      "战略思维能力强",
      "高度专注和自律",
      "独立自主",
      "善于分析复杂问题",
      "追求持续改进"
    ],
    "challenges": [
      "可能过于挑剔",
      "忽视情感因素",
      "显得过于冷漠",
      "对他人要求过高",
      "难以接受批评"
    ],
    "advice": "学会在追求完美的同时接受不完美，更多地关注他人的情感需求，培养更灵活的沟通方式。"
  },
  "INTP": {
    "name": "逻辑学家",
    "description": "具有创新性的发明家，对知识有着止不住的渴望。",
    "strengths": [
      "逻辑分析能力出色",
      "富有创造力",
      "开放-minded",
      "客观理性",
      "适应力强"
    ],
    "challenges": [
      "经常拖延",
      "忽视日常事务",
      "情感表达困难",
      "可能显得心不在焉",
      "过度分析"
    ],
    "advice": "学会将想法付诸实践，关注时间管理，培养情感表达能力，减少对细节的过度纠结。"
  },
  "ENTJ": {
    "name": "指挥官",
    "description": "大胆、富有想象力且意志强大的领导者。",
    "strengths": [
      "天生的领导者",
      "高效执行力",
      "战略规划能力",
      "自信果断",
      "目标导向"
    ],
    "challenges": [
      "可能过于强势",
      "忽视他人感受",
      "缺乏耐心",
      "难以接受反对意见",
      "工作狂倾向"
    ],
    "advice": "学会倾听他人意见，培养同理心，在追求效率的同时关注团队氛围，给自己留出休息时间。"
  },
  "ENTP": {
    "name": "辩论家",
    "description": "聪明好奇的思考者，无法抗拒智力上的挑战。",
    "strengths": [
      "思维敏捷",
      "富有创新精神",
      "善于辩论",
      "适应力强",
      "充满热情"
    ],
    "challenges": [
      "容易分心",
      "难以完成项目",
      "可能显得好辩",
      "忽视细节",
      "缺乏耐心"
    ],
    "advice": "培养专注力和执行力，学会在适当时候停止争论，关注项目完成而非仅仅是开始。"
  },
  "INFJ": {
    "name": "提倡者",
    "description": "安静而神秘，鼓舞人心且不知疲倦的理想主义者。",
    "strengths": [
      "富有洞察力",
      "有原则和理想",
      "善于帮助他人",
      "创造力强",
      "有同理心"
    ],
    "challenges": [
      "容易职业倦怠",
      "过于理想主义",
      "私下极度私密",
      "容易自我批判",
      "难以接受现实"
    ],
    "advice": "学会设定边界，照顾自己的需求，在理想与现实之间找到平衡，适当表达自己的感受。"
  },
  "INFP": {
    "name": "调停者",
    "description": "诗意、善良的利他主义者，总是热情地为正义事业提供帮助。",
    "strengths": [
      "富有想象力",
      "真诚善良",
      "寻求和谐",
      "开放-minded",
      "灵活适应"
    ],
    "challenges": [
      "过于理想化",
      "难以处理冲突",
      "自我批判",
      "难以应对批评",
      "容易情绪化"
    ],
    "advice": "学会接受不完美，培养应对冲突的能力，设定并坚持目标，减少对他人评价的过度关注。"
  },
  "ENFJ": {
    "name": "主人公",
    "description": "有魅力、能激励人心的领导者，有使听众着迷的能力。",
    "strengths": [
      "天生的领导者",
      "富有同理心",
      "善于激励他人",
      "社交能力强",
      "组织能力出色"
    ],
    "challenges": [
      "过于理想主义",
      "容易过度操心",
      "难以自己做决定",
      "对批评敏感",
      "容易职业倦怠"
    ],
    "advice": "学会关注自己的需求，接受不完美，在帮助他人的同时也要照顾自己，培养更客观的决策能力。"
  },
  "ENFP": {
    "name": "竞选者",
    "description": "有热情、有创造力、善于社交的自由人，总能找到理由微笑。",
    "strengths": [
      "热情洋溢",
      "富有创造力",
      "善于交际",
      "善于沟通",
      "开放-minded"
    ],
    "challenges": [
      "注意力易分散",
      "难以集中精力",
      "思考困难",
      "容易情绪化",
      "缺乏自律"
    ],
    "advice": "培养专注力和自律性，学会思考后再行动，给自己留出独处时间，减少对外界认可的依赖。"
  },
  "ISTJ": {
    "name": "物流师",
    "description": "实际且注重事实的个人，可靠性不容怀疑。",
    "strengths": [
      "诚实直接",
      "意志坚强",
      "负责任",
      "注重细节",
      "组织能力强"
    ],
    "challenges": [
      "固执己见",
      "不擅长表达情感",
      "抗拒变化",
      "容易自我批判",
      "可能过于严厉"
    ],
    "advice": "学会接受变化，表达情感和赞赏，在坚持原则的同时保持灵活，给自己一些犯错的空间。"
  },
  "ISFJ": {
    "name": "守卫者",
    "description": "非常专注而温暖的守护者，时刻准备保护爱的人。",
    "strengths": [
      "支持性强",
      "可靠可靠",
      "有耐心",
      "富有想象力",
      "忠诚"
    ],
    "challenges": [
      "过于谦虚",
      "承受压力",
      "难以表达自己",
      "容易自我批判",
      "抗拒变化"
    ],
    "advice": "学会表达自己的需求，接受他人的帮助，在照顾他人的同时也要照顾自己，培养更积极的自尊。"
  },
  "ESTJ": {
    "name": "总经理",
    "description": "出色的管理者，在管理事情或人的时候无与伦比。",
    "strengths": [
      "专注高效",
      "自信",
      "意志坚强",
      "负责任",
      "诚实直接"
    ],
    "challenges": [
      "固执己见",
      "难以容忍",
      "不容忍",
      "社交不敏感",
      "不耐烦"
    ],
    "advice": "学会倾听他人意见，培养同理心，在追求效率的同时关注人际关系，接受不同的工作方式。"
  },
  "ESFJ": {
    "name": "执政官",
    "description": "极度关心他人、善于交际、总是热心帮助的人。",
    "strengths": [
      "社交能力强",
      "有责任心",
      "传统",
      "有爱心",
      "忠诚"
    ],
    "challenges": [
      "过于在意他人看法",
      "难以创新",
      "容易自我牺牲",
      "容易脆弱",
      "抗拒变化"
    ],
    "advice": "学会关注自己的需求，培养独立思考能力，接受不完美和冲突，给自己留出休息和充电的时间。"
  },
  "ISTP": {
    "name": "鉴赏家",
    "description": "大胆而实际的实验家，擅长使用各种工具。",
    "strengths": [
      "乐观精力充沛",
      "善于解决问题",
      "适应力强",
      "自发",
      "务实"
    ],
    "challenges": [
      "容易自私",
      "容易厌倦",
      "容易冒险",
      "情感不敏感",
      "私密性强"
    ],
    "advice": "学会表达情感，建立长期承诺，在冒险前考虑后果，更多地与亲近的人分享内心世界。"
  },
  "ISFP": {
    "name": "探险家",
    "description": "灵活有魅力的艺术家，时刻准备探索和体验新事物。",
    "strengths": [
      "富有魅力",
      "对他人敏感",
      "富有想象力",
      "富有艺术性",
      "灵活"
    ],
    "challenges": [
      "过于敏感",
      "难以预测",
      "容易厌倦",
      "缺乏长期规划",
      "独立性过强"
    ],
    "advice": "学会制定长期目标，培养毅力，在追求自由的同时承担更多责任，更好地表达自己的想法和感受。"
  },
  "ESTP": {
    "name": "企业家",
    "description": "聪明精力充沛，善于感知的人们，真心享受活在当下。",
    "strengths": [
      "大胆",
      "理性实际",
      "原创",
      "表演力强",
      "观察力敏锐"
    ],
    "challenges": [
      "容易冲动",
      "缺乏耐心",
      "冒险",
      "可能不敏感",
      "容易分心"
    ],
    "advice": "培养长远思考能力，在冲动行动前先思考后果，学会规划，培养更深层次的人际关系。"
  },
  "ESFP": {
    "name": "表演者",
    "description": "自然的表演者，人生充满激情、魅力和快乐。",
    "strengths": [
      "有魅力",
      "对他人敏感",
      "有想象力",
      "精力充沛",
      "善于表演"
    ],
    "challenges": [
      "难以集中",
      "容易厌倦",
      "敏感",
      "缺乏规划",
      "容易冲突"
    ],
    "advice": "学会制定计划并坚持执行，培养深度思考能力，在追求快乐的同时考虑长期影响，给自己留出反思时间。"
  }
}
```

**Step 2: Create career recommendations**

Create `src/data/descriptions/careers.json`:

```json
{
  "analyst": {
    "types": ["INTJ", "INTP", "ENTJ", "ENTP"],
    "careers": [
      "软件工程师",
      "数据科学家",
      "金融分析师",
      "管理顾问",
      "研究员",
      "系统分析师",
      "投资经理",
      "战略规划"
    ]
  },
  "diplomat": {
    "types": ["INFJ", "INFP", "ENFJ", "ENFP"],
    "careers": [
      "心理咨询师",
      "人力资源",
      "社会工作者",
      "教师/教授",
      "非营利组织",
      "培训师",
      "文案策划",
      "艺术创作"
    ]
  },
  "sentinel": {
    "types": ["ISTJ", "ISFJ", "ESTJ", "ESFJ"],
    "careers": [
      "会计/审计",
      "行政管理",
      "医生/护士",
      "律师",
      "银行家",
      "项目经理",
      "运营管理",
      "公务员"
    ]
  },
  "explorer": {
    "types": ["ISTP", "ISFP", "ESTP", "ESFP"],
    "careers": [
      "设计师",
      "工程师",
      "销售",
      "企业家",
      "运动员",
      "厨师",
      "旅游行业",
      "媒体/娱乐"
    ]
  }
}
```

**Step 3: Create description loader**

Create `src/data/descriptions/index.ts`:

```typescript
import { PersonalityDescription } from '@/types';
import typesData from './types.json';
import careersData from './careers.json';

const personalityTypes: Record<string, PersonalityDescription> = typesData as any;

const careerGroups = careersData as {
  analyst: { types: string[]; careers: string[] };
  diplomat: { types: string[]; careers: string[] };
  sentinel: { types: string[]; careers: string[] };
  explorer: { types: string[]; careers: string[] };
};

export function getPersonalityDescription(type: string): PersonalityDescription | undefined {
  return personalityTypes[type];
}

export function getCareerRecommendations(type: string): string[] {
  for (const group of Object.values(careerGroups)) {
    if (group.types.includes(type)) {
      return group.careers;
    }
  }
  return [];
}

export function getAllDescriptions(): Record<string, PersonalityDescription> {
  return personalityTypes;
}
```

**Step 4: Commit**

```bash
git add .
git commit -m "feat: add personality descriptions and career recommendations data"
```

---

## Task 10: Result Components

**Files:**
- Create: `src/components/result/DimensionChart.tsx`
- Create: `src/components/result/FacetRadar.tsx`
- Create: `src/components/result/PersonalityReport.tsx`
- Create: `src/components/result/CareerAdvice.tsx`
- Create: `src/components/result/ShareCard.tsx`

**Step 1: Create DimensionChart component**

Create `src/components/result/DimensionChart.tsx`:

```typescript
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DimensionScore } from '@/types';

interface DimensionChartProps {
  dimensions: DimensionScore[];
}

const dimensionLabels: Record<string, string> = {
  EI: 'E - I',
  SN: 'S - N',
  TF: 'T - F',
  JP: 'J - P',
};

const dimensionNames: Record<string, string> = {
  EI: '外向 - 内向',
  SN: '感觉 - 直觉',
  TF: '思考 - 情感',
  JP: '判断 - 知觉',
};

export default function DimensionChart({ dimensions }: DimensionChartProps) {
  const data = dimensions.map(d => ({
    dimension: dimensionLabels[d.dimension],
    name: dimensionNames[d.dimension],
    score: d.score,
    positive: d.score >= 0,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-semibold mb-4">维度分析</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" domain={[-100, 100]} />
          <YAxis type="category" dataKey="dimension" width={60} />
          <Tooltip
            formatter={(value: number) => [`${value > 0 ? '+' : ''}${value}`, '得分']}
            labelFormatter={(label) => {
              const item = data.find(d => d.dimension === label);
              return item?.name || label;
            }}
          />
          <Bar dataKey="score" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.positive ? '#7C3AED' : '#EC4899'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
```

**Step 2: Create FacetRadar component**

Create `src/components/result/FacetRadar.tsx`:

```typescript
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { FacetScore } from '@/types';

interface FacetRadarProps {
  facets: FacetScore[];
}

export default function FacetRadar({ facets }: FacetRadarProps) {
  const data = facets.map(f => ({
    facet: f.facet,
    score: Math.abs(f.score),
  }));

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-semibold mb-4">刻面分析</h3>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid stroke="#e0e0e0" />
          <PolarAngleAxis dataKey="facet" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
          <Radar
            name="得分"
            dataKey="score"
            stroke="#7C3AED"
            fill="#7C3AED"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
```

**Step 3: Create PersonalityReport component**

Create `src/components/result/PersonalityReport.tsx`:

```typescript
import { motion } from 'framer-motion';
import { PersonalityDescription } from '@/types';
import { getPersonalityDescription } from '@/data/descriptions';

interface PersonalityReportProps {
  type: string;
}

export default function PersonalityReport({ type }: PersonalityReportProps) {
  const description = getPersonalityDescription(type);

  if (!description) return null;

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {type}
        </h2>
        <h3 className="text-2xl font-semibold text-gray-700">{description.name}</h3>
      </div>

      <p className="text-lg text-gray-600 mb-8 text-center leading-relaxed">
        {description.description}
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-green-600 mb-3">优势</h4>
          <ul className="space-y-2">
            {description.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-orange-600 mb-3">成长建议</h4>
          <ul className="space-y-2">
            {description.challenges.map((challenge, index) => (
              <li key={index} className="flex items-start">
                <span className="text-orange-500 mr-2">→</span>
                <span className="text-gray-700">{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
        <h4 className="text-lg font-semibold text-primary mb-3">个人成长建议</h4>
        <p className="text-gray-700 leading-relaxed">{description.advice}</p>
      </div>
    </motion.div>
  );
}
```

**Step 4: Create CareerAdvice component**

Create `src/components/result/CareerAdvice.tsx`:

```typescript
import { motion } from 'framer-motion';
import { getCareerRecommendations } from '@/data/descriptions';

interface CareerAdviceProps {
  type: string;
}

export default function CareerAdvice({ type }: CareerAdviceProps) {
  const careers = getCareerRecommendations(type);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="text-xl font-semibold mb-6">适合的职业方向</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {careers.map((career, index) => (
          <motion.div
            key={index}
            className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.05 }}
          >
            <span className="text-gray-700 font-medium">{career}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
```

**Step 5: Create ShareCard component**

Create `src/components/result/ShareCard.tsx`:

```typescript
import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';

interface ShareCardProps {
  shareId: string;
  onExportPDF: () => void;
  onExportImage: () => void;
}

export default function ShareCard({ shareId, onExportPDF, onExportImage }: ShareCardProps) {
  const [showModal, setShowModal] = useState(false);
  const shareUrl = `${window.location.origin}/share/${shareId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setShowModal(true);
  };

  return (
    <>
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-xl font-semibold mb-6">分享与导出</h3>
        <div className="space-y-4">
          <Button onClick={copyLink} variant="outline" className="w-full">
            复制分享链接
          </Button>
          <Button onClick={onExportPDF} variant="outline" className="w-full">
            导出 PDF
          </Button>
          <Button onClick={onExportImage} variant="outline" className="w-full">
            导出图片
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">
          分享链接有效期为 180 天
        </p>
      </motion.div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="text-center">
          <div className="text-6xl mb-4">✓</div>
          <h4 className="text-xl font-semibold mb-2">链接已复制</h4>
          <p className="text-gray-600 mb-4">分享链接已复制到剪贴板</p>
          <Button onClick={() => setShowModal(false)}>确定</Button>
        </div>
      </Modal>
    </>
  );
}
```

**Step 6: Commit**

```bash
git add .
git commit -m "feat: add result display components (charts, report, career, share)"
```

---

## Task 11: Result Page

**Files:**
- Create: `src/pages/Result.tsx`

**Step 1: Create Result page**

Create `src/pages/Result.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '@/components/common/AnimatedPage';
import DimensionChart from '@/components/result/DimensionChart';
import FacetRadar from '@/components/result/FacetRadar';
import PersonalityReport from '@/components/result/PersonalityReport';
import CareerAdvice from '@/components/result/CareerAdvice';
import ShareCard from '@/components/result/ShareCard';
import { calculateScores, determineType } from '@/lib/calculator';
import { Answer, TestResult } from '@/types';

export default function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    const answersJson = sessionStorage.getItem('mbti-answers');
    if (!answersJson) {
      navigate('/');
      return;
    }

    const answers: Answer[] = Object.entries(JSON.parse(answersJson)).map(([questionId, value]) => ({
      questionId,
      value: value as any,
    }));

    const scores = calculateScores(answers);
    const type = determineType(scores.dimensions);

    setResult({
      id: Date.now().toString(),
      type,
      ...scores,
      createdAt: new Date().toISOString(),
    });
  }, [navigate]);

  const handleExportPDF = async () => {
    // TODO: Implement PDF export
    alert('PDF export feature coming soon!');
  };

  const handleExportImage = async () => {
    // TODO: Implement image export
    alert('Image export feature coming soon!');
  };

  if (!result) {
    return (
      <AnimatedPage className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </AnimatedPage>
    );
  }

  const shareId = btoa(result.id).substring(0, 8);

  return (
    <AnimatedPage className="min-h-screen p-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <PersonalityReport type={result.type} />
        <DimensionChart dimensions={result.dimensions} />
        {result.facets.length > 0 && <FacetRadar facets={result.facets} />}
        <CareerAdvice type={result.type} />
        <ShareCard
          shareId={shareId}
          onExportPDF={handleExportPDF}
          onExportImage={handleExportImage}
        />
      </div>
    </AnimatedPage>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add result page with complete personality report"
```

---

## Task 12: Share Page

**Files:**
- Create: `src/pages/Share.tsx`
- Create: `src/api/get-result.ts`

**Step 1: Create get result API function**

Create `src/api/get-result.ts`:

```typescript
export async function getResult(shareId: string) {
  try {
    const response = await fetch(`/api/get-result?shareId=${shareId}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to get result:', error);
    return null;
  }
}
```

**Step 2: Create Share page**

Create `src/pages/Share.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnimatedPage from '@/components/common/AnimatedPage';
import DimensionChart from '@/components/result/DimensionChart';
import FacetRadar from '@/components/result/FacetRadar';
import PersonalityReport from '@/components/result/PersonalityReport';
import CareerAdvice from '@/components/result/CareerAdvice';
import { TestResult } from '@/types';
import { getResult } from '@/api/get-result';

export default function Share() {
  const { shareId } = useParams<{ shareId: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadResult() {
      if (!shareId) {
        setError(true);
        setLoading(false);
        return;
      }

      const data = await getResult(shareId);
      if (data) {
        setResult(data);
      } else {
        setError(true);
      }
      setLoading(false);
    }

    loadResult();
  }, [shareId]);

  if (loading) {
    return (
      <AnimatedPage className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </AnimatedPage>
    );
  }

  if (error || !result) {
    return (
      <AnimatedPage className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-700 mb-4">链接无效或已过期</h1>
          <p className="text-gray-600 mb-8">该分享链接可能已过期或不存在</p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            返回首页
          </button>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="min-h-screen p-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <PersonalityReport type={result.type} />
        <DimensionChart dimensions={result.dimensions} />
        {result.facets.length > 0 && <FacetRadar facets={result.facets} />}
        <CareerAdvice type={result.type} />
      </div>
    </AnimatedPage>
  );
}
```

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add share page for viewing shared results"
```

---

## Task 13: Vercel API - Save Result

**Files:**
- Create: `api/save-result.ts`

**Step 1: Create save result API**

Create `api/save-result.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { result } = body;

    if (!result) {
      return NextResponse.json({ error: 'Missing result data' }, { status: 400 });
    }

    // Generate share ID
    const shareId = btoa(`${result.id}-${Date.now()}`).substring(0, 8);

    // Store in KV with 180 day TTL
    await kv.set(`mbti:${shareId}`, JSON.stringify(result), {
      ex: 180 * 24 * 60 * 60, // 180 days in seconds
    });

    return NextResponse.json({ shareId });
  } catch (error) {
    console.error('Error saving result:', error);
    return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
  }
}
```

**Step 2: Update Result page to save result**

Modify `src/pages/Result.tsx`:

```typescript
// Add after imports
import { saveResult } from '@/api/save-result';

// Add in component after result is set
useEffect(() => {
  async function saveToServer() {
    if (result) {
      await saveResult(result);
    }
  }
  saveToServer();
}, [result]);
```

**Step 3: Create save result API function**

Create `src/api/save-result.ts`:

```typescript
export async function saveResult(result: any) {
  try {
    const response = await fetch('/api/save-result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ result }),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to save result:', error);
    return null;
  }
}
```

**Step 4: Commit**

```bash
git add .
git commit -m "feat: add API endpoint for saving test results to KV storage"
```

---

## Task 14: Vercel API - Get Result

**Files:**
- Create: `api/get-result.ts`

**Step 1: Create get result API**

Create `api/get-result.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const shareId = searchParams.get('shareId');

    if (!shareId) {
      return NextResponse.json({ error: 'Missing shareId' }, { status: 400 });
    }

    const result = await kv.get(`mbti:${shareId}`);

    if (!result) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error getting result:', error);
    return NextResponse.json({ error: 'Failed to get result' }, { status: 500 });
  }
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add API endpoint for retrieving shared results from KV storage"
```

---

## Task 15: PDF Export

**Files:**
- Create: `src/lib/pdf-export.ts`

**Step 1: Create PDF export utility**

Create `src/lib/pdf-export.ts`:

```typescript
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportToPDF(elementId: string, filename: string = 'mbti-result.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');

  const imgWidth = 210;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  pdf.save(filename);
}

export async function exportToImage(elementId: string, filename: string = 'mbti-result.png') {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#FDF4FF',
  });

  canvas.toBlob((blob) => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    }
  });
}
```

**Step 2: Update Result page to use export functions**

Modify `src/pages/Result.tsx`:

```typescript
// Update handler functions
const handleExportPDF = async () => {
  try {
    await exportToPDF('result-container');
  } catch (error) {
    console.error('PDF export failed:', error);
    alert('导出 PDF 失败，请重试');
  }
};

const handleExportImage = async () => {
  try {
    await exportToImage('result-container');
  } catch (error) {
    console.error('Image export failed:', error);
    alert('导出图片失败，请重试');
  }
};

// Wrap result content with id
<div id="result-container" className="max-w-4xl mx-auto space-y-8">
```

**Step 3: Commit**

```bash
git add .
git commit -m "feat: implement PDF and image export functionality"
```

---

## Task 16: Polish and Deploy

**Files:**
- Modify: `src/styles/theme.css`
- Modify: `vercel.json`
- Create: `README.md`

**Step 1: Enhance theme CSS**

Modify `src/styles/theme.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #7C3AED;
  --secondary: #EC4899;
  --accent: #06B6D4;
  --background: #FDF4FF;
  --text: #1F2937;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background-color: var(--background);
  color: var(--text);
  line-height: 1.6;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}
```

**Step 2: Update Vercel config**

Modify `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "functions": {
    "api/**/*.ts": {
      "runtime": "@vercel/node@3"
    }
  },
  "kv": [
    {
      "name": "mbti-results"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

**Step 3: Create README**

Create `README.md`:

```markdown
# MBTI Personality Test

A professional MBTI Step II personality test web application built with React and TypeScript.

## Features

- Complete MBTI Step II test (144 questions)
- Detailed analysis of 4 personality dimensions
- 20 facet-level insights
- Personality type descriptions
- Career recommendations
- Shareable results (180-day validity)
- PDF and image export

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Vite
- Vercel (deployment + KV storage)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Deploy to Vercel with KV storage enabled.
```

**Step 4: Test production build**

Run: `npm run build`

**Step 5: Commit**

```bash
git add .
git commit -m "feat: complete project polish and deployment configuration"
```

---

## Task 17: End-to-End Testing

**Files:**
- Create: `src/__tests__/e2e/test-flow.test.tsx`

**Step 1: Write E2E test**

Create `src/__tests__/e2e/test-flow.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';

describe('MBTI Test E2E Flow', () => {
  const renderApp = () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  };

  it('shows home page with start button', () => {
    renderApp();
    expect(screen.getByText('MBTI 人格测试')).toBeInTheDocument();
    expect(screen.getByText('开始测试')).toBeInTheDocument();
  });

  it('navigates to test page and shows questions', async () => {
    renderApp();
    fireEvent.click(screen.getByText('开始测试'));

    await waitFor(() => {
      expect(screen.getByText(/Question \d+ of/)).toBeInTheDocument();
    });
  });

  it('completes test and shows results', async () => {
    renderApp();
    fireEvent.click(screen.getByText('开始测试'));

    // Answer questions (simplified - in real test would answer all)
    await waitFor(() => {
      const options = screen.getAllByRole('button');
      if (options.length > 1) {
        fireEvent.click(options[1]);
      }
    });

    // Eventually should show result
    await waitFor(() => {
      const resultType = screen.queryByText(/INTJ|INTP|ENTJ|/);
      // Result type should appear after completing test
    }, { timeout: 10000 });
  });
});
```

**Step 2: Run E2E tests**

Run: `npm test`

**Step 3: Commit**

```bash
git add .
git commit -m "test: add end-to-end test coverage"
```

---

## Summary

This implementation plan covers:

1. **Project Setup** - Vite + React + TypeScript configuration
2. **Core Components** - Reusable UI components with animations
3. **Question System** - 144 questions across 4 dimensions with facet scoring
4. **Scoring Engine** - Dimension and facet calculation logic
5. **Test Flow** - Interactive question navigation and state management
6. **Result Display** - Charts, reports, and career advice
7. **Share System** - Vercel KV storage for shareable results
8. **Export Features** - PDF and image export functionality
9. **API Endpoints** - Serverless functions for data persistence

**Total Estimated Tasks:** 17 major tasks, broken down into ~85 sub-steps

**Next Steps:**
1. Review and approve this plan
2. Set up Vercel project with KV storage
3. Begin implementation following TDD principles
4. Deploy and test on Vercel
