import PageHeader from '../components/PageHeader/PageHeader';
import ProjectsBody from './ProjectsBody';
import './Projects.css';

export default function Projects() {
  return (
    <div className="container projects-page">
      <PageHeader
        eyebrow="ls ~/projects"
        title="Projects"
        deck="eleven builds, from a solo GPS-denied drone stack to a Jacobian IK solver written from first principles"
      />
      <ProjectsBody />
    </div>
  );
}
