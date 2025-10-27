import React, { useState } from 'react';

const WhatIfSimulator = ({ services, setServices }) => {
  const [selectedScenario, setSelectedScenario] = useState('normal');
  const [isRunning, setIsRunning] = useState(false);
  const [simulationEvents, setSimulationEvents] = useState([]);

  const scenarios = [
    {
      id: 'normal',
      name: '✅ Нормальная Работа',
      description: 'Все системы работают оптимально',
      icon: '🟢'
    },
    {
      id: 'mdm-down',
      name: '⚠️ MDM Сервис Недоступен',
      description: 'Сервис управления мастер-данными недоступен',
      icon: '🔴'
    },
    {
      id: 'sso-down',
      name: '⚠️ SSO Сервис Недоступен',
      description: 'Сервис единого входа недоступен',
      icon: '🔴'
    },
    {
      id: 'legacy-down',
      name: '⚠️ Унаследованная ERP Недоступна',
      description: 'Подключение к унаследованным системам потеряно',
      icon: '🟡'
    },
    {
      id: 'high-load',
      name: '🔥 Высокая Нагрузка (10x трафика)',
      description: 'Система под экстремальной нагрузкой',
      icon: '🔥'
    }
  ];

  const runSimulation = (scenarioId) => {
    setIsRunning(true);
    setSimulationEvents([]);

    const events = [];
    const timestamp = new Date().toLocaleTimeString();

    switch (scenarioId) {
      case 'mdm-down':
        events.push({
          time: timestamp,
          type: 'alert',
          message: '🚨 ТРЕВОГА: MDM Сервис Недоступен',
          details: 'Воздействие: Среднее - Транзакции используют кешированные цены (2ч давности)'
        });
        events.push({
          time: timestamp,
          type: 'info',
          message: 'Активирован резерв: Используются кешированные данные цен',
          details: 'Новые продукты недоступны, обновления цен задержаны'
        });
        events.push({
          time: timestamp,
          type: 'success',
          message: 'Запущен переход на резервный MDM сервер',
          details: 'Ожидаемое время: 2 минуты'
        });

        // Update service status
        setServices(prev => prev.map(service =>
          service.id === 'mdm' ? { ...service, status: 'error' } : service
        ));
        break;

      case 'sso-down':
        events.push({
          time: timestamp,
          type: 'alert',
          message: '🚨 КРИТИЧНО: SSO Сервис Недоступен',
          details: 'Воздействие: Высокое - Все запросы аутентификации проваливаются'
        });
        events.push({
          time: timestamp,
          type: 'warning',
          message: 'Сессии пользователей истекают, новые логины заблокированы',
          details: 'Переключение контекста недоступно, С-К-К функции отключены'
        });
        events.push({
          time: timestamp,
          type: 'info',
          message: 'Активирован аварийный обход аутентификации',
          details: 'Ограниченная функциональность доступна для критических операций'
        });

        setServices(prev => prev.map(service =>
          service.id === 'sso' ? { ...service, status: 'error' } : service
        ));
        break;

      case 'legacy-down':
        events.push({
          time: timestamp,
          type: 'warning',
          message: '⚠️ Подключение к Унаследованной ERP Потеряно',
          details: 'Воздействие: Низкое - Синхронизация корпоративных данных B2B задержана'
        });
        events.push({
          time: timestamp,
          type: 'info',
          message: 'Корпоративные транзакции поставлены в очередь для последующей синхронизации',
          details: 'B2C транзакции не затронуты, личные награды С-К-К продолжают работать'
        });

        setServices(prev => prev.map(service =>
          service.id === 'legacy-systems' ? { ...service, status: 'degraded' } : service
        ));
        break;

      case 'high-load':
        events.push({
          time: timestamp,
          type: 'warning',
          message: '🔥 Обнаружена Высокая Нагрузка (10x от нормального трафика)',
          details: 'Воздействие: Среднее - Увеличено время ответа'
        });
        events.push({
          time: timestamp,
          type: 'info',
          message: 'Автомасштабирование активировано',
          details: 'Развернуты дополнительные инстансы API Шлюза'
        });
        events.push({
          time: timestamp,
          type: 'info',
          message: 'Балансировка нагрузки оптимизирована',
          details: 'Трафик распределен по всем доступным узлам'
        });
        break;
    }

    setSimulationEvents(events);

    // Reset after 10 seconds
    setTimeout(() => {
      setIsRunning(false);
      setServices(prev => prev.map(service => ({ ...service, status: 'active' })));
      setSimulationEvents(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        type: 'success',
        message: '✅ Симуляция Завершена - Системы Восстановлены',
        details: 'Все сервисы вернулись к нормальной работе'
      }]);
    }, 10000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-accent">
          🎮 Симулятор "Что Если"
        </h2>
        <div className="flex items-center gap-2 text-sm text-secondary">
          <div className={`status-indicator ${isRunning ? 'status-warning' : 'status-active'}`}></div>
          <span>{isRunning ? 'Симуляция Запущена' : 'Готов'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scenario Selection */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-accent mb-4">
            Выберите Сценарий
          </h3>
          <div className="space-y-3">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedScenario === scenario.id
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
                onClick={() => setSelectedScenario(scenario.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{scenario.icon}</span>
                  <div>
                    <div className="font-semibold text-primary">
                      {scenario.name}
                    </div>
                    <div className="text-sm text-secondary">
                      {scenario.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => runSimulation(selectedScenario)}
            disabled={isRunning || selectedScenario === 'normal'}
            className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all ${
              isRunning || selectedScenario === 'normal'
                ? 'bg-card/50 text-secondary cursor-not-allowed'
                : 'bg-accent text-background hover:bg-accent/90'
            }`}
          >
            {isRunning ? 'Запуск Симуляции...' : 'Запустить Симуляцию'}
          </button>
        </div>

        {/* Simulation Results */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-accent mb-4">
            Результаты Симуляции
          </h3>

          {simulationEvents.length === 0 ? (
            <div className="text-center text-secondary py-8">
              <div className="text-4xl mb-4">🎯</div>
              <div className="text-lg mb-2">Выберите Сценарий</div>
              <div className="text-sm">Выберите сценарий сбоя чтобы увидеть как система отреагирует</div>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {simulationEvents.map((event, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border-l-4 ${
                    event.type === 'alert' ? 'border-l-error bg-error/10' :
                    event.type === 'warning' ? 'border-l-warning bg-warning/10' :
                    event.type === 'success' ? 'border-l-success bg-success/10' :
                    'border-l-accent bg-accent/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-primary">
                        {event.message}
                      </div>
                      <div className="text-xs text-secondary mt-1">
                        {event.details}
                      </div>
                    </div>
                    <span className="text-xs text-secondary font-mono">
                      {event.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* System Resilience Summary */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-accent mb-4">
          Функции Устойчивости Системы
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-card/30 rounded-lg">
            <div className="text-2xl mb-2">🔄</div>
            <div className="font-semibold text-primary">Резервные Механизмы</div>
            <div className="text-sm text-secondary">Кешированные данные, режим деградации</div>
          </div>
          <div className="text-center p-4 bg-card/30 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold text-primary">Автомасштабирование</div>
            <div className="text-sm text-secondary">Динамическое распределение ресурсов</div>
          </div>
          <div className="text-center p-4 bg-card/30 rounded-lg">
            <div className="text-2xl mb-2">🛡️</div>
            <div className="font-semibold text-primary">Выключатели Защиты</div>
            <div className="text-sm text-secondary">Быстрый отказ, грациозная деградация</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIfSimulator;
