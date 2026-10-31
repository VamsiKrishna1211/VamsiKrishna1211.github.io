import PageHeader from '../components/PageHeader/PageHeader';
import Reveal from '../components/Reveal/Reveal';
import educationData from '../data/education.json';
import './Education.css';

export default function Education() {
  return (
    <div className="container">
      <PageHeader eyebrow="cat ~/education" title="Education" deck="Two degrees, one detour through signal processing." />

      <div className="edu-list">
        {educationData.map((edu, i) => (
          <Reveal as="article" key={edu.id} className="edu-entry" delay={i * 0.08}>
            <div className="edu-entry-top">
              <div>
                <h3>{edu.degree}</h3>
                <p className="edu-entry-institution">{edu.institution}</p>
              </div>
              <span className="mono edu-entry-dates">
                {edu.startDate} — {edu.endDate}
              </span>
            </div>
            <p className="prose">{edu.description}</p>
            {edu.coursework?.length > 0 && (
              <div className="edu-entry-courses">
                {edu.coursework.map((course) => (
                  <span key={course} className="tag">
                    {course}
                  </span>
                ))}
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
