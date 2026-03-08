# > portfolio_

A minimalist, code-editor-themed developer portfolio. Built for roboticists, engineers, and anyone who thinks VS Code is an aesthetic.

![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ What's This?

It's a personal portfolio that looks like a terminal had a baby with a resume. Monospace everything. Syntax-highlighting colors. An ASCII robot. You get the idea.

**Key vibes:**
- 🖥️ Terminal-style hero section (`$ echo "Hello World"`)
- 🤖 ASCII robot art (because why not)
- 🎨 Syntax-highlighting color palette (green strings, cyan keywords, amber numbers)
- 📦 All content driven by JSON — swap the data, get your own portfolio
- ⚡ Lightweight CSS background (no Three.js, no WebGL, no drama)
- 📱 Fully responsive, obviously

## 🚀 Quick Start

```bash
# clone it
git clone https://github.com/VamsiKrishna1211/VamsiKrishna1211.github.io.git
cd VamsiKrishna1211.github.io

# install stuff
npm install

# run it
npm run dev
```

Open `http://localhost:5173/` and you're in business.

## 🛠️ Make It Yours

The whole point of this is to be a template. All the content lives in JSON files — no digging through JSX to change your name.

### Step 1: Edit the JSON files in `src/data/`

| File | What it does |
|------|-------------|
| `personal.json` | Your name, bio, links, email |
| `hero.json` | Hero section — greeting, intro, social links, passions |
| `experience.json` | Work experience entries |
| `projects.json` | Project cards with descriptions, tech, links |
| `skills.json` | Skill categories and tags |
| `education.json` | Degrees, coursework |
| `publications.json` | Papers you've published |
| `patents.json` | Patents (flex on 'em) |
| `achievements.json` | Awards, recognitions |
| `certifications.json` | Certs and courses |

### Step 2: Drop in your assets

Replace the files in `src/assets/` with your own:
- `MyImage.jpeg` — your profile photo
- Your resume PDF
- Any project images you want

### Step 3: Tweak the theme (optional)

Colors live in `src/styles/globals.css` as CSS variables. The whole palette is basically a code editor theme:

```css
--green: #98c379;    /* strings */
--cyan: #56b6c2;     /* keywords */
--amber: #e5c07b;    /* numbers */
--purple: #c678dd;   /* functions */
--red: #e06c75;      /* errors */
--blue: #61afef;     /* variables */
```

Go wild. Or don't. It already looks good. 😎

### Step 4: Deploy

```bash
# build it
npm run build

# deploy to GitHub Pages
npm run deploy
```

Or push to `main` and let GitHub Actions handle it. Your call.

## 📁 Project Structure

```
src/
├── assets/          # images, resume PDFs
├── components/      # React components (each with .jsx + .css)
│   ├── Hero/        # terminal-style intro
│   ├── About/       # code-block bio
│   ├── Experience/  # work timeline
│   ├── Projects/    # project cards
│   ├── Skills/      # tag cloud
│   ├── Education/   # degree cards
│   ├── Contact/     # email form
│   └── ...
├── data/            # ← ALL YOUR CONTENT GOES HERE
├── hooks/           # custom React hooks
├── styles/          # global CSS
└── utils/           # analytics helpers
```

## 🧰 Tech Stack

- **React 18** + **Vite** — fast builds, fast dev
- **Framer Motion** — subtle fade-in animations
- **JetBrains Mono** — the font that makes everything look like code
- **Vanilla CSS** — no Tailwind, no CSS-in-JS, just vibes
- **Google Analytics** — optional, for the data nerds

## 📝 Notes

- Section IDs (`#home`, `#about`, `#experience`, etc.) are used for navigation and analytics. Don't rename them unless you update the navbar too.
- The contact form uses `mailto:` by default. If you want EmailJS, the import is already there — just configure it.
- Google Analytics is pre-wired. Drop your measurement ID in `.env` as `VITE_GA_MEASUREMENT_ID`.

## 📜 License

MIT — do whatever you want with it. Credit is cool but not required. Ship it. 🚀

---

*Built with ☕ and an mass of curiosity.*
