import React from 'react';
import personalData from '../../data/personal.json';
import { useInView } from '../../hooks/useInView';
import './About.css';

const About = () => {
  const containerRef = useInView();
  return (
    <section ref={containerRef} className="about section">
      <div className="container">
        <h2 className="section-label">about</h2>

        <div className="stats-bar">
          {personalData.stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-block fade-in-up"
              style={{ '--fade-delay': `${i * 0.08}s` }}
            >
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="about-grid">
          <div className="about-bio card fade-in-up" style={{ '--fade-delay': '0.1s' }}>
            <div className="code-block">
              <div className="code-line">
                <span className="line-num">1</span>
                <span className="code-keyword">const</span>{' '}
                <span className="code-variable">engineer</span>{' '}
                <span className="code-keyword">=</span>{' '}
                <span className="code-string">"{personalData.name}"</span>;
              </div>
              <div className="code-line">
                <span className="line-num">2</span>
                <span className="code-comment">// {personalData.subtitle}</span>
              </div>
              <div className="code-line">
                <span className="line-num">3</span>
              </div>
              <div className="code-line bio-text">
                <span className="line-num">4</span>
                <p>{personalData.bio}</p>
              </div>
            </div>
          </div>

          <div className="about-focus card fade-in-up" style={{ '--fade-delay': '0.2s' }}>
            <h3>
              <span className="code-comment">{'// '}</span>
              current_focus
            </h3>
            <ul className="focus-list">
              {personalData.focus.map((item, i) => (
                <li key={i}>
                  <span className="list-index">{String(i).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
