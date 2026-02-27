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

const dimensionTabs: { dimension: Dimension; label: string; color: string }[] = [
  { dimension: 'EI', label: 'E - I', color: 'bg-purple-500' },
  { dimension: 'SN', label: 'S - N', color: 'bg-pink-500' },
  { dimension: 'TF', label: 'T - F', color: 'bg-blue-500' },
  { dimension: 'JP', label: 'J - P', color: 'bg-green-500' },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
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
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Drag Handle */}
            <div className="flex justify-center py-3 cursor-pointer" onClick={onClose}>
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Dimension Tabs */}
            <div className="flex border-b overflow-x-auto">
              {dimensionTabs.map(({ dimension, label, color }) => {
                const isActive = activeTab === dimension;
                return (
                  <button
                    key={dimension}
                    onClick={() => setActiveTab(dimension)}
                    className={`
                      flex-1 min-w-[80px] py-3 px-4 text-center font-medium transition-all
                      ${isActive ? `${color} text-white` : 'text-gray-600 hover:bg-gray-100'}
                    `}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Question Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {dimensionTabs.find(t => t.dimension === activeTab)?.label} Questions
                </h3>
                <p className="text-sm text-gray-500">
                  Click a question number to jump to it
                </p>
              </div>

              <QuestionGrid
                dimension={activeTab}
                questions={questions}
                answers={answers}
                onQuestionClick={handleQuestionClick}
                currentQuestionId={currentQuestionId}
              />
            </div>

            {/* Status Legend */}
            <div className="border-t p-4 bg-gray-50">
              <div className="flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-300" />
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-100 border-2 border-red-300" />
                  <span className="text-gray-600">Skipped</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-400 border-2 border-yellow-600" />
                  <span className="text-gray-600">Current</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="p-4 border-t">
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
