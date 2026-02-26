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
