import React from 'react';

const SidePanel = ({ service, onClose, onUpdate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'degraded':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return '●';
      case 'degraded':
        return '●';
      case 'error':
        return '●';
      default:
        return '●';
    }
  };

  return (
    <div className="absolute top-0 right-0 w-96 h-full glass-card border-l border-white/10 p-6 overflow-y-auto z-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{service.icon}</span>
          <div>
            <h2 className="text-xl font-bold text-primary">{service.name}</h2>
            <div className="flex items-center gap-2">
              <span className={getStatusColor(service.status)}>
                {getStatusIcon(service.status)}
              </span>
              <span className={`text-sm capitalize ${getStatusColor(service.status)}`}>
                {service.status}
              </span>
              {service.isCore && (
                <span className="px-2 py-0.5 bg-purple-500/20 rounded text-xs text-purple-300 border border-purple-400/30">
                  ⭐ Core Service
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-secondary hover:text-primary text-xl"
        >
          ✕
        </button>
      </div>

      {/* Current Metrics */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-accent mb-3">Текущие Метрики</h3>
        <div className="space-y-2">
          {service.keyMetrics.map((metric, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-secondary text-sm">{metric.label}</span>
              <span className="metric-value text-sm">{metric.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Functions */}
      {service.functions && service.functions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-accent mb-3">Функции</h3>
          <div className="flex flex-wrap gap-2">
            {service.functions.map((func, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-card/50 border border-white/10 rounded-full text-xs text-secondary"
              >
                {func}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Health Checks */}
      {service.healthChecks && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-accent mb-3">Проверки Здоровья</h3>
          <div className="space-y-2">
            {Object.entries(service.healthChecks).map(([check, status]) => (
              <div key={check} className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-secondary text-sm capitalize">
                  {check.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className={`text-sm ${status.includes('OK') ? 'text-success' : 'text-error'}`}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-accent mb-3">Последняя Активность</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {Array.from({ length: 5 }, (_, i) => {
            const time = new Date(Date.now() - i * 60000).toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            });

            const activities = [
              'Запрос аутентификации обработан',
              'Синхронизация данных завершена',
              'Проверка здоровья пройдена',
              'Конфигурация обновлена',
              'Маршрутизация балансировщика нагрузки настроена'
            ];

            return (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="text-success">✓</span>
                <span className="text-secondary">{time}</span>
                <span className="text-primary">
                  {activities[i % activities.length]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Graph Placeholder */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-accent mb-3">Производительность (24ч)</h3>
        <div className="h-32 bg-card/20 rounded-lg flex items-end justify-between p-2">
          {Array.from({ length: 24 }, (_, i) => (
            <div
              key={i}
              className="bg-gradient-to-t from-accent to-accent/60 rounded-sm flex-1 mx-0.5"
              style={{
                height: `${20 + Math.random() * 80}%`,
                minWidth: '2px'
              }}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-secondary mt-1">
          <span>00:00</span>
          <span>12:00</span>
          <span>23:59</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button className="w-full py-2 bg-accent text-background rounded-lg font-medium hover:bg-accent/90 transition-colors">
          Посмотреть Подробные Логи
        </button>
        <button className="w-full py-2 bg-card/50 border border-white/20 text-primary rounded-lg font-medium hover:bg-card/70 transition-colors">
          Перезапустить Сервис
        </button>
        <button className="w-full py-2 bg-card/50 border border-white/20 text-primary rounded-lg font-medium hover:bg-card/70 transition-colors">
          Обновить Конфигурацию
        </button>
      </div>
    </div>
  );
};

export default SidePanel;
