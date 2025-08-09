import React from 'react';
import { motion } from 'framer-motion';
import achievementsData from '../../data/achievements.json';

const Achievements = () => {
  return (
    <section className="achievements section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <span className="text-gradient">Achievements</span>
          </h2>
        </motion.div>
        
        <div className="achievements-grid">
          {achievementsData.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className="card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <h3>{achievement.title}</h3>
              <p><strong>{achievement.organization}</strong> - {achievement.year}</p>
              <p>{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
