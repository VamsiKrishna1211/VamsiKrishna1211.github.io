import React from 'react';
import { motion } from 'framer-motion';
import skillsData from '../../data/skills.json';
import './Skills.css';

const Skills = () => {
  return (
    <section className="skills section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            Technical <span className="text-gradient">Skills</span>
          </h2>
        </motion.div>

        <div className="skills-grid">
          {skillsData.map((skillCategory, index) => (
            <motion.div
              key={skillCategory.category}
              className="skill-category"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="category-header">
                <span className="category-icon">{skillCategory.icon}</span>
                <h3>{skillCategory.category}</h3>
              </div>
              <div className="skills-list">
                {skillCategory.items.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
