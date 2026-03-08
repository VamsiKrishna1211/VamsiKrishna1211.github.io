import React from 'react';
import { motion } from 'framer-motion';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="terminal-loader">
          <span className="terminal-prompt">$</span>
          <motion.span
            className="terminal-text"
            initial={{ width: 0 }}
            animate={{ width: 'auto' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            initializing systems
          </motion.span>
          <span className="cursor-blink" />
        </div>

        <div className="loading-progress">
          <motion.div
            className="progress-fill"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
