import { describe, it, expect, vi } from 'vitest';
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
    const { result } = renderHook(() => useTestState(10));
    act(() => {
      result.current.nextQuestion();
    });
    expect(result.current.currentQuestionIndex).toBe(1);
  });

  it('navigates to previous question', () => {
    const { result } = renderHook(() => useTestState(10));
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

  it('can go to specific question', () => {
    const { result } = renderHook(() => useTestState());
    act(() => {
      result.current.goToQuestion(5);
    });
    expect(result.current.currentQuestionIndex).toBe(5);
  });

  it('resets state', () => {
    const { result } = renderHook(() => useTestState());
    act(() => {
      result.current.setAnswer('q1', 1);
      result.current.nextQuestion();
      result.current.reset();
    });
    expect(result.current.answers).toEqual({});
    expect(result.current.currentQuestionIndex).toBe(0);
  });
});

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

    // Advance 150ms, then select another answer (simulating quick click)
    act(() => {
      vi.advanceTimersByTime(150);
    });

    act(() => {
      result.current.selectAnswerWithAutoAdvance('q1', 2, onTransition);
    });

    expect(result.current.answers.q1).toBe(2);

    // Advance another 150ms (total 300ms from first call, 150ms from second)
    // Old timer was cancelled, new timer hasn't fired yet
    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(onTransition).not.toHaveBeenCalled();

    // Advance another 150ms (total 450ms from first call, 300ms from second)
    // New timer should now fire
    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(onTransition).toHaveBeenCalledTimes(1);
    expect(result.current.currentQuestionIndex).toBe(1);

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
