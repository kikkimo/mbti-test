import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dimension, OptionValue } from '@/types';
import QuestionGrid from './QuestionGrid';
import { Question } from '@/types';

interface QuestionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  answers: Record<string, OptionValue>;
  currentQuestionId?: string;
  onQuestionClick: (questionId: string, index: number) => void;
}

const dimensionTabs: { dimension: Dimension; label: string; subLabel: string }[] = [
  { dimension: 'EI', label: 'E-I', subLabel: '外向/内向' },
  { dimension: 'SN', label: 'S-N', subLabel: '感觉/直觉' },
  { dimension: 'TF', label: 'T-F', subLabel: '思考/情感' },
  { dimension: 'JP', label: 'J-P', subLabel: '判断/知觉' },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const drawerVariants = {
  hidden: {
    y: '100%',
    scale: 0.95,
    opacity: 0,
  },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 350,
      mass: 0.8,
    },
  },
  exit: {
    y: '100%',
    scale: 0.95,
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};

export default function QuestionsDrawer({
  isOpen,
  onClose,
  questions,
  answers,
  currentQuestionId,
  onQuestionClick,
}: QuestionsDrawerProps) {
  const [activeTab, setActiveTab] = useState<Dimension>('EI');

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleQuestionClick = (questionId: string, index: number) => {
    onQuestionClick(questionId, index);
    onClose();
  };

  const activeTabInfo = dimensionTabs.find(t => t.dimension === activeTab);
  const dimensionQuestions = questions.filter(q => q.dimension === activeTab);
  const answeredCount = dimensionQuestions.filter(q => answers[q.id] !== undefined).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleBackdropClick}
          />

          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Drag Handle */}
            <div className="flex justify-center py-3 cursor-pointer" onClick={onClose}>
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Dimension Tabs - Clear Labels */}
            <div className="flex border-b border-gray-200">
              {dimensionTabs.map(({ dimension, label, subLabel }) => {
                const isActive = activeTab === dimension;
                const dimQuestions = questions.filter(q => q.dimension === dimension);
                const dimAnswered = dimQuestions.filter(q => answers[q.id] !== undefined).length;
                return (
                  <button
                    key={dimension}
                    onClick={() => setActiveTab(dimension)}
                    className={`
                      flex-1 py-4 px-2 text-center transition-all
                      ${isActive
                        ? 'bg-primary text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }
                    `}
                  >
                    <div className="text-base font-bold">{label}</div>
                    <div className={`text-xs mt-1 ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                      {subLabel}
                    </div>
                    <div className={`text-xs mt-1 ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                      {dimAnswered}/{dimQuestions.length}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Section Title */}
            <div className="px-4 py-3 bg-orange-50 border-b border-orange-100">
              <h3 className="text-base font-bold text-text">
                {activeTabInfo?.label} {activeTabInfo?.subLabel}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {answeredCount}/{dimensionQuestions.length} answered • Click to jump
              </p>
            </div>

            {/* Question Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              <QuestionGrid
                dimension={activeTab}
                questions={questions}
                answers={answers}
                onQuestionClick={handleQuestionClick}
                currentQuestionId={currentQuestionId}
              />
            </div>

            {/* Status Legend */}
            <div className="border-t border-gray-200 p-3 bg-gray-50">
              <div className="flex justify-center gap-6 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-3 rounded bg-answered" />
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-3 rounded bg-unanswered" />
                  <span className="text-gray-600">Unanswered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-3 rounded bg-current ring-2 ring-current ring-offset-1" />
                  <span className="text-gray-600">Current</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="p-3 border-t border-gray-200">
              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
