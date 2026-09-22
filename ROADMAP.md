# Roadmap

This file is the source of truth for what is active, what is next, and what is intentionally deferred. It should make the current project position clear without requiring the reader to reconstruct status from release history.

## Current position

- **Active release:** v3.3.0 — Platform and dependency modernization
- **Current task:** T11 — Final manual release acceptance
- **Next task:** Close v3.3.0 after manual acceptance. No additional modernization or lint-cleanup task is scheduled.
- **After v3.3.0:** v3.4.0 — Job-search portfolio refinement, if approved before work begins.
- **Not blocking release:** the accepted ESLint baseline, future Three.js concepts, presentation experiments, analytics, and performance work listed under Backlog.

## Planning rules

- Keep one active release and one clearly identified current task.
- Define the release task list before implementation begins. Prefer a small number of outcome-based tasks rather than turning every dependency checkpoint into a separate roadmap task.
- Do not add tasks to an active release without explicitly documenting the scope change first.
- Do not reopen completed work without a new defect, regression, requirement, or evidence that the previous result is no longer valid.
- Treat audits as decision inputs, not recurring work by default. Re-audit only when the underlying code, dependency, requirement, or evidence has materially changed.
- Keep narrow maintenance tasks narrow. Do not repeat full dependency, package, or repository audits when the task only concerns a known file or issue.
- Separate accepted technical debt from active work. An accepted warning or policy decision is not an "in progress" task.

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

## Proposed next release

### v3.4.0 — Job-search portfolio refinement — Proposed, not started

This release should be approved and its scope frozen before implementation. Its purpose is job-facing portfolio improvement, not another technical modernization pass.

Proposed maximum scope:

- **T01 — Home and positioning:** tighten homepage messaging and surface selected project work more directly.
- **T02 — Information architecture:** simplify overlapping Expertise/About/Contact content and navigation based on the previously identified portfolio-content issues.
- **T03 — Final job-search presentation pass:** review the resulting primary pages and featured case studies for concise copy, responsive presentation, and obvious hiring/contact paths; fix only concrete issues found in that review.

If approved, those three tasks are the release. New unrelated technical cleanup, dependency work, experimental Three.js features, or broad audits move to a later release rather than expanding v3.4.0.

## Backlog — not current work

The following are future directions. They are **not prerequisites for closing v3.3.0 or beginning job applications**.

### Presentation and motion architecture

Define reusable timing, easing, stagger, entrance, interaction, and page-transition conventions only when a concrete presentation need justifies the work.

### Element-level loading and readiness

Extend the existing readiness system for specific authored moments where deferred assets create a real presentation problem. Do not globally preload the portfolio.

### Case-study visuals and interactions

Improve individual case studies when their content or presentation needs it rather than treating every project as one large redesign task.

### Persistent Three.js page and world states

Explore retaining one environmental layer across navigation, with routes altering camera, lighting, cube behavior, or scene state while sharing the same world.

### Direct Three.js interaction

Investigate purposeful pointer and keyboard interaction that supports the portfolio experience rather than adding an unrelated visual toy.

### Performance profiling and justified optimization

Profile startup, route presentation, rendering cost, assets, bundle composition, and weaker-device behavior when there is a concrete performance concern or before a performance-focused release.

### Analytics and real-user measurement

Add privacy-conscious usage and real-user performance measurement when goals and hosting constraints are defined.

Related intent is documented in [docs/EXPERIENCE.md](docs/EXPERIENCE.md) and [docs/MOTION.md](docs/MOTION.md).
