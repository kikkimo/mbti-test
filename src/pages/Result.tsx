import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '@/components/common/AnimatedPage';
import DimensionChart from '@/components/result/DimensionChart';
import FacetRadar from '@/components/result/FacetRadar';
import PersonalityReport from '@/components/result/PersonalityReport';
import CareerAdvice from '@/components/result/CareerAdvice';
import ShareCard from '@/components/result/ShareCard';
import { calculateScores, determineType } from '@/lib/calculator';
import { exportToPDF, exportToImage } from '@/lib/pdf-export';
import { saveResult } from '@/api/save-result';
import { Answer, TestResult } from '@/types';

export default function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState<TestResult | null>(null);
  const [shareId, setShareId] = useState<string>('');

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

    const testResult: TestResult = {
      id: Date.now().toString(),
      type,
      ...scores,
      createdAt: new Date().toISOString(),
    };

    setResult(testResult);

    // Generate share ID and save to server
    const newShareId = btoa(testResult.id).substring(0, 8);
    setShareId(newShareId);
    saveResult(testResult);
  }, [navigate]);

  const handleExportPDF = async () => {
    try {
      await exportToPDF('result-container');
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('导出 PDF 失败，请重试');
    }
  };

  const handleExportImage = async () => {
    try {
      await exportToImage('result-container');
    } catch (error) {
      console.error('Image export failed:', error);
      alert('导出图片失败，请重试');
    }
  };

  if (!result) {
    return (
      <AnimatedPage className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </AnimatedPage>
    );
  }

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
