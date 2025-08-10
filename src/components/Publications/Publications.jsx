import React from 'react';
import { motion } from 'framer-motion';
import publicationsData from '../../data/publications.json';
import './Publications.css';

const Publications = () => {
  return (
    <section className="publications section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <span className="text-gradient">Publications</span>
          </h2>
        </motion.div>
        
        <div className="publications-grid">
          {publicationsData.map((pub, index) => (
            <motion.div
              key={pub.id}
              className="publication-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3>{pub.title}</h3>
              <p><strong>Journal:</strong> {pub.journal} ({pub.year})</p>
              <p><strong>Authors:</strong> {pub.authors.join(', ')}</p>
              <p>{pub.abstract}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
