import PageHeader from '../components/PageHeader/PageHeader';
import AboutBody from './AboutBody';
import './About.css';

export default function About() {
  return (
    <div className="container">
      <PageHeader eyebrow="whoami" title="About" deck="ECE undergrad to farm-equipment CV to debugging IMU timestamps at UMN." />
      <AboutBody />
    </div>
  );
}
