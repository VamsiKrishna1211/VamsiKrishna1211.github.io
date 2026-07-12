import React from 'react';
import './Hero.css';
import profile_img from '../../assets/MyImage.jpeg';
import resumePDF from '../../assets/Robotics-Resume-Mar-2026.pdf';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FaGoogleScholar } from 'react-icons/fa6';
import heroData from '../../data/hero.json';
import personalData from '../../data/personal.json';
import { trackButtonClick, trackExternalLink, trackFileDownload } from '../../utils/analytics';

const ASCII_ROBOT = `
   ┌───────┐
   │ ◉   ◉ │
   │   ▽   │
   └──┬─┬──┘
   ┌──┴─┴──┐
   │ ╔═══╗ │
   │ ║ ♥ ║ │
   │ ╚═══╝ │
   └──┬─┬──┘
      │ │
     ─┘ └─
`;

const Hero = () => {
    const iconMap = { FaGithub, FaLinkedin, FaGoogleScholar, FaEnvelope };

    const socialUrls = {
        GitHub: personalData.github,
        LinkedIn: personalData.linkedin,
        'Google Scholar': personalData.scholar,
        Email: `mailto:${personalData.email}`,
    };

    const handleAction = (action) => {
        if (action.type === 'scroll') {
            trackButtonClick(`Navigate to ${action.target}`, 'Hero Section');
            window.history.pushState(null, null, `#${action.target}`);
            const targetSection = document.getElementById(action.target);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
  };

    const handleSocialClick = (link) => {
        trackExternalLink(link.url, link.platform);
    };

    const handleResumeDownload = () => {
        trackFileDownload('Resume', 'PDF');
    };

    return (
        <div className="hero">
            <div className="hero-left">
                <div className="hero-avatar-wrap">
                    <div className="hero-img-frame reticle">
                        <img src={profile_img} alt={personalData.name} className="hero-img" />
                    </div>
                    <pre className="ascii-robot" aria-hidden="true">{ASCII_ROBOT}</pre>
                </div>

              {/* Status indicator */}
              <div className="hero-status">
                  <span className="status-dot" />
                  <span className="status-text">{personalData.status}</span>
              </div>

              {/* Social links */}
              <div className="hero-links">
                  {heroData.socialLinks.map((link, index) => {
                      const IconComponent = iconMap[link.icon];
                      const url = socialUrls[link.platform];
                      return (
                          <a
                              key={index}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={link.platform}
                              className="hero-social-link"
                              onClick={() => handleSocialClick({ ...link, url })}
                          >
                              <IconComponent size={14} />
                              <span>{link.platform.toLowerCase()}</span>
                          </a>
                      );
          })}
              </div>
          </div>

          <div className="hero-right">
              <h1 className="hero-name">
                  <span className="code-keyword">const</span> engineer{' '}
                  <span className="code-keyword">=</span>{' '}
                  <span className="code-string">&quot;{personalData.name}&quot;</span>;
              </h1>

              {/* Tagline — the hook */}
              <h2 className="hero-tagline">{personalData.tagline}</h2>

              {/* North star — the three pillars this site is centered on */}
              <div className="hero-pillars" aria-label="Focus areas">
                  {personalData.pillars.map((pillar) => (
                      <span key={pillar} className="tag hero-pillar">{pillar}</span>
                  ))}
              </div>

              <div className="hero-terminal">
                  <div className="terminal-header">
                      <span className="terminal-dot dot-red" />
                      <span className="terminal-dot dot-amber" />
                      <span className="terminal-dot dot-green" />
                      <span className="terminal-title">~/portfolio</span>
                  </div>
                  <div className="terminal-body">
                      <div className="terminal-line">
                          <span className="t-prompt">$</span>
                          <span className="t-cmd"> cat</span>
                          <span className="t-string"> intro.md</span>
                      </div>

                      <div className="terminal-output intro-text">
                          {heroData.introduction.paragraphs.map((p, i) => (
                              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                          ))}
                      </div>

                      <div className="terminal-line">
                          <span className="t-prompt">$</span>
                          <span className="t-cmd"> ls</span>
                          <span className="t-string"> passions/</span>
                      </div>
                      <ul className="terminal-list">
                          {heroData.introduction.passions.map((passion, i) => (
                              <li key={i}>
                                  <span className="list-marker">├──</span> {passion}
                              </li>
                          ))}
                      </ul>

                      <div className="terminal-line cursor-blink">
                          <span className="t-prompt">$</span>
                      </div>
                  </div>
              </div>

              {/* Action Buttons */}
              <div className="hero-actions">
                  {heroData.actions.map((action, index) => {
                      if (action.type === 'scroll') {
                          return (
                              <button
                                  key={index}
                                  className="btn btn-primary"
                                  onClick={() => handleAction(action)}
                              >
                                  {action.text}
                              </button>
                          );
            } else if (action.type === 'download') {
                  return (
                      <a
                          key={index}
                          href={resumePDF}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn"
                          onClick={handleResumeDownload}
                      >
                          {action.text}
                      </a>
                  );
              }
              return null;
          })}
              </div>
          </div>
      </div>
  );
};

export default Hero;
