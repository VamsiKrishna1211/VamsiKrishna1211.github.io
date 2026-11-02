import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FaGoogleScholar } from 'react-icons/fa6';
import { Link } from '../router/Link';
import personalData from '../data/personal.json';
import heroData from '../data/hero.json';
import experienceData from '../data/experience.json';
import projectsData from '../data/projects.json';
import patentsData from '../data/patents.json';
import publicationsData from '../data/publications.json';
import { posterFor } from '../data/projectMedia';
import profileImg from '../assets/MyImage.jpeg';
import resumePDF from '../assets/Robotics-Resume-Aug-2026.pdf';
import Reveal from '../components/Reveal/Reveal';
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

const selectedProjects = projectsData.filter((p) => p.featured && posterFor(p.slug)).slice(0, 4);
const grantedPatents = patentsData.filter((p) => p.status === 'Granted');
const pendingPatents = patentsData.length - grantedPatents.length;
const publication = publicationsData[0];

function SectionHead({ id, title, deck, to, linkLabel }) {
  return (
    <div className="home-head">
      <div>
        <h2 id={id} className="section-title">
          {title}
        </h2>
        {deck && <p className="home-deck">{deck}</p>}
      </div>
      <Link to={to} className="home-more link-underline">
        {linkLabel} →
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1 className="hero-name">{personalData.name}</h1>
            <p className="hero-subtitle">{personalData.subtitle}</p>
            <p className="hero-tagline">{personalData.tagline}</p>
            <p className="hero-bio prose">{personalData.bio}</p>
            <div className="hero-actions">
              <a
                href={resumePDF}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                onClick={() => trackFileDownload('Resume', 'PDF')}
              >
                Download résumé
              </a>
              <Link
                to="/contact"
                className="btn"
                onClick={() => trackButtonClick('Navigate to contact', 'Hero')}
              >
                Get in touch →
              </Link>
            </div>
          </div>

          <div className="hero-side">
            <img src={profileImg} alt={personalData.name} className="hero-photo" width="168" height="168" />
            <div className="hero-status">
              <span className="status-dot" aria-hidden="true" />
              <span>{personalData.status}</span>
            </div>
            <ul className="hero-links">
              {socialLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    target={link.platform === 'Email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="hero-link"
                    onClick={() => trackExternalLink(link.url, link.platform)}
                  >
                    <link.icon size={14} aria-hidden="true" />
                    <span>{link.platform}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label="At a glance">
        <div className="container stats-grid">
          {personalData.stats.map((stat) => (
            <div key={stat.label} className="stat">
              <span className={`stat-value ${stat.value.length > 4 ? 'stat-value-compact' : 'display-2'}`}>
                {stat.value}
              </span>
              <span className="stat-label mono">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="home-experience">
        <div className="container">
          <SectionHead
            id="home-experience"
            title="Experience"
            deck="Production computer vision first, robotics research now."
            to="/work"
            linkLabel="Full experience"
          />
          <ol className="timeline">
            {experienceData.map((role, i) => (
              <Reveal as="li" key={role.id} className="timeline-row" delay={i * 0.05}>
                <span className="timeline-dates mono">
                  {role.startDate} – {role.endDate}
                </span>
                <div className="timeline-body">
                  <h3 className="timeline-role">{role.position}</h3>
                  <p className="timeline-company">{role.company}</p>
                </div>
                <p className="timeline-headline mono">{role.headline}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="home-projects">
        <div className="container">
          <SectionHead
            id="home-projects"
            title="Selected Projects"
            deck="SLAM, 3D mapping, and learning-based control, each with a demo video."
            to="/projects"
            linkLabel={`All ${projectsData.length} projects`}
          />
          <ul className="picks">
            {selectedProjects.map((project, i) => (
              <Reveal as="li" key={project.slug} delay={i * 0.05}>
                <Link to={`/projects/${project.slug}`} className="pick">
                  <span className="pick-media">
                    <img src={posterFor(project.slug)} alt="" loading="lazy" decoding="async" width="640" height="360" />
                  </span>
                  <span className="pick-category mono">{project.category}</span>
                  <span className="pick-title">{project.title}</span>
                  <span className="pick-headline">{project.headline}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="home-research">
        <div className="container">
          <SectionHead
            id="home-research"
            title="Patents & Publications"
            deck={`${grantedPatents.length} patents granted and ${pendingPatents} more filed, all from computer vision I built for agriculture.`}
            to="/research"
            linkLabel="Research & recognition"
          />
          <ul className="papers">
            {grantedPatents.map((patent) => (
              <li key={patent.id} className="paper">
                <span className="paper-kind mono">Patent · {patent.status}</span>
                <h3 className="paper-title">{patent.title}</h3>
                <p className="paper-meta mono">
                  #{patent.patentNumber} · {patent.assignee}
                </p>
              </li>
            ))}
            {publication && (
              <li className="paper">
                <span className="paper-kind mono">Paper · {publication.year}</span>
                <h3 className="paper-title">{publication.title}</h3>
                <p className="paper-meta mono">{publication.journal}</p>
              </li>
            )}
          </ul>
        </div>
      </section>

      <section className="contact-cta">
        <div className="container contact-cta-inner">
          <div>
            <h2 className="contact-cta-title">Hiring for robotics or perception?</h2>
            <p className="contact-cta-text">
              I graduate in January 2027 and I&rsquo;m looking for full-time roles. Write to{' '}
              <a href={`mailto:${personalData.email}`} className="link-underline contact-cta-email">
                {personalData.email}
              </a>{' '}
              or use the form.
            </p>
          </div>
          <Link to="/contact" className="btn btn-primary">
            Get in touch →
          </Link>
        </div>
      </section>
    </>
  );
}
