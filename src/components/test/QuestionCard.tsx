import { motion } from 'framer-motion';
import { Question, OptionValue } from '@/types';
import AnswerOptions from './AnswerOptions';

interface QuestionCardProps {
  question: Question;
  selectedValue?: OptionValue;
  onSelect: (value: OptionValue) => void;
  questionNumber: number;
  totalQuestions: number;
}

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95,
  }),
};

export default function QuestionCard({
  question,
  selectedValue,
  onSelect,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      }}
      custom={1}
    >
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="text-sm text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </span>
      </motion.div>

      <motion.h2
        className="text-2xl font-semibold mb-8 text-gray-800"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {question.text}
      </motion.h2>

      <AnswerOptions
        options={question.options}
        selectedValue={selectedValue}
        onSelect={onSelect}
      />
    </motion.div>
  );
}
