import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FaGoogleScholar } from 'react-icons/fa6';
import { Link } from '../router/Link';
import personalData from '../data/personal.json';
import heroData from '../data/hero.json';
import profileImg from '../assets/MyImage.jpeg';
import resumePDF from '../assets/Robotics-Resume-Aug-2026.pdf';
import Reveal from '../components/Reveal/Reveal';
import SectionTabs from '../components/SectionTabs/SectionTabs';
import { trackButtonClick, trackExternalLink, trackFileDownload } from '../utils/analytics';
import './Home.css';

const iconMap = { FaGithub, FaLinkedin, FaGoogleScholar, FaEnvelope };

const socialUrls = {
  GitHub: personalData.github,
  LinkedIn: personalData.linkedin,
  'Google Scholar': personalData.scholar,
  Email: `mailto:${personalData.email}`,
};

const socialLinks = heroData.socialLinks.map((link) => ({
  platform: link.platform,
  url: socialUrls[link.platform],
  icon: iconMap[link.icon],
}));

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1 className="hero-name">{personalData.name}</h1>
            <p className="hero-subtitle">{personalData.subtitle}</p>
            <h2 className="hero-tagline">{personalData.tagline}</h2>
            <p className="hero-bio prose">{personalData.bio}</p>
            <div className="hero-actions">
              <a
                href={resumePDF}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                onClick={() => trackFileDownload('Resume', 'PDF')}
              >
                grab my resume
              </a>
              <Link
                to="/contact"
                className="btn"
                onClick={() => trackButtonClick('Navigate to contact', 'Hero')}
              >
                let&rsquo;s talk →
              </Link>
            </div>
          </div>

          <div className="hero-side">
            <img src={profileImg} alt={personalData.name} className="hero-photo" />
            <div className="hero-status">
              <span className="status-dot" aria-hidden="true" />
              <span className="mono">{personalData.status}</span>
            </div>
            <div className="hero-links">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-link"
                  onClick={() => trackExternalLink(link.url, link.platform)}
                >
                  <link.icon size={14} aria-hidden="true" />
                  <span>{link.platform.toLowerCase()}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="stats-band">
        <div className="container stats-grid">
          {personalData.stats.map((stat, i) => (
            <Reveal as="div" key={stat.label} className="stat" delay={i * 0.05}>
              <span className={`stat-value ${stat.value.length > 4 ? 'stat-value-compact mono' : 'display-2'}`}>
                {stat.value}
              </span>
              <span className="stat-label mono">{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionTabs />

      <section className="section focus-section">
        <div className="container">
          <p className="eyebrow muted mono">cat ~/.focus</p>
          <h2 className="section-title">Currently digging into</h2>
          <div className="focus-grid">
            {personalData.focus.map((item, i) => (
              <Reveal as="div" key={item} className="focus-item" delay={i * 0.05}>
                <span className="focus-number mono">{String(i + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="container contact-cta-inner">
          <div>
            <p className="mono contact-cta-email">{personalData.email}</p>
            <p className="contact-cta-location">{personalData.location}</p>
          </div>
          <Link to="/contact" className="btn btn-primary">
            Say hello →
          </Link>
        </div>
      </section>
    </>
  );
}
