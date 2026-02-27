import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AnimatedPage from '@/components/common/AnimatedPage';
import QuestionCard from '@/components/test/QuestionCard';
import ProgressBar from '@/components/test/ProgressBar';
import Button from '@/components/common/Button';
import FloatingButton from '@/components/test/FloatingButton';
import QuestionsDrawer from '@/components/test/QuestionsDrawer';
import { useTestState } from '@/hooks/useTestState';
import { useSkippedQuestions } from '@/hooks/useSkippedQuestions';
import { getAllQuestions } from '@/data/questions';

export default function Test() {
  const questions = getAllQuestions();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    answers,
    currentQuestionIndex,
    setAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
  } = useTestState(questions.length);

  const { skippedCount, allAnswered } = useSkippedQuestions(answers, questions.length);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedValue = answers[currentQuestion.id];

  const handleSelect = (value: number) => {
    setAnswer(currentQuestion.id, value as any);
    // Auto advance after short delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        nextQuestion();
      }
    }, 300);
  };

  const handleFinish = () => {
    // Store answers in session storage for result page
    sessionStorage.setItem('mbti-answers', JSON.stringify(answers));
    navigate('/result');
  };

  const canFinish = Object.keys(answers).length === questions.length;

  return (
    <AnimatedPage className="min-h-screen p-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <span className="text-gray-600">
              {Object.keys(answers).length} / {questions.length}
              {skippedCount > 0 && ` (${skippedCount} skipped)`}
            </span>
            {currentQuestionIndex === questions.length - 1 && canFinish ? (
              <Button size="sm" onClick={handleFinish}>
                Finish
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={nextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
              </Button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            selectedValue={selectedValue}
            onSelect={handleSelect}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        </AnimatePresence>

        <div className="mt-8 flex justify-center gap-2">
          {questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => goToQuestion(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentQuestionIndex
                  ? 'bg-primary scale-125'
                  : answers[q.id]
                  ? 'bg-secondary'
                  : 'bg-gray-300'
              }`}
              aria-label={`Question ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <FloatingButton
        skippedCount={skippedCount}
        allAnswered={allAnswered}
        onClick={() => setIsDrawerOpen(true)}
      />

      <QuestionsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        questions={questions}
        answers={answers}
        currentQuestionId={currentQuestion.id}
        onQuestionClick={(_questionId, index) => goToQuestion(index)}
      />
    </AnimatedPage>
  );
}
