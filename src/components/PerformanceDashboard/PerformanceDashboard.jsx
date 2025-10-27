import React from 'react';
import ThroughputChart from './ThroughputChart';
import LatencyHistogram from './LatencyHistogram';
import ReliabilityGauge from './ReliabilityGauge';
import ScaleMetrics from './ScaleMetrics';

const PerformanceDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-accent">
          📈 Здоровье Системы и Производительность
        </h2>
        <div className="flex items-center gap-2 text-sm text-secondary">
          <div className="status-indicator status-active"></div>
          <span>Все Системы Работают</span>
        </div>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Throughput */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-accent">📈 Пропускная Способность</h3>
          </div>
          <ThroughputChart />
        </div>

        {/* Latency */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-accent">⚡ Задержка</h3>
          </div>
          <LatencyHistogram />
        </div>

        {/* Reliability */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-accent">✓ Надежность</h3>
          </div>
          <ReliabilityGauge />
        </div>

        {/* Scale */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-accent">🚀 Масштаб</h3>
          </div>
          <ScaleMetrics />
        </div>
      </div>

      {/* Detailed Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Performance Breakdown */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-accent mb-4">
            Разбивка Производительности Сервисов
          </h3>
          <div className="space-y-4">
            {[
              { service: 'Сервис Единого Входа', latency: '8мс', requests: '456/мин', errors: '0.01%' },
              { service: 'Управление Мастер-Данными', latency: '5мс', requests: '234/мин', errors: '0.00%' },
              { service: 'Сервис Транзакций', latency: '48мс', requests: '189/мин', errors: '0.03%' },
              { service: 'Движок Лояльности', latency: '12мс', requests: '156/мин', errors: '0.02%' },
              { service: 'API Шлюз', latency: '15мс', requests: '1,247/мин', errors: '0.05%' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="font-medium text-primary">{item.service}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-accent font-mono">{item.latency}</div>
                    <div className="text-xs text-secondary">Задержка</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 font-mono">{item.requests}</div>
                    <div className="text-xs text-secondary">Запросы</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-mono">{item.errors}</div>
                    <div className="text-xs text-secondary">Ошибки</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-accent mb-4">
            Системные Уведомления и Тревоги
          </h3>
          <div className="space-y-3">
            {[
              { type: 'info', message: 'Плановое обслуживание завершено успешно', time: '2 часа назад' },
              { type: 'success', message: 'Все проверки здоровья проходят', time: '5 мин назад' },
              { type: 'warning', message: 'Высокое использование памяти в Сервисе Транзакций', time: '15 мин назад' },
              { type: 'info', message: 'Новые ценовые правила развернуты', time: '1 час назад' }
            ].map((alert, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'success' ? 'border-l-success bg-success/10' :
                  alert.type === 'warning' ? 'border-l-warning bg-warning/10' :
                  'border-l-accent bg-accent/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary">{alert.message}</span>
                  <span className="text-xs text-secondary">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
