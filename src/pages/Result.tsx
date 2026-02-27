import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '@/components/common/AnimatedPage';
import DimensionChart from '@/components/result/DimensionChart';
import FacetRadar from '@/components/result/FacetRadar';
import PersonalityReport from '@/components/result/PersonalityReport';
import CareerAdvice from '@/components/result/CareerAdvice';
import ShareCard from '@/components/result/ShareCard';
import { calculateScores, determineType } from '@/lib/calculator';
import { Answer, TestResult } from '@/types';

export default function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    const answersJson = sessionStorage.getItem('mbti-answers');
    if (!answersJson) {
      navigate('/');
      return;
    }

    const answers: Answer[] = Object.entries(JSON.parse(answersJson)).map(([questionId, value]) => ({
      questionId,
      value: value as any,
    }));

    const scores = calculateScores(answers);
    const type = determineType(scores.dimensions);

    setResult({
      id: Date.now().toString(),
      type,
      ...scores,
      createdAt: new Date().toISOString(),
    });
  }, [navigate]);

  const handleExportPDF = async () => {
    alert('PDF export feature coming soon!');
  };

  const handleExportImage = async () => {
    alert('Image export feature coming soon!');
  };

  if (!result) {
    return (
      <AnimatedPage className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </AnimatedPage>
    );
  }

  const shareId = btoa(result.id).substring(0, 8);

  return (
    <AnimatedPage className="min-h-screen p-6 py-12" id="result-container">
      <div className="max-w-4xl mx-auto space-y-8">
        <PersonalityReport type={result.type} />
        <DimensionChart dimensions={result.dimensions} />
        {result.facets.length > 0 && <FacetRadar facets={result.facets} />}
        <CareerAdvice type={result.type} />
        <ShareCard
          shareId={shareId}
          onExportPDF={handleExportPDF}
          onExportImage={handleExportImage}
        />
      </div>
    </AnimatedPage>
  );
}
