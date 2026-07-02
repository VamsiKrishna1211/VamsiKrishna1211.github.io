import React, { useState, useRef, useLayoutEffect } from 'react';
import publicationsData from '../../data/publications.json';
import patentsData from '../../data/patents.json';
import achievementsData from '../../data/achievements.json';
import certificationsData from '../../data/certifications.json';
import { useInView } from '../../hooks/useInView';
import './ResearchRecognition.css';

const ResearchRecognition = () => {
  const containerRef = useInView();
  const [activeTab, setActiveTab] = useState('publications');
  const tabRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeEl = tabRefs.current[activeTab];
      if (activeEl) {
        setIndicatorStyle({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
      }
    };
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeTab]);

  const tabs = [
    { id: 'publications', label: 'publications', count: publicationsData.length },
    { id: 'patents', label: 'patents', count: patentsData.length },
    { id: 'achievements', label: 'achievements', count: achievementsData.length },
    { id: 'certifications', label: 'certifications', count: certificationsData.length },
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

  const renderCertifications = () => (
    <div className="research-list">
      {certificationsData.map((cert) => (
        <div key={cert.id} className="research-item card">
          <div className="achievement-top">
            <span className="achievement-icon">{cert.icon}</span>
            <div>
              <h4>{cert.title}</h4>
              <p className="research-meta">
                {cert.issuer} — <span className="code-number">{cert.issueDate}</span>
              </p>
            </div>
          </div>
          <p className="research-desc">{cert.description}</p>
          {cert.skills && (
            <div className="research-tags">
              {cert.skills.map((skill, i) => (
                <span key={i} className="tag">{skill}</span>
              ))}
            </div>
          )}
          {cert.url && (
            <a href={cert.url} target="_blank" rel="noopener noreferrer" className="research-credential-link">
              view credential
            </a>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <section ref={containerRef} className="research section">
      <div className="container">
        <h2 className="section-label">research & recognition</h2>

        {/* Tab Navigation */}
        <div className="research-tabs fade-in-up" role="tablist" aria-label="Research and recognition categories">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[tab.id] = el; }}
              role="tab"
              id={`research-tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls="research-panel"
              className={`research-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              <span className="tab-count">{tab.count}</span>
            </button>
          ))}
          <span
            className="research-tab-indicator"
            style={{ transform: `translateX(${indicatorStyle.left}px)`, width: `${indicatorStyle.width}px` }}
          />
        </div>

        {/* Tab Content — key causes remount → CSS animation fires fresh */}
        <div
          key={activeTab}
          className="research-content"
          role="tabpanel"
          id="research-panel"
          aria-labelledby={`research-tab-${activeTab}`}
        >
          {activeTab === 'publications' && renderPublications()}
          {activeTab === 'patents' && renderPatents()}
          {activeTab === 'achievements' && renderAchievements()}
          {activeTab === 'certifications' && renderCertifications()}
        </div>
      </div>
    </section>
  );
};

export default ResearchRecognition;
