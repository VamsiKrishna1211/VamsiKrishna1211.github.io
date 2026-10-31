import PageHeader from '../components/PageHeader/PageHeader';
import WorkBody from './WorkBody';
import './Work.css';

export default function Work() {
  return (
    <div className="container">
      <PageHeader
        eyebrow="cat ~/skills ~/experience"
        title="Work"
        deck="What I'm good at, then where I've used it."
      />
      <WorkBody />
    </div>
  );
}
