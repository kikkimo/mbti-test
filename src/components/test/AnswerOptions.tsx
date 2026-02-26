import { motion } from 'framer-motion';
import { OptionValue } from '@/types';

interface AnswerOptionsProps {
  options: { value: OptionValue; text: string }[];
  selectedValue?: OptionValue;
  onSelect: (value: OptionValue) => void;
}

export default function AnswerOptions({ options, selectedValue, onSelect }: AnswerOptionsProps) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <motion.button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={`w-full p-4 rounded-xl text-left transition-all ${
            selectedValue === option.value
              ? 'bg-primary text-white shadow-lg'
              : 'bg-white hover:bg-gray-50 border-2 border-gray-200'
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: selectedValue === option.value ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-medium">{option.text}</span>
        </motion.button>
      ))}
    </div>
  );
}
