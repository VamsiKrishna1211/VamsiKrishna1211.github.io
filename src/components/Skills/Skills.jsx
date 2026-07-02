import React from 'react';
import { FaMicrochip, FaEye, FaRobot, FaRocket } from 'react-icons/fa';
import skillsData from '../../data/skills.json';
import { useInView } from '../../hooks/useInView';
import './Skills.css';

// Fixed set of 4 categories — hardcoded rather than JSON-driven since the
// icon choice won't grow/change independently of the component.
const CATEGORY_ICONS = {
  'Hardware & Signals': FaMicrochip,
  'Vision & Intelligence': FaEye,
  'Autonomy & Robotics': FaRobot,
  'Production & Scale': FaRocket,
};

const Skills = () => {
  const containerRef = useInView();
  return (
    <section ref={containerRef} className="skills section">
      <div className="container">
        <h2 className="section-label">skills</h2>

        <div className="skills-grid">
          {skillsData.map((category, index) => {
            const Icon = CATEGORY_ICONS[category.category];
            return (
              <div
                key={category.category}
                className="skill-card card fade-in-up"
                style={{ '--fade-delay': `${index * 0.05}s` }}
              >
                <h3>
                  <span className="skill-icon">{Icon && <Icon size={16} />}</span>
                  {category.category}
                </h3>
                <div className="skill-tags">
                  {category.items.map((skill, i) => (
                    <span key={i} className="tag">{skill}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
