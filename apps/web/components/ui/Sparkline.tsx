'use client';

import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  showTooltip?: boolean;
}

export default function Sparkline({
  data,
  color = '#FF5C00',
  height = 40,
  showTooltip = false,
}: SparklineProps) {
  const chartData = data.map((value, index) => ({ index, value }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData}>
        {showTooltip && (
          <Tooltip
            contentStyle={{
              background: '#1A1A1A',
              border: '1px solid rgba(250,250,250,0.1)',
              borderRadius: '4px',
              fontFamily: 'DM Mono, monospace',
              fontSize: '12px',
              color: '#FAFAFA',
            }}
            itemStyle={{ color: color }}
            cursor={{ stroke: 'rgba(250,250,250,0.1)' }}
          />
        )}
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive
          animationDuration={800}
          animationEasing="ease-out"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}