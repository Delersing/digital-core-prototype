import React, { useState, useEffect } from 'react';
import './App.css';
import ArchitectureMap from './components/ArchitectureMap/ArchitectureMap';
import TransactionMonitor from './components/TransactionMonitor/TransactionMonitor';
import DataSyncMonitor from './components/DataSyncMonitor/DataSyncMonitor';
import PerformanceDashboard from './components/PerformanceDashboard/PerformanceDashboard';
import WhatIfSimulator from './components/WhatIfSimulator/WhatIfSimulator';
import { mockServices, updateServiceMetrics } from './data/mockServices';
import { generateMockTransaction, generateInitialTransactions } from './data/mockTransactions';

function App() {
  const [currentSection, setCurrentSection] = useState('architecture');
  const [services, setServices] = useState(mockServices);
  const [transactions, setTransactions] = useState(generateInitialTransactions(20));
  const [isSimulationPaused, setIsSimulationPaused] = useState(false);

  // Real-time simulation
  useEffect(() => {
    if (isSimulationPaused) return;

    const metricsInterval = setInterval(() => {
      setServices(prevServices =>
        prevServices.map(service => updateServiceMetrics(service))
      );
    }, 2000);

    const transactionInterval = setInterval(() => {
      const newTransaction = generateMockTransaction(Date.now());
      setTransactions(prev => [newTransaction, ...prev.slice(0, 49)]); // Keep last 50
    }, 3000);

    return () => {
      clearInterval(metricsInterval);
      clearInterval(transactionInterval);
    };
  }, [isSimulationPaused]);

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'architecture':
        return <ArchitectureMap services={services} setServices={setServices} />;
      case 'transactions':
        return <TransactionMonitor transactions={transactions} />;
      case 'sync':
        return <DataSyncMonitor services={services} />;
      case 'performance':
        return <PerformanceDashboard />;
      case 'simulator':
        return <WhatIfSimulator services={services} setServices={setServices} />;
      default:
        return <ArchitectureMap services={services} setServices={setServices} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-primary">
      {/* Header */}
      <header className="glass-card border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-accent">
              🏗️ Прототип Цифрового Ядра
            </h1>
            <div className="flex items-center gap-2">
              <div className="status-indicator status-active"></div>
              <span className="text-sm text-secondary">Живая Симуляция</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Simulation Controls */}
            <button
              onClick={() => setIsSimulationPaused(!isSimulationPaused)}
              className="px-3 py-1 bg-card/50 hover:bg-card border border-white/20 rounded text-sm transition-colors"
            >
              {isSimulationPaused ? '▶️ Продолжить' : '⏸️ Пауза'}
            </button>

            {/* Section Navigation */}
            <nav className="flex gap-2">
              {[
                { id: 'architecture', label: 'Архитектура', icon: '🏗️' },
                { id: 'transactions', label: 'Транзакции', icon: '📊' },
                { id: 'sync', label: 'Синхронизация', icon: '🔄' },
                { id: 'performance', label: 'Производительность', icon: '📈' },
                { id: 'simulator', label: 'Симулятор', icon: '🎮' }
              ].map(section => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentSection === section.id
                      ? 'bg-accent text-background'
                      : 'bg-card/30 hover:bg-card/50 text-secondary hover:text-primary'
                  }`}
                >
                  {section.icon} {section.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {renderCurrentSection()}
      </main>

      {/* Footer */}
      <footer className="glass-card border-t border-white/10 p-4 mt-6">
        <div className="flex items-center justify-between text-sm text-secondary">
          <div className="flex items-center gap-4">
            <span>Статус: Все Системы Работают</span>
            <span>•</span>
            <span>Время Работы: 99.97%</span>
            <span>•</span>
            <span>Последнее Обновление: {new Date().toLocaleTimeString('ru-RU')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>F для полноэкранного режима</span>
            <span>•</span>
            <span>Пробел для паузы</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
