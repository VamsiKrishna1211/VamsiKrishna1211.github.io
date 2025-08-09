import React from 'react';
import { motion } from 'framer-motion';
import experienceData from '../../data/experience.json';
import './Experience.css';

const Experience = () => {
  return (
    <section className="experience section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            Professional <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        <div className="experience-timeline">
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="experience-card"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="exp-header">
                <h3>{exp.position}</h3>
                <h4>{exp.company}</h4>
                <p className="exp-duration">{exp.startDate} - {exp.endDate}</p>
              </div>
              <div className="exp-content">
                <p>{exp.description}</p>
                <ul>
                  {exp.achievements.slice(0, 3).map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
