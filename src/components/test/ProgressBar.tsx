import { motion } from 'framer-motion';

interface ProgressBarProps {
  answeredCount: number;
  total: number;
}

export default function ProgressBar({ answeredCount, total }: ProgressBarProps) {
  const percentage = (answeredCount / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-text">
          Progress
        </span>
        <motion.span
          className="text-sm font-bold text-primary"
          key={answeredCount}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {answeredCount} / {total}
        </motion.span>
      </div>
      <div className="w-full h-3 bg-unanswered rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
