import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DimensionScore } from '@/types';

interface DimensionChartProps {
  dimensions: DimensionScore[];
}

const dimensionLabels: Record<string, string> = {
  EI: 'E - I',
  SN: 'S - N',
  TF: 'T - F',
  JP: 'J - P',
};

const dimensionNames: Record<string, string> = {
  EI: '外向 - 内向',
  SN: '感觉 - 直觉',
  TF: '思考 - 情感',
  JP: '判断 - 知觉',
};

export default function DimensionChart({ dimensions }: DimensionChartProps) {
  const data = dimensions.map(d => ({
    dimension: dimensionLabels[d.dimension],
    name: dimensionNames[d.dimension],
    score: d.score,
    positive: d.score >= 0,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-semibold mb-4">维度分析</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" domain={[-100, 100]} />
          <YAxis type="category" dataKey="dimension" width={60} />
          <Tooltip
            formatter={(value: number) => [`${value > 0 ? '+' : ''}${value}`, '得分']}
            labelFormatter={(label) => {
              const item = data.find(d => d.dimension === label);
              return item?.name || label;
            }}
          />
          <Bar dataKey="score" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.positive ? '#7C3AED' : '#EC4899'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
