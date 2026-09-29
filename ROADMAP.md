# Roadmap

This file is the source of truth for what is active, what is next, and what is intentionally deferred. It should make the current project position clear without requiring the reader to reconstruct status from release history.

## Current position

- **Active next release:** v3.4.0 — Interactive Scene Polish — in progress.
- **Current / next task:** T01 — Analytics is COMPLETE; T02 — Three.js entrance is NEXT, not started.
- **Application version:** 3.3.0. v3.4.0 has not been released; internal tasks do not change version metadata.
- **Previous release:** v3.3.0 automated verification is complete; its recorded final manual acceptance remains pending. No additional modernization or lint-cleanup task is scheduled.
- **Outside v3.4.0:** the accepted ESLint baseline and broader work under Backlog, including route-specific/persistent Three.js world states.

## Planning rules

- Keep one active release and one clearly identified current task.
- Define the release task list before implementation begins. Prefer a small number of outcome-based tasks rather than turning every dependency checkpoint into a separate roadmap task.
- Do not add tasks to an active release without explicitly documenting the scope change first.
- Do not reopen completed work without a new defect, regression, requirement, or evidence that the previous result is no longer valid.
- Treat audits as decision inputs, not recurring work by default. Re-audit only when the underlying code, dependency, requirement, or evidence has materially changed.
- Keep narrow maintenance tasks narrow. Do not repeat full dependency, package, or repository audits when the task only concerns a known file or issue.
- Separate accepted technical debt from active work. An accepted warning or policy decision is not an "in progress" task.

## v3.4.0 — Interactive Scene Polish

### Goal and status

Make the homepage cube scene a more intentional, responsive part of the portfolio through focused measurement, authored entrances, direct interaction, and understandable controls. T01 is complete; remaining tasks are not started and proceed in the order below. Exact procedural visuals remain prototyping decisions.

### Sequential tasks

- **T01 — Analytics — COMPLETE**
  - Added optional native GA4 with automatic initial/history page views and focused project-selection, confirmed contact-success, and scene-controls-open events. Measurement stays limited and excludes form contents; development and missing-ID builds do not collect.
  - Production build, unchanged accepted lint baseline, local disabled-analytics smoke test, event checks, and whitespace validation passed. GA4 stream setup and live DebugView verification remain deployment steps; see [analytics setup](docs/ARCHITECTURE.md#analytics-setup-and-ownership).
- **T02 — Three.js entrance — NEXT**
  - Add authored cube-scene choreography after the initial preloader/overlay releases, revealing the structure of the cube field rather than simply fading in the canvas.
  - Preserve an intentional reduced-motion presentation.
- **T03 — Procedural cube interaction**
  - Refine or replace the current pointer interaction so it feels smooth, satisfying, and visually distinct without becoming a large blue blob.
  - Investigate GPU-driven procedural effects on existing cube surfaces rather than decorative geometry or animated image/video textures. Use the pointer hit location as the primary origin for a localized surface disturbance that expands outward and settles.
  - Prototype the visual treatment: ripples, apertures, scanning, digital/dissolve patterns, or related effects are possibilities, not a final shader specification.
  - Preserve individual cube readability and evaluate performance before extending effects to many neighboring cubes.
- **T04 — Scene-control presentation**
  - Improve the existing cube-control UI while retaining its activation cube. Animate panel open/close and control entrance/exit so controls do not simply appear.
  - Improve hierarchy and interaction feedback while preserving accessibility and reduced-motion behavior.
- **T05 — Scene modes / Randomize**
  - Audit dormant scene settings/presets before creating new systems; expose only effects and settings that are visually worthwhile.
  - Add constrained Randomize and a clear way to restore the default state. Keep the interface playful and understandable rather than presenting a developer/debug panel.
- **T06 — Drive camera**
  - Prototype a Wipeout-style responsive camera mode using damped position, yaw/roll, height/pitch, and possibly subtle FOV response to simulate steering and road movement.
  - Do not bend or restructure the endless cube grid to create steering. Preserve existing cube travel/wrapping so old reset-boundary problems are not reintroduced.
  - Keep DRIVE optional unless testing shows it belongs in the default presentation.
- **T07 — Performance and release acceptance**
  - Profile the completed scene interactions and rendering; check desktop, mobile, weaker-device, and reduced-motion behavior.
  - Run the production build, accepted lint baseline checks, whitespace checks, and focused manual visual/interaction acceptance.

Route-specific and persistent Three.js world states remain deferred. Broader backlog items do not expand this release without an explicit scope change.

## v3.3.0 — Platform and dependency modernization

### Goal

Modernize the supported runtime, build tooling, framework, animation/rendering libraries, and lint ecosystem without redesigning the portfolio or changing authored behavior.

### Status

Implementation and automated verification are complete. Final manual release acceptance is the only remaining release step.

| Task | Scope | Status |
| --- | --- | --- |
| T01 | Runtime baseline | COMPLETE |
| T02 | CSS tooling + Browserslist maintenance | COMPLETE |
| T03 | Vite 7 checkpoint | COMPLETE |
| T04 | React 19 | COMPLETE |
| T05 | Router 7 preparation | COMPLETE |
| T06 | Router 8 | COMPLETE |
| T07 | Vite 8 | COMPLETE |
| T08 | GSAP | COMPLETE |
| T09 | Three.js | COMPLETE |
| T10 | Lint ecosystem | COMPLETE |
| **T11** | **Release acceptance** | **MANUAL REVIEW PENDING** |

T11 automated verification is complete: dependency-tree validation, production build, lint baseline, metadata updates, and whitespace checks passed. The application version is **3.3.0**. The remaining step is a focused manual smoke test of the accepted application behavior; it is not another code audit or implementation pass.

### T11 manual acceptance scope

Check only the primary user-facing paths affected by the modernized runtime and dependencies:

- Home loads and the Three.js scene and controls behave normally.
- Primary navigation and route transitions work.
- Projects loads correctly, including its preloader/readiness behavior.
- One project-detail route opens, reveals content, and opens/closes an image modal correctly.
- Expertise, About, and Contact render and remain usable at desktop and mobile widths.
- Reduced-motion behavior still settles into its intended presentation.
- No new obvious browser-console runtime errors appear during the smoke test.

If those checks pass, close v3.3.0. Do not perform another dependency audit, lint cleanup, or architecture review as part of release acceptance unless the smoke test exposes a concrete regression.

## Completed foundation work

### v3.2.0 — Accessibility, reduced motion, and lifecycle cleanup — Complete

Completed the GSAP/Three.js lifecycle cleanup and application-wide accessibility/reduced-motion work. Component-owned animations and Three.js resources have explicit cleanup paths. Navigation, modal behavior, focus treatment, reduced-motion handling, project interactions, and the homepage scene received focused manual acceptance.

Dedicated screen-reader testing and a formal WCAG 2.2 conformance assessment were not performed and are not currently scheduled as release blockers.

### v3.2.1 — Mechanical lint cleanup — Complete for current scope

Reduced ESLint from 87 findings to 37 through low-risk, behavior-preserving cleanup. Production build and focused manual acceptance passed.

The remaining findings are **accepted technical debt**, not an active cleanup task:

- 32 `react/prop-types` errors remain pending a future project-policy decision. PropTypes will not be added merely to make the current counter reach zero.
- Four `react-refresh/only-export-components` warnings remain pending a concrete module-organization need.
- One Three.js `react-hooks/exhaustive-deps` warning remains intentionally preserved because changing the dependency list mechanically could alter scene lifecycle behavior.

T10 of v3.3.0 modernized the lint ecosystem while deliberately preserving these existing rules, severities, and findings. Do not restart lint-baseline cleanup unless a future task explicitly changes the lint policy or a new regression appears.

### v3.2.2 — Accessibility visual refinement — Complete

Refined inactive navigation, form borders, and Expertise/tag-grid presentation without changing the accepted accessibility behavior.

## Backlog — not current work

The following are deferred future directions, outside v3.4.0. They are **not prerequisites for closing v3.3.0 or beginning job applications**.

### Job-search portfolio refinement

Retain these proposed improvements for a separately scoped future release:

- **Home and positioning:** tighten homepage messaging and surface selected project work more directly.
- **Information architecture:** simplify overlapping Expertise/About/Contact content and navigation based on the previously identified portfolio-content issues.
- **Final job-search presentation pass:** review the primary pages and featured case studies for concise copy, responsive presentation, and obvious hiring/contact paths; fix only concrete issues found in that review.

### Presentation and motion architecture

Define reusable timing, easing, stagger, entrance, interaction, and page-transition conventions only when a concrete presentation need justifies the work.

### Element-level loading and readiness

Extend the existing readiness system for specific authored moments where deferred assets create a real presentation problem. Do not globally preload the portfolio.

### Case-study visuals and interactions

Improve individual case studies when their content or presentation needs it rather than treating every project as one large redesign task.

### Persistent Three.js page and world states

Explore retaining one environmental layer across navigation, with routes altering camera, lighting, cube behavior, or scene state while sharing the same world.

### Direct Three.js interaction

The focused cube-scene work is now scoped in v3.4.0. Further pointer and keyboard interaction should support concrete portfolio needs before becoming another task.

### Performance profiling and justified optimization

Profile startup, route presentation, rendering cost, assets, bundle composition, and weaker-device behavior when there is a concrete performance concern or before a performance-focused release.

### Analytics and real-user measurement

Limited usage analytics is scoped in v3.4.0 T01. Broader real-user performance measurement remains deferred until goals and hosting constraints are defined.

Related intent is documented in [docs/EXPERIENCE.md](docs/EXPERIENCE.md) and [docs/MOTION.md](docs/MOTION.md).
