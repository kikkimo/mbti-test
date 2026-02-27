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

      // Schedule auto-advance (use functional update to get latest index)
      if (totalQuestions) {
        transitionTimerRef.current = setTimeout(() => {
          setCurrentQuestionIndex(prev => {
            if (prev < (totalQuestions || 1) - 1) {
              onTransition?.();
              return prev + 1;
            }
            return prev;
          });
          transitionTimerRef.current = null;
        }, 300);
      }
    },
    [totalQuestions]
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
