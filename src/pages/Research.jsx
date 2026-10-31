import PageHeader from '../components/PageHeader/PageHeader';
import ResearchBody from './ResearchBody';
import './Research.css';

export default function Research() {
  return (
    <div className="container">
      <PageHeader
        eyebrow="cat CHANGELOG.md"
        title="Research & Recognition"
        deck="2 patents granted, 3 filed, 1 paper published — the paper trail."
      />
      <ResearchBody />
    </div>
  );
}
