import React from 'react';
import experienceData from '../../data/experience.json';
import { useInView } from '../../hooks/useInView';
import './Experience.css';

const Experience = () => {
  const containerRef = useInView();
  return (
    <section ref={containerRef} className="experience section">
      <div className="container">
        <h2 className="section-label">experience</h2>

        <div className="exp-timeline">
          {experienceData.map((exp, index) => (
            <div
              key={`${exp.company}-${index}`}
              className="exp-card card fade-in-left"
              style={{ '--fade-delay': `${index * 0.1}s` }}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
