import React from 'react';

const ThroughputChart = () => {
  // Generate sample throughput data
  const data = Array.from({ length: 24 }, (_, i) => {
    let baseValue;
    if (i >= 0 && i < 6) baseValue = 50 + Math.random() * 30;
    else if (i >= 6 && i < 10) baseValue = 300 + Math.random() * 200;
    else if (i >= 10 && i < 17) baseValue = 400 + Math.random() * 150;
    else if (i >= 17 && i < 21) baseValue = 500 + Math.random() * 300;
    else baseValue = 150 + Math.random() * 100;

    return Math.floor(baseValue);
  });

  const maxValue = Math.max(...data);
  const currentValue = data[data.length - 1];

  return (
    <div className="space-y-4">
      {/* Current Value */}
      <div className="text-center">
        <div className="text-2xl font-bold text-accent font-mono">
          {currentValue}
        </div>
        <div className="text-xs text-secondary">Запросов/сек</div>
      </div>

      {/* Mini Chart */}
      <div className="h-20 flex items-end justify-between gap-1">
        {data.map((value, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-t from-accent to-accent/60 rounded-sm flex-1 transition-all duration-300"
            style={{
              height: `${(value / maxValue) * 100}%`,
              minWidth: '2px'
            }}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 text-center">
        <div>
          <div className="text-sm font-bold text-purple-400 font-mono">
            {Math.max(...data)}
          </div>
          <div className="text-xs text-secondary">Пик</div>
        </div>
        <div>
          <div className="text-sm font-bold text-accent font-mono">
            {Math.round(data.reduce((a, b) => a + b, 0) / data.length)}
          </div>
          <div className="text-xs text-secondary">Среднее</div>
        </div>
      </div>
    </div>
  );
};

export default ThroughputChart;
