import { Link } from '../../router/Link';
import Reveal from '../Reveal/Reveal';
import { posterFor } from '../../data/projectMedia';
import './ProjectCard.css';

export default function ProjectCard({ project, delay = 0 }) {
  const poster = posterFor(project.slug);

  return (
    <Reveal as="article" className="project-row" delay={delay}>
      <Link to={`/projects/${project.slug}`} className={`project-row-link${poster ? ' has-poster' : ''}`}>
        {poster && (
          <div className="project-row-media">
            <img src={poster} alt="" loading="lazy" decoding="async" width="640" height="360" />
            {project.video && (
              <span className="project-row-play" aria-hidden="true">
                ▶ demo
              </span>
            )}
          </div>
        )}
        <div className="project-row-body">
          <span className="project-row-category mono">{project.category}</span>
          <div className="project-row-top">
            <h3 className="project-row-title">{project.title}</h3>
            <span className="project-row-arrow" aria-hidden="true">
              →
            </span>
          </div>
          {project.headline && <p className="project-row-headline mono">{project.headline}</p>}
          <p className="project-row-desc">{project.description}</p>
          <div className="project-row-tags">
            {project.technologies.slice(0, 6).map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
