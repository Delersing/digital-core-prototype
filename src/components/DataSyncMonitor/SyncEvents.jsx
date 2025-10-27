import React from 'react';

const SyncEvents = ({ events }) => {
  return (
    <div className="space-y-3 max-h-[650px] overflow-y-auto">
      {events.length === 0 ? (
        <div className="text-center text-secondary py-8">
          <div className="text-2xl mb-2">🔄</div>
          <div className="text-sm">Событий синхронизации пока нет</div>
        </div>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            className={`p-3 rounded-lg border-l-4 transition-all duration-200 ${
              event.status === 'success'
                ? 'border-l-success bg-success/5'
                : 'border-l-warning bg-warning/5'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="text-sm text-primary font-medium truncate">
                  {event.event}
                </div>
                <div className="text-xs text-secondary mt-1">
                  → {event.target}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-xs ${
                  event.status === 'success' ? 'text-success' : 'text-warning'
                }`}>
                  {event.status === 'success' ? '✓' : '⚠'}
                </span>
                <span className="text-xs text-secondary font-mono">
                  {event.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SyncEvents;
