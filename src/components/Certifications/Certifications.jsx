import React from 'react';
import { motion } from 'framer-motion';
import certificationsData from '../../data/certifications.json';

const Certifications = () => {
  return (
    <section className="certifications section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <span className="text-gradient">Certifications</span>
          </h2>
        </motion.div>
        
        <div className="certifications-grid">
          {certificationsData.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="cert-icon">{cert.icon}</div>
              <h3>{cert.title}</h3>
              <p><strong>{cert.issuer}</strong> - {cert.issueDate}</p>
              <p>{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
