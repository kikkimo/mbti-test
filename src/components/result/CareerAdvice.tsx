import { motion } from 'framer-motion';
import { getCareerRecommendations } from '@/data/descriptions';

interface CareerAdviceProps {
  type: string;
}

export default function CareerAdvice({ type }: CareerAdviceProps) {
  const careers = getCareerRecommendations(type);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="text-xl font-semibold mb-6">适合的职业方向</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {careers.map((career, index) => (
          <motion.div
            key={index}
            className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.05 }}
          >
            <span className="text-gray-700 font-medium">{career}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
