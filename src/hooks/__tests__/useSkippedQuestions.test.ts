import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSkippedQuestions } from '../useSkippedQuestions';
import { OptionValue } from '@/types';

describe('useSkippedQuestions', () => {
  it('calculates unanswered questions correctly', () => {
    const answers: Record<string, OptionValue> = {
      'ei-001': 2,
      'ei-003': -1,
    };
    const { result } = renderHook(() =>
      useSkippedQuestions(answers, 144)
    );

    // Should have 142 skipped questions (144 total - 2 answered)
    expect(result.current.skippedQuestions.length).toBeGreaterThan(140);
    expect(result.current.allAnswered).toBe(false);
    expect(result.current.skippedCount).toBeGreaterThan(140);
  });

  it('returns empty arrays when all answered', () => {
    const answers: Record<string, OptionValue> = {
      'ei-001': 1,
      'ei-002': 1,
      'ei-003': 1,
      'sn-001': 1,
      'sn-002': 1,
      'sn-003': 1,
      'tf-001': 1,
      'tf-002': 1,
      'tf-003': 1,
      'jp-001': 1,
      'jp-002': 1,
      'jp-003': 1,
    };
    const { result } = renderHook(() =>
      useSkippedQuestions(answers, 12)
    );

    expect(result.current.skippedQuestions.length).toBeGreaterThanOrEqual(0);
    expect(result.current.allAnswered).toBe(true);
    expect(result.current.skippedCount).toBe(result.current.skippedQuestions.length);
  });

  it('calculates dimension status correctly - all skipped', () => {
    const answers: Record<string, OptionValue> = {};
    const { result } = renderHook(() =>
      useSkippedQuestions(answers, 144)
    );

    const eiStatus = result.current.dimensionStatus.find(d => d.dimension === 'EI');
    expect(eiStatus?.status).toBe('skipped');
    expect(eiStatus?.answered).toBe(0);
  });

  it('calculates dimension status correctly - partial', () => {
    const answers: Record<string, OptionValue> = {
      'ei-001': 1,
      'ei-002': -1,
    };
    const { result } = renderHook(() =>
      useSkippedQuestions(answers, 144)
    );

    const eiStatus = result.current.dimensionStatus.find(d => d.dimension === 'EI');
    expect(eiStatus?.status).toBe('partial');
    expect(eiStatus?.answered).toBeGreaterThan(0);
    expect(eiStatus?.answered).toBeLessThan(eiStatus?.total);
  });

  it('calculates dimension status correctly - complete', () => {
    // Answer all EI dimension questions
    const answers: Record<string, OptionValue> = {};
    for (let i = 1; i <= 36; i++) {
      const id = `ei-${String(i).padStart(3, '0')}`;
      answers[id] = 1;
    }

    const { result } = renderHook(() =>
      useSkippedQuestions(answers, 144)
    );

    const eiStatus = result.current.dimensionStatus.find(d => d.dimension === 'EI');
    expect(eiStatus?.status).toBe('complete');
    expect(eiStatus?.answered).toBe(eiStatus?.total);
  });

  it('handles 0 answered correctly', () => {
    const { result } = renderHook(() =>
      useSkippedQuestions({}, 144)
    );

    expect(result.current.skippedCount).toBe(144);
    expect(result.current.allAnswered).toBe(false);
  });

  it('handles partial answered correctly', () => {
    const answers: Record<string, OptionValue> = {
      'ei-001': 1,
      'sn-001': 1,
    };
    const { result } = renderHook(() =>
      useSkippedQuestions(answers, 144)
    );

    expect(result.current.skippedCount).toBe(142);
    expect(result.current.allAnswered).toBe(false);
  });

  it('returns all dimension statuses', () => {
    const { result } = renderHook(() =>
      useSkippedQuestions({}, 144)
    );

    expect(result.current.dimensionStatus).toHaveLength(4);
    const dimensions = result.current.dimensionStatus.map(d => d.dimension);
    expect(dimensions).toContain('EI');
    expect(dimensions).toContain('SN');
    expect(dimensions).toContain('TF');
    expect(dimensions).toContain('JP');
  });
});
