import PageHeader from '../components/PageHeader/PageHeader';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import Reveal from '../components/Reveal/Reveal';
import { Link } from '../router/Link';
import projectsData from '../data/projects.json';
import './Projects.css';

const featured = projectsData.filter((p) => p.featured);
const others = projectsData.filter((p) => !p.featured);

export default function Projects() {
  return (
    <div className="container projects-page">
      <PageHeader
        title="Projects"
        deck={`${projectsData.length} builds, from a solo GPS-denied drone to a Jacobian IK solver written from first principles. Each one opens to what I built, what it taught me, and the code.`}
      />

      <section className="projects-group" aria-labelledby="featured-title">
        <h2 id="featured-title" className="projects-group-title">
          Featured
        </h2>
        <div className="project-list">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.05} />
          ))}
        </div>
      </section>

      <section className="projects-group" aria-labelledby="more-title">
        <h2 id="more-title" className="projects-group-title">
          More Projects
        </h2>
        <ul className="project-index">
          {others.map((project, i) => (
            <Reveal as="li" key={project.id} delay={i * 0.04}>
              <Link to={`/projects/${project.slug}`} className="project-index-row">
                <span className="project-index-title">{project.title}</span>
                <span className="project-index-category mono">{project.category}</span>
                <span className="project-index-headline">{project.headline}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
