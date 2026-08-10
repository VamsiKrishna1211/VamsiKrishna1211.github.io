# AGENTS.md

Guide for AI agents (and humans) working on this codebase. Read this before making changes.

---

## Project Overview

A minimalist, code-editor-themed personal portfolio for a Robotics & Computer Vision engineer. Deployed at [vamsikrishna1211.github.io](https://vamsikrishna1211.github.io/).

**Stack**: React 19 · Vite 8 · Vanilla CSS · Google Analytics 4
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

**Always run `npm run lint` before committing.** The config is at `eslint.config.js` (flat config, ESLint 9) with `--max-warnings 0`.

---

## Project Structure

```
├── index.html              # Entry HTML — SEO meta, Open Graph, JSON-LD, Google Analytics, font imports
├── vite.config.js          # Vite config — manual chunk for vendor (React/React-DOM)
├── eslint.config.js        # ESLint flat config (ESLint 9) — React 19, hooks, refresh plugins
├── .env                    # VITE_GA_MEASUREMENT_ID (gitignored)
├── .env.example            # Empty — should document VITE_GA_MEASUREMENT_ID
├── public/
│   ├── .nojekyll           # Prevents GitHub Pages Jekyll processing
│   ├── favicon.svg
│   ├── og-image.jpg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── main.jsx            # ReactDOM.createRoot entry point
│   ├── App.jsx             # Root component — lazy loads all sections, analytics init
│   ├── assets/             # Profile image, resume PDFs
│   ├── components/         # React components (each folder = .jsx + .css)
│   │   ├── About/              # Code-block bio with line numbers
│   │   ├── Background/         # CSS-only dot grid + scan line (no Three.js)
│   │   ├── Contact/            # Web3Forms-based form, analytics tracking
│   │   ├── CookieBanner/       # GA4 consent management (localStorage)
│   │   ├── Education/          # Degree cards with coursework tags, real timeline spine
│   │   ├── Experience/         # Timeline with left-border pseudo-element + spine
│   │   ├── Footer/             # Code-comment themed footer
│   │   ├── Hero/               # Terminal/CLI intro, ASCII robot, icon mapping, reticle-framed photo
│   │   ├── Loading/            # Terminal-themed Suspense fallback
│   │   ├── Navbar/             # Hash-based routing, scroll detection, hamburger menu
│   │   ├── Projects/           # Show-more toggle, featured badges, reticle motif
│   │   ├── ResearchRecognition/ # Tabbed UI: publications + patents + achievements + certifications
│   │   ├── Skills/             # Category grid with icon-per-category
│   │   └── ThemeToggle/        # Light/dark switch — reads/writes `useTheme`, lives in Navbar
│   ├── data/               # ← ALL CONTENT LIVES HERE (JSON-driven)
│   │   ├── personal.json       # Single source of truth: name, contact info, socials, resume, tagline, stats, focus
│   │   ├── hero.json           # Hero-only display config: social icon order, intro paragraphs, passions, actions
│   │   ├── sections.js         # Single source of truth for section id/label pairs (used by Navbar)
│   │   ├── experience.json     # Work entries with achievements, technologies, headline metrics
│   │   ├── projects.json       # Project cards with tech stacks, links, featured flags
│   │   ├── skills.json         # Skill categories and tag arrays
│   │   ├── education.json      # Degrees, GPA, coursework, status
│   │   ├── publications.json   # Papers with authors, journal, DOI, keywords, citations
│   │   ├── patents.json        # Patents with status, filing/grant dates, inventors, claims
│   │   ├── achievements.json   # Awards, organizations, year, type, icon
│   │   └── certifications.json # Issuer, dates, credential ID, skills, URL — rendered in ResearchRecognition
│   ├── hooks/
│   │   ├── useAnalyticsTracking.js  # Intersection Observer → GA section view events
│   │   ├── useHashRouting.js        # Hash-based deep linking with retry polling
│   │   ├── useInView.js             # IntersectionObserver → `.in-view` class, drives all scroll-reveal
│   │   └── useTheme.js              # Reads/writes `data-theme` on `<html>` + `localStorage['theme']`
│   ├── styles/
│   │   └── globals.css        # THE design system — CSS variables, base styles, utilities
│   └── utils/
│       └── analytics.js       # GA4 wrapper (initGA, trackPageView, trackEvent, etc.)
└── tests/
    └── selenium/              # E2E tests (Selenium + Mocha + ChromeDriver)
        ├── portfolio-comprehensive.test.cjs  # Main test suite (canonical — referenced by package.json)
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
| `personal.json` | About, Contact, Footer, Hero | Single source of truth for identity/contact fields |
| `hero.json` | Hero | Hero-only display config (social icon order, intro copy, actions) — no longer duplicates personal.json |
| `sections.js` | Navbar | Single source of truth for section id/label pairs |
| `experience.json` | Experience | — |
| `projects.json` | Projects | — |
| `skills.json` | Skills | — |
| `education.json` | Education | — |
| `publications.json` | ResearchRecognition | — |
| `patents.json` | ResearchRecognition | — |
| `achievements.json` | ResearchRecognition | — |
| `certifications.json` | ResearchRecognition | — |

### App Assembly (App.jsx)

- All section components are **lazy-loaded** via `React.lazy()` + `Suspense`
- Each section is wrapped in a plain `<section>` with an `id` for hash routing (no Framer Motion — removed as an unused dependency; see Animation Pattern below)
- A `.skip-link` anchors to `<main id="main-content">` for keyboard users
- `useHashRouting()` handles deep links
- `useAnalyticsTracking()` tracks section views via Intersection Observer
- GA4 is initialized only if `VITE_GA_MEASUREMENT_ID` env var is set and non-default
- Section order: BackgroundAnimation → Navbar → Hero → About → Experience → Projects → Skills → Education → ResearchRecognition → Contact → Footer → CookieBanner

---

## Code Conventions

### Component Pattern

```jsx
import dataFile from '../../data/something.json';
import { useInView } from '../../hooks/useInView';
import './ComponentName.css';

const ComponentName = () => {
  const containerRef = useInView();
  // Minimal state (useState only when needed, e.g., showAll toggle, form data)
  // No props — components are self-contained, reading their own JSON data

  return (
    <section ref={containerRef} className="component-name section" id="section-id">
      <div className="container">
        <h2 className="section-label">Display Name</h2>
        {/* Content rendered from JSON */}
        {dataFile.map((item, index) => (
          <div
            key={item.id}
            className="card fade-in-up"
            style={{ '--fade-delay': `${index * 0.1}s` }}
          >
            {/* Card content */}
          </div>
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

### Design Tokens (globals.css) — Light/Dark Theming

Theme-agnostic tokens (fonts, spacing, radius, transitions, z-index) live in the top-level `:root`. Everything that differs between themes — syntax colors, backgrounds, text, borders, shadows — is redeclared in two selector blocks: `:root, [data-theme='dark']` (default) and `[data-theme='light']`. A `data-theme` attribute on `<html>` selects which block wins; nothing else in the codebase should branch on theme.

```css
/* Syntax-Highlighting Palette (dark values shown; light block redeclares deepened/muskier hues) */
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

**Translucent overlays (glows, tag backgrounds, hover tints) must not hardcode rgba().** Every accent/background color also has an `-rgb` triplet token (`--cyan-rgb`, `--amber-rgb`, `--bg-primary-rgb`, `--shadow-rgb`, etc.) so overlays stay themed: write `rgba(var(--cyan-rgb), 0.35)`, never `rgba(86, 182, 194, 0.35)`. A literal hex or rgba() in component CSS is almost always a theming bug — grep for `rgba?\(` / `#[0-9a-f]{3,8}` outside `var(--...)` before landing a change.

The reticle SVG (`.reticle::before`) bakes its stroke color into a data-URI, which can't reference CSS vars directly — it's swapped wholesale per theme via the `--reticle-svg` token instead.

**Theme switching mechanics:**
- `src/hooks/useTheme.js` reads/writes the `data-theme` attribute on `<html>` and mirrors it to `localStorage['theme']`.
- `index.html` has an inline synchronous script in `<head>` (before any stylesheet/font load) that sets `data-theme` from `localStorage` or `prefers-color-scheme` before first paint — this prevents a flash of the wrong theme. It also keeps a `<meta name="theme-color" id="theme-color-meta">` in sync for mobile browser chrome; `useTheme.js` updates the same meta tag on toggle.
- `ThemeToggle` component (rendered in `Navbar`) is the only UI entry point; it calls `useTheme().toggleTheme()`.

### Animation Pattern

**Hand-rolled CSS + IntersectionObserver** — this is the established pattern (no animation library; Framer Motion was removed as an unused dependency):

- Call `const containerRef = useInView()` (from `src/hooks/useInView.js`) and attach it to the section's `ref`. On first intersection it adds a one-shot `.in-view` class to that element and disconnects.
- Child elements get one of `.fade-in`, `.fade-in-up`, `.fade-in-left`, `.fade-in-scale` — each starts `opacity: 0` with `animation-play-state: paused` and only runs once an ancestor has `.in-view` (see `globals.css`).
- Stagger via the `--fade-delay` CSS custom property, e.g. `style={{ '--fade-delay': `${index * 0.1}s` }}`.
- Variant choice by section: About/Skills/Contact/ResearchRecognition tabs → `fade-in-up`; Experience/Education cards → `fade-in-left` (slides in from the timeline spine); Projects → `fade-in-scale`.

**Common stagger delays:** `index * 0.05` (Skills), `index * 0.08` (Projects), `index * 0.1` (Education, Experience)

### Section Labeling

**`.section-label` is the only pattern** — a real `<h2 className="section-label">` (not a `<span>`) so it's a real heading landmark for screen readers, styled as `// Section Name` via a `::before` pseudo-element. Used by About, Experience, Projects, Skills, Education, Contact, ResearchRecognition. The hero name uses a dedicated `<h1 className="hero-name">` (the only `<h1>` on the page); the hero tagline stays an `<h2 className="hero-tagline">`.

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
3. Follow the component pattern (functional, self-serve JSON import, `useInView` + `.fade-in-*` scroll-reveal)
4. Add lazy import in `App.jsx`: `const NewSection = lazy(() => import('./components/NewSection/NewSection'));`
5. Add a `<section>` wrapper in `App.jsx` with `id` and `ref` for analytics
6. Add `useAnalyticsTracking('New Section')` call in App.jsx
7. Add the section to `src/data/sections.js` (single source of truth for Navbar's nav items and scroll-spy)

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

### Dead Code

| File | Issue |
|------|-------|
| `.env.example` | Empty — should contain `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX` |

Resolved in a past cleanup pass (kept here as history, not action items): `useScrollAnimation.js`, `App.css`, `index.css`, `plugins/html-env-replace.js`, the orphaned `Publications`/`Patents`/`Achievements`/`Certifications` standalone components, and the unused `framer-motion`/`three`/`@react-three/*`/`emailjs-com`/`react-scroll`/`react-anchor-link-smooth-scroll`/`react-intersection-observer` dependencies were all deleted/removed.

### Lint Issues (pre-existing, 20 errors, 0 warnings)

These are known lint violations in the codebase that have not been addressed:

- **Unused `React` imports** — Every component imports `React` at the top, but with React 17+ JSX transform this is unnecessary. Affects: App.jsx, About, Background, Contact, Education, Experience, Footer, Hero, Loading, Navbar, Projects, ResearchRecognition, Skills (13 files)
- **`process` not defined** — `src/utils/analytics.js:7` references `process.env.NODE_ENV` without proper config
- **Unescaped entities in JSX** — `About.jsx:34` has unescaped `"` characters
- **Comment inside children** — `About.jsx:38`, `CookieBanner.jsx:23` have `//` comments as text nodes
- **Empty block statement** — `CookieBanner.jsx:11` — empty `catch(e) {}`
- **Unused import** — `tests/selenium/portfolio.test.js:1` — `Key` imported but never used
- **Test files** — Selenium test files use CJS `require`/`module`/`process` which ESLint doesn't recognize (ESM config); these should be excluded via `.eslintignore`

### Other Gotchas

- **`dangerouslySetInnerHTML`** in Hero.jsx — used for rendering HTML-styled paragraphs from hero.json. Sanitize if ever accepting external input.
- **No TypeScript** — the codebase is plain JSX. A `feature/typescript` branch exists but was never merged.
- **Hero icon mapping** — Hero.jsx maps string icon names from hero.json to actual React icon components via an `iconMap` object; social link URLs resolve from `personalData` via a `socialUrls` lookup keyed by platform name. Adding a new social icon requires adding it to `iconMap`, `socialUrls`, and the `react-icons` import.
- **Cookie consent** in `index.html` is hardcoded to check `localStorage` before React loads (for GA consent mode v2). The CookieBanner component updates the same `localStorage` key.
- **Single Suspense boundary** — all lazy components share one `Suspense` wrapper. A failure in any component will show LoadingSpinner for the entire page.
- **`certifications.json`** has no entries with a `url` (credential link) field set yet — `ResearchRecognition.jsx`'s certifications tab renders one conditionally if added later.

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

- `vendor` chunk: React + React-DOM — the only manual chunk configured.
- No Three.js, Framer Motion, or other animation library is in the dependency graph — `package.json` only lists `react`, `react-dom`, `react-ga4`, and `react-icons` as runtime dependencies. `BackgroundAnimation` is CSS-only (dot grid + scan line, no canvas).

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

### Responsive Breakpoints

Two breakpoints: **768px** (mobile, used across all components) and **1024px** (tablet — intermediate rules on `.about-grid`, `.contact-grid`, and `.hero` layout only, in About.css/Contact.css/Hero.css).

### Accessibility

- `prefers-reduced-motion` is respected in `globals.css` (kills all animations/transitions)
- Focus styles use `:focus-visible` (not `:focus`) so the cyan ring only shows for keyboard navigation: `outline: 1px solid var(--cyan); outline-offset: 2px;`
- A `.skip-link` (first element in `App.jsx`) jumps to `#main-content` on keyboard focus
- Exactly one `<h1>` on the page — `.hero-name` in Hero.jsx. Every section has a real `<h2 className="section-label">` heading (not a `<span>`)
- ResearchRecognition tabs use `role="tablist"`/`role="tab"`/`aria-selected`/`aria-controls`/`role="tabpanel"`; Projects' show-more button has `aria-expanded`
- Print styles exist in `globals.css`
