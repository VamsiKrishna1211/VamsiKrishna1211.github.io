import React from 'react';
import { motion } from 'framer-motion';
import educationData from '../../data/education.json';
import './Education.css';

const Education = () => {
  return (
    <section className="education section">
      <div className="container">
        <span className="section-label">education</span>

        <div className="edu-list">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              className="edu-card card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="edu-top">
                <div>
                  <h3>{edu.degree}</h3>
                  <h4 className="code-variable">{edu.institution}</h4>
                </div>
                <span className="edu-dates">
                  {edu.startDate} → {edu.endDate}
                </span>
              </div>
              <p className="edu-desc">{edu.description}</p>
              {edu.coursework && edu.coursework.length > 0 && (
                <div className="edu-courses">
                  <span className="code-comment">{'// coursework'}</span>
                  <div className="course-tags">
                    {edu.coursework.map((course, i) => (
                      <span key={i} className="tag">{course}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
