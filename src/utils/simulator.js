// Real-time simulation utilities

export const generateRealTimeMetrics = (services) => {
  return services.map(service => {
    const updatedService = { ...service };

    // Update metrics based on service type
    switch (service.id) {
      case 'b2c-app':
        updatedService.keyMetrics[0].value = (1200 + Math.floor(Math.random() * 100)).toString();
        updatedService.keyMetrics[1].value = (200 + Math.floor(Math.random() * 80)).toString();
        break;
      case 'b2b-platform':
        updatedService.keyMetrics[0].value = (40 + Math.floor(Math.random() * 10)).toString();
        updatedService.keyMetrics[1].value = (80 + Math.floor(Math.random() * 20)).toString();
        break;
      case 'kiosk-systems':
        updatedService.keyMetrics[0].value = `${120 + Math.floor(Math.random() * 15)}/135`;
        updatedService.keyMetrics[1].value = (400 + Math.floor(Math.random() * 50)).toString();
        break;
      case 'api-gateway':
        updatedService.keyMetrics[0].value = `${(15 + Math.random() * 0.5).toFixed(1)}M today`;
        updatedService.keyMetrics[1].value = `${40 + Math.floor(Math.random() * 10)}ms`;
        updatedService.keyMetrics[2].value = `${(Math.random() * 0.1).toFixed(2)}%`;
        break;
      case 'sso':
        updatedService.keyMetrics[0].value = (1200 + Math.floor(Math.random() * 200)).toString();
        updatedService.keyMetrics[1].value = (400 + Math.floor(Math.random() * 100)).toString();
        updatedService.keyMetrics[2].value = (8000 + Math.floor(Math.random() * 500)).toString();
        updatedService.keyMetrics[3].value = (260 + Math.floor(Math.random() * 20)).toString();
        break;
      case 'mdm':
        updatedService.keyMetrics[4].value = `${(99 + Math.random() * 0.9).toFixed(1)}%`;
        break;
      case 'loyalty-engine':
        updatedService.keyMetrics[0].value = (120000 + Math.floor(Math.random() * 10000)).toLocaleString();
        updatedService.keyMetrics[1].value = (85000 + Math.floor(Math.random() * 10000)).toLocaleString();
        break;
      case 'transaction-service':
        updatedService.keyMetrics[0].value = (18000 + Math.floor(Math.random() * 1000)).toLocaleString();
        updatedService.keyMetrics[1].value = `${(2.2 + Math.random() * 0.4).toFixed(1)}M BYN`;
        break;
      case 'esb':
        updatedService.keyMetrics[0].value = `${(450 + Math.random() * 20).toFixed(0)}K`;
        break;
      case 'data-warehouse':
        updatedService.keyMetrics[0].value = `${(45 + Math.random() * 0.5).toFixed(1)}M`;
        updatedService.keyMetrics[2].value = (12000 + Math.floor(Math.random() * 1000)).toLocaleString();
        break;
    }

    // Occasionally update health status for realism
    if (Math.random() < 0.05) { // 5% chance
      updatedService.status = Math.random() > 0.5 ? 'degraded' : 'active';
    }

    return updatedService;
  });
};

export const generateDataFlows = (services) => {
  const flows = [];
  const activeServices = services.filter(s => s.status === 'active');

  // Create flows between related services
  activeServices.forEach(service => {
    if (service.layer === 'external') {
      const gateway = services.find(s => s.id === 'api-gateway');
      if (gateway) {
        flows.push({
          id: `${service.id}-gateway`,
          from: service,
          to: gateway,
          color: service.id.includes('b2c') ? 'blue' : 'purple',
          active: Math.random() > 0.7
        });
      }
    }
  });

  // Core service flows
  const sso = services.find(s => s.id === 'sso');
  const mdm = services.find(s => s.id === 'mdm');
  const transaction = services.find(s => s.id === 'transaction-service');
  const loyalty = services.find(s => s.id === 'loyalty-engine');

  if (sso && mdm) {
    flows.push({
      id: 'sso-mdm',
      from: sso,
      to: mdm,
      color: 'cyan',
      active: Math.random() > 0.5
    });
  }

  if (mdm && transaction) {
    flows.push({
      id: 'mdm-transaction',
      from: mdm,
      to: transaction,
      color: 'green',
      active: Math.random() > 0.6
    });
  }

  if (transaction && loyalty) {
    flows.push({
      id: 'transaction-loyalty',
      from: transaction,
      to: loyalty,
      color: 'yellow',
      active: Math.random() > 0.4
    });
  }

  return flows;
};

export const calculateServiceHealth = (service) => {
  let healthScore = 100;

  // Reduce health based on various factors
  if (service.status === 'degraded') healthScore -= 30;
  if (service.status === 'error') healthScore -= 70;

  // Check metrics for issues
  service.keyMetrics.forEach(metric => {
    if (metric.label.includes('Error') && parseFloat(metric.value) > 1) {
      healthScore -= 20;
    }
    if (metric.label.includes('latency') && parseFloat(metric.value) > 100) {
      healthScore -= 15;
    }
  });

  return Math.max(0, healthScore);
};
