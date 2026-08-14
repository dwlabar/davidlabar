# DavidLaBar.com

DavidLaBar.com is David LaBar's custom portfolio and design-engineering showcase. The site presents selected UI, UX, front-end, interaction, and creative-development work while using the portfolio itself to demonstrate those disciplines.

The application is intentionally more authored than a generic portfolio template: route reveals, motion, and the Three.js homepage are part of the experience. Navigation and project information remain the functional foundation beneath that presentation.

## Current Stack

- React with React DOM
- Vite
- React Router
- SCSS and Autoprefixer; no Tailwind
- GSAP with ScrollTrigger
- Three.js
- Formspree for the contact form
- ESLint

## Setup and Commands

Install the locked dependencies and start the Vite development server:

```sh
npm ci
npm run dev
```

Available project commands:

```sh
npm run dev      # Start the development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint across the repository
```

The repository does not currently define an automated test command.

## Project Structure

```text
index.html                  Inline boot/preloader presentation and React mounts
public/                     Static resume and standalone sandbox experiments
src/main.jsx                React startup and provider composition
src/App.jsx                 Router, shared shell, and route table
src/assets/                 Project-card and case-study imagery
src/components/             Shared UI, presentation, modal, and Three.js components
src/config/                 Three.js scene presets
src/context/                Preloader, page-readiness, overlay, and scene state
src/hooks/                  Readiness and overlay-navigation helpers
src/pages/                  Portfolio pages, project pages, and development examples
src/styles/                 SCSS settings, tools, base, layouts, and component partials
docs/                       Architecture, experience, and motion guidance
```

## Major Application Systems

- **Boot and initial preloader:** `index.html` provides immediate inline HTML, SVG, and CSS before the application bundle initializes. React then coordinates readiness and the GSAP-driven exit.
- **Routing and transitions:** `App.jsx` defines the public routes. Navigation raises a restrained overlay, waits for it to cover the current view, changes routes, and reveals the destination after that route reports readiness.
- **Page readiness:** pages explicitly declare only the critical images needed for their initial authored reveal. Remaining images load normally rather than blocking every route.
- **Three.js homepage:** `Home.jsx` owns a configurable moving cube field, particles, lights, and scene controls. User settings are persisted locally.
- **GSAP motion:** GSAP drives preloader exit choreography, navigation and icon motion, project-card interactions, SVG examples, Three.js setting interpolation, and scroll-triggered content reveals.
- **Project presentation:** `/projects` links to individual case-study routes with responsive imagery, block reveals, and image modals.
- **SCSS:** global entry styles are loaded through `src/styles/app.scss`; components import their own partials. Shared variables, functions, mixins, typography, and layout utilities live in dedicated layers.
- **Contact:** Formspree handles submission, while draft email and message values are retained in `localStorage` until success.

Primary routes are `/`, `/projects`, `/expertise`, `/about`, and `/contact`, with project detail routes below `/projects`. `/SVG-Examples` and `/Preloader-Test` are registered development/example routes; the imported development panel is not currently rendered in the application shell.

## Current Status

The site is an active portfolio application with a working responsive shell, project case studies, contact flow, modal imagery, authored route transitions, and an interactive Three.js homepage. The initial-preloader and route-readiness pipeline was stabilized on August 14, 2026. Lifecycle cleanup, accessibility coverage, lint-baseline cleanup, and presentation-system evolution remain active work rather than completed features.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for implementation details, [docs/EXPERIENCE.md](docs/EXPERIENCE.md) for the creative direction, [docs/MOTION.md](docs/MOTION.md) for motion principles, and [ROADMAP.md](ROADMAP.md) for ordered future work.
