# Changelog

Meaningful project milestones are recorded here from repository history.

## Unreleased

## 3.2.0 — 2026-09-09

- Scoped GSAP timelines, tweens, and ScrollTriggers to their owning components, including the SVG example route and Strict Mode-safe preloader exit cleanup.
- Removed accumulating scene-control input listeners and completed Three.js teardown for animation frames, resize work, canvas ownership, renderer caches/context, meshes, edge lines, geometries, and materials.
- Added a shared, live-updating reduced-motion preference hook and deliberate reduced-motion paths for navigation, icons, project cards, scroll reveals, preload/route transitions, SVG examples, CSS effects, and Three.js settings.
- Preserved the Three.js homepage as a static, fully rendered scene for reduced-motion users while suppressing continuous grid and particle travel and applying user-controlled setting changes immediately.
- Added a skip link, named primary navigation, current-page state, named disclosure controls, mobile-menu Escape handling, visible focus indicators, and higher-contrast inactive navigation and form-control boundaries.
- Completed the project-image modal dialog pattern with dialog naming, background inertness, scroll locking, initial focus, Tab and Shift+Tab containment, Escape close, and focus return.
- Exposed contact-form success as a status update and removed a development log from the scene-controls toggle.
- Corrected reduced-motion runtime regressions caused by an empty ProjectCard tile collection reaching GSAP and LogoMini interaction handlers assuming the normal-motion timeline existed.
- Completed manual runtime and visual acceptance for normal and reduced-motion navigation, keyboard and skip-link behavior, project cards, logo interactions, the homepage Three.js scene and controls, and project-image modal focus, close, backdrop, scroll-lock, and focus-return behavior.

## 3.1.2 — 2026-08-17

- Established `package.json` as the canonical project version and synchronized the root package metadata in `package-lock.json`.
- Established the per-file `Last updated` convention for authored source files. Add or change a file's value only when that file is genuinely modified for a release.
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
