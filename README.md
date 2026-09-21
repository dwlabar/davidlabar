# DavidLaBar.com

DavidLaBar.com is David LaBar's custom portfolio and design-engineering showcase. The site presents selected UI, UX, front-end, interaction, and creative-development work while using the portfolio itself to demonstrate those disciplines.

The application is intentionally more authored than a generic portfolio template: route reveals, motion, and the Three.js homepage are part of the experience. Navigation and project information remain the functional foundation beneath that presentation.

## Project Version

The current project version is **3.2.2**. The canonical version lives in `package.json`; `package-lock.json` mirrors it for the locked root package.

When an authored source file is modified for a release, add or update a comment in its native comment syntax: `Last updated: <version>`. Change a file's value only when that file is actually modified for that release. If its previous release cannot be established confidently, leave it without a header until its next genuine release modification. Generated files, dependencies, build output, assets, JSON, and lock files do not receive these comments.

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

Use **Node.js 24 LTS**. `.nvmrc` pins the local baseline to **24.21.0**, whose official distribution includes **npm 11.19.0**. Install that version from the [official Node.js distribution](https://nodejs.org/dist/v24.21.0/), or select the `.nvmrc` version with your existing version manager. No version manager is required. Verify that the intended Node and npm executables are on your shell's `PATH` before running project commands:

```sh
node --version  # v24.21.0
npm --version   # 11.19.0
```

`package.json` declares `engines.node: "24.x"` to keep local development and Vercel on Node 24 and exclude Node 26 Current. [Vercel uses this declaration to select the deployment build runtime](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions#version-overrides-in-packagejson), overriding the project's dashboard selection. Vercel manages minor and patch updates, so the deployment patch may differ from the exact local pin. Confirm the selected runtime in the build logs on the next deployment. The engines declaration does not install or switch your local Node runtime.

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
- **Reduced motion:** application code shares one live media-query subscription and resolves GSAP, CSS, SVG, and Three.js presentation into intentional quieter states without removing the homepage scene or useful interaction feedback.
- **Project presentation:** `/projects` links to individual case-study routes with responsive imagery, block reveals, and image modals.
- **SCSS:** global entry styles are loaded through `src/styles/app.scss`; components import their own partials. Shared variables, functions, mixins, typography, and layout utilities live in dedicated layers.
- **Contact:** Formspree handles submission, while draft email and message values are retained in `localStorage` until success.

Primary routes are `/`, `/projects`, `/expertise`, `/about`, and `/contact`, with project detail routes below `/projects`. `/SVG-Examples` and `/Preloader-Test` are registered development/example routes; the development panel is not currently rendered in the application shell.

## Current Status

The site is an active portfolio application with a working responsive shell, project case studies, contact flow, modal imagery, authored route transitions, and an interactive Three.js homepage. The initial-preloader and route-readiness pipeline was stabilized on August 14, 2026, and the GSAP/Three.js lifecycle cleanup was completed on August 17, 2026. Version 3.2.0 completed the accessibility and application-wide reduced-motion milestone with manual runtime and visual acceptance across normal motion, reduced motion, keyboard navigation, the homepage Three.js experience, project interactions, and modal behavior. Dedicated screen-reader testing and a formal WCAG 2.2 conformance assessment were not performed. Version 3.2.1 reduced the lint baseline from 87 to 37 findings and passed focused user-reported manual acceptance. Stage 1 of v3.3.0 (runtime baseline) has passed manual acceptance; later modernization stages have not started. See ROADMAP.md for acceptance details and remaining work. Remaining lint-policy/lifecycle review, performance profiling, and presentation-system evolution remain separate work.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for implementation details, [docs/EXPERIENCE.md](docs/EXPERIENCE.md) for the creative direction, [docs/MOTION.md](docs/MOTION.md) for motion principles, and [ROADMAP.md](ROADMAP.md) for ordered future work.
