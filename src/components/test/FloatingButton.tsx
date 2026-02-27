import { motion, AnimatePresence } from 'framer-motion';

interface FloatingButtonProps {
  skippedCount: number;
  allAnswered: boolean;
  onClick: () => void;
  className?: string;
}

const buttonVariants = {
  hidden: { scale: 0, opacity: 0, y: 50 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.2,
    },
  },
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

const shimmerVariants = {
  initial: { backgroundPosition: '-200% 0' },
  animate: {
    backgroundPosition: '200% 0',
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
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
        return 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white';
      case 'warning':
        return 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white';
      default:
        return 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white';
    }
  };

  // Get button text
  const getButtonText = () => {
    if (allAnswered) return '✓ Complete';
    return `${skippedCount} skipped`;
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={buttonVariants}
        >
          <motion.button
            onClick={onClick}
            className={`${getButtonStyles()} px-6 py-3 rounded-full shadow-lg font-medium flex items-center gap-2 transition-all relative overflow-hidden`}
            variants={state === 'warning' ? pulseVariants : undefined}
            animate={state === 'warning' ? 'pulsing' : 'resting'}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shimmer effect */}
            {state === 'warning' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                style={{ backgroundSize: '200% 100%' }}
              />
            )}

            <span className="text-sm sm:text-base relative z-10">{getButtonText()}</span>
            {state === 'warning' && (
              <motion.span
                className="relative z-10"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }}
              >
                ⚠
              </motion.span>
            )}
            {state === 'success' && (
              <motion.span
                className="relative z-10"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                ✓
              </motion.span>
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
