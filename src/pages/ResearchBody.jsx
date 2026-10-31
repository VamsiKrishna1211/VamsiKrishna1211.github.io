import Reveal from '../components/Reveal/Reveal';
import publicationsData from '../data/publications.json';
import patentsData from '../data/patents.json';
import achievementsData from '../data/achievements.json';
import certificationsData from '../data/certifications.json';
import './Research.css';

const groups = [
  { id: 'publications', label: 'Publications', items: publicationsData },
  { id: 'patents', label: 'Patents', items: patentsData },
  { id: 'achievements', label: 'Achievements', items: achievementsData },
  { id: 'certifications', label: 'Certifications', items: certificationsData },
];

export default function ResearchBody() {
  return (
    <>
      <nav className="research-jump mono" aria-label="Jump to section">
        {groups.map((group) => (
          <a key={group.id} href={`#${group.id}`} className="link-underline">
            {group.label} ({group.items.length})
          </a>
        ))}
      </nav>

      <section id="publications" className="research-group">
        <h2>Publications</h2>
        {publicationsData.map((pub, i) => (
          <Reveal as="article" key={pub.id} className="research-item" delay={i * 0.05}>
            <h3>{pub.title}</h3>
            <p className="research-item-meta mono">
              {pub.authors.join(', ')} — {pub.year}
            </p>
            <p className="research-item-venue">{pub.journal}</p>
            {pub.keywords?.length > 0 && (
              <div className="research-item-tags">
                {pub.keywords.map((kw) => (
                  <span key={kw} className="tag">
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </Reveal>
        ))}
      </section>

      <section id="patents" className="research-group">
        <h2>Patents</h2>
        {patentsData.map((patent, i) => (
          <Reveal as="article" key={patent.id} className="research-item" delay={i * 0.05}>
            <div className="research-item-top">
              <h3>{patent.title}</h3>
              <span className="tag mono">{patent.status}</span>
            </div>
            <p className="research-item-meta mono">
              {patent.patentNumber ? `#${patent.patentNumber} — ` : ''}
              {patent.assignee}
            </p>
            <p>{patent.abstract}</p>
          </Reveal>
        ))}
      </section>

      <section id="achievements" className="research-group">
        <h2>Achievements</h2>
        {achievementsData.map((achievement, i) => (
          <Reveal as="article" key={achievement.id} className="research-item" delay={i * 0.05}>
            <h3>{achievement.title}</h3>
            <p className="research-item-meta mono">
              {achievement.organization} — {achievement.year}
            </p>
            <p>{achievement.description}</p>
          </Reveal>
        ))}
      </section>

      <section id="certifications" className="research-group">
        <h2>Certifications</h2>
        {certificationsData.map((cert, i) => (
          <Reveal as="article" key={cert.id} className="research-item" delay={i * 0.05}>
            <h3>{cert.title}</h3>
            <p className="research-item-meta mono">
              {cert.issuer} — {cert.issueDate}
            </p>
            <p>{cert.description}</p>
            {cert.skills?.length > 0 && (
              <div className="research-item-tags">
                {cert.skills.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            )}
            {cert.url && (
              <a href={cert.url} target="_blank" rel="noopener noreferrer" className="link-underline">
                View credential →
              </a>
            )}
          </Reveal>
        ))}
      </section>
    </>
  );
}
