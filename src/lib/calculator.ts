import { Answer, DimensionScore, FacetScore, TestResult, Dimension } from '@/types';
import { getAllQuestions } from '@/data/questions';

export function calculateScores(answers: Answer[]): Omit<TestResult, 'id' | 'type' | 'createdAt'> {
  const questions = getAllQuestions();
  const answerMap = new Map(answers.map(a => [a.questionId, a.value]));

  // Calculate dimension scores
  const dimensionScores: DimensionScore[] = (['EI', 'SN', 'TF', 'JP'] as Dimension[]).map(dimension => {
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
    const normalizedScore = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;
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
    const normalizedScore = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;
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
