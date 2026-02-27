import { motion } from 'framer-motion';
import { Question, Dimension, OptionValue } from '@/types';

interface QuestionGridProps {
  dimension: Dimension;
  questions: Question[];
  answers: Record<string, OptionValue>;
  onQuestionClick: (questionId: string, index: number) => void;
  currentQuestionId?: string;
}

const getStatusStyle = (answered: boolean, isCurrent: boolean): string => {
  if (isCurrent) return 'bg-current text-white ring-2 ring-offset-1 ring-current font-bold';
  if (answered) return 'bg-answered text-white';
  return 'bg-unanswered text-gray-500';
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.015,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
};

export default function QuestionGrid({
  dimension,
  questions,
  answers,
  onQuestionClick,
  currentQuestionId,
}: QuestionGridProps) {
  const dimensionQuestions = questions.filter(q => q.dimension === dimension);

  return (
    <motion.div
      className="grid grid-cols-9 gap-1.5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {dimensionQuestions.map((question) => {
        const isAnswered = answers[question.id] !== undefined;
        const isCurrent = question.id === currentQuestionId;
        const questionNumber = questions.indexOf(question) + 1;

        return (
          <motion.button
            key={question.id}
            variants={itemVariants}
            onClick={() => onQuestionClick(question.id, questions.indexOf(question))}
            className={`
              aspect-[3/2] rounded-lg text-sm font-medium
              transition-all duration-150
              ${getStatusStyle(isAnswered, isCurrent)}
              hover:opacity-80 hover:scale-105
              active:scale-95
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`Question ${questionNumber}: ${question.text}`}
          >
            {questionNumber}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
