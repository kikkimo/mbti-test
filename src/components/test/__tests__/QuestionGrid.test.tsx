import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionGrid from '../QuestionGrid';
import { Question, Dimension, OptionValue } from '@/types';

const mockQuestions: Question[] = [
  { id: 'ei-001', dimension: 'EI', text: 'Question 1', options: [] },
  { id: 'ei-002', dimension: 'EI', text: 'Question 2', options: [] },
  { id: 'sn-001', dimension: 'SN', text: 'Question 3', options: [] },
];

describe('QuestionGrid', () => {
  it('renders only questions for the specified dimension', () => {
    const answers: Record<string, OptionValue> = {};
    render(
      <QuestionGrid
        dimension="EI"
        questions={mockQuestions}
        answers={answers}
        onQuestionClick={vi.fn()}
      />
    );

    // Should only show EI questions
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.queryByText('3')).not.toBeInTheDocument();
  });

  it('calls onQuestionClick when a question is clicked', () => {
    const handleClick = vi.fn();
    const answers: Record<string, OptionValue> = {};

    render(
      <QuestionGrid
        dimension="EI"
        questions={mockQuestions}
        answers={answers}
        onQuestionClick={handleClick}
      />
    );

    fireEvent.click(screen.getByText('1'));
    expect(handleClick).toHaveBeenCalledWith('ei-001', 0);
  });

  it('shows answered questions in green', () => {
    const answers: Record<string, OptionValue> = { 'ei-001': 1 };

    const { container } = render(
      <QuestionGrid
        dimension="EI"
        questions={mockQuestions}
        answers={answers}
        onQuestionClick={vi.fn()}
      />
    );

    const button1 = screen.getByText('1').closest('button');
    expect(button1).toHaveClass('bg-green-100');
  });

  it('shows unanswered questions in red', () => {
    const answers: Record<string, OptionValue> = {};

    const { container } = render(
      <QuestionGrid
        dimension="EI"
        questions={mockQuestions}
        answers={answers}
        onQuestionClick={vi.fn()}
      />
    );

    const button1 = screen.getByText('1').closest('button');
    expect(button1).toHaveClass('bg-red-100');
  });

  it('highlights current question in yellow', () => {
    const answers: Record<string, OptionValue> = {};

    render(
      <QuestionGrid
        dimension="EI"
        questions={mockQuestions}
        answers={answers}
        onQuestionClick={vi.fn()}
        currentQuestionId="ei-001"
      />
    );

    const button1 = screen.getByText('1').closest('button');
    expect(button1).toHaveClass('bg-yellow-400');
  });
});
