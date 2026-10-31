import personalData from '../data/personal.json';
import './About.css';

export default function AboutBody() {
  return (
    <section className="about-section">
      <div className="about-grid">
        <p className="about-bio prose">{personalData.bio}</p>
        <div className="about-focus">
          <h2>Current focus</h2>
          <ul>
            {personalData.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
