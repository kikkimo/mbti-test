import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FloatingButton from '../FloatingButton';

describe('FloatingButton', () => {
  it('shows when questions are skipped', () => {
    render(
      <FloatingButton
        skippedCount={5}
        allAnswered={false}
        onClick={vi.fn()}
      />
    );
    expect(screen.getByText('5 skipped')).toBeInTheDocument();
  });

  it('hides when no questions are skipped', () => {
    const { container } = render(
      <FloatingButton
        skippedCount={0}
        allAnswered={false}
        onClick={vi.fn()}
      />
    );
    // Button should not be in the document when hidden
    expect(screen.queryByText('0 skipped')).not.toBeInTheDocument();
    expect(container.firstChild).toBe(null);
  });

  it('shows success state when all answered', () => {
    render(
      <FloatingButton
        skippedCount={0}
        allAnswered={true}
        onClick={vi.fn()}
      />
    );
    expect(screen.getByText('✓ Complete')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(
      <FloatingButton
        skippedCount={3}
        allAnswered={false}
        onClick={handleClick}
      />
    );

    const button = screen.getByText('3 skipped');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows warning icon when questions are skipped', () => {
    const { container } = render(
      <FloatingButton
        skippedCount={10}
        allAnswered={false}
        onClick={vi.fn()}
      />
    );
    // Warning icon should be present
    expect(container.textContent).toContain('⚠');
  });

  it('does not show warning icon when all answered', () => {
    const { container } = render(
      <FloatingButton
        skippedCount={0}
        allAnswered={true}
        onClick={vi.fn()}
      />
    );
    // No warning icon in success state
    expect(container.textContent).not.toContain('⚠');
  });
});
