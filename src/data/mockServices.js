// Mock data for architecture services
export const mockServices = [
  // External Layer
  {
    id: 'b2c-app',
    name: 'B2C Мобильное Приложение',
    icon: '📱',
    layer: 'external',
    status: 'active',
    keyMetrics: [
      { label: 'Пользователей онлайн', value: '1,269' },
      { label: 'Запросов/сек', value: '245' }
    ]
  },
  {
    id: 'b2b-platform',
    name: 'B2B Веб-Платформа',
    icon: '💼',
    layer: 'external',
    status: 'active',
    keyMetrics: [
      { label: 'Компаний онлайн', value: '43' },
      { label: 'Запросов/сек', value: '82' }
    ]
  },
  {
    id: 'kiosk-systems',
    name: 'Киоски на АЗС',
    icon: '🖥️',
    layer: 'external',
    status: 'active',
    keyMetrics: [
      { label: 'Терминалов онлайн', value: '127/135' },
      { label: 'Транзакций/мин', value: '414' }
    ]
  },

  // API Gateway
  {
    id: 'api-gateway',
    name: 'API Шлюз',
    icon: '🚪',
    layer: 'gateway',
    status: 'active',
    keyMetrics: [
      { label: 'Всего запросов', value: '15.1M сегодня' },
      { label: 'Средняя задержка', value: '48ms' },
      { label: 'Процент ошибок', value: '0.09%' }
    ]
  },

  // Core Layer - SSO (Most Important!)
  {
    id: 'sso',
    name: 'Сервис Единого Входа (SSO)',
    icon: '🔐',
    layer: 'core',
    status: 'active',
    keyMetrics: [
      { label: 'Активных сессий', value: '1,923' },
      { label: 'Авторизаций/мин', value: '498' },
      { label: 'Связанных аккаунтов (С-К-К)', value: '267' }
    ],
    isCore: true
  },

  {
    id: 'mdm',
    name: 'Управление Мастер-Данными (MDM)',
    icon: '📊',
    layer: 'core',
    status: 'active',
    keyMetrics: [
      { label: 'Продуктов', value: '1,247' },
      { label: 'Станций', value: '135' },
      { label: 'Статус синхронизации', value: '99.8%' }
    ]
  },

  {
    id: 'loyalty-engine',
    name: 'Движок Лояльности',
    icon: '🎁',
    layer: 'core',
    status: 'active',
    keyMetrics: [
      { label: 'Баллов начислено сегодня', value: '129,919' },
      { label: 'Баллов потрачено', value: '85,029' },
      { label: 'Процент использования', value: '71%' }
    ]
  },

  {
    id: 'transaction-service',
    name: 'Сервис Транзакций',
    icon: '💳',
    layer: 'core',
    status: 'active',
    keyMetrics: [
      { label: 'Транзакций сегодня', value: '18,176' },
      { label: 'Общий объем', value: '2.4М BYN' },
      { label: 'Процент успеха', value: '99.97%' }
    ]
  },

  // Integration Layer
  {
    id: 'esb',
    name: 'Корпоративная Шина Данных (КШД)',
    icon: '🔄',
    layer: 'integration',
    status: 'active',
    keyMetrics: [
      { label: 'Сообщений сегодня', value: '456K' },
      { label: 'Глубина очереди', value: '23' },
      { label: 'Средняя задержка', value: '12ms' }
    ]
  },

  // Data Layer
  {
    id: 'data-warehouse',
    name: 'Корпоративное Хранилище Данных (КХД)',
    icon: '🗄️',
    layer: 'data',
    status: 'active',
    keyMetrics: [
      { label: 'Всего записей', value: '45.2M' },
      { label: 'Использовано хранилища', value: '2.3TB' },
      { label: 'Запросов сегодня', value: '12,456' }
    ]
  },

  {
    id: 'legacy-systems',
    name: 'Унаследованные Системы',
    icon: '🏛️',
    layer: 'data',
    status: 'active',
    keyMetrics: [
      { label: 'ERP (1C)', value: 'Активна' },
      { label: 'CRM', value: 'Активна' },
      { label: 'Billing', value: 'Активна' }
    ]
  }
];

// Generate random metrics updates
export const updateServiceMetrics = (service) => {
  const updatedService = { ...service };

  if (!updatedService.keyMetrics || !Array.isArray(updatedService.keyMetrics)) {
    return updatedService;
  }

  switch (service.id) {
    case 'b2c-app':
      if (updatedService.keyMetrics[0]) updatedService.keyMetrics[0].value = (1200 + Math.floor(Math.random() * 100)).toString();
      if (updatedService.keyMetrics[1]) updatedService.keyMetrics[1].value = (200 + Math.floor(Math.random() * 80)).toString();
      break;
    case 'b2b-platform':
      if (updatedService.keyMetrics[0]) updatedService.keyMetrics[0].value = (40 + Math.floor(Math.random() * 10)).toString();
      if (updatedService.keyMetrics[1]) updatedService.keyMetrics[1].value = (80 + Math.floor(Math.random() * 20)).toString();
      break;
    case 'kiosk-systems':
      if (updatedService.keyMetrics[0]) updatedService.keyMetrics[0].value = `${120 + Math.floor(Math.random() * 15)}/135`;
      if (updatedService.keyMetrics[1]) updatedService.keyMetrics[1].value = (400 + Math.floor(Math.random() * 50)).toString();
      break;
    case 'api-gateway':
      if (updatedService.keyMetrics[0]) updatedService.keyMetrics[0].value = `${(15 + Math.random() * 0.5).toFixed(1)}M today`;
      if (updatedService.keyMetrics[1]) updatedService.keyMetrics[1].value = `${40 + Math.floor(Math.random() * 10)}ms`;
      if (updatedService.keyMetrics[2]) updatedService.keyMetrics[2].value = `${(Math.random() * 0.1).toFixed(2)}%`;
      break;
    case 'sso':
      if (updatedService.keyMetrics[0]) updatedService.keyMetrics[0].value = (1200 + Math.floor(Math.random() * 200)).toString();
      if (updatedService.keyMetrics[1]) updatedService.keyMetrics[1].value = (400 + Math.floor(Math.random() * 100)).toString();
      if (updatedService.keyMetrics[2]) updatedService.keyMetrics[2].value = (260 + Math.floor(Math.random() * 20)).toString();
      break;
    case 'mdm':
      if (updatedService.keyMetrics[2]) updatedService.keyMetrics[2].value = `${(99 + Math.random() * 0.9).toFixed(1)}%`;
      break;
    case 'loyalty-engine':
      if (updatedService.keyMetrics[0]) updatedService.keyMetrics[0].value = (120000 + Math.floor(Math.random() * 10000)).toLocaleString();
      if (updatedService.keyMetrics[1]) updatedService.keyMetrics[1].value = (85000 + Math.floor(Math.random() * 10000)).toLocaleString();
      break;
    case 'transaction-service':
      if (updatedService.keyMetrics[0]) updatedService.keyMetrics[0].value = (18000 + Math.floor(Math.random() * 1000)).toLocaleString();
      if (updatedService.keyMetrics[1]) updatedService.keyMetrics[1].value = `${(2.2 + Math.random() * 0.4).toFixed(1)}M BYN`;
      break;
    case 'esb':
      if (updatedService.keyMetrics[0]) updatedService.keyMetrics[0].value = `${(450 + Math.random() * 20).toFixed(0)}K`;
      break;
    case 'data-warehouse':
      if (updatedService.keyMetrics[0]) updatedService.keyMetrics[0].value = `${(45 + Math.random() * 0.5).toFixed(1)}M`;
      if (updatedService.keyMetrics[2]) updatedService.keyMetrics[2].value = (12000 + Math.floor(Math.random() * 1000)).toLocaleString();
      break;
  }

  return updatedService;
};
