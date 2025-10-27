import React from 'react';

const ServiceBlock = ({ service, onClick, onUpdate, isHighlighted, isCore = false, className }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'border-green-400';
      case 'degraded':
        return 'border-yellow-400';
      case 'offline':
        return 'border-red-400';
      default:
        return 'border-slate-600';
    }
  };

  return (
    <div
      className={`
        service-block
        bg-slate-800/50 backdrop-blur-md
        border-2 rounded-lg p-4
        cursor-pointer hover:scale-105 transition-all
        ${getStatusColor(service.status)}
        ${isHighlighted ? 'ring-2 ring-cyan-400 animate-pulse' : ''}
        ${isCore ? 'ring-2 ring-purple-400 animate-pulse' : ''}
        min-h-[180px]
        flex flex-col
        ${className || ''}
      `}
      onClick={() => onClick(service)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl">{service.icon}</span>
        <div className={`
          w-3 h-3 rounded-full
          ${service.status === 'active' ? 'bg-green-400 animate-pulse' : ''}
          ${service.status === 'degraded' ? 'bg-yellow-400 animate-pulse' : ''}
          ${service.status === 'offline' ? 'bg-red-400' : ''}
        `} />
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-sm mb-3">
        {service.name}
      </h3>

      {/* Metrics */}
      <div className="space-y-1 flex-grow">
        {service.keyMetrics?.slice(0, 3).map((metric, idx) => (
          <div key={idx} className="text-xs">
            <span className="text-slate-400">{metric.label}:</span>
            <span className="text-cyan-400 ml-2 font-mono">
              {metric.value}
            </span>
          </div>
        ))}
      </div>

      {/* Core Badge */}
      {isCore && (
        <div className="mt-3 px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300 text-center">
          ⭐ Ключевой Сервис
        </div>
      )}
    </div>
  );
};

export default ServiceBlock;
