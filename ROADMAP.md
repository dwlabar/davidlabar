# Roadmap

This roadmap orders the next broad areas of work. Each item is a direction to investigate and implement incrementally, not a promise that every idea is already designed or approved.

## 1. GSAP and Three.js lifecycle cleanup — Complete

Completed on August 17, 2026. Component timelines, tweens, ScrollTriggers, render resources, listeners, observers, animation frames, and timers now have narrowly scoped ownership and cleanup. Three.js performance profiling and possible techniques such as instancing remain separate future work under item 9.

## 2. Accessibility and reduced-motion coverage

Complete accessible names and navigation state, modal dialog/focus behavior, contrast review, keyboard parity, and semantic structure. Extend reduced motion from the current boot/overlay handling into an intentional alternate presentation mode across GSAP, CSS, and Three.js.

## 3. Lint baseline cleanup

Reduce the existing ESLint findings in focused, behavior-preserving passes. Keep baseline cleanup separate from feature work so new regressions remain visible.

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
