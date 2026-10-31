import RoleEntry from '../components/RoleEntry/RoleEntry';
import Reveal from '../components/Reveal/Reveal';
import experienceData from '../data/experience.json';
import skillsData from '../data/skills.json';
import { skillTiers } from '../data/skillTiers';
import './Work.css';

export default function WorkBody() {
  return (
    <>
      <section className="work-section">
        <h2 className="work-section-title">Skills</h2>
        <div className="skills-list">
          {skillsData.map((category, i) => {
            const tiers = skillTiers[category.category];
            return (
              <Reveal as="div" key={category.category} className="skill-category" delay={i * 0.05}>
                <h3>{category.category}</h3>
                {tiers ? (
                  <>
                    <div className="skill-tier skill-tier-core">
                      {tiers.core.map((item) => (
                        <span key={item} className="tag-fill">
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className="skill-tier skill-tier-working">{tiers.working.join(' · ')}</p>
                    <p className="skill-tier skill-tier-familiar mono">{tiers.familiar.join(' · ')}</p>
                  </>
                ) : (
                  <div className="skill-tier skill-tier-core">
                    {category.items.map((item) => (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="work-section">
        <h2 className="work-section-title">Roles</h2>
        <div className="role-list">
          {experienceData.map((role, i) => (
            <RoleEntry key={role.id} role={role} delay={i * 0.06} />
          ))}
        </div>
      </section>
    </>
  );
}
