import React from 'react';

const TransactionCard = ({ transaction, onClick, isHighlighted }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case 'B2C':
        return 'border-l-accent';
      case 'B2B':
        return 'border-l-purple-400';
      default:
        return 'border-l-accent';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-success/20 text-success';
      case 'FAILED':
        return 'bg-error/20 text-error';
      case 'DEGRADED':
        return 'bg-warning/20 text-warning';
      default:
        return 'bg-secondary/20 text-secondary';
    }
  };

  return (
    <div
      className={`
        transaction-card border-l-4 cursor-pointer transition-all duration-200
        ${getTypeColor(transaction.type)}
        ${isHighlighted ? 'ring-2 ring-accent bg-card/70' : 'hover:bg-card/70'}
      `}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-secondary text-xs font-mono">
            {transaction.timestamp}
          </span>
          <span className="text-secondary">|</span>
          <span className="text-secondary text-xs font-mono">
            {transaction.id}
          </span>
          {transaction.isCtC && (
            <span className="ml-2 px-2 py-0.5 bg-purple-500/20 rounded text-xs text-purple-300 border border-purple-400/30">
              ⭐ С-К-К
            </span>
          )}
        </div>
        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(transaction.status)}`}>
          {transaction.status === 'SUCCESS' ? '✓' : '✗'} {transaction.status === 'SUCCESS' ? 'УСПЕШНО' : 'ОШИБКА'}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-1">
        <div className="text-sm text-primary">
          <span className="text-secondary">{transaction.type}</span>{' '}
          {transaction.items[0]?.product} × {transaction.items[0]?.quantity}
        </div>
        <div className="text-xs text-secondary">
          Пользователь: {transaction.user.name}
          {transaction.company && (
            <span className="ml-2">
              • Компания: {transaction.company.name}
            </span>
          )}
        </div>
        <div className="text-xs text-secondary">
          Сумма: <span className="text-accent font-mono font-semibold">
            {transaction.items[0]?.total?.toFixed(2)} BYN
          </span>
        </div>
      </div>

      {/* Processing Steps */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="space-y-1">
          {transaction.steps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs">
              <span className="text-success">✓</span>
              <span className="text-secondary w-16">{step.service}:</span>
              <span className="text-primary font-mono">{step.duration}мс</span>
              {step.context && (
                <span className="text-purple-300 text-xs ml-2">
                  (контекст: {step.context})
                </span>
              )}
              {step.linkedAccount && (
                <span className="text-cyan-300 text-xs ml-2">
                  (связанный аккаунт)
                </span>
              )}
              {step.isCrossReward && (
                <span className="text-cyan-300 text-xs ml-2">
                  (кросс-награда!)
                </span>
              )}
              {step.pointsAwarded > 0 && (
                <span className="text-yellow-400 text-xs ml-2">
                  (+{step.pointsAwarded} баллов)
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 text-xs text-secondary">
          Итого: <span className="text-success font-mono font-semibold">
            {transaction.totalDuration}мс
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
