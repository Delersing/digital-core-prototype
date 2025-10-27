import React from 'react';

const FlowVisualizer = ({ transaction }) => {
  const getServiceIcon = (serviceName) => {
    const icons = {
      'Gateway': '🚪',
      'Шлюз': '🚪',
      'SSO': '🔐',
      'Сервис Единого Входа': '🔐',
      'MDM': '📊',
      'Управление Мастер-Данными': '📊',
      'Transaction': '💳',
      'Сервис Транзакций': '💳',
      'Loyalty': '🎁',
      'Движок Лояльности': '🎁',
      'ERP': '🏛️',
      'КШД': '🔄',
      'Корпоративная Шина Данных': '🔄',
      'КХД': '🗄️',
      'Корпоративное Хранилище Данных': '🗄️'
    };
    return icons[serviceName] || '⚙️';
  };

  const getServiceColor = (serviceName) => {
    if (serviceName === 'SSO') return 'text-purple-400';
    if (serviceName === 'MDM') return 'text-blue-400';
    if (serviceName === 'Transaction') return 'text-green-400';
    if (serviceName === 'Loyalty') return 'text-yellow-400';
    if (serviceName === 'ERP') return 'text-orange-400';
    return 'text-accent';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Transaction Header */}
      <div className="mb-6 p-4 glass-card rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-mono text-secondary">{transaction.id}</span>
          <span className={`text-xs px-2 py-1 rounded ${
            transaction.status === 'SUCCESS'
              ? 'bg-success/20 text-success'
              : 'bg-error/20 text-error'
          }`}>
            {transaction.status === 'SUCCESS' ? 'УСПЕШНО' : 'ОШИБКА'}
          </span>
        </div>
        <div className="text-sm text-primary">
          {transaction.type} • {transaction.items[0]?.product}
        </div>
        <div className="text-xs text-secondary">
          {transaction.user.name}
          {transaction.company && ` • ${transaction.company.name}`}
        </div>
        <div className="text-xs text-accent font-mono mt-1">
          Итого: {transaction.totalDuration}мс
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-purple-400 to-green-400"></div>

        <div className="space-y-4">
          {transaction.steps.map((step, idx) => (
            <div key={idx} className="relative flex items-center gap-4">
              {/* Timeline Node */}
              <div className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                step.service === 'SSO' ? 'border-purple-400 bg-purple-400/20' :
                step.service === 'MDM' ? 'border-blue-400 bg-blue-400/20' :
                step.service === 'Transaction' ? 'border-green-400 bg-green-400/20' :
                step.service === 'Loyalty' ? 'border-yellow-400 bg-yellow-400/20' :
                step.service === 'ERP' ? 'border-orange-400 bg-orange-400/20' :
                'border-accent bg-accent/20'
              }`}>
                <span className="text-lg">{getServiceIcon(step.service)}</span>
              </div>

              {/* Step Details */}
              <div className="flex-1 glass-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${getServiceColor(step.service)}`}>
                      {step.service}
                    </span>
                    <span className="text-xs text-secondary font-mono">
                      {step.duration}ms
                    </span>
                  </div>
                  <span className="text-success text-sm">✓</span>
                </div>

                {/* Step-specific information */}
                <div className="space-y-1 text-xs">
                  {step.context && (
                    <div className="text-purple-300">
                      Контекст: {step.context}
                    </div>
                  )}
                  {step.linkedAccount && (
                    <div className="text-cyan-300">
                      Обнаружен связанный аккаунт
                    </div>
                  )}
                  {step.priceApplied && (
                    <div className="text-green-300">
                      Применена цена: {step.priceApplied} BYN
                      {step.priceType && ` (${step.priceType})`}
                    </div>
                  )}
                  {step.pointsAwarded > 0 && (
                    <div className="text-yellow-300">
                      Начислено баллов: +{step.pointsAwarded}
                      {step.isCrossReward && ' (кросс-награда!)'}
                    </div>
                  )}
                  {step.action && (
                    <div className="text-orange-300">
                      Действие: {step.action}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Result */}
        <div className="mt-6 p-4 glass-card rounded-lg border border-success/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-success">✓</span>
            <span className="font-semibold text-success">Транзакция Завершена</span>
          </div>
          <div className="text-sm text-secondary">
            Общее время обработки: <span className="text-accent font-mono">{transaction.totalDuration}мс</span>
          </div>
          {transaction.isCtC && (
            <div className="mt-2 text-xs text-cyan-300">
              ⭐ С-К-К транзакция завершена успешно
            </div>
          )}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="glass-card p-3 text-center">
          <div className="text-lg font-bold text-accent">
            {transaction.steps.length}
          </div>
          <div className="text-xs text-secondary">Сервисов</div>
        </div>
        <div className="glass-card p-3 text-center">
          <div className="text-lg font-bold text-green-400">
            {transaction.totalDuration}мс
          </div>
          <div className="text-xs text-secondary">Общее Время</div>
        </div>
      </div>
    </div>
  );
};

export default FlowVisualizer;
