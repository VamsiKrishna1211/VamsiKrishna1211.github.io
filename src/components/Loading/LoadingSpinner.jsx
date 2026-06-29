import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="terminal-loader">
          <span className="terminal-prompt">$</span>
          <span className="terminal-text">initializing systems</span>
          <span className="cursor-blink" />
        </div>

        <div className="loading-progress">
          <div className="progress-fill" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;