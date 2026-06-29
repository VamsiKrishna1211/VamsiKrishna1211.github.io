import React from 'react';
import skillsData from '../../data/skills.json';
import { useInView } from '../../hooks/useInView';
import './Skills.css';

const Skills = () => {
  const containerRef = useInView();
  return (
    <section ref={containerRef} className="skills section">
      <div className="container">
        <span className="section-label">skills</span>

        <div className="skills-grid">
          {skillsData.map((category, index) => (
            <div
              key={category.category}
              className="skill-card card fade-in"
              style={{ '--fade-delay': `${index * 0.05}s` }}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
