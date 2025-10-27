import React, { useState, useEffect } from 'react';
import SyncStatusBoard from './SyncStatusBoard';
import SyncEvents from './SyncEvents';

const DataSyncMonitor = ({ services }) => {
  const [syncEvents, setSyncEvents] = useState([]);

  // Generate sync events
  useEffect(() => {
    const generateSyncEvent = () => {
      const events = [
        'Цена продукта обновлена',
        'Добавлено новое корпоративное ценовое правило',
        'Инвентарь станции обновлен',
        'Создана новая С-К-К связь',
        'Профиль клиента синхронизирован',
        'Баллы лояльности пересчитаны'
      ];

      const targets = [
        'B2C Мобильное Приложение', 'B2B Веб-Платформа', 'Киоски на АЗС',
        'Унаследованная ERP', 'CRM Система', 'Система Биллинга'
      ];

      const event = events[Math.floor(Math.random() * events.length)];
      const target = targets[Math.floor(Math.random() * targets.length)];
      const timestamp = new Date().toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      return {
        id: Date.now(),
        timestamp,
        event,
        target,
        status: Math.random() > 0.1 ? 'success' : 'warning'
      };
    };

    const interval = setInterval(() => {
      setSyncEvents(prev => [generateSyncEvent(), ...prev.slice(0, 19)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[800px]">
      {/* Master Data Status */}
      <div className="lg:col-span-2 glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-accent">
            📊 УПРАВЛЕНИЕ МАСТЕР-ДАННЫМИ - СТАТУС СИНХРОНИЗАЦИИ
          </h2>
          <div className="flex items-center gap-2 text-sm text-secondary">
            <div className="status-indicator status-active"></div>
            <span>Живая Синхронизация</span>
          </div>
        </div>

        <SyncStatusBoard services={services} />
      </div>

      {/* Live Sync Events */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-accent">
            🔄 События Синхронизации
          </h2>
          <div className="text-xs text-secondary">
            {syncEvents.length} событий
          </div>
        </div>

        <SyncEvents events={syncEvents} />
      </div>
    </div>
  );
};

export default DataSyncMonitor;
