import PageHeader from '../components/PageHeader/PageHeader';
import Reveal from '../components/Reveal/Reveal';
import personalData from '../data/personal.json';
import skillsData from '../data/skills.json';
import { skillTiers } from '../data/skillTiers';
import profileImg from '../assets/MyImage.jpeg';
import './About.css';

export default function About() {
  return (
    <div className="container">
      <PageHeader
        title="About"
        deck="From signals and circuits, to computer vision in production, to robotics research."
      />

      <section className="about-section" aria-labelledby="story-title">
        <h2 id="story-title" className="sr-only">
          My Story
        </h2>
        <div className="about-grid">
          <div className="about-story prose">
            {personalData.story.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <aside className="about-side">
            <img src={profileImg} alt={personalData.name} className="about-photo" width="280" height="280" />
            <div className="about-focus">
              <h3>What I&rsquo;m Working On</h3>
              <ul>
                {personalData.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="about-section" aria-labelledby="skills-title">
        <h2 id="skills-title">Skills</h2>
        <p className="about-skills-key">
          <span className="tag-fill">Daily drivers</span> come first, then what I use regularly, then what I&rsquo;ve
          worked with.
        </p>
        <div className="skills-list">
          {skillsData.map((category, i) => {
            const tiers = skillTiers[category.category];
            return (
              <Reveal as="div" key={category.category} className="skill-category" delay={i * 0.05}>
                <h3>{category.category}</h3>
                <div>
                  <div className="skill-tier skill-tier-core">
                    {(tiers?.core ?? category.items).map((item) => (
                      <span key={item} className="tag-fill">
                        {item}
                      </span>
                    ))}
                  </div>
                  {tiers && (
                    <>
                      <p className="skill-tier skill-tier-working">{tiers.working.join(' · ')}</p>
                      <p className="skill-tier skill-tier-familiar mono">{tiers.familiar.join(' · ')}</p>
                    </>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
