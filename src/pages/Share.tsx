import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnimatedPage from '@/components/common/AnimatedPage';
import DimensionChart from '@/components/result/DimensionChart';
import FacetRadar from '@/components/result/FacetRadar';
import PersonalityReport from '@/components/result/PersonalityReport';
import CareerAdvice from '@/components/result/CareerAdvice';
import { TestResult } from '@/types';
import { getResult } from '@/api/get-result';

export default function Share() {
  const { shareId } = useParams<{ shareId: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadResult() {
      if (!shareId) {
        setError(true);
        setLoading(false);
        return;
      }

      const data = await getResult(shareId);
      if (data) {
        setResult(data);
      } else {
        setError(true);
      }
      setLoading(false);
    }

    loadResult();
  }, [shareId]);

  if (loading) {
    return (
      <AnimatedPage className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </AnimatedPage>
    );
  }

  if (error || !result) {
    return (
      <AnimatedPage className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-700 mb-4">链接无效或已过期</h1>
          <p className="text-gray-600 mb-8">该分享链接可能已过期或不存在</p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            返回首页
          </button>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="min-h-screen p-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <PersonalityReport type={result.type} />
        <DimensionChart dimensions={result.dimensions} />
        {result.facets.length > 0 && <FacetRadar facets={result.facets} />}
        <CareerAdvice type={result.type} />
      </div>
    </AnimatedPage>
  );
}
