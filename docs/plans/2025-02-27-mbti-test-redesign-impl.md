# MBTI 答题系统全面重构实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 重构 MBTI 答题系统，修复快速点击 bug，优化快速跳转面板布局，更换为暖色调配色。

**Architecture:**
1. 更新配色系统（theme.css + tailwind.config.js）
2. 重构 useTestState hook 添加防抖机制
3. 重构 QuestionsDrawer 和 QuestionGrid 组件布局
4. 优化 ProgressBar 显示逻辑

**Tech Stack:** React, TypeScript, Tailwind CSS, Framer Motion, Vitest

---

## Task 1: 更新配色系统

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/styles/theme.css`

**Step 1: 更新 Tailwind 配置**

修改 `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E67E22',
        secondary: '#D35400',
        accent: '#F39C12',
        background: '#FFF8F0',
        card: '#FFFBF7',
        text: '#4A3728',
        answered: '#27AE60',
        unanswered: '#E5E7EB',
        current: '#E67E22',
      },
    },
  },
  plugins: [],
}
```

**Step 2: 更新 CSS 变量**

修改 `src/styles/theme.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #E67E22;
  --secondary: #D35400;
  --accent: #F39C12;
  --background: #FFF8F0;
  --card: #FFFBF7;
  --text: #4A3728;
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

**Step 3: 验证配色更新**

Run: `npm run dev`
Expected: 应用启动成功，颜色变为暖色调

**Step 4: Commit**

```bash
git add tailwind.config.js src/styles/theme.css
git commit -m "style: update color system to warm tones"
```

---

## Task 2: 重构 useTestState Hook 添加防抖机制

**Files:**
- Modify: `src/hooks/useTestState.ts`
- Modify: `src/hooks/__tests__/useTestState.test.ts`

**Step 1: 添加防抖测试**

在 `src/hooks/__tests__/useTestState.test.ts` 末尾添加:

```typescript
describe('selectAnswerWithAutoAdvance', () => {
  it('should cancel pending transition when new answer is selected', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTestState(10));
    const onTransition = vi.fn();

    act(() => {
      result.current.selectAnswerWithAutoAdvance('q1', 1, onTransition);
    });

    expect(result.current.answers.q1).toBe(1);
    expect(onTransition).not.toHaveBeenCalled();

    // Select another answer before timeout
    act(() => {
      result.current.selectAnswerWithAutoAdvance('q1', 2, onTransition);
    });

    // Fast-forward only 300ms (original timeout)
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Should not have transitioned yet (old timer was cancelled)
    expect(onTransition).not.toHaveBeenCalled();

    // Fast-forward another 300ms (new timer)
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Now should have transitioned
    expect(onTransition).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('should not transition if at last question', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTestState(2));
    const onTransition = vi.fn();

    // Go to last question
    act(() => {
      result.current.goToQuestion(1);
    });

    act(() => {
      result.current.selectAnswerWithAutoAdvance('q2', 1, onTransition);
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(onTransition).not.toHaveBeenCalled();

    vi.useRealTimers();
  });
});
```

**Step 2: 运行测试验证失败**

Run: `npm run test src/hooks/__tests__/useTestState.test.ts`
Expected: FAIL - selectAnswerWithAutoAdvance not defined

**Step 3: 实现 selectAnswerWithAutoAdvance 方法**

修改 `src/hooks/useTestState.ts`:

```typescript
import { useState, useCallback, useRef, useEffect } from 'react';
import { OptionValue } from '@/types';

interface Answers {
  [questionId: string]: OptionValue;
}

interface UseTestStateReturn {
  answers: Answers;
  currentQuestionIndex: number;
  setAnswer: (questionId: string, value: OptionValue) => void;
  selectAnswerWithAutoAdvance: (
    questionId: string,
    value: OptionValue,
    onTransition?: () => void
  ) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  reset: () => void;
}

export function useTestState(totalQuestions?: number): UseTestStateReturn {
  const [answers, setAnswers] = useState<Answers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const setAnswer = useCallback((questionId: string, value: OptionValue) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const selectAnswerWithAutoAdvance = useCallback(
    (questionId: string, value: OptionValue, onTransition?: () => void) => {
      // Clear any pending transition
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }

      // Record the answer
      setAnswers(prev => ({ ...prev, [questionId]: value }));

      // Schedule auto-advance
      if (totalQuestions && currentQuestionIndex < totalQuestions - 1) {
        transitionTimerRef.current = setTimeout(() => {
          setCurrentQuestionIndex(prev => Math.min(prev + 1, (totalQuestions || 1) - 1));
          onTransition?.();
          transitionTimerRef.current = null;
        }, 300);
      }
    },
    [totalQuestions, currentQuestionIndex]
  );

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
    // Clear pending transition when manually navigating
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
    setCurrentQuestionIndex(Math.max(0, index));
  }, []);

  const reset = useCallback(() => {
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
    setAnswers({});
    setCurrentQuestionIndex(0);
  }, []);

  return {
    answers,
    currentQuestionIndex,
    setAnswer,
    selectAnswerWithAutoAdvance,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    reset,
  };
}
```

**Step 4: 运行测试验证通过**

Run: `npm run test src/hooks/__tests__/useTestState.test.ts`
Expected: PASS - all tests pass

**Step 5: Commit**

```bash
git add src/hooks/useTestState.ts src/hooks/__tests__/useTestState.test.ts
git commit -m "feat: add debounced selectAnswerWithAutoAdvance to useTestState"
```

---

## Task 3: 更新 Test 页面使用新的防抖方法

**Files:**
- Modify: `src/pages/Test.tsx`

**Step 1: 更新 Test.tsx 使用 selectAnswerWithAutoAdvance**

修改 `src/pages/Test.tsx`:

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AnimatedPage from '@/components/common/AnimatedPage';
import QuestionCard from '@/components/test/QuestionCard';
import ProgressBar from '@/components/test/ProgressBar';
import Button from '@/components/common/Button';
import FloatingButton from '@/components/test/FloatingButton';
import QuestionsDrawer from '@/components/test/QuestionsDrawer';
import { useTestState } from '@/hooks/useTestState';
import { useSkippedQuestions } from '@/hooks/useSkippedQuestions';
import { getAllQuestions } from '@/data/questions';

export default function Test() {
  const questions = getAllQuestions();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    answers,
    currentQuestionIndex,
    selectAnswerWithAutoAdvance,
    previousQuestion,
    goToQuestion,
  } = useTestState(questions.length);

  const { skippedCount, allAnswered } = useSkippedQuestions(answers, questions.length);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedValue = answers[currentQuestion.id];

  const handleSelect = (value: number) => {
    selectAnswerWithAutoAdvance(currentQuestion.id, value as any);
  };

  const handleFinish = () => {
    sessionStorage.setItem('mbti-answers', JSON.stringify(answers));
    navigate('/result');
  };

  const canFinish = Object.keys(answers).length === questions.length;

  return (
    <AnimatedPage className="min-h-screen p-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <ProgressBar
            answeredCount={Object.keys(answers).length}
            total={questions.length}
          />
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
              {Object.keys(answers).length} / {questions.length}
              {skippedCount > 0 && ` (${skippedCount} skipped)`}
            </span>
            {currentQuestionIndex === questions.length - 1 && canFinish ? (
              <Button size="sm" onClick={handleFinish}>
                Finish
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => goToQuestion(currentQuestionIndex + 1)}
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
          {questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => goToQuestion(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentQuestionIndex
                  ? 'bg-primary scale-125'
                  : answers[q.id]
                  ? 'bg-answered'
                  : 'bg-unanswered'
              }`}
              aria-label={`Question ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <FloatingButton
        skippedCount={skippedCount}
        allAnswered={allAnswered}
        onClick={() => setIsDrawerOpen(true)}
      />

      <QuestionsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        questions={questions}
        answers={answers}
        currentQuestionId={currentQuestion.id}
        onQuestionClick={(_questionId, index) => goToQuestion(index)}
      />
    </AnimatedPage>
  );
}
```

**Step 2: 验证应用运行**

Run: `npm run dev`
Expected: 应用运行正常，快速点击不会跳转多次

**Step 3: Commit**

```bash
git add src/pages/Test.tsx
git commit -m "refactor: use selectAnswerWithAutoAdvance in Test page"
```

---

## Task 4: 更新 ProgressBar 组件

**Files:**
- Modify: `src/components/test/ProgressBar.tsx`

**Step 1: 更新 ProgressBar 组件**

修改 `src/components/test/ProgressBar.tsx`:

```typescript
import { motion } from 'framer-motion';

interface ProgressBarProps {
  answeredCount: number;
  total: number;
}

export default function ProgressBar({ answeredCount, total }: ProgressBarProps) {
  const percentage = (answeredCount / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-text">
          Progress
        </span>
        <motion.span
          className="text-sm font-bold text-primary"
          key={answeredCount}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {answeredCount} / {total}
        </motion.span>
      </div>
      <div className="w-full h-3 bg-unanswered rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
```

**Step 2: 验证应用运行**

Run: `npm run dev`
Expected: 进度条显示已答题数，颜色为暖色渐变

**Step 3: Commit**

```bash
git add src/components/test/ProgressBar.tsx
git commit -m "refactor: update ProgressBar to show answered count with warm colors"
```

---

## Task 5: 重构 QuestionsDrawer 分页标签

**Files:**
- Modify: `src/components/test/QuestionsDrawer.tsx`

**Step 1: 更新 dimensionTabs 配置**

修改 `src/components/test/QuestionsDrawer.tsx`:

```typescript
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dimension, OptionValue } from '@/types';
import QuestionGrid from './QuestionGrid';
import { Question } from '@/types';

interface QuestionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  answers: Record<string, OptionValue>;
  currentQuestionId?: string;
  onQuestionClick: (questionId: string, index: number) => void;
}

const dimensionTabs: { dimension: Dimension; label: string; subLabel: string }[] = [
  { dimension: 'EI', label: 'E-I', subLabel: '外向/内向' },
  { dimension: 'SN', label: 'S-N', subLabel: '感觉/直觉' },
  { dimension: 'TF', label: 'T-F', subLabel: '思考/情感' },
  { dimension: 'JP', label: 'J-P', subLabel: '判断/知觉' },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const drawerVariants = {
  hidden: {
    y: '100%',
    scale: 0.95,
    opacity: 0,
  },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 350,
      mass: 0.8,
    },
  },
  exit: {
    y: '100%',
    scale: 0.95,
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};

export default function QuestionsDrawer({
  isOpen,
  onClose,
  questions,
  answers,
  currentQuestionId,
  onQuestionClick,
}: QuestionsDrawerProps) {
  const [activeTab, setActiveTab] = useState<Dimension>('EI');

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleQuestionClick = (questionId: string, index: number) => {
    onQuestionClick(questionId, index);
    onClose();
  };

  const activeTabInfo = dimensionTabs.find(t => t.dimension === activeTab);
  const dimensionQuestions = questions.filter(q => q.dimension === activeTab);
  const answeredCount = dimensionQuestions.filter(q => answers[q.id] !== undefined).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleBackdropClick}
          />

          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Drag Handle */}
            <div className="flex justify-center py-3 cursor-pointer" onClick={onClose}>
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Dimension Tabs - Clear Labels */}
            <div className="flex border-b border-gray-200">
              {dimensionTabs.map(({ dimension, label, subLabel }) => {
                const isActive = activeTab === dimension;
                const dimQuestions = questions.filter(q => q.dimension === dimension);
                const dimAnswered = dimQuestions.filter(q => answers[q.id] !== undefined).length;
                return (
                  <button
                    key={dimension}
                    onClick={() => setActiveTab(dimension)}
                    className={`
                      flex-1 py-4 px-2 text-center transition-all
                      ${isActive
                        ? 'bg-primary text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }
                    `}
                  >
                    <div className="text-base font-bold">{label}</div>
                    <div className={`text-xs mt-1 ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                      {subLabel}
                    </div>
                    <div className={`text-xs mt-1 ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                      {dimAnswered}/{dimQuestions.length}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Section Title */}
            <div className="px-4 py-3 bg-orange-50 border-b border-orange-100">
              <h3 className="text-base font-bold text-text">
                {activeTabInfo?.label} {activeTabInfo?.subLabel}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {answeredCount}/{dimensionQuestions.length} answered • Click to jump
              </p>
            </div>

            {/* Question Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              <QuestionGrid
                dimension={activeTab}
                questions={questions}
                answers={answers}
                onQuestionClick={handleQuestionClick}
                currentQuestionId={currentQuestionId}
              />
            </div>

            {/* Status Legend */}
            <div className="border-t border-gray-200 p-3 bg-gray-50">
              <div className="flex justify-center gap-6 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-3 rounded bg-answered" />
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-3 rounded bg-unanswered" />
                  <span className="text-gray-600">Unanswered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-3 rounded bg-current ring-2 ring-current ring-offset-1" />
                  <span className="text-gray-600">Current</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="p-3 border-t border-gray-200">
              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

**Step 2: 验证应用运行**

Run: `npm run dev`
Expected: 分页标签显示清晰，包含中文名称和进度

**Step 3: Commit**

```bash
git add src/components/test/QuestionsDrawer.tsx
git commit -m "refactor: improve QuestionsDrawer tab labels with Chinese names and progress"
```

---

## Task 6: 重构 QuestionGrid 网格布局

**Files:**
- Modify: `src/components/test/QuestionGrid.tsx`

**Step 1: 更新 QuestionGrid 组件**

修改 `src/components/test/QuestionGrid.tsx`:

```typescript
import { motion } from 'framer-motion';
import { Question, Dimension, OptionValue } from '@/types';

interface QuestionGridProps {
  dimension: Dimension;
  questions: Question[];
  answers: Record<string, OptionValue>;
  onQuestionClick: (questionId: string, index: number) => void;
  currentQuestionId?: string;
}

const getStatusStyle = (answered: boolean, isCurrent: boolean): string => {
  if (isCurrent) return 'bg-current text-white ring-2 ring-offset-1 ring-current font-bold';
  if (answered) return 'bg-answered text-white';
  return 'bg-unanswered text-gray-500';
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.015,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
};

export default function QuestionGrid({
  dimension,
  questions,
  answers,
  onQuestionClick,
  currentQuestionId,
}: QuestionGridProps) {
  const dimensionQuestions = questions.filter(q => q.dimension === dimension);

  return (
    <motion.div
      className="grid grid-cols-9 gap-1.5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {dimensionQuestions.map((question) => {
        const isAnswered = answers[question.id] !== undefined;
        const isCurrent = question.id === currentQuestionId;
        const questionNumber = questions.indexOf(question) + 1;

        return (
          <motion.button
            key={question.id}
            variants={itemVariants}
            onClick={() => onQuestionClick(question.id, questions.indexOf(question))}
            className={`
              aspect-[3/2] rounded-lg text-sm font-medium
              transition-all duration-150
              ${getStatusStyle(isAnswered, isCurrent)}
              hover:opacity-80 hover:scale-105
              active:scale-95
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`Question ${questionNumber}: ${question.text}`}
          >
            {questionNumber}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
```

**Step 2: 验证应用运行**

Run: `npm run dev`
Expected: 网格为9列，按钮扁平，布局紧凑

**Step 3: Commit**

```bash
git add src/components/test/QuestionGrid.tsx
git commit -m "refactor: update QuestionGrid to 9-column layout with flat buttons"
```

---

## Task 7: 更新组件测试

**Files:**
- Modify: `src/components/test/__tests__/QuestionGrid.test.tsx`

**Step 1: 更新 QuestionGrid 测试**

检查并更新 `src/components/test/__tests__/QuestionGrid.test.tsx` 确保测试通过。

**Step 2: 运行所有测试**

Run: `npm run test`
Expected: PASS - all tests pass

**Step 3: Commit**

```bash
git add src/components/test/__tests__/
git commit -m "test: update QuestionGrid tests for new layout"
```

---

## Task 8: 最终验证和集成测试

**Step 1: 运行完整测试套件**

Run: `npm run test`
Expected: PASS - all tests pass

**Step 2: 启动开发服务器进行手动测试**

Run: `npm run dev`

手动验证:
1. 快速点击答案选项，确认不会跳转多次
2. 打开快速跳转面板，确认分页标签清晰显示
3. 确认网格为4行9列布局
4. 确认配色为暖色调
5. 确认进度条显示已答题数

**Step 3: 最终 Commit**

```bash
git add -A
git commit -m "feat: complete MBTI test system redesign with warm colors and improved UX"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Update color system | tailwind.config.js, theme.css |
| 2 | Add debounce to useTestState | useTestState.ts, test |
| 3 | Update Test page | Test.tsx |
| 4 | Update ProgressBar | ProgressBar.tsx |
| 5 | Improve QuestionsDrawer tabs | QuestionsDrawer.tsx |
| 6 | Update QuestionGrid layout | QuestionGrid.tsx |
| 7 | Update tests | test files |
| 8 | Final verification | all |
