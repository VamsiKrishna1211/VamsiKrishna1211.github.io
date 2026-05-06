# AGENTS.md

Guide for AI agents (and humans) working on this codebase. Read this before making changes.

---

## Project Overview

A minimalist, code-editor-themed personal portfolio for a Robotics & Computer Vision engineer. Deployed at [vamsikrishna1211.github.io](https://vamsikrishna1211.github.io/).

**Stack**: React 18 · Vite 5 · Framer Motion · Vanilla CSS · Google Analytics 4
**Theme**: Terminal/code-editor aesthetic — JetBrains Mono font, syntax-highlighting color palette, ASCII art, CLI-style UI elements
**Deployment**: GitHub Pages via GitHub Actions (push to `main` triggers deploy)

---

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server on `localhost:5173` |
| `npm run build` | Production build to `dist/` |
| `npm run lint` | ESLint with zero-warning policy |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Manual deploy to GitHub Pages (`gh-pages -d dist`) |
| `npm run test` | Run Selenium test runner |
| `npm run test:selenium` | Run Mocha-based Selenium suite (requires running dev server) |
| `npm run test:dev` | Start dev server + run Selenium tests concurrently |

**Always run `npm run lint` before committing.** The config is at `.eslintrc.cjs` with `--max-warnings 0`.

---

## Project Structure

```
├── index.html              # Entry HTML — SEO meta, Open Graph, JSON-LD, Google Analytics, font imports
├── vite.config.js          # Vite config — manual chunks for vendor/three/animations
├── .eslintrc.cjs           # ESLint — React 18, hooks, refresh plugins
├── .env                    # VITE_GA_MEASUREMENT_ID (gitignored)
├── .env.example            # Empty — should document VITE_GA_MEASUREMENT_ID
├── plugins/
│   └── html-env-replace.js # Empty/vestigial — unused
├── public/
│   ├── .nojekyll           # Prevents GitHub Pages Jekyll processing
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── main.jsx            # ReactDOM.createRoot entry point
│   ├── App.jsx             # Root component — lazy loads all sections, analytics init
│   ├── App.css             # ⚠ LEGACY — leftover Vite boilerplate, not actively used
│   ├── index.css           # ⚠ LEGACY — leftover Vite boilerplate, conflicts with globals.css
│   ├── assets/             # Profile image, resume PDFs, SVGs
│   ├── components/         # React components (each folder = .jsx + .css)
│   │   ├── About/              # Code-block bio with line numbers
│   │   ├── Achievements/       # ⚠ ORPHANED — rendered inside ResearchRecognition, not in App.jsx
│   │   ├── Background/         # CSS-only dot grid + scan line (no Three.js)
│   │   ├── Certifications/     # Certification cards
│   │   ├── Contact/            # mailto:-based form, analytics tracking
│   │   ├── CookieBanner/       # GA4 consent management (localStorage)
│   │   ├── Education/          # Degree cards with coursework tags
│   │   ├── Experience/         # Timeline with left-border pseudo-element
│   │   ├── Extras/             # Additional content
│   │   ├── Favicon/            # ⚠ DEAD — hidden div, does nothing
│   │   ├── Footer/             # Code-comment themed footer
│   │   ├── Hero/               # Terminal/CLI intro, ASCII robot, icon mapping
│   │   ├── Loading/            # Terminal-themed Suspense fallback
│   │   ├── Navbar/             # Hash-based routing, scroll detection, hamburger menu
│   │   ├── Particles/          # Particle effects
│   │   ├── Patents/            # ⚠ ORPHANED — rendered inside ResearchRecognition, not in App.jsx
│   │   ├── Projects/           # Show-more toggle, featured badges
│   │   ├── Publications/       # ⚠ ORPHANED — rendered inside ResearchRecognition, not in App.jsx
│   │   ├── ResearchRecognition/ # Tabbed UI: publications + patents + achievements
│   │   ├── SectionDivider/     # Section separators
│   │   └── Skills/             # Category grid with emoji icons
│   ├── data/               # ← ALL CONTENT LIVES HERE (JSON-driven)
│   │   ├── personal.json       # Name, bio, stats, focus, contact info, avatar, resume path
│   │   ├── hero.json           # Profile, social links, tagline, paragraphs, passions, actions
│   │   ├── experience.json     # Work entries with achievements, technologies, headline metrics
│   │   ├── projects.json       # Project cards with tech stacks, links, featured flags
│   │   ├── skills.json         # Skill categories with emoji icons and tag arrays
│   │   ├── education.json      # Degrees, GPA, coursework, status
│   │   ├── publications.json   # Papers with authors, journal, DOI, keywords, citations
│   │   ├── patents.json        # Patents with status, filing/grant dates, inventors, claims
│   │   ├── achievements.json   # Awards, organizations, year, type, icon
│   │   └── certifications.json # Issuer, dates, credential ID, skills, URL
│   ├── hooks/
│   │   ├── useAnalyticsTracking.js  # Intersection Observer → GA section view events
│   │   ├── useHashRouting.js        # Hash-based deep linking with retry polling
│   │   └── useScrollAnimation.js    # ⚠ DEAD — exports variants used by nothing
│   ├── styles/
│   │   └── globals.css        # THE design system — CSS variables, base styles, utilities
│   └── utils/
│       └── analytics.js       # GA4 wrapper (initGA, trackPageView, trackEvent, etc.)
└── tests/
    └── selenium/              # E2E tests (Selenium + Mocha + ChromeDriver)
        ├── portfolio-comprehensive.test.cjs  # Main test suite
        ├── portfolio.test.js                 # Basic standalone tests
        ├── simple-test.cjs                   # Single page load test
        ├── debug-test.cjs                    # Non-headless debug test
        └── run-tests.cjs                     # Auto-start dev server + run tests
```

---

## Architecture & Data Flow

### JSON-Driven Content

All portfolio content lives in `src/data/*.json`. Components import their data directly — no API calls, no state management library, no context providers.

```
src/data/*.json ──direct import──> Component.jsx ──render──> JSX
```

**To update content**: Edit the JSON files. No JSX changes needed.
**To add a new data field**: Add it to the relevant JSON, then update the component that reads it.

### Component-Data Mapping

| JSON File | Component(s) That Import It | Notes |
|-----------|---------------------------|-------|
| `personal.json` | About, Contact, Footer, Hero | Shared across 4 components — overlaps with hero.json |
| `hero.json` | Hero | Contains profile, social links (duplicated in personal.json) |
| `experience.json` | Experience | — |
| `projects.json` | Projects | — |
| `skills.json` | Skills | — |
| `education.json` | Education | — |
| `publications.json` | Publications (orphaned), ResearchRecognition (active) | Dual import path |
| `patents.json` | Patents (orphaned), ResearchRecognition (active) | Dual import path |
| `achievements.json` | Achievements (orphaned), ResearchRecognition (active) | Dual import path |
| `certifications.json` | Certifications | — |

### App Assembly (App.jsx)

- All section components are **lazy-loaded** via `React.lazy()` + `Suspense`
- Each section is wrapped in `<motion.section>` with an `id` for hash routing
- `useHashRouting()` handles deep links
- `useAnalyticsTracking()` tracks section views via Intersection Observer
- GA4 is initialized only if `VITE_GA_MEASUREMENT_ID` env var is set and non-default
- Section order: BackgroundAnimation → Navbar → Hero → About → Experience → Projects → Skills → Education → ResearchRecognition → Contact → Footer → CookieBanner

---

## Code Conventions

### Component Pattern

```jsx
import { motion } from 'framer-motion';
import dataFile from '../../data/something.json';
import './ComponentName.css';

const ComponentName = () => {
  // Minimal state (useState only when needed, e.g., showAll toggle, form data)
  // No props — components are self-contained, reading their own JSON data

  return (
    <section className="component-name" id="section-id">
      <div className="container">
        <span className="section-label">Display Name</span>
        {/* Content rendered from JSON */}
        {dataFile.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Card content */}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ComponentName;
```

**Key conventions:**

- **Functional components only** — no class components
- **No props** — each component imports its own data
- **Default exports** — `export default ComponentName`
- **Arrow functions** — `const ComponentName = () => {}` (exception: CookieBanner uses `export default function`)
- **One component per folder** — `ComponentName/ComponentName.jsx` + `ComponentName/ComponentName.css`
- **Data comes from JSON** — never hardcode content in JSX

### CSS Conventions

- **Plain CSS files** — no Tailwind, no CSS Modules, no CSS-in-JS
- **BEM-lite naming** — component-prefixed flat names: `.exp-card`, `.exp-top`, `.exp-dates` (not strict BEM `block__element--modifier`)
- **Global scope** — all styles are global; no scoping or collision protection
- **CSS custom properties** in `globals.css` — always use `var(--token)` not raw values
- **No `App.css` or `index.css`** — these are legacy Vite boilerplate; `globals.css` is the single source of truth

### Design Tokens (globals.css)

```css
/* Syntax-Highlighting Palette */
--green: #98c379;    /* strings, tags, success */
--cyan: #56b6c2;     /* keywords, links, primary accent */
--amber: #e5c07b;    /* numbers, constants, highlights */
--purple: #c678dd;   /* functions, special */
--red: #e06c75;      /* errors, accents */
--blue: #61afef;     /* variables, hover states */
--orange: #d19a66;   /* decorators */
--comment: #5c6370;  /* comments, muted text */

/* Backgrounds */
--bg-primary: #1e1e2e;
--bg-secondary: #282a36;
--bg-card: #21222c;
--bg-elevated: #2c2d3a;

/* Fonts */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
--font-sans: 'Inter', system-ui, sans-serif;

/* Spacing Scale */
--space-xs: 0.25rem → --space-3xl: 4rem

/* Border Radius */
--radius-sm: 4px; --radius-md: 8px; --radius-lg: 12px; --radius-full: 9999px;
```

### Animation Pattern

**Use inline framer-motion props** — this is the established pattern:

```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
  viewport={{ once: true }}
>
```

**Do NOT use** `useScrollAnimation.js` — it exports `fadeInUp`, `staggerContainer`, etc. but **no component uses them**. They are dead code.

**Common stagger delays:** `index * 0.05` (Skills), `index * 0.08` (Projects), `index * 0.1` (Education, Experience), `index * 0.2` (Achievements, Certifications)

### Section Labeling

Two competing patterns exist in the codebase. **Use `.section-label` for new components** — it's the more common and more on-theme pattern:

| Pattern | CSS | Used By |
|---------|-----|---------|
| `.section-label` | `// Section Name` via `::before` pseudo-element | About, Education, Skills, Projects, ResearchRecognition |
| `.section-header` + `.section-title` + `.text-gradient` | Heading-style | Achievements, Certifications, Publications, Patents (all orphaned) |

### Code-Theme Utility Classes

Use these for on-theme inline syntax highlighting:

```html
<span className="code-comment">/* muted text */</span>
<span className="code-keyword">keyword</span>
<span className="code-string">"string value"</span>
<span className="code-number">42</span>
<span className="code-function">functionName()</span>
<span className="code-variable">variableName</span>
<span className="text-gradient">cyan accent text</span>
```

### Analytics Integration

Import tracking functions from `../../utils/analytics`:

```jsx
import { trackButtonClick, trackExternalLink, trackFileDownload } from '../../utils/analytics';

// Use on click handlers:
onClick={() => trackButtonClick('resume_download', 'hero')}
```

Available: `trackEvent`, `trackPageView`, `trackSectionView`, `trackButtonClick`, `trackFormSubmission`, `trackFileDownload`, `trackExternalLink`

### Icon Usage

Use `react-icons/fa` (Font Awesome) — already a project dependency:

```jsx
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FaGoogleScholar } from 'react-icons/fa6'; // FA6 for scholar icon
```

---

## Making Changes

### Adding a New Section

1. Create `src/data/newsection.json` with your data
2. Create `src/components/NewSection/NewSection.jsx` + `NewSection.css`
3. Follow the component pattern (functional, self-serve JSON import, framer-motion whileInView)
4. Add lazy import in `App.jsx`: `const NewSection = lazy(() => import('./components/NewSection/NewSection'));`
5. Add `<motion.section>` wrapper in `App.jsx` with `id`, `ref` for analytics, and `fadeIn` spread
6. Add `useAnalyticsTracking('New Section')` call in App.jsx
7. Update `Navbar.jsx` nav items array (currently hardcoded)
8. Update section IDs in `useHashRouting.js` if needed

### Modifying Existing Content

**Just edit the JSON** — no JSX changes needed for content updates:

- Change a job title → edit `experience.json`
- Add a project → add an object to `projects.json` array
- Update bio → edit `personal.json`

### Adding a Data Field to an Existing Component

1. Add the field to the relevant JSON in `src/data/`
2. Read the field in the component JSX
3. Update CSS if the new field needs new layout/styling

### Changing Colors/Theme

Edit CSS custom properties in `src/styles/globals.css` only. All components reference `var(--token)`.

### Environment Variables

| Variable | Purpose | Where Used |
|----------|---------|-----------| | `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID | `App.jsx`, `index.html` |

Set in `.env` (gitignored). The `index.html` has a hardcoded fallback ID (`G-2PJDJW3LT8`); App.jsx skips init if the env var equals this default.

---

## Anti-Patterns & Gotchas

### Critical — Orphaned Components

Three standalone components exist but are **not rendered in App.jsx** — ResearchRecognition handles all three via tabs:

| Orphaned Component | Active Replacement |
|-------------------|-------------------|
| `Publications/Publications.jsx` | `ResearchRecognition` (publications tab) |
| `Patents/Patents.jsx` | `ResearchRecognition` (patents tab) |
| `Achievements/Achievements.jsx` | `ResearchRecognition` (achievements tab) |

**Action needed**: Delete these three component folders and their CSS. They create dual-import paths for the same JSON data.

### Dead Code

| File | Issue |
|------|-------|
| `src/hooks/useScrollAnimation.js` | Exports 6 animation variants — none used by any component |
| `src/components/Favicon/Favicon.jsx` | Hidden `<div>` that does nothing; does not actually set a favicon |
| `src/App.css` | Legacy Vite boilerplate; `.card` class conflicts with `globals.css` `.card` |
| `src/index.css` | Legacy Vite boilerplate; sets `font-family: "Outfit"` which conflicts with `globals.css` JetBrains Mono |
| `plugins/html-env-replace.js` | Empty file — vestigial Vite plugin |
| `.env.example` | Empty — should contain `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX` |
| `ResearchRecognition.jsx` | Imports `FaExternalLinkAlt` but never uses it |

### Lint Issues (pre-existing, 97 errors + 1 warning)

These are known lint violations in the codebase that have not been addressed:

- **Unused `React` imports** — Every component imports `React` at the top, but with React 17+ JSX transform this is unnecessary. Affects: App.jsx, About, Achievements, Background, Certifications, Contact, Education, Experience, Favicon, Footer, Hero, Loading, Navbar, Patents, Projects, Publications, ResearchRecognition, Skills (18 files)
- **`FaExternalLinkAlt` unused import** — `ResearchRecognition.jsx:3`
- **`process` not defined** — `src/utils/analytics.js:7` references `process.env.NODE_ENV` without proper config
- **Unescaped entities in JSX** — `About.jsx:44` has unescaped `"` characters
- **Comment inside children** — `About.jsx:48`, `CookieBanner.jsx:23` have `//` comments as text nodes
- **Missing useEffect dependency** — `Navbar.jsx:63` — `navItems` not in dependency array
- **Empty block statement** — `CookieBanner.jsx:11` — empty `catch(e) {}`
- **Test files** — Selenium test files use CJS `require`/`module`/`process` which ESLint doesn't recognize (ESM config); these should be excluded via `.eslintignore`

### Stale Test Suite

The Selenium tests reference CSS classes and DOM structures that **do not match** the actual components:

| Test Looks For | Actual Implementation |
|---------------|----------------------|
| `.hero-title` | `.hero-tagline` |
| `.typing-text` | Does not exist |
| `.hero-stats` / `.stat` | `.stats-bar` / `.stat-block` |
| `.hero-buttons` | `.hero-actions` |
| `.hero-social` / `.social-link` | `.hero-links` / `.hero-social-link` |
| `.profile-image` | `.hero-img` |
| `.experience-card` | `.exp-card` |
| `.skill-category` / `.skill-tag` | `.skill-card` / `.tag` |
| `.contact-details` | `.contact-info` |
| Three.js `<canvas>` | BackgroundAnimation uses CSS only (no canvas) |
| `<h1>` elements | No component renders `<h1>`; sections use `<h2>` or `.section-label` |

**Before relying on tests, fix the selectors.** The tests will mostly fail against the current code.

### Data Duplication

`personal.json` and `hero.json` overlap significantly:

| Field | In personal.json | In hero.json |
|-------|-----------------|-------------|
| Name/title/tagline | ✓ | ✓ |
| Social links | ✓ | ✓ |
| Resume path | ✓ | ✓ |
| Profile image | ✓ | ✓ |
| Bio | ✓ | ✗ |

**Preferred**: Use `personal.json` as the single source for personal info. `hero.json` should reference or deduplicate. Currently, changing your name requires editing two files.

### Other Gotchas

- **`dangerouslySetInnerHTML`** in Hero.jsx — used for rendering HTML-styled paragraphs from hero.json. Sanitize if ever accepting external input.
- **No TypeScript** — the codebase is plain JSX. A `feature/typescript` branch exists but was never merged.
- **Global CSS collisions** — `App.css` defines `.card` with `padding: 2em` which conflicts with `globals.css` `.card` with `padding: var(--space-xl)`. Since App.css is imported but not actively used, this is latent.
- **Hardcoded nav items** in `Navbar.jsx` — not driven by a config or JSON. Adding a section requires manually updating the nav items array.
- **Hero icon mapping** — Hero.jsx maps string icon names from hero.json to actual React icon components via an `iconMap` object. Adding a new social icon requires adding the icon to both `iconMap` and `react-icons` import.
- **Cookie consent** in `index.html` is hardcoded to check `localStorage` before React loads (for GA consent mode v2). The CookieBanner component updates the same `localStorage` key.
- **Single Suspense boundary** — all lazy components share one `Suspense` wrapper. A failure in any component will show LoadingSpinner for the entire page.

---

## Git & Deployment

### Branch Naming Convention

```
feature/<name>   # New features (feature/seo, feature/google-analytics)
patch/<name>     # Content/config changes (patch/new-content, patch/new-section-research)
bugfix/<name>    # Bug fixes (bugfix/scroll)
update/<name>    # Updates/refreshes (update/gra-at-umn, update/minimalist-coder-style)
```

### Commit Style

Mixed — no strict convention. Examples from history:

- `Feature/seo (#18)` — Capitalized feature name + PR reference
- `added seo specific changes (#17)` — Lowercase descriptive
- `Bugfix hash scroll` — Capitalized type + description
- `Add hash-based URL navigation to navbar` — Imperative mood

**Recommended**: Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`

### CI/CD Pipeline

1. Push to `main` → GitHub Actions workflow (`.github/workflows/deploy.yml`)
2. `npm ci` → `npm run build` → Upload `dist/` as artifact → Deploy to GitHub Pages
3. Manual alternative: `npm run deploy` (uses `gh-pages` package)

### Production URL

`https://vamsikrishna1211.github.io/` — configured as `homepage` in `package.json` and `base: '/'` in `vite.config.js`

---

## Build Configuration Notes

**Code splitting** (vite.config.js):

- `vendor` chunk: React + React-DOM
- `three` chunk: Three.js + @react-three/fiber + @react-three/drei (bundled but BackgroundAnimation uses CSS, not Three.js)
- `animations` chunk: Framer Motion

**The Three.js chunk is ~808KB** but the BackgroundAnimation component doesn't use it. This is dead weight in the production bundle — the Three.js dependencies could potentially be removed if no other component uses them.

---

## Quick Reference

### Section IDs (used for hash routing and analytics)

| ID | Component |
|----|-----------|
| `#home` | Hero |
| `#about` | About |
| `#experience` | Experience |
| `#projects` | Projects |
| `#skills` | Skills |
| `#education` | Education |
| `#research` | ResearchRecognition |
| `#contact` | Contact |

### Responsive Breakpoint

Single breakpoint: **768px** — used across all components. Mobile is `< 768px`, desktop is `≥ 768px`.

### Accessibility

- `prefers-reduced-motion` is respected in `globals.css` (kills all animations/transitions)
- Focus styles: `outline: 1px solid var(--cyan); outline-offset: 2px;` on all elements
- Print styles exist in `globals.css`
- No ARIA labels on interactive elements (improvement opportunity)
