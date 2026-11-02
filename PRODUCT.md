# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: people at startups and curious engineers who stumble onto the site and need to *notice* Vamsi — not traditional recruiter screeners running a checklist. Vamsi explicitly does not care about optimizing for recruiter skim-and-reject behavior; the site should read as a person worth reaching out to, not a resume-in-HTML.

## Product Purpose

Personal portfolio for Vamsi Krishna Kocherla, a Robotics/Computer Vision engineer (ex-production CV scientist, now Robotics MS student at UMN building autonomous drones & SLAM systems). Exists to get noticed by startups and curious engineers and turn that attention into inbound contact/interest, not just to list credentials.

## Positioning

Explorer-and-inventor vibe, dialed to "not too bold." The differentiator isn't a single claim (patents, or production shipping, or research) — it's personality coming through: someone who ships production CV (YOLO on Jetson, inference on Kubernetes, farm equipment in bad outdoor light) *and* is now digging into why any of it worked, at the SLAM/autonomous-navigation research level. Open decision: exact tone calibration ("explorer/inventor but not too bold") is a visual-world decision, owned by new-work, not finalized here.

## Operating Context

Deployed as a static GitHub Pages site (vamsikrishna1211.github.io), single long-scroll page with hash-routed sections: Hero, About, Experience, Projects, Skills, Education, Research & Recognition (publications/patents/achievements/certifications), Contact. Content is entirely JSON-driven from `src/data/*.json` — no CMS, no backend.

## Capabilities and Constraints

- All content must trace to `src/data/*.json` — no fabricated testimonials, metrics, achievements, or claims beyond what's already recorded there.
- Resume download and contact form (Web3Forms-based) are existing conversion actions on the site; not yet confirmed as required to stay "primary" going forward — treat as current fact, not a locked mandate.
- Stack constraints from AGENTS.md apply to any implementation: React 19, Vite, vanilla CSS (no Tailwind/CSS-in-JS), no animation library (hand-rolled CSS + IntersectionObserver), JetBrains Mono / terminal aesthetic already established as the incumbent visual system.

## Brand Commitments

- Name: Vamsi Krishna Kocherla.
- Existing tagline: "I teach robots to see, think, and not crash into things."
- Existing bio voice: dry, concrete, self-deprecating ("recovering ECE undergrad", "reverse-engineering why any of it worked") — this voice is evidence of the personality the user wants surfaced more, not a constraint to sand down.
- Terminal/code-editor visual identity (syntax-highlight palette, ASCII art, CLI-style UI) is the incumbent system — its evolution vs. replacement is a new-work decision, not decided here.

## Evidence on Hand

- `src/data/personal.json`, `hero.json`, `experience.json`, `projects.json`, `skills.json`, `education.json`, `publications.json`, `patents.json`, `achievements.json`, `certifications.json` — real, current content. Do not invent entries beyond these.
- Stats already claimed: 5+ years shipping AI, 20+ projects built, 5 patents filed, 10+ models deployed.
- No testimonials or third-party endorsements on hand — do not fabricate any.

## Product Principles

1. Personality over polish-as-checklist: favor voice and specificity (explorer/inventor undertone) over generic "professional portfolio" safety.
2. Startups and curious engineers are the audience to design for — optimize for making someone want to reach out, not for recruiter ATS-style scanning.
3. Every fact stays sourced to `src/data/*.json`; new work extends content there first, UI second.
4. Calibrate boldness deliberately — distinct personality, not maximalist or gimmicky.
