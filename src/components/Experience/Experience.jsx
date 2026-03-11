import React from 'react';
import { motion } from 'framer-motion';
import experienceData from '../../data/experience.json';
import './Experience.css';

const Experience = () => {
  return (
    <section className="experience section">
      <div className="container">
        <span className="section-label">experience</span>

        <div className="exp-timeline">
          {experienceData.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${index}`}
              className="exp-card card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Headline metric bar */}
              {exp.headline && (
                <div className="exp-headline">
                  {exp.headline}
                </div>
              )}

              <div className="exp-top">
                <div className="exp-role">
                  <h3>{exp.position}</h3>
                  <h4 className="code-variable">{exp.company}</h4>
                </div>
                <div className="exp-meta">
                  <span className="exp-dates">
                    {exp.startDate} → {exp.endDate}
                  </span>
                  <span className="exp-type tag">{exp.type}</span>
                </div>
              </div>

              <p className="exp-desc">{exp.description}</p>

              <ul className="exp-achievements">
                {exp.achievements.slice(0, 4).map((a, i) => (
                  <li key={i}>
                    <span className="bullet">›</span> {a}
                  </li>
                ))}
              </ul>

              <div className="exp-tech">
                {exp.technologies.slice(0, 6).map((tech, i) => (
                  <span key={i} className="tag">{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
