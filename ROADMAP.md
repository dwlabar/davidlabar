# Roadmap

This roadmap orders the next broad areas of work. Each item is a direction to investigate and implement incrementally, not a promise that every idea is already designed or approved.

## Near-term release plan

### v3.2.1 — Mechanical lint cleanup

The accepted low-risk cleanup reduced the lint baseline from 87 findings to 37. Focused manual acceptance passed for the tested pages, interactions, styling, text, project reveals, and console behavior; this was not exhaustive regression testing. Remaining lint-policy and lifecycle findings are intentionally deferred, so broad roadmap item #3 remains in progress.

### v3.3.0 — Platform and dependency modernization

Audit and modernize the portfolio's core front-end platform and dependencies in controlled, reviewable passes before resolving the remaining lint-policy questions.

Internal work uses task IDs within this release:

- **T01 — Runtime baseline — COMPLETE**
- **T02 — CSS tooling + Browserslist maintenance — COMPLETE**
- **T03 — Vite 7 checkpoint — NEXT**
- T04 — React 19
- T05 — Router 7 preparation
- T06 — Router 8
- T07 — Vite 8
- T08 — GSAP
- T09 — Three.js
- T10 — Lint ecosystem
- T11 — Release acceptance

For each task:

- Use current official migration and release documentation. Audit first; do not blindly update every package at once or select target versions before the dependency audit.
- Preserve existing authored presentation and behavior, handle major-version migrations deliberately, and validate between meaningful upgrade groups.
- Keep unrelated feature work separate from this milestone.
- Re-run the lint baseline after modernization before deciding how to resolve the currently remaining 37 findings.
- Reconsider the `react/prop-types` policy after React modernization rather than adding PropTypes merely to satisfy the current rule.
- Preserve the Three.js lifecycle warning for architectural review rather than mechanically changing the effect's dependencies.

T01 (runtime baseline) was manually accepted by David on September 21, 2026. Node **24.21.0** and npm **11.19.0** were tested successfully with the existing v3.2.2 application and dependency stack. The production build passed, and lint retained the accepted baseline of 32 `react/prop-types` errors, one `react-hooks/exhaustive-deps` warning, and four `react-refresh/only-export-components` warnings (37 findings total).

T02 (CSS tooling + Browserslist maintenance) was accepted by David. Sass, PostCSS, Autoprefixer, and browser data were updated while preserving the Browserslist policy. Clean installation and the production build passed; production output remained byte-for-byte identical, the outdated browser-data warning was resolved, and lint retained the accepted 37-finding baseline. No application source or styling changes were required. T03 (Vite 7 checkpoint) is next and has not started; the accepted application version remains 3.2.2 while the active release is v3.3.0.

## 1. GSAP and Three.js lifecycle cleanup — Complete

Completed on August 17, 2026. Component timelines, tweens, ScrollTriggers, render resources, listeners, observers, animation frames, and timers now have narrowly scoped ownership and cleanup. Three.js performance profiling and possible techniques such as instancing remain separate future work under item 9.

## 2. Accessibility and reduced-motion coverage — Complete

Completed on September 9, 2026. The shared shell now provides a skip link, named navigation, current-page state, accessible disclosure controls, mobile-menu Escape handling, and design-aligned focus treatment. The image modal follows the modal dialog focus pattern and isolates background content. A shared preference hook extends reduced-motion handling across component-owned GSAP, CSS effects, scroll reveals, SVG examples, and a static-but-complete Three.js presentation.

Manual runtime and visual acceptance passed for normal and reduced-motion navigation, keyboard operation, project-card and logo interactions, the homepage Three.js scene and controls, and project-image modal focus, close, scroll-lock, and focus-return behavior. Dedicated screen-reader testing and a formal WCAG 2.2 conformance assessment were not performed.

## 3. Lint baseline cleanup — In Progress

Reduce the existing ESLint findings in focused, behavior-preserving passes. Keep baseline cleanup separate from feature work so new regressions remain visible.

The v3.2.1 low-risk/mechanical pass is complete with lint reduced from 87 findings to 37 and a passing production build. David confirmed focused manual acceptance for the homepage, navigation, footer, About/Contact/Expertise and contact-form text, project-page loading and scroll reveals, unchanged layout/spacing, and no new browser console errors. This was not exhaustive regression testing. The remaining 32 prop-validation errors require a project-policy decision; four Fast Refresh warnings and one Three.js hook dependency warning require separate reviews.

## 4. Presentation and motion architecture

Define reusable timing, easing, stagger, entrance, interaction, and page-transition conventions. Explore an explicit presentation controller that coordinates the boot, interface, Three.js, and content phases without forcing every effect into one rigid timeline.

## 5. Element-level loading and readiness

Extend the current boot and route readiness model only where a specific presentation needs it. Introduce section- or element-level states and deliberately designed placeholders without globally preloading the entire portfolio.

## 6. Case-study visuals and interactions

Improve project imagery, hierarchy, storytelling, modal behavior, and site-specific interactions while keeping case-study information obvious, responsive, and accessible.

## 7. Persistent Three.js page and world states

Explore retaining one environmental layer across navigation. Routes could alter camera position, lighting, cube behavior, or scene state while sharing the same underlying world.

## 8. Direct Three.js interaction

Investigate purposeful pointer and keyboard interaction with the scene. Interaction should reinforce navigation or portfolio meaning rather than add an unrelated visual toy.

## 9. Performance profiling and justified optimization

Measure startup, route presentation, rendering cost, asset loading, bundle composition, and weaker-device behavior. Optimize the proven bottlenecks and retain the authored experience where its cost is acceptable.

## 10. Analytics and real-user measurement

Add privacy-conscious usage and real-user performance measurement when goals and hosting constraints are defined. Use the evidence to evaluate navigation clarity, case-study engagement, load behavior, and rendering performance.

Related intent is documented in [docs/EXPERIENCE.md](docs/EXPERIENCE.md) and [docs/MOTION.md](docs/MOTION.md).
