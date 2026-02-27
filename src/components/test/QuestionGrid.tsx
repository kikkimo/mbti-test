import { motion } from 'framer-motion';
import { Question, Dimension, OptionValue } from '@/types';

interface QuestionGridProps {
  dimension: Dimension;
  questions: Question[];
  answers: Record<string, OptionValue>;
  onQuestionClick: (questionId: string, index: number) => void;
  currentQuestionId?: string;
}

const getStatusColor = (answered: boolean, isCurrent: boolean): string => {
  if (isCurrent) return 'bg-yellow-400 border-yellow-600 text-yellow-900';
  if (answered) return 'bg-green-100 border-green-300 text-green-700';
  return 'bg-red-100 border-red-300 text-red-700';
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0, opacity: 0, rotate: -10 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
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
      className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2"
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
              aspect-square rounded-lg border-2 font-medium text-sm
              transition-all duration-200
              ${getStatusColor(isAnswered, isCurrent)}
              hover:scale-110 hover:shadow-md
              active:scale-95
              ${isCurrent ? 'ring-2 ring-offset-2 ring-yellow-400' : ''}
            `}
            whileHover={{ scale: 1.1 }}
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
