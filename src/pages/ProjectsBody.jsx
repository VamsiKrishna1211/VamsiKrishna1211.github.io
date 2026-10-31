import ProjectCard from '../components/ProjectCard/ProjectCard';
import projectsData from '../data/projects.json';
import './Projects.css';

export default function ProjectsBody() {
  return (
    <div className="project-list">
      {projectsData.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} delay={i * 0.05} />
      ))}
    </div>
  );
}
