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
