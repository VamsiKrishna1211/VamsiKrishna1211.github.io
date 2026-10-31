import { useMemo, useState } from 'react';
import { Link } from '../router/Link';
import { usePath } from '../router/Router';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import projectsData from '../data/projects.json';
import { posterFor } from '../data/projectMedia';
import NotFound from './NotFound';
import './ProjectDetail.css';

function youtubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  return match ? match[1] : null;
}

export default function ProjectDetail({ params }) {
  const path = usePath();
  const index = projectsData.findIndex((p) => p.slug === params.slug);
  const project = index === -1 ? null : projectsData[index];
  const next = projectsData[(index + 1) % projectsData.length];
  const [playing, setPlaying] = useState(false);

  const meta = useMemo(
    () =>
      project
        ? { title: `${project.title} — Vamsi Krishna Kocherla`, description: project.description }
        : undefined,
    [project]
  );
  useDocumentMeta(path, meta);

  if (!project) return <NotFound />;

  const poster = posterFor(project.slug);
  const videoId = youtubeId(project.video);

  return (
    <div className="container project-detail">
      <Link to="/projects" className="back-link mono">
        ← Projects
      </Link>

      <header className="project-detail-header">
        <div className="eyebrow-row">
          <span className="eyebrow">{project.category}</span>
          <span className="eyebrow-dot" aria-hidden="true" />
          <span className="mono project-detail-status">{project.status}</span>
        </div>
        <h1 className="project-detail-title">{project.title}</h1>
        <p className="project-detail-desc prose">{project.description}</p>
      </header>

      {videoId && poster && (
        <div className="project-detail-video">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
              title={`${project.title} demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="project-detail-video-facade"
              onClick={() => setPlaying(true)}
              aria-label={`Play demo video for ${project.title}`}
            >
              <img src={poster} alt="" loading="lazy" decoding="async" width="960" height="540" />
              <span className="project-detail-play" aria-hidden="true">
                ▶ watch demo
              </span>
            </button>
          )}
        </div>
      )}

      {project.headline && (
        <div className="project-detail-metrics mono">
          {project.headline.split('·').map((metric) => (
            <span key={metric.trim()}>{metric.trim()}</span>
          ))}
        </div>
      )}

      <div className="project-detail-body">
        <div>
          <h2>What I Built</h2>
          <ul>
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>What It Taught Me</h2>
          <ul>
            {project.learned.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="project-detail-tech">
        <div className="tech-row">
          <span className="tech-row-label mono">Stack</span>
          <div className="tech-row-tags">
            {project.technologies.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
        {project.frameworks?.length > 0 && (
          <div className="tech-row">
            <span className="tech-row-label mono">Frameworks</span>
            <div className="tech-row-tags">
              {project.frameworks.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="project-detail-links">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            View the code →
          </a>
        )}
        {project.video && !(videoId && poster) && (
          <a href={project.video} target="_blank" rel="noopener noreferrer" className="btn">
            Watch demo
          </a>
        )}
      </div>

      <nav className="project-detail-footer" aria-label="More projects">
        <Link to="/projects" className="link-underline mono">
          ← All projects
        </Link>
        <Link to={`/projects/${next.slug}`} className="project-detail-next">
          <span className="mono">Next project</span>
          <span className="project-detail-next-title">{next.title} →</span>
        </Link>
      </nav>
    </div>
  );
}
