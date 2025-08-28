import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFileAlt, 
  FaLightbulb, 
  FaTrophy, 
  FaGraduationCap,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaUsers,
  FaBookOpen,
  FaCertificate,
  FaStar
} from 'react-icons/fa';
import publicationsData from '../../data/publications.json';
import patentsData from '../../data/patents.json';
import achievementsData from '../../data/achievements.json';
import './ResearchRecognition.css';

const ResearchRecognition = () => {
  const [activeTab, setActiveTab] = useState('publications');

  const tabs = [
    {
      id: 'publications',
      label: 'Publications',
      icon: FaFileAlt,
      count: publicationsData.length,
      color: 'var(--primary)'
    },
    {
      id: 'patents',
      label: 'Patents',
      icon: FaLightbulb,
      count: patentsData.length,
      color: 'var(--accent)'
    },
    {
      id: 'achievements',
      label: 'Achievements',
      icon: FaTrophy,
      count: achievementsData.length,
      color: 'var(--secondary)'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'published':
      case 'granted':
        return <FaCertificate className="status-icon status-success" />;
      case 'under review':
      case 'pending':
        return <FaBookOpen className="status-icon status-pending" />;
      case 'in progress':
        return <FaGraduationCap className="status-icon status-progress" />;
      default:
        return <FaStar className="status-icon status-default" />;
    }
  };

  const renderPublications = () => (
    <div className="content-grid publications-grid">
      {publicationsData.map((pub, index) => (
        <motion.div
          key={`pub-${index}`}
          className="research-card publication-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="card-header">
            <div className="card-icon publication-icon">
              <FaFileAlt />
            </div>
            <div className="card-status">
              {getStatusIcon(pub.status)}
              <span className="status-text">{pub.status}</span>
            </div>
          </div>

          <div className="card-content">
            <h3 className="card-title">{pub.title}</h3>
            
            <div className="card-meta">
              <div className="meta-item">
                <FaUsers className="meta-icon" />
                <span>{pub.authors}</span>
              </div>
              
              <div className="meta-item">
                <FaBookOpen className="meta-icon" />
                <span>{pub.journal || pub.conference}</span>
              </div>
              
              <div className="meta-item">
                <FaCalendarAlt className="meta-icon" />
                <span>{pub.year}</span>
              </div>
            </div>

            <p className="card-description">{pub.description}</p>

            {pub.keywords && (
              <div className="card-tags">
                {pub.keywords.map((keyword, idx) => (
                  <span key={idx} className="tag publication-tag">{keyword}</span>
                ))}
              </div>
            )}
          </div>

          <div className="card-footer">
            {pub.doi && (
              <a href={`https://doi.org/${pub.doi}`} 
                 className="card-link" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <span>View Publication</span>
                <FaExternalLinkAlt />
              </a>
            )}
            {pub.url && (
              <a href={pub.url} 
                 className="card-link" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <span>Read More</span>
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderPatents = () => (
    <div className="content-grid patents-grid">
      {patentsData.map((patent, index) => (
        <motion.div
          key={`patent-${index}`}
          className="research-card patent-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="card-header">
            <div className="card-icon patent-icon">
              <FaLightbulb />
            </div>
            <div className="card-status">
              {getStatusIcon(patent.status)}
              <span className="status-text">{patent.status}</span>
            </div>
          </div>

          <div className="card-content">
            <h3 className="card-title">{patent.title}</h3>
            
            <div className="card-meta">
              <div className="meta-item">
                <FaUsers className="meta-icon" />
                <span>{patent.inventors}</span>
              </div>
              
              <div className="meta-item">
                <FaCertificate className="meta-icon" />
                <span>Patent #{patent.patentNumber || 'Pending'}</span>
              </div>
              
              {/* <div className="meta-item">
                <FaCalendarAlt className="meta-icon" />
                <span>{patent.filedDate}</span>
              </div> */}
            </div>

            <p className="card-description">{patent.abstract}</p>

            {patent.technologies && (
              <div className="card-tags">
                {patent.technologies.map((tech, idx) => (
                  <span key={idx} className="tag patent-tag">{tech}</span>
                ))}
              </div>
            )}
          </div>

          <div className="card-footer">
            {patent.url && (
              <a href={patent.url} 
                 className="card-link" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <span>View Patent</span>
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderAchievements = () => (
    <div className="content-grid achievements-grid">
      {achievementsData.map((achievement, index) => (
        <motion.div
          key={`achievement-${index}`}
          className="research-card achievement-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="card-header">
            <div className="card-icon achievement-icon">
              <FaTrophy />
            </div>
            <div className="achievement-rank">
              <span className="rank-badge">{achievement.rank || achievement.position}</span>
            </div>
          </div>

          <div className="card-content">
            <h3 className="card-title">{achievement.title}</h3>
            
            <div className="card-meta">
              <div className="meta-item">
                <FaGraduationCap className="meta-icon" />
                <span>{achievement.organization}</span>
              </div>
              
              <div className="meta-item">
                <FaCalendarAlt className="meta-icon" />
                <span>{achievement.date}</span>
              </div>
              
              {achievement.category && (
                <div className="meta-item">
                  <FaStar className="meta-icon" />
                  <span>{achievement.category}</span>
                </div>
              )}
            </div>

            <p className="card-description">{achievement.description}</p>

            {achievement.skills && (
              <div className="card-tags">
                {achievement.skills.map((skill, idx) => (
                  <span key={idx} className="tag achievement-tag">{skill}</span>
                ))}
              </div>
            )}
          </div>

          <div className="card-footer">
            {achievement.certificateUrl && (
              <a href={achievement.certificateUrl} 
                 className="card-link" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <span>View Certificate</span>
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'publications':
        return renderPublications();
      case 'patents':
        return renderPatents();
      case 'achievements':
        return renderAchievements();
      default:
        return renderPublications();
    }
  };

  return (
    <section className="research-recognition section">
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
            Research & <span className="text-gradient">Recognition</span>
          </h2>
          <p className="section-subtitle">
            Advancing the frontiers of AI and robotics through innovative research, 
            groundbreaking patents, and recognized excellence
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          className="tabs-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="tabs-nav">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                style={{ '--tab-color': tab.color }}
              >
                <tab.icon className="tab-icon" />
                <span className="tab-label">{tab.label}</span>
                <span className="tab-count">{tab.count}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          className="content-container"
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchRecognition;
