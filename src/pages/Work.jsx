import { useEffect } from 'react';
import PageHeader from '../components/PageHeader/PageHeader';
import RoleEntry from '../components/RoleEntry/RoleEntry';
import Reveal from '../components/Reveal/Reveal';
import experienceData from '../data/experience.json';
import educationData from '../data/education.json';
import certificationsData from '../data/certifications.json';
import resumePDF from '../assets/Robotics-Resume-Aug-2026.pdf';
import { trackFileDownload } from '../utils/analytics';
import './Work.css';
import './Education.css';

export default function Work({ section }) {
  useEffect(() => {
    if (section) document.getElementById(section)?.scrollIntoView();
  }, [section]);

  return (
    <div className="container">
      <PageHeader
        title="Experience"
        deck="Five and a half years building production computer vision at an agritech startup, two years leading a team in TCS Rapid Labs, and now robotics research at the University of Minnesota."
      >
        <nav className="page-jump" aria-label="On this page">
          <a href="#roles" className="link-underline">
            Roles
          </a>
          <a href="#education" className="link-underline">
            Education
          </a>
          <a
            href={resumePDF}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
            onClick={() => trackFileDownload('Resume', 'PDF')}
          >
            Résumé (PDF)
          </a>
        </nav>
      </PageHeader>

      <section id="roles" className="work-section" aria-labelledby="roles-title">
        <h2 id="roles-title" className="work-section-title">
          Roles
        </h2>
        <div className="role-list">
          {experienceData.map((role, i) => (
            <RoleEntry key={role.id} role={role} delay={i * 0.06} />
          ))}
        </div>
      </section>

      <section id="education" className="work-section" aria-labelledby="education-title">
        <h2 id="education-title" className="work-section-title">
          Education
        </h2>
        <div className="edu-list">
          {educationData.map((edu, i) => (
            <Reveal as="article" key={edu.id} className="edu-entry" delay={i * 0.08}>
              <div className="edu-entry-top">
                <div>
                  <h3>{edu.degree}</h3>
                  <p className="edu-entry-institution">
                    {edu.institution} · {edu.location}
                  </p>
                </div>
                <span className="mono edu-entry-dates">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              <p className="prose">{edu.description}</p>
              {edu.coursework?.length > 0 && (
                <div className="edu-entry-courses">
                  {edu.coursework.map((course) => (
                    <span key={course} className="tag">
                      {course}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
          {certificationsData.map((cert) => (
            <Reveal as="article" key={cert.id} className="edu-entry">
              <div className="edu-entry-top">
                <div>
                  <h3>{cert.title}</h3>
                  <p className="edu-entry-institution">{cert.issuer}</p>
                </div>
                <span className="mono edu-entry-dates">{cert.issueDate}</span>
              </div>
              <p className="prose">{cert.description}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
