import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import publicationsData from '../../data/publications.json';
import patentsData from '../../data/patents.json';
import achievementsData from '../../data/achievements.json';
import './ResearchRecognition.css';

const ResearchRecognition = () => {
  const [activeTab, setActiveTab] = useState('publications');

  const tabs = [
    { id: 'publications', label: 'publications', count: publicationsData.length },
    { id: 'patents', label: 'patents', count: patentsData.length },
    { id: 'achievements', label: 'achievements', count: achievementsData.length },
  ];

  const renderPublications = () => (
    <div className="research-list">
      {publicationsData.map((pub) => (
        <div key={pub.id} className="research-item card">
          <h4>{pub.title}</h4>
          <p className="research-meta">
            {pub.authors.join(', ')} — <span className="code-number">{pub.year}</span>
          </p>
          <p className="research-venue">{pub.journal}</p>
          {pub.keywords && (
            <div className="research-tags">
              {pub.keywords.map((kw, i) => (
                <span key={i} className="tag">{kw}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderPatents = () => (
    <div className="research-list">
      {patentsData.map((patent) => (
        <div key={patent.id} className="research-item card">
          <div className="patent-top">
            <h4>{patent.title}</h4>
            <span className={`patent-status status-${patent.status.toLowerCase()}`}>
              {patent.status}
            </span>
          </div>
          <p className="research-meta">
            #{patent.patentNumber} — {patent.assignee}
          </p>
          <p className="research-desc">{patent.abstract}</p>
        </div>
      ))}
    </div>
  );

  const renderAchievements = () => (
    <div className="research-list">
      {achievementsData.map((ach) => (
        <div key={ach.id} className="research-item card">
          <div className="achievement-top">
            <span className="achievement-icon">{ach.icon}</span>
            <div>
              <h4>{ach.title}</h4>
              <p className="research-meta">
                {ach.organization} — <span className="code-number">{ach.year}</span>
              </p>
            </div>
          </div>
          <p className="research-desc">{ach.description}</p>
        </div>
      ))}
    </div>
  );

  return (
    <section className="research section">
      <div className="container">
        <span className="section-label">research & recognition</span>

        {/* Tab Navigation */}
        <div className="research-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`research-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              <span className="tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'publications' && renderPublications()}
          {activeTab === 'patents' && renderPatents()}
          {activeTab === 'achievements' && renderAchievements()}
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchRecognition;
