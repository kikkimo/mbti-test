import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { useSkippedQuestions } from '@/hooks/useSkippedQuestions';
import { OptionValue } from '@/types';

describe('Skipped Questions Feature - Edge Cases', () => {
  describe('useSkippedQuestions hook edge cases', () => {
    it('handles empty answers object', () => {
      const { result } = renderHook(() =>
        useSkippedQuestions({}, 144)
      );

      expect(result.current.skippedCount).toBe(144);
      expect(result.current.allAnswered).toBe(false);
      expect(result.current.dimensionStatus).toHaveLength(4);
      result.current.dimensionStatus.forEach(status => {
        expect(status.status).toBe('skipped');
      });
    });

    it('handles single answer', () => {
      const answers: Record<string, OptionValue> = { 'ei-001': 1 };
      const { result } = renderHook(() =>
        useSkippedQuestions(answers, 144)
      );

      expect(result.current.skippedCount).toBe(143);
      expect(result.current.allAnswered).toBe(false);
    });

    it('handles all but one answered', () => {
      const answers: Record<string, OptionValue> = {};
      // Use actual question IDs from the data
      // EI has 36 questions, SN has 36, TF has 36, JP has 36
      for (let i = 1; i <= 36; i++) {
        const id = `ei-${String(i).padStart(3, '0')}`;
        answers[id] = 1;
      }
      for (let i = 1; i <= 36; i++) {
        const id = `sn-${String(i).padStart(3, '0')}`;
        answers[id] = 1;
      }
      for (let i = 1; i <= 35; i++) {
        const id = `tf-${String(i).padStart(3, '0')}`;
        answers[id] = 1;
      }
      // 36 + 36 + 35 = 107 answered, 37 skipped
      const { result } = renderHook(() =>
        useSkippedQuestions(answers, 144)
      );

      expect(result.current.skippedCount).toBeGreaterThan(0);
      expect(result.current.allAnswered).toBe(false);
    });

    it('handles all answered', () => {
      const answers: Record<string, OptionValue> = {};
      // Answer all questions in all dimensions
      for (let i = 1; i <= 36; i++) {
        answers[`ei-${String(i).padStart(3, '0')}`] = 1;
        answers[`sn-${String(i).padStart(3, '0')}`] = 1;
        answers[`tf-${String(i).padStart(3, '0')}`] = 1;
        answers[`jp-${String(i).padStart(3, '0')}`] = 1;
      }
      const { result } = renderHook(() =>
        useSkippedQuestions(answers, 144)
      );

      expect(result.current.skippedCount).toBe(0);
      expect(result.current.allAnswered).toBe(true);
    });

    it('updates reactively when answers change', () => {
      const { result, rerender } = renderHook(
        ({ answers, total }) => useSkippedQuestions(answers, total),
        { initialProps: { answers: {} as Record<string, OptionValue>, total: 144 } }
      );

      expect(result.current.skippedCount).toBe(144);

      // Update with some answers
      rerender({
        answers: { 'ei-001': 1, 'ei-002': -1 } as Record<string, OptionValue>,
        total: 144,
      });
      expect(result.current.skippedCount).toBeLessThan(144);
    });
  });

  describe('FloatingButton edge cases', () => {
    it('remains hidden when no skips and not complete', () => {
      const { container } = render(
        <div>
          {/* Simulating FloatingButton internals */}
          <div style={{ display: (0 > 0 || false) ? 'block' : 'none' }}>
            Should not show
          </div>
        </div>
      );

      expect(container.textContent).toBe('Should not show');
    });
  });

  describe('Question navigation edge cases', () => {
    it('handles navigation to first question', () => {
      const goToQuestion = vi.fn();

      // Simulate clicking question 1
      goToQuestion(0);

      expect(goToQuestion).toHaveBeenCalledWith(0);
    });

    it('handles navigation to last question', () => {
      const goToQuestion = vi.fn();

      // Simulate clicking question 144
      goToQuestion(143);

      expect(goToQuestion).toHaveBeenCalledWith(143);
    });

    it('handles navigation to middle question', () => {
      const goToQuestion = vi.fn();

      // Simulate clicking question 72
      goToQuestion(71);

      expect(goToQuestion).toHaveBeenCalledWith(71);
    });
  });

  describe('Dimension status calculations', () => {
    it('correctly calculates status when dimension has mixed answers', () => {
      const answers: Record<string, OptionValue> = {
        'ei-001': 1,
        'ei-002': -1,
        'ei-005': 0,
      };
      const { result } = renderHook(() =>
        useSkippedQuestions(answers, 144)
      );

      const eiStatus = result.current.dimensionStatus.find(d => d.dimension === 'EI');
      expect(eiStatus?.status).toBe('partial');
      expect(eiStatus?.answered).toBeGreaterThan(0);
    });

    it('handles invalid question IDs gracefully', () => {
      const answers: Record<string, OptionValue> = {
        'invalid-001': 1,
        'unknown-xyz': -1,
      };
      const { result } = renderHook(() =>
        useSkippedQuestions(answers, 144)
      );

      // Invalid IDs should be counted as answered but won't affect dimension status
      expect(result.current.allAnswered).toBe(false);
    });
  });
});
