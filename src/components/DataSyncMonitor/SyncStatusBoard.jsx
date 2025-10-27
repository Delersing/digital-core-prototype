import React from 'react';
import ProgressBar from './ProgressBar';

const SyncStatusBoard = ({ services }) => {
  const syncEntities = [
    {
      name: 'Продукты и Цены',
      totalRecords: 1247,
      lastSync: '2 мин назад',
      progress: 89 + Math.random() * 10,
      targets: [
        { name: 'B2C Мобильное Приложение', synced: true, age: '2 мин назад' },
        { name: 'B2B Веб-Платформа', synced: true, age: '2 мин назад' },
        { name: 'Киоски на АЗС', synced: true, age: '3 мин назад' },
        { name: 'Унаследованная ERP', synced: true, age: '5 мин назад' },
        { name: '15 терминалов', synced: false, age: 'ожидает' }
      ]
    },
    {
      name: 'Данные Клиентов',
      totalRecords: 12470,
      lastSync: '45 сек назад',
      progress: 100,
      targets: [
        { name: 'B2C профили', synced: true, age: '45 сек назад' },
        { name: 'B2B компании', synced: true, age: '45 сек назад' },
        { name: 'С-К-К связи', synced: true, age: '45 сек назад' }
      ]
    },
    {
      name: 'Сеть Станций',
      totalRecords: 135,
      lastSync: '1 мин назад',
      progress: 100,
      targets: [
        { name: 'Онлайн станции', synced: true, age: '1 мин назад' },
        { name: 'Офлайн станции', synced: true, age: '1 мин назад' }
      ]
    },
    {
      name: 'Корпоративные Ценовые Правила',
      totalRecords: 89,
      lastSync: '2 часа назад',
      progress: 100,
      targets: [
        { name: 'Активные правила', synced: true, age: '2 часа назад' },
        { name: 'Покрытие компаний', synced: true, age: '2 часа назад' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {syncEntities.map((entity, idx) => (
        <div key={idx} className="space-y-3">
          {/* Entity Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-primary">{entity.name}</h3>
            <span className="text-sm text-secondary">{entity.lastSync}</span>
          </div>

          {/* Progress Bar */}
          <ProgressBar progress={entity.progress} />

          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-secondary">
              {entity.progress.toFixed(1)}% синхронизировано
            </span>
            <span className="text-accent font-mono">
              {entity.totalRecords.toLocaleString()} записей
            </span>
          </div>

          {/* Distribution Targets */}
          <div className="space-y-2">
            {entity.targets.map((target, targetIdx) => (
              <div key={targetIdx} className="flex items-center gap-3 text-sm">
                <span className={target.synced ? 'text-success' : 'text-warning'}>
                  {target.synced ? '✓' : '⚠'}
                </span>
                <span className="text-primary flex-1">{target.name}</span>
                <span className="text-secondary text-xs">
                  {target.synced ? `синхронизировано (${target.age})` : 'ожидает'}
                </span>
              </div>
            ))}
          </div>

          {idx < syncEntities.length - 1 && (
            <div className="border-b border-white/10"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SyncStatusBoard;
