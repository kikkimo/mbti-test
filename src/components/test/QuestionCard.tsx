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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <span className="text-sm text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </span>
      </div>

      <h2 className="text-2xl font-semibold mb-8 text-gray-800">
        {question.text}
      </h2>

      <AnswerOptions
        options={question.options}
        selectedValue={selectedValue}
        onSelect={onSelect}
      />
    </motion.div>
  );
}
