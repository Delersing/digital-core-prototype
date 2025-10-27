import React, { useState, useCallback } from 'react';
import ServiceBlock from './ServiceBlock';
import SidePanel from './SidePanel';

const ArchitectureMap = ({ services, setServices }) => {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = useCallback((service) => {
    setSelectedService(service);
  }, []);

  const handleServiceUpdate = useCallback((updatedService) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === updatedService.id ? updatedService : service
      )
    );
  }, [setServices]);

  // Organize services by layers
  const externalServices = services.filter(s => s.layer === 'external');
  const gatewayServices = services.filter(s => s.layer === 'gateway');
  const coreServices = services.filter(s => s.layer === 'core');
  const integrationServices = services.filter(s => s.layer === 'integration');
  const dataServices = services.filter(s => s.layer === 'data');

  return (
    <div className="architecture-map-container w-full h-full p-8 overflow-auto">
      <h2 className="text-2xl font-bold text-white mb-6">
        Архитектурная Карта Системы
      </h2>

      {/* Внешний слой */}
      <div className="layer-section mb-8">
        <div className="layer-label text-cyan-400 text-sm mb-3">
          Внешний Слой
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {externalServices.map(service => (
            <ServiceBlock
              key={service.id}
              service={service}
              onClick={handleServiceClick}
              onUpdate={handleServiceUpdate}
              isHighlighted={selectedService?.id === service.id}
            />
          ))}
        </div>
      </div>

      {/* Линия-разделитель */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-8" />

      {/* API Gateway */}
      <div className="layer-section mb-8">
        <div className="layer-label text-cyan-400 text-sm mb-3">
          API Шлюз
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {gatewayServices.map(service => (
              <ServiceBlock
                key={service.id}
                service={service}
                onClick={handleServiceClick}
                onUpdate={handleServiceUpdate}
                isHighlighted={selectedService?.id === service.id}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Линия-разделитель */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-8" />

      {/* Цифровое ядро */}
      <div className="layer-section mb-8">
        <div className="layer-label text-purple-400 text-sm mb-3 flex items-center gap-2">
          <span>⭐</span>
          <span>Цифровое Ядро (Core Services)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {coreServices.map(service => (
            <ServiceBlock
              key={service.id}
              service={service}
              onClick={handleServiceClick}
              onUpdate={handleServiceUpdate}
              isHighlighted={selectedService?.id === service.id}
              isCore={service.isCore}
            />
          ))}
        </div>
      </div>

      {/* Линия-разделитель */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-8" />

      {/* Интеграционный слой */}
      <div className="layer-section mb-8">
        <div className="layer-label text-cyan-400 text-sm mb-3">
          Интеграция
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {integrationServices.map(service => (
              <ServiceBlock
                key={service.id}
                service={service}
                onClick={handleServiceClick}
                onUpdate={handleServiceUpdate}
                isHighlighted={selectedService?.id === service.id}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Линия-разделитель */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent mb-8" />

      {/* Слой данных */}
      <div className="layer-section mb-8">
        <div className="layer-label text-green-400 text-sm mb-3">
          Слой Данных
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dataServices.map(service => (
            <ServiceBlock
              key={service.id}
              service={service}
              onClick={handleServiceClick}
              onUpdate={handleServiceUpdate}
              isHighlighted={selectedService?.id === service.id}
            />
          ))}
        </div>
      </div>

      {/* Side Panel */}
      {selectedService && (
        <SidePanel
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onUpdate={handleServiceUpdate}
        />
      )}
    </div>
  );
};

export default ArchitectureMap;
