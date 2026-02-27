import { motion, AnimatePresence } from 'framer-motion';

interface FloatingButtonProps {
  skippedCount: number;
  allAnswered: boolean;
  onClick: () => void;
  className?: string;
}

const buttonVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
};

const pulseVariants = {
  resting: { scale: 1 },
  pulsing: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function FloatingButton({
  skippedCount,
  allAnswered,
  onClick,
  className = '',
}: FloatingButtonProps) {
  // Hide button when no questions are skipped and not all answered
  const isVisible = skippedCount > 0 || allAnswered;

  // Determine button state
  const getButtonState = () => {
    if (allAnswered) return 'success';
    if (skippedCount > 0) return 'warning';
    return 'hidden';
  };

  const state = getButtonState();

  // Get button styles based on state
  const getButtonStyles = () => {
    switch (state) {
      case 'success':
        return 'bg-green-500 hover:bg-green-600 text-white';
      case 'warning':
        return 'bg-orange-500 hover:bg-orange-600 text-white';
      default:
        return 'bg-primary hover:bg-primary/90 text-white';
    }
  };

  // Get button text
  const getButtonText = () => {
    if (allAnswered) return '✓ Complete';
    return `${skippedCount} skipped`;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={buttonVariants}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <motion.button
            onClick={onClick}
            className={`${getButtonStyles()} px-6 py-3 rounded-full shadow-lg font-medium flex items-center gap-2 transition-colors`}
            variants={state === 'warning' ? pulseVariants : undefined}
            animate={state === 'warning' ? 'pulsing' : 'resting'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm sm:text-base">{getButtonText()}</span>
            {state === 'warning' && (
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
              >
                ⚠
              </motion.span>
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
