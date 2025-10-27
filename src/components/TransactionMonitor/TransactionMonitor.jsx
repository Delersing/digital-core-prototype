import React, { useState } from 'react';
import TransactionCard from './TransactionCard';
import FlowVisualizer from './FlowVisualizer';

const TransactionMonitor = ({ transactions }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[800px]">
      {/* Transaction Stream */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-accent">
            🔴 ПОТОК ТРАНЗАКЦИЙ В РЕАЛЬНОМ ВРЕМЕНИ
          </h2>
          <div className="flex items-center gap-2 text-sm text-secondary">
            <div className="status-indicator status-active"></div>
            <span>Реальное время</span>
          </div>
        </div>

        <div className="space-y-3 max-h-[650px] overflow-y-auto">
          {transactions.map((transaction, idx) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onClick={() => setSelectedTransaction(transaction)}
              isHighlighted={selectedTransaction?.id === transaction.id}
            />
          ))}
        </div>

        {/* Stream Stats */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-accent">
                {transactions.filter(t => t.type === 'B2C').length}
              </div>
              <div className="text-xs text-secondary">B2C Сегодня</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-400">
                {transactions.filter(t => t.type === 'B2B').length}
              </div>
              <div className="text-xs text-secondary">B2B Сегодня</div>
            </div>
            <div>
              <div className="text-lg font-bold text-cyan-400">
                {transactions.filter(t => t.isCtC).length}
              </div>
              <div className="text-xs text-secondary">С-К-К Сегодня</div>
            </div>
          </div>
        </div>
      </div>

      {/* Flow Visualizer */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-accent">
            📊 ВИЗУАЛИЗАТОР ПОТОКА
          </h2>
          {selectedTransaction && (
            <button
              onClick={() => setSelectedTransaction(null)}
              className="text-secondary hover:text-primary text-sm"
            >
              Очистить
            </button>
          )}
        </div>

        {selectedTransaction ? (
          <FlowVisualizer transaction={selectedTransaction} />
        ) : (
          <div className="h-[650px] flex items-center justify-center text-secondary">
            <div className="text-center">
              <div className="text-4xl mb-4">👆</div>
              <div className="text-lg mb-2">Выберите Транзакцию</div>
              <div className="text-sm">Нажмите на любую транзакцию чтобы увидеть её путь через систему</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionMonitor;
