import Reveal from '../Reveal/Reveal';
import './RoleEntry.css';

const SHOWN = 5;

export default function RoleEntry({ role, delay = 0 }) {
  return (
    <Reveal as="article" className="role-entry" delay={delay}>
      <div className="role-entry-top">
        <div>
          <h3 className="role-entry-position">{role.position}</h3>
          <p className="role-entry-company">
            {role.company} · {role.location}
          </p>
        </div>
        <div className="role-entry-meta">
          <span className="mono">
            {role.startDate} – {role.endDate}
          </span>
          <span className="tag">{role.type}</span>
        </div>
      </div>

      {role.headline && <p className="role-entry-headline mono">{role.headline}</p>}

      {role.description && <p className="role-entry-desc prose">{role.description}</p>}

      <ul className="role-entry-achievements">
        {role.achievements.slice(0, SHOWN).map((achievement) => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>

      {role.achievements.length > SHOWN && (
        <details className="role-entry-more">
          <summary>{role.achievements.length - SHOWN} more from this role</summary>
          <ul className="role-entry-achievements">
            {role.achievements.slice(SHOWN).map((achievement) => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        </details>
      )}

      <div className="role-entry-tech">
        {role.technologies.slice(0, 10).map((tech) => (
          <span key={tech} className="tag">
            {tech}
          </span>
        ))}
      </div>
    </Reveal>
  );
}
