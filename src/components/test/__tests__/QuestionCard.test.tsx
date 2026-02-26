import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import QuestionCard from '../QuestionCard';
import { Question } from '@/types';

const mockQuestion: Question = {
  id: 'test-001',
  dimension: 'EI',
  text: 'Test question',
  options: [
    { value: 2, text: 'Option 1' },
    { value: 1, text: 'Option 2' },
    { value: 0, text: 'Option 3' },
    { value: -1, text: 'Option 4' },
    { value: -2, text: 'Option 5' },
  ],
};

describe('QuestionCard', () => {
  it('renders question text', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        questionNumber={1}
        totalQuestions={10}
        onSelect={vi.fn()}
      />
    );
    expect(screen.getByText('Test question')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        questionNumber={1}
        totalQuestions={10}
        onSelect={vi.fn()}
      />
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 5')).toBeInTheDocument();
  });

  it('calls onSelect when option clicked', () => {
    const onSelect = vi.fn();
    render(
      <QuestionCard
        question={mockQuestion}
        questionNumber={1}
        totalQuestions={10}
        onSelect={onSelect}
      />
    );
    screen.getByText('Option 1').click();
    expect(onSelect).toHaveBeenCalledWith(2);
  });

  it('shows question number', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        questionNumber={5}
        totalQuestions={10}
        onSelect={vi.fn()}
      />
    );
    expect(screen.getByText('Question 5 of 10')).toBeInTheDocument();
  });
});
