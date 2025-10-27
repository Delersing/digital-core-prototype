import React from 'react';

const LatencyHistogram = () => {
  const data = [
    { range: '0-20ms', count: 3245, percentage: 35 },
    { range: '20-50ms', count: 4123, percentage: 45 },
    { range: '50-100ms', count: 1456, percentage: 15 },
    { range: '100-200ms', count: 423, percentage: 4 },
    { range: '200ms+', count: 89, percentage: 1 }
  ];

  const avgResponse = 45;
  const p95 = 120;
  const p99 = 240;

  return (
    <div className="space-y-4">
      {/* Current Metrics */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-secondary">Средний ответ</span>
          <span className="text-sm font-bold text-accent font-mono">{avgResponse}мс</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-secondary">P95</span>
          <span className="text-sm font-bold text-purple-400 font-mono">{p95}мс</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-secondary">P99</span>
          <span className="text-sm font-bold text-warning font-mono">{p99}мс</span>
        </div>
      </div>

      {/* Histogram */}
      <div className="space-y-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-16 text-xs text-secondary font-mono">
              {item.range}
            </div>
            <div className="flex-1 bg-card/50 rounded-full h-2">
              <div
                className="h-full bg-gradient-to-r from-accent to-accent rounded-full transition-all duration-500"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <div className="w-12 text-xs text-right font-mono text-accent">
              {item.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatencyHistogram;
