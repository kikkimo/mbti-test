import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedPage from '@/components/common/AnimatedPage';
import Button from '@/components/common/Button';

export default function Home() {
  return (
    <AnimatedPage className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            MBTI 人格测试
          </h1>
          <p className="text-xl text-gray-600">
            探索你的性格类型，了解真实的自己
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">关于测试</h2>
          <div className="text-left space-y-3 text-gray-600">
            <p>✓ 完整版 MBTI Step II 测试（144 题）</p>
            <p>✓ 详细的四维度分析</p>
            <p>✓ 22 个刻面深度解析</p>
            <p>✓ 个性化成长建议</p>
            <p>✓ 职业发展指导</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/test">
            <Button size="lg">开始测试</Button>
          </Link>
        </motion.div>
      </div>
    </AnimatedPage>
  );
}
