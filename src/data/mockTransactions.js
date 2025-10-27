// Mock transaction data generator
export const generateMockTransaction = (id) => {
  const timestamp = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // 60% B2C, 20% B2B, 20% C-T-C
  const rand = Math.random();
  let transaction;

  if (rand < 0.6) {
    // B2C Transaction
    transaction = {
      id: `TXN-${id}`,
      timestamp,
      type: 'B2C',
      isCtC: false,
      user: {
        id: Math.floor(Math.random() * 10000),
        name: getRandomName()
      },
      items: [{
        product: getRandomB2CProduct(),
        quantity: getRandomB2CQuantity(),
        price: getRandomB2CPrice()
      }],
      steps: [
        { service: 'Gateway', duration: 10 + Math.floor(Math.random() * 10) },
        { service: 'SSO', duration: 5 + Math.floor(Math.random() * 10), context: 'B2C' },
        { service: 'MDM', duration: 3 + Math.floor(Math.random() * 8), priceApplied: 0 },
        { service: 'Transaction', duration: 40 + Math.floor(Math.random() * 20) },
        { service: 'Loyalty', duration: 8 + Math.floor(Math.random() * 10), pointsAwarded: 0 }
      ],
      totalDuration: 0,
      status: 'SUCCESS'
    };
  } else if (rand < 0.8) {
    // B2B Transaction
    transaction = {
      id: `TXN-${id}`,
      timestamp,
      type: 'B2B',
      isCtC: false,
      user: {
        id: Math.floor(Math.random() * 1000),
        name: getRandomName()
      },
      company: {
        id: Math.floor(Math.random() * 100),
        name: getRandomCompanyName()
      },
      items: [{
        product: getRandomB2BProduct(),
        quantity: getRandomB2BQuantity(),
        price: getRandomB2BPrice()
      }],
      steps: [
        { service: 'Gateway', duration: 12 + Math.floor(Math.random() * 8) },
        { service: 'SSO', duration: 8 + Math.floor(Math.random() * 8), context: 'B2B' },
        { service: 'MDM', duration: 5 + Math.floor(Math.random() * 10), priceApplied: 0, priceType: 'corporate' },
        { service: 'Transaction', duration: 45 + Math.floor(Math.random() * 15) },
        { service: 'ERP', duration: 100 + Math.floor(Math.random() * 50), action: 'corporate record' },
        { service: 'Loyalty', duration: 12 + Math.floor(Math.random() * 8), pointsAwarded: 0 }
      ],
      totalDuration: 0,
      status: 'SUCCESS'
    };
  } else {
    // C-T-C Transaction (Cross-to-Cross) - Most complex!
    transaction = {
      id: `TXN-${id}`,
      timestamp,
      type: 'B2B',
      isCtC: true,
      user: {
        id: Math.floor(Math.random() * 1000),
        name: getRandomName()
      },
      company: {
        id: Math.floor(Math.random() * 100),
        name: getRandomCompanyName()
      },
      items: [{
        product: getRandomB2BProduct(),
        quantity: getRandomB2BQuantity(),
        price: getRandomB2BPrice()
      }],
      steps: [
        { service: 'Gateway', duration: 15 + Math.floor(Math.random() * 10) },
        { service: 'SSO', duration: 10 + Math.floor(Math.random() * 10), context: 'B2B', linkedAccount: true },
        { service: 'MDM', duration: 8 + Math.floor(Math.random() * 10), priceApplied: 0, priceType: 'corporate' },
        { service: 'Transaction', duration: 50 + Math.floor(Math.random() * 20) },
        { service: 'ERP', duration: 120 + Math.floor(Math.random() * 30), action: 'corporate record' },
        { service: 'Loyalty', duration: 15 + Math.floor(Math.random() * 10), pointsAwarded: 0, isCrossReward: true }
      ],
      totalDuration: 0,
      status: 'SUCCESS'
    };
  }

  // Calculate totals
  transaction.steps = transaction.steps.map(step => {
    if (step.service === 'MDM') {
      step.priceApplied = transaction.items[0].price;
    }
    if (step.service === 'Loyalty') {
      step.pointsAwarded = Math.floor(transaction.items[0].quantity * 2); // 2 points per unit
    }
    return step;
  });

  transaction.totalDuration = transaction.steps.reduce((sum, step) => sum + step.duration, 0);
  transaction.items[0].total = transaction.items[0].quantity * transaction.items[0].price;

  return transaction;
};

// Helper functions for realistic data
function getRandomName() {
  const firstNames = ['Алексей', 'Мария', 'Дмитрий', 'Ольга', 'Андрей', 'Елена', 'Сергей', 'Татьяна', 'Иван', 'Наталья', 'Павел', 'Юлия', 'Максим', 'Анна', 'Владимир', 'Екатерина'];
  const lastNames = ['Иванов', 'Петров', 'Сидоров', 'Козлов', 'Морозов', 'Волков', 'Соколов', 'Михайлов', 'Федоров', 'Попов'];

  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)].charAt(0)}.`;
}

function getRandomCompanyName() {
  const companies = [
    'БелТрансЛогистик', 'МинскКурьер', 'БелТакси', 'БелАгро', 'МинскСтрой',
    'ГомельАвто', 'БрестТранспорт', 'ВитебскЛогистика', 'МогилевТрейд', 'ГродноТранс'
  ];
  return companies[Math.floor(Math.random() * companies.length)];
}

function getRandomB2CProduct() {
  const products = [
    'Кофе Латте', 'Кофе Американо', 'Чай', 'Вода', 'Сэндвич',
    'АИ-95', 'АИ-98', 'Дизель', 'Газ', 'Экспресс-мойка'
  ];
  return products[Math.floor(Math.random() * products.length)];
}

function getRandomB2CQuantity() {
  return Math.random() < 0.7 ? 1 : Math.floor(Math.random() * 3) + 1;
}

function getRandomB2CPrice() {
  const basePrices = [2.50, 3.00, 1.50, 1.00, 4.50, 3.10, 3.25, 2.90, 1.20, 8.00];
  const product = getRandomB2CProduct();
  const basePrice = basePrices[Math.floor(Math.random() * basePrices.length)];
  return Math.round((basePrice + (Math.random() - 0.5) * 0.5) * 100) / 100;
}

function getRandomB2BProduct() {
  const products = ['АИ-95', 'АИ-98', 'Дизель', 'Газ'];
  return products[Math.floor(Math.random() * products.length)];
}

function getRandomB2BQuantity() {
  return Math.floor(Math.random() * 50) + 20; // 20-70 liters
}

function getRandomB2BPrice() {
  const basePrices = [2.85, 3.00, 2.75, 1.15]; // Corporate prices (lower)
  const product = getRandomB2BProduct();
  const basePrice = basePrices[Math.floor(Math.random() * basePrices.length)];
  return Math.round((basePrice + (Math.random() - 0.5) * 0.3) * 100) / 100;
}

// Generate initial transaction history
export const generateInitialTransactions = (count = 20) => {
  const transactions = [];
  for (let i = 1; i <= count; i++) {
    transactions.push(generateMockTransaction(892340 - count + i));
  }
  return transactions.reverse(); // Most recent first
};

// Performance metrics data
export const generatePerformanceData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return hours.map(hour => {
    let baseValue;

    // Realistic traffic patterns
    if (hour >= 0 && hour < 6) {
      baseValue = 50 + Math.random() * 30; // Night
    } else if (hour >= 6 && hour < 10) {
      baseValue = 300 + Math.random() * 200; // Morning peak
    } else if (hour >= 10 && hour < 17) {
      baseValue = 400 + Math.random() * 150; // Day
    } else if (hour >= 17 && hour < 21) {
      baseValue = 500 + Math.random() * 300; // Evening peak
    } else {
      baseValue = 150 + Math.random() * 100; // Evening
    }

    return {
      hour: `${hour.toString().padStart(2, '0')}:00`,
      requests: Math.floor(baseValue),
      b2c: Math.floor(baseValue * 0.6),
      b2b: Math.floor(baseValue * 0.2),
      ctc: Math.floor(baseValue * 0.2)
    };
  });
};

export const generateLatencyHistogram = () => {
  return [
    { range: '0-20ms', count: 3245, percentage: 35 },
    { range: '20-50ms', count: 4123, percentage: 45 },
    { range: '50-100ms', count: 1456, percentage: 15 },
    { range: '100-200ms', count: 423, percentage: 4 },
    { range: '200ms+', count: 89, percentage: 1 }
  ];
};
