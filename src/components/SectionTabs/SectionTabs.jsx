import { useRef, useState } from 'react';
import { Link } from '../../router/Link';
import { trackButtonClick } from '../../utils/analytics';
import AboutBody from '../../pages/AboutBody';
import WorkBody from '../../pages/WorkBody';
import ProjectsBody from '../../pages/ProjectsBody';
import ResearchBody from '../../pages/ResearchBody';
import './SectionTabs.css';

const tabs = [
  { id: 'about', label: 'Know more about me', to: '/about', eyebrow: 'whoami', Body: AboutBody },
  { id: 'work', label: 'Work', to: '/work', eyebrow: 'cat ~/skills ~/experience', Body: WorkBody },
  { id: 'projects', label: 'Projects', to: '/projects', eyebrow: 'ls ~/projects', Body: ProjectsBody },
  { id: 'research', label: 'Research & Patents', to: '/research', eyebrow: 'cat CHANGELOG.md', Body: ResearchBody },
];

export default function SectionTabs() {
  const [active, setActive] = useState(tabs[0].id);
  const tabRefs = useRef([]);

  const select = (id) => {
    setActive(id);
    trackButtonClick(`Section tab: ${id}`, 'Home tabs');
  };

  const onKeyDown = (event, index) => {
    let next = null;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    if (next === null) return;
    event.preventDefault();
    select(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  const current = tabs.find((tab) => tab.id === active) ?? tabs[0];
  const ActiveBody = current.Body;

  return (
    <section className="section-tabs">
      <div className="container">
        <p className="eyebrow muted mono">cat ~/sections</p>
        <h2 className="section-title">Explore in place</h2>
        <p className="section-deck">pick a section — it loads right here, no page jump</p>

        <div className="tabs-strip" role="tablist" aria-label="Portfolio sections">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[i] = el)}
              id={`tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={active === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={active === tab.id ? 0 : -1}
              className={`tabs-tab ${active === tab.id ? 'is-active' : ''}`}
              onClick={() => select(tab.id)}
              onKeyDown={(event) => onKeyDown(event, i)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className="tabs-panel"
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          key={current.id}
        >
          <div className="tabs-panel-head">
            <p className="eyebrow muted mono">{current.eyebrow}</p>
            <Link to={current.to} className="tabs-fulllink link-underline">
              open full {current.label === 'Know more about me' ? 'About' : current.label} page →
            </Link>
          </div>
          <ActiveBody />
        </div>
      </div>
    </section>
  );
}
