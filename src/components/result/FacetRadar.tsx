import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { FacetScore } from '@/types';

interface FacetRadarProps {
  facets: FacetScore[];
}

// Chinese labels for facets
const facetLabels: Record<string, string> = {
  // E/I facets
  initiating: '主动性',
  receptive: '接纳度',
  expressive: '表达力',
  gregarious: '群居性',
  intimate: '亲密度',
  // S/N facets
  concrete: '具体性',
  realistic: '现实性',
  traditional: '传统性',
  experiential: '经验性',
  practical: '实用性',
  present: '当下性',
  // T/F facets
  logical: '逻辑性',
  reasonable: '理性度',
  candid: '坦诚度',
  authentic: '真实性',
  questioning: '质疑性',
  critical: '批判性',
  // J/P facets
  systematic: '系统性',
  planned: '计划性',
  organized: '有序性',
  methodical: '条理性',
  decisive: '果断性',
  closure: '定论性',
};

export default function FacetRadar({ facets }: FacetRadarProps) {
  const data = facets.map(f => ({
    facet: facetLabels[f.facet] || f.facet,
    score: Math.abs(f.score),
  }));

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-semibold mb-4">刻面分析</h3>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid stroke="#e0e0e0" />
          <PolarAngleAxis dataKey="facet" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
          <Radar
            name="得分"
            dataKey="score"
            stroke="#7C3AED"
            fill="#7C3AED"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
