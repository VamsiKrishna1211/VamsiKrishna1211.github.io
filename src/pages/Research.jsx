import PageHeader from '../components/PageHeader/PageHeader';
import Reveal from '../components/Reveal/Reveal';
import publicationsData from '../data/publications.json';
import patentsData from '../data/patents.json';
import achievementsData from '../data/achievements.json';
import './Research.css';

const granted = patentsData.filter((p) => p.status === 'Granted').length;

const groups = [
  { id: 'patents', label: 'Patents' },
  { id: 'publications', label: 'Publications' },
  { id: 'recognition', label: 'Recognition' },
];

export default function Research() {
  return (
    <div className="container">
      <PageHeader
        title="Research & Recognition"
        deck={`${granted} patents granted and ${patentsData.length - granted} more filed, all from computer vision I built for agriculture at Upjao Agrotech, plus a 2021 journal paper on speech enhancement.`}
      >
        <nav className="page-jump" aria-label="On this page">
          {groups.map((group) => (
            <a key={group.id} href={`#${group.id}`} className="link-underline">
              {group.label}
            </a>
          ))}
        </nav>
      </PageHeader>

      <section id="patents" className="research-group" aria-labelledby="patents-title">
        <h2 id="patents-title">Patents</h2>
        {patentsData.map((patent, i) => (
          <Reveal as="article" key={patent.id} className="research-item" delay={i * 0.05}>
            <div className="research-item-top">
              <h3>{patent.title}</h3>
              <span className={`research-status mono ${patent.status === 'Granted' ? 'is-granted' : ''}`}>
                {patent.status}
              </span>
            </div>
            <p className="research-item-meta mono">
              {patent.patentNumber ? `#${patent.patentNumber} · ` : ''}
              {patent.assignee}
            </p>
            <p className="prose">{patent.abstract}</p>
          </Reveal>
        ))}
      </section>

      <section id="publications" className="research-group" aria-labelledby="publications-title">
        <h2 id="publications-title">Publications</h2>
        {publicationsData.map((pub, i) => (
          <Reveal as="article" key={pub.id} className="research-item" delay={i * 0.05}>
            <h3>{pub.title}</h3>
            <p className="research-item-meta mono">
              {pub.authors.join(', ')} · {pub.year}
            </p>
            <p className="research-item-venue">
              {pub.journal}
              {pub.pages ? `, pp. ${pub.pages}` : ''}
            </p>
            {pub.abstract && <p className="prose">{pub.abstract}</p>}
          </Reveal>
        ))}
      </section>

      <section id="recognition" className="research-group" aria-labelledby="recognition-title">
        <h2 id="recognition-title">Recognition</h2>
        {achievementsData.map((achievement, i) => (
          <Reveal as="article" key={achievement.id} className="research-item" delay={i * 0.05}>
            <div className="research-item-top">
              <h3>{achievement.title}</h3>
              <span className="research-item-meta mono">{achievement.year}</span>
            </div>
            <p className="research-item-meta mono">{achievement.organization}</p>
            <p className="prose">{achievement.description}</p>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
