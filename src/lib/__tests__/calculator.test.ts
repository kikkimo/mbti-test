import { describe, it, expect } from 'vitest';
import { calculateScores, determineType } from '../calculator';
import { Answer, Dimension, DimensionScore } from '@/types';

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
    const dimensions: DimensionScore[] = [
      { dimension: 'EI' as Dimension, score: -50, direction: 'negative' },
      { dimension: 'SN' as Dimension, score: -60, direction: 'negative' },
      { dimension: 'TF' as Dimension, score: 70, direction: 'positive' },
      { dimension: 'JP' as Dimension, score: 80, direction: 'positive' },
    ];
    const type = determineType(dimensions);
    expect(type).toBe('INTJ');
  });

  it('determines ESFP type from scores', () => {
    const dimensions: DimensionScore[] = [
      { dimension: 'EI' as Dimension, score: 60, direction: 'positive' },
      { dimension: 'SN' as Dimension, score: 70, direction: 'positive' },
      { dimension: 'TF' as Dimension, score: -50, direction: 'negative' },
      { dimension: 'JP' as Dimension, score: -60, direction: 'negative' },
    ];
    const type = determineType(dimensions);
    expect(type).toBe('ESFP');
  });
});
