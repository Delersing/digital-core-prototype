import React from 'react';

const ReliabilityGauge = () => {
  const uptime = 99.97;
  const successRate = 99.94;
  const errorRate = 0.06;

  return (
    <div className="space-y-4">
      {/* Uptime Gauge */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full border-4 border-success/30 relative mx-auto">
          <div
            className="absolute inset-0 rounded-full border-4 border-success transition-all duration-1000"
            style={{
              background: `conic-gradient(from 0deg, #10b981 0%, #10b981 ${uptime * 3.6}deg, transparent ${uptime * 3.6}deg)`
            }}
          />
          <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-success font-mono">
                {uptime}%
              </div>
              <div className="text-xs text-secondary">Время Работы</div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-secondary">Процент успеха</span>
          <span className="text-sm font-bold text-success font-mono">
            {successRate}%
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-secondary">Процент ошибок</span>
          <span className="text-sm font-bold text-error font-mono">
            {errorRate}%
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-secondary">Инциденты</span>
          <span className="text-sm font-bold text-accent font-mono">
            0 сегодня
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-secondary">MTTR</span>
          <span className="text-sm font-bold text-purple-400 font-mono">
            8 мин
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReliabilityGauge;
