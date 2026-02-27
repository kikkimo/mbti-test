import { motion } from 'framer-motion';
import { getPersonalityDescription } from '@/data/descriptions';

interface PersonalityReportProps {
  type: string;
}

export default function PersonalityReport({ type }: PersonalityReportProps) {
  const description = getPersonalityDescription(type);

  if (!description) return null;

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {type}
        </h2>
        <h3 className="text-2xl font-semibold text-gray-700">{description.name}</h3>
      </div>

      <p className="text-lg text-gray-600 mb-8 text-center leading-relaxed">
        {description.description}
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-green-600 mb-3">优势</h4>
          <ul className="space-y-2">
            {description.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-orange-600 mb-3">成长建议</h4>
          <ul className="space-y-2">
            {description.challenges.map((challenge, index) => (
              <li key={index} className="flex items-start">
                <span className="text-orange-500 mr-2">→</span>
                <span className="text-gray-700">{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
        <h4 className="text-lg font-semibold text-primary mb-3">个人成长建议</h4>
        <p className="text-gray-700 leading-relaxed">{description.advice}</p>
      </div>
    </motion.div>
  );
}
