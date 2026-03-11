import React from 'react';
import { motion } from 'framer-motion';
import personalData from '../../data/personal.json';
import './About.css';

const About = () => {
  return (
    <section className="about section">
      <div className="container">
        <span className="section-label">about</span>

        {/* Stats bar — big numbers */}
        <div className="stats-bar">
          {personalData.stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="stat-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="about-grid">
          {/* Bio Card */}
          <motion.div
            className="about-bio card"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
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
          </motion.div>

          {/* Focus Areas */}
          <motion.div
            className="about-focus card"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
