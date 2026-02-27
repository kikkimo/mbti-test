import { useMemo } from 'react';
import { Dimension, OptionValue } from '@/types';
import { getAllQuestions } from '@/data/questions';

interface DimensionStatus {
  dimension: Dimension;
  answered: number;
  total: number;
  status: 'complete' | 'partial' | 'skipped';
}

interface UseSkippedQuestionsReturn {
  dimensionStatus: DimensionStatus[];
  skippedQuestions: Array<{ id: string; dimension: Dimension }>;
  allAnswered: boolean;
  skippedCount: number;
}

export function useSkippedQuestions(
  answers: Record<string, OptionValue>,
  totalQuestions: number
): UseSkippedQuestionsReturn {
  const questions = getAllQuestions();

  const dimensionStatus = useMemo(() => {
    const dimensions: Dimension[] = ['EI', 'SN', 'TF', 'JP'];
    return dimensions.map(dimension => {
      const dimensionQuestions = questions.filter(q => q.dimension === dimension);
      const answered = dimensionQuestions.filter(q => answers[q.id] !== undefined).length;

      let status: DimensionStatus['status'];
      if (answered === 0) status = 'skipped';
      else if (answered === dimensionQuestions.length) status = 'complete';
      else status = 'partial';

      return { dimension, answered, total: dimensionQuestions.length, status };
    });
  }, [answers, questions]);

  const skippedQuestions = useMemo(() => {
    return questions.filter(q => answers[q.id] === undefined).map(q => ({
      id: q.id,
      dimension: q.dimension,
    }));
  }, [answers, questions]);

  const allAnswered = useMemo(() => {
    return Object.keys(answers).length === totalQuestions;
  }, [answers, totalQuestions]);

  const skippedCount = skippedQuestions.length;

  return {
    dimensionStatus,
    skippedQuestions,
    allAnswered,
    skippedCount,
  };
}
