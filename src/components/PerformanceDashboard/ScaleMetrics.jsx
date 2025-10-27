import React from 'react';

const ScaleMetrics = () => {
  const totalUsers = 12470;
  const dailyActive = 3245;
  const concurrent = 1292;
  const transactionsToday = 18234;
  const volumeToday = 2.4;
  const totalRecords = 45.2;
  const storageUsed = 2.3;

  return (
    <div className="space-y-4">
      {/* User Metrics */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-secondary">Всего пользователей</span>
          <span className="text-sm font-bold text-accent font-mono">
            {totalUsers.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-secondary">Активных за день</span>
          <span className="text-sm font-bold text-purple-400 font-mono">
            {dailyActive.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-secondary">Одновременно</span>
          <span className="text-sm font-bold text-warning font-mono">
            {concurrent.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Transaction Metrics */}
      <div className="border-t border-white/10 pt-2 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-secondary">Транзакций</span>
          <span className="text-sm font-bold text-green-400 font-mono">
            {transactionsToday.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-secondary">Объем</span>
          <span className="text-sm font-bold text-accent font-mono">
            {volumeToday}M BYN
          </span>
        </div>
      </div>

      {/* Database Metrics */}
      <div className="border-t border-white/10 pt-2 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-secondary">Записей</span>
          <span className="text-sm font-bold text-cyan-400 font-mono">
            {totalRecords}M
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-secondary">Хранилище</span>
          <span className="text-sm font-bold text-secondary font-mono">
            {storageUsed}TB
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScaleMetrics;
