import React from 'react';
import { motion } from 'framer-motion';
import educationData from '../../data/education.json';
import './Education.css';

const Education = () => {
  return (
    <section className="education section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <span className="text-gradient">Education</span>
          </h2>
        </motion.div>
        
        <div className="education-timeline">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              className="education-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="edu-header">
                <h3 className="text-gradient">{edu.degree}</h3>
                <h4>{edu.institution}</h4>
                <p className="edu-duration">{edu.startDate} - {edu.endDate}</p>
              </div>
              <p className="edu-description">{edu.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
