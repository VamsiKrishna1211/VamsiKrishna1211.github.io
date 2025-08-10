import React from 'react';
import { motion } from 'framer-motion';
import patentsData from '../../data/patents.json';
import './Patents.css';

const Patents = () => {
  return (
    <section className="patents section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <span className="text-gradient">Patents</span>
          </h2>
        </motion.div>
        
        <div className="patents-grid">
          {patentsData.map((patent, index) => (
            <motion.div
              key={patent.id}
              className="patent-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3>{patent.title}</h3>
              <p><strong>Patent #:</strong> {patent.patentNumber}</p>
              <p><strong>Status:</strong> {patent.status}</p>
              <p>{patent.abstract}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Patents;
