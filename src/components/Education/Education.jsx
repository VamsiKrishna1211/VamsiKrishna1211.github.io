import React from 'react';
import educationData from '../../data/education.json';
import { useInView } from '../../hooks/useInView';
import './Education.css';

const Education = () => {
  const containerRef = useInView();
  return (
    <section ref={containerRef} className="education section">
      <div className="container">
        <span className="section-label">education</span>

        <div className="edu-list">
          {educationData.map((edu, index) => (
            <div
              key={edu.id}
              className="edu-card card fade-in"
              style={{ '--fade-delay': `${index * 0.1}s` }}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
