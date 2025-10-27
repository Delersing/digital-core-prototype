import React from 'react';

const ProgressBar = ({ progress, className = '' }) => {
  const getProgressColor = (progress) => {
    if (progress === 100) return 'from-success to-success';
    if (progress >= 80) return 'from-accent to-accent';
    if (progress >= 50) return 'from-yellow-400 to-yellow-500';
    return 'from-warning to-warning';
  };

  return (
    <div className={`w-full bg-card/50 rounded-full h-3 overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(progress)} transition-all duration-500 ease-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
