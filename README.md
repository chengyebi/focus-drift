# Focus Drift

Focus Drift is a tiny WebGL-based eye-break ritual for developers.

It turns a short screen break into a calm interactive experience: soft visual tracking, blink cues, off-screen distance focus, and a 90-second auto-ending recovery flow.

It is intentionally not addictive. No score. No leaderboard. No streak pressure. Just a better pause between coding sessions.

## Product Positioning

Focus Drift is not a pomodoro timer and not a high-stimulation game. It is a small recovery ritual for people who spend long sessions writing code, reading docs, or staring at dense interfaces.

The goal is to help users stop for a moment, soften their visual focus, blink, look away from the screen, and return to work without being pulled into another attention loop.

## Why It Exists

Developers often ignore break reminders because they feel abrupt or generic. Focus Drift makes the break itself feel calmer and more deliberate:

- a soft WebGL focal point for low-effort visual tracking
- gentle blink cues for dry-screen moments
- an explicit look-away phase for distance focus
- a short, automatic ending that sends the user back to code

## Core Experience

The main session is **Standard Drift**, a 90-second timeline:

- 0-8s: settling
- 8-28s: soft tracking
- 28-38s: blink reset
- 38-60s: look away from the screen
- 60-82s: depth drift
- 82-90s: return gently

Additional modes:

- **Quick Reset**: 20 seconds for a tiny pause
- **Deep Recovery**: 3 minutes after a long coding session

## Features

- Vite, React, TypeScript
- WebGL scene with React Three Fiber and Three.js
- Data-driven session presets and phase timeline
- Fullscreen session mode with graceful fallback
- Space to pause or resume, Esc to exit
- Page Visibility API pause handling
- Optional low-volume Web Audio API breathing pulse
- Local anonymous stats with LocalStorage
- Lightweight browser notification opt-in
- PWA manifest with SVG icon
- GitHub Actions deployment to GitHub Pages
- Reduced-motion support

## Tech Stack

- Vite
- React
- TypeScript
- Three.js
- React Three Fiber
- Drei
- Framer Motion
- Lucide React
- Web Audio API
- Page Visibility API
- Fullscreen API
- LocalStorage

## Scientific Rationale

Focus Drift uses conservative, non-medical screen-break guidance:

- long screen sessions may cause eye strain, dryness, headaches, or discomfort
- people tend to blink less while using screens
- regular breaks and distance focus are commonly recommended
- the 20-20-20 rule is a common guideline: every 20 minutes, look at something about 20 feet away for at least 20 seconds
- blue light is not treated as the core cause of eye strain in this project

References:

- Mayo Clinic - Eyestrain diagnosis and treatment: https://www.mayoclinic.org/diseases-conditions/eyestrain/diagnosis-treatment/drc-20372403
- Johns Hopkins Medicine - Eyestrain: https://www.hopkinsmedicine.org/health/conditions-and-diseases/eyestrain
- MDN - Page Visibility API: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
- Vite - Static Deploy / GitHub Pages: https://vite.dev/guide/static-deploy.html

## Non-Medical Disclaimer

Focus Drift is not medical treatment. It does not diagnose, treat, or cure eye disease. It simply helps users take calmer screen breaks.

If you have persistent eye pain, vision changes, severe headaches, or other health concerns, consult a qualified medical professional.

## Local Development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## GitHub Pages Deployment

This repository is configured for GitHub Pages project deployment at:

```text
https://<username>.github.io/focus-drift/
```

The Vite base path is set in `vite.config.ts`:

```ts
base: "/focus-drift/"
```

Deployment steps:

1. Open Repository Settings.
2. Go to Pages.
3. Set Source to GitHub Actions.
4. Push to the `main` branch.
5. GitHub Actions will run `npm ci`, `npm run build`, and deploy `dist`.

## Project Structure

```text
focus-drift/
├─ public/
│  ├─ icon.svg
│  └─ manifest.webmanifest
├─ src/
│  ├─ app/
│  ├─ components/
│  ├─ scene/
│  ├─ hooks/
│  ├─ data/
│  ├─ types/
│  ├─ utils/
│  └─ styles/
├─ .github/workflows/deploy.yml
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ README.md
```

## Screenshots

Screenshots will be added after the first GitHub Pages deployment.

## License

MIT
