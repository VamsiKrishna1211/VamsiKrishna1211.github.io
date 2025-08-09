import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaEye, FaBrain, FaCode } from 'react-icons/fa';
import personalData from '../../data/personal.json';
import './About.css';

const About = () => {
  const specializations = [
    {
      icon: FaRobot,
      title: 'Autonomous Robotics',
      description: 'Developing intelligent robotic systems with advanced navigation, perception, and control capabilities',
      color: 'var(--primary)'
    },
    {
      icon: FaEye,
      title: 'Computer Vision',
      description: 'Implementing cutting-edge vision algorithms for object detection, SLAM, and 3D reconstruction',
      color: 'var(--accent)'
    },
    {
      icon: FaBrain,
      title: 'Deep Learning',
      description: 'Creating novel neural network architectures for real-time AI applications and edge deployment',
      color: 'var(--secondary)'
    },
    {
      icon: FaCode,
      title: 'System Integration',
      description: 'Building scalable AI infrastructure and deploying models on edge devices and cloud platforms',
      color: 'var(--primary)'
    }
  ];

  return (
    <section className="about section">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="about-content">
          {/* Bio Section */}
          <motion.div
            className="about-bio"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bio-card">
              <h3>Pioneering the Future of Autonomous Systems</h3>
              <p>{personalData.bio}</p>
              
              <div className="bio-highlights">
                <div className="highlight">
                  <span className="highlight-number">5+</span>
                  <span className="highlight-text">Years in AI/Robotics</span>
                </div>
                <div className="highlight">
                  <span className="highlight-number">20+</span>
                  <span className="highlight-text">AI Projects</span>
                </div>
                <div className="highlight">
                  <span className="highlight-number">5</span>
                  <span className="highlight-text">Patents Filed</span>
                </div>
              </div>

              <div className="current-focus">
                <h4>Current Focus Areas</h4>
                <ul>
                  <li>Visual-Inertial SLAM for autonomous navigation</li>
                  <li>Real-time computer vision on edge devices</li>
                  <li>Multimodal AI for robotic perception</li>
                  <li>Scalable inference systems for deep learning</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Specializations */}
          <motion.div
            className="about-specializations"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>Technical Specializations</h3>
            <div className="specializations-grid">
              {specializations.map((spec, index) => (
                <motion.div
                  key={spec.title}
                  className="specialization-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div 
                    className="spec-icon"
                    style={{ color: spec.color }}
                  >
                    <spec.icon />
                  </div>
                  <h4>{spec.title}</h4>
                  <p>{spec.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
