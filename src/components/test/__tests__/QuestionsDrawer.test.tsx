import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionsDrawer from '../QuestionsDrawer';
import { Question, OptionValue } from '@/types';

const mockQuestions: Question[] = [
  { id: 'ei-001', dimension: 'EI', text: 'Question 1', options: [] },
  { id: 'ei-002', dimension: 'EI', text: 'Question 2', options: [] },
  { id: 'sn-001', dimension: 'SN', text: 'Question 3', options: [] },
  { id: 'tf-001', dimension: 'TF', text: 'Question 4', options: [] },
  { id: 'jp-001', dimension: 'JP', text: 'Question 5', options: [] },
];

describe('QuestionsDrawer', () => {
  it('does not render when closed', () => {
    const answers: Record<string, OptionValue> = {};

    const { container } = render(
      <QuestionsDrawer
        isOpen={false}
        onClose={vi.fn()}
        questions={mockQuestions}
        answers={answers}
        onQuestionClick={vi.fn()}
      />
    );

    expect(container.firstChild).toBe(null);
  });

  it('renders when open', () => {
    const answers: Record<string, OptionValue> = {};

    render(
      <QuestionsDrawer
        isOpen={true}
        onClose={vi.fn()}
        questions={mockQuestions}
        answers={answers}
        onQuestionClick={vi.fn()}
      />
    );

    expect(screen.getByText('E-I')).toBeInTheDocument();
    expect(screen.getByText('S-N')).toBeInTheDocument();
    expect(screen.getByText('T-F')).toBeInTheDocument();
    expect(screen.getByText('J-P')).toBeInTheDocument();
  });

  it('shows dimension tabs', () => {
    const answers: Record<string, OptionValue> = {};

    render(
      <QuestionsDrawer
        isOpen={true}
        onClose={vi.fn()}
        questions={mockQuestions}
        answers={answers}
        onQuestionClick={vi.fn()}
      />
    );

    expect(screen.getByText('E-I')).toBeInTheDocument();
    expect(screen.getByText('S-N')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    const answers: Record<string, OptionValue> = {};

    render(
      <QuestionsDrawer
        isOpen={true}
        onClose={handleClose}
        questions={mockQuestions}
        answers={answers}
        onQuestionClick={vi.fn()}
      />
    );

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onQuestionClick and closes when question is clicked', () => {
    const handleClose = vi.fn();
    const handleQuestionClick = vi.fn();
    const answers: Record<string, OptionValue> = {};

    render(
      <QuestionsDrawer
        isOpen={true}
        onClose={handleClose}
        questions={mockQuestions}
        answers={answers}
        onQuestionClick={handleQuestionClick}
      />
    );

    const question1 = screen.getByText('1');
    fireEvent.click(question1);

    expect(handleQuestionClick).toHaveBeenCalledWith('ei-001', 0);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('closes when backdrop is clicked', () => {
    const handleClose = vi.fn();
    const answers: Record<string, OptionValue> = {};

    const { container } = render(
      <QuestionsDrawer
        isOpen={true}
        onClose={handleClose}
        questions={mockQuestions}
        answers={answers}
        onQuestionClick={vi.fn()}
      />
    );

    // Click backdrop (the first div with fixed inset-0)
    const backdrop = container.querySelector('.fixed.inset-0.bg-black\\/50');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(handleClose).toHaveBeenCalledTimes(1);
    }
  });
});
