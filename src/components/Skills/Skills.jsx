import React from 'react';
import { motion } from 'framer-motion';
import skillsData from '../../data/skills.json';
import './Skills.css';

const Skills = () => {
  return (
    <section className="skills section">
      <div className="container">
        <span className="section-label">skills</span>

        <div className="skills-grid">
          {skillsData.map((category, index) => (
            <motion.div
              key={category.category}
              className="skill-card card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <h3>
                <span className="skill-icon">{category.icon}</span>
                {category.category}
              </h3>
              <div className="skill-tags">
                {category.items.map((skill, i) => (
                  <span key={i} className="tag">{skill}</span>
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
