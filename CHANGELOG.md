# Changelog

Meaningful project milestones are recorded here from repository history. The project does not currently use a formal release-version scheme.

## Unreleased

- Established durable repository, architecture, experience, motion, changelog, and roadmap documentation.

## 2026-08-14 — Preloader and route-transition stabilization

- Separated initial loading state from the authored preloader entrance, hold, and exit presentation.
- Bound readiness registration and notification to React Router location keys so stale navigations cannot reveal the wrong route.
- Limited route blocking to explicitly declared critical images rather than every document image.
- Added cancellation, transition fallbacks, reduced-motion handling, and absolute deadlock protection across readiness and overlay transitions.

## 2026-06-23 — Portfolio content refresh

- Updated project pages and the repository README.

## 2026-04-16 — Westgate Resorts case study

- Added the Westgate Resorts project page and project card, following the associated image addition on April 15.

## 2026-02-11 — Version-three content pass

- Updated content across the portfolio pages and simplified modal presentation by removing captions.

## 2025-07-09 to 2025-07-31 — Project presentation system

- Added the projects hub and project-detail structure.
- Added GSAP project-card interactions, reusable block reveals, image modals, keyboard interaction improvements, and the first additional case studies.

## 2025-06-03 — Persistent controls and experiments

- Persisted Three.js scene controls with `localStorage`.
- Added the standalone survivor experiment, following the snake experiment added on May 27.
- Added local draft persistence to the contact form.

## 2025-03-11 to 2025-04-22 — Interactive homepage and application shell

- Integrated the Three.js homepage scene and iterated on its grid, lighting, particles, controls, resizing, and cleanup.
- Added the shared navigation overlay and route-transition listener.
- Added GSAP-driven navigation and scene-control interactions.

## 2025-02-28 — Immediate boot presentation

- Moved the preloader markup into `index.html` so the first visual can appear before React initializes.

## 2025-01-21 to 2025-01-23 — Project foundation

- Created the project, then added React Router and the initial SCSS partial structure.
