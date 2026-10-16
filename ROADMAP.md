# Roadmap

This file is the source of truth for what is active, what is next, and what is intentionally deferred. It should make the current project position clear without requiring the reader to reconstruct status from release history.

## Current position

- **Active next release:** v3.4.0 — Interactive Scene Polish — in progress.
- **Current / next task:** T11 — Scene Cleanup and Grid Expansion is COMPLETE. T01–T05 are COMPLETE. T10 — Scene Bloom and Atmosphere is COMPLETE for the accepted bloom implementation; the CSS Horizon Glow experiment was abandoned due to its visual conflict with cube fading. T06 — Scene-control presentation remains the next planned scene task, not started.
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

Make the homepage cube scene a more intentional, responsive part of the portfolio through focused measurement, authored entrances, direct interaction, and understandable controls. T01–T05 are complete. David accepted the procedural cube interaction, tuning controls, stronger defaults, enlarged pointer footprint, and revised intro choreography. T10 is complete for the accepted and committed bloom implementation; the CSS Horizon Glow experiment was abandoned due to its visual conflict with cube fading. T11 scene cleanup, grid expansion, and dev tuning are complete; T06–T09 retain their reserved scope and remain unstarted.

Scope update (2026-10-06): David requested intro choreography timing polish as T04. The previously planned T04–T07 tasks move to T05–T08 with their scope preserved.

Scope update (2026-10-07): David requested an application-ready portfolio content pass as T05 to support the job search while preserving the existing visual identity and scene behavior. The previously planned T05–T08 tasks move to T06–T09 with their scope preserved. Application version remains 3.3.0; v3.4.0 is unreleased.

Scope update (2026-10-07): David authorized T10 — Scene Bloom and Atmosphere, Phase 1: Bloom Integration ahead of the reserved T06–T09 tasks, without renumbering or starting them. Existing T05 work was checkpointed unchanged as `392d898` on `codex/3.4.0-t05-application-readiness`; `codex/3.4.0-t10-scene-bloom` branches directly from that checkpoint. T05 remained under review at that checkpoint.

Scope update (2026-10-15): David explicitly authorized T11 — Scene Cleanup and Grid Expansion ahead of T06–T09, and directed that T05 be marked COMPLETE. T11 removes the unused named-preset abstraction, limits persistence to the four public settings, and expands the existing grid to 529 cubes. Dormant-effect visual evaluation and public modes remain T07 work. T08's deferred Drive direction is rigid cubes following a manipulable 3D spline, not primarily camera steering. No Drive prototype is authorized here. Application version remains 3.3.0; v3.4.0 is unreleased.

T11 follow-up (2026-10-16): David rejected the rear/side linear-gradient fade experiment and authorized restoring the original camera-distance fading from the pre-experiment source. The rollback preserves the T11 architecture cleanup, 529-cube grid, public-only persistence, and accepted scene features. This rollback is included in the completed T11 scope.

T11 dev-tuning follow-up (2026-10-16): David authorized transient Camera, original camera-distance Fade, and modest Grid Depth Test controls plus a scoped faint-back-row hover adjustment. The restored 180/100/8 fade, camera, lighting, bloom, entrance, particles, and 529-cube load/reset baseline remain unchanged. Depth testing stays experimental and dev-only; T11 is COMPLETE and v3.4.0 remains unreleased.

### Sequential tasks

- **T01 — Analytics — COMPLETE**
  - Added optional native GA4 with automatic initial/history page views and focused project-selection, confirmed contact-success, and scene-controls-open events. Measurement stays limited and excludes form contents; development and missing-ID builds do not collect.
  - Production build, unchanged accepted lint baseline, local disabled-analytics smoke test, event checks, and whitespace validation passed. GA4 stream setup and live DebugView verification remain deployment steps; see [analytics setup](docs/ARCHITECTURE.md#analytics-setup-and-ownership).
- **T02 — Three.js entrance — COMPLETE**
  - Accepted authored impact/drop entrance after the preloader handoff: a central cube drops into the field with overshoot/rebound, followed by an outward ripple/reveal.
  - Normal cube travel continues throughout the sequence; reduced motion retains an intentional static presentation.
- **T03 — Procedural cube interaction — COMPLETE**
  - Uses a local liquid-lift field on the existing individual Phong cubes. Entering a cube starts one independent source; nearby cells respond after distance-based delays with Gaussian falloff, an eased rise, and a smooth settle.
  - Overlapping sources reinforce through smooth saturation; an active source cannot restart itself and a stationary pointer cannot emit repeatedly. Lift composes with base/entrance height, and normalized response drives the existing blue emissive highlight. Recycling clears transient source/neighbor state.
  - Fresh scene defaults are Width 10, Depth 10, Height 7.5, and Speed 0.2; saved public settings continue to win. Pointer acquisition preserves direct mesh hits first, then selects one nearest cube using a 1.5× X/Z hit footprint on a miss, without changing rendered geometry or effect radius.
  - Interaction retains scene bounds, UI exclusion, and non-touch input. T04 advances the entrance gate into the settling ripple with reveal-aware targeting and response. Reduced motion omits the field; scene teardown releases its state.
  - Public Speed/Width/Depth/Height controls and persistence remain unchanged. A development/opt-in Preview button disclosure adds seven live, non-persisted interaction sliders and Reset Values without rebuilding the scene; the inner section enters as one unit with reduced-motion support inside the shared control shell, with a bottom-centered +/− toggle. Normal production hides the tuning UI.
  - Authored defaults (also restored by Reset Values): lift 14.2, radius 2, falloff 1, rise 0.89 seconds, duration 2.5 seconds, propagation delay 0.04 seconds per cell, blue highlight 0.27.
  - David accepted the final T03 implementation. Production build and whitespace validation passed; lint remains at the accepted 32 errors and 5 warnings.
- **T04 — Intro choreography timing polish — COMPLETE**
  - Preserve the approved fall, impact rebound, radial ripple/reveal, continuous grid travel, and T03 interaction settings; adjust their timing relationship using the existing entrance clock.
  - Hold plane particles hidden and stationary until 0.15 seconds after impact, then retain their existing movement, appearance, and reset behavior.
  - Enable pointer interaction at 65% of the post-impact ripple/recovery duration. Only fully revealed cubes can receive pointer entry; propagated lift and highlight blend with each recipient's existing reveal so hidden cubes remain still and settling intro offsets compose additively with lift.
  - Returning Home retains immediate established-scene behavior; reduced motion retains the static field with no particles or interaction.
  - Production build and whitespace validation passed; lint remains at the accepted 32 errors and 5 warnings. A focused scene-loop harness verified timing gates, unchanged entrance transforms against T03, real pointer raycasts during settling, reveal masking, additive lift, control targets, reduced motion, return-to-Home behavior, and cleanup. Local browser rendering and the width control passed a smoke check with no captured warnings/errors. David passed manual visual acceptance on 2026-10-06: the revised timing feels significantly better, with no visible snapping or transform conflicts, smooth high-speed pointer movement during settling, particles beginning during reveal, and interaction available during ripple recovery. Hidden cubes remain non-interactive and reduced-motion behavior remains correct. Final scope review confirms only the intended T04 choreography and documentation changes; T05 has not begun.
- **T05 — Application-ready portfolio content pass — COMPLETE**
  - Retain centralized route-aware document titles, the David LaBar fallback title, an accessible Contact navigation icon with mobile text, and shared project data for Projects and DocumentTitle. Projects retains all five cards, ordering, assets, and image readiness.
  - Visual-review scope correction (2026-10-07): restore Home's hero-only structure and all Expertise user-facing copy from pre-T05 commit 57038f9. Remove Selected Work, its Home-only wrappers/styles, and unused featured-project metadata. Restore Contact's original two body paragraphs while keeping the Contact heading and approved availability subheading.
  - Preserve About's current T05 copy, Toolbox, and BlockReveal/Panel implementation unchanged in this correction. Its broader personal-content direction remains deferred below.
  - Scene manager, controls/tuning, choreography, form, analytics, and readiness owners remain unchanged. No new dependencies, version changes, GSAP Animation Editor project, or shifted scene-task implementation.
  - Production build passes with the existing large-chunk advisory. Lint remains at the accepted 32 errors / 5 warnings; whitespace validation passes.
  - Focused local Edge/Playwright checks passed for restored Home structure and viewport/footer spacing, scene-control toggle and keyboard width adjustment, View My Work overlay navigation, all five ordered Projects cards and loaded imagery, restored Expertise copy/icons, exact Contact copy/form presence, route titles, and desktop/mobile Contact navigation. Desktop/mobile screenshots were visually inspected; no runtime errors were captured. Source comparison confirms the requested 57038f9 restorations, and About remains unchanged during this correction.
  - Marked COMPLETE at David's direction on 2026-10-15. No live form submission, GA4 DebugView verification, or deployed-device acceptance was performed. The content is included in the committed T10 base; T06 has not started.
- **T06 — Scene-control presentation — NEXT (not started)**
  - Improve the existing cube-control UI while retaining its activation cube. Animate panel open/close and control entrance/exit so controls do not simply appear.
  - Improve hierarchy and interaction feedback while preserving accessibility and reduced-motion behavior.
- **T07 — Scene modes / Randomize**
  - Visually evaluate the retained Wave and Random Y effects before exposing modes; expose only effects and settings that are visually worthwhile. T11 handles configuration cleanup and public-setting persistence; do not repeat that completed scope here.
  - Add constrained Randomize and a clear way to restore the default state. Keep the interface playful and understandable rather than presenting a developer/debug panel.
- **T08 — Drive — DEFERRED (not started)**
  - Explore rigid cubes following a manipulable 3D spline. The path drives the experience; camera response may support it, but camera steering is not the primary direction.
  - Keep individual cubes rigid and evaluate continuity, spacing, recycling, and reduced motion before exposing the mode. Preserve the default scene's existing movement and wrapping.
  - Keep DRIVE optional unless testing shows it belongs in the default presentation.
- **T09 — Performance and release acceptance**
  - Profile the completed scene interactions and rendering; check desktop, mobile, weaker-device, and reduced-motion behavior.
  - Run the production build, accepted lint baseline checks, whitespace checks, and focused manual visual/interaction acceptance.

- **T10 — Scene Bloom and Atmosphere — COMPLETE (accepted bloom implementation)**
  - **Phase 1 — Bloom — ACCEPTED AND COMMITTED (`2e5518e`, 2026-10-08, `feat: add configurable scene bloom`).** The user's adjusted source defaults and approved implementation were preserved exactly; a clean working tree was verified before Phase 2.
  - Bloom only, using installed Three.js r186 addons: one EffectComposer with RenderPass → UnrealBloomPass → OutputPass, owned by the existing Home scene lifecycle. Disabled bloom or zero strength bypasses all post-processing passes. Sliders update the existing pass without rebuilding the scene.
  - Preserve camera, lights, geometry, Phong/outline materials, fading, wrap/reposition logic, intro timing, pointer interaction, trails, and persisted public settings. Bloom receives the already-faded scene; no selective material replacement or second scene render. No new particles, horizon gleams, shafts, DOM glow, or Phase 2 work.
  - Separate transient Effects section inside the existing shared +/− tuning disclosure, using the existing development/opt-in Preview gate. Bloom Enabled defaults on; Strength 0.08 (0–1), Radius 0.40 (0–1), Threshold 0.15 (0.02–1); all sliders step by 0.01. Effects Reset Values restores all four defaults independently of interaction/public settings. Production renders authored bloom while hiding unfinished tuning controls.
  - Composer sizing follows the existing renderer pixel ratio (currently 1), with bounded 4-sample offscreen antialiasing. Linear tone mapping and the authored background clear are scoped to bloom rendering and restored afterward. OutputPass performs final sRGB conversion. Cleanup disposes composer targets and all passes, including r186's otherwise omitted high-pass shader material.
  - Local Edge/Playwright checks cover keyboard sliders/toggle/reset, independent interaction/public controls and persistence, mobile scrolling and resize, reduced-motion static rendering/live updates, intro drop/reveal, pointer lift, ordinary/max-speed recycling, navigation/remount, and all 24 tracked post-processing target/material disposals. A zero-opacity pixel check found no visible geometry or bloom, and bloom on/off retained the exact #151515 background. Observed wrapped-cube opacity stayed below 0.0004, with synchronized face/outline opacity.
  - Desktop/mobile screenshots were inspected; automated checks are not David's visual acceptance. Production and opt-in builds pass with the existing large-chunk advisory; ESLint retains the accepted 32 errors / 5 warnings. Production browser checks confirm four public sliders with tuning hidden, while opt-in Preview exposes all 14 sliders and the Effects toggle/reset. No browser errors were captured; whitespace validation passes.
  - Local synchronous 1440×900 render sampling was approximately 2.0–2.1 ms direct / 2.2–2.6 ms bloom; this is not low-end/mobile-device profiling. David accepted Phase 1 on 2026-10-08, including his adjusted source defaults. Lower-end GPU profiling remains deferred. If weaker hardware needs a reduction, first lower the bounded offscreen MSAA sample count; do not introduce a quality-management system in Phase 1.
  - **Phase 2 — CSS Horizon Glow — ABANDONED (2026-10-14).** David rejected the experiment due to its visual conflict with cube fading. Removed the CSS layer, transient horizon settings, tuning controls, styles, and architecture documentation without a replacement effect. The accepted bloom implementation and defaults, cube fading, grid dimensions, entrance animation, interaction, and public controls remain unchanged.
  - Application version remains 3.3.0; v3.4.0 is unreleased. Horizon removal is included in the completed T10 base `8c9ce05`.

- **T11 — Scene Cleanup and Grid Expansion — COMPLETE**
  - Explicitly authorized cleanup: flatten the existing scene defaults, remove named presets and `presetName` plumbing, and change `gridSize` from 20 to 22. Existing inclusive loops produce 23×23 = 529 cubes; preserve 10-unit spacing, cube geometry, movement, camera framing, and rendering/effect parameters. The follow-up below restores the original cube fading after rejecting the gradient experiment.
  - Retain `threeSceneSettings`, restoring and saving only finite, in-range `speed`, `cubeSizeX`, `cubeSizeY`, and `cubeSizeZ` values. Ignore obsolete stored fields, including `gridSize`, without resetting valid public customizations. Preserve the 500 ms saving delay and unmount cancellation.
  - Preserve dormant Wave (amplitude 3, frequency 0.5, speed 0.01) and Random Y (range 8), both disabled by default. Wave animates base height; Random Y assigns heights at generation/recycling when Wave is off. Both remain available for T07 visual evaluation without public mode controls. The separate entrance impact ripple remains unchanged.
  - Initial cleanup validation: local isolated Edge/Playwright checks passed for 529 cubes, fresh/legacy/malformed storage, preservation of valid between-step customizations, all four keyboard sliders in animated/static scenes, delayed saving and unmount cancellation, entrance/ripple/particle gates, pointer lift and settling, bloom toggle/defaults, fading/recycling at ordinary and maximum speed, navigation/remount, and live reduced-motion changes. The abandoned horizon layer remains absent. At that checkpoint the manager, entrance ripple, interaction, bloom pipeline, and public control implementation were unchanged.
  - Desktop 1440×900, ultrawide 2560×1080, and mobile 390×844 screenshots were inspected; canvas sizing, control bounds, and mobile tuning scroll passed. Uninstrumented production mobile checks passed for fresh/saved controls, four-field persistence, and hidden tuning. No page errors were captured. These automated/emulated checks do not replace David's visual acceptance or physical-device testing.
  - Production build passes with the existing large-chunk advisory; `git diff --check` passes. ESLint changed from 32 errors / 5 warnings to 31 errors / 5 warnings solely because the removed `presetName` prop no longer has a prop-types finding; no new diagnostics. Local synchronous 1440×900 render-call medians on an RTX 2080 Ti were approximately 1.6 → 1.9 ms direct and 1.8 → 2.0 ms bloom (441 → 529 cubes). These are CPU-side submission samples, not GPU timings or weaker-device profiling.
  - The initial grid expansion moved the camera target from Z = -90 to -100, slightly shifting projection. The follow-up fixes the authored target Z at -100, independent of gridSize or experimental depth rows, preserving that framing; final visual acceptance remains pending.
  - **Gradient fade experiment — REJECTED (2026-10-16).** Removed rear/side gradients and composition, fade helpers/metadata, all four Fade Length/Middle Stop sliders, transient fade state/reset, and the recycling-frame latch. No gradient-specific styles had been introduced. Existing Interaction and Bloom controls, settings, and DEV / Preview gate are preserved.
  - **Original fading restored:** `fadeStart: 180`, `fadeEnd: 100`, `fadeCurve: 8`, verified against `8c9ce05:src/config/ThreeScenePresets.js` and retained in the flat `ThreeSceneDefaults.js`. The temporary exponent-4 experiment is not retained. At the rollback checkpoint, `ThreeSceneManager.jsx`, `cubePointerTarget.js`, and `EffectsTuningControls.jsx` matched the pre-gradient source from `8c9ce05`; the old preset architecture is not restored. This restores the shared camera-distance calculation for ordinary/entrance cubes and particles, synchronized outlines, and original overshoot/recycling/visibility behavior without changing camera, materials, lights, bloom, or choreography.
  - At the rollback checkpoint, the pointer experiment was reverted: the faint-target fallback and visibility tiers were introduced with the rejected gradients, not established as an independently accepted baseline fix. Both original paths again require opacity > 0.05, with direct geometry before the unchanged 1.5× expanded footprint. Lift timing/radius/propagation and entrance gates are unchanged. Distant/faint back rows at or below 5% remained non-interactive at that checkpoint; the separately authorized follow-up below addresses this limitation.
  - Rollback validation: exact pre-gradient source parity for the manager, pointer helper, and Effects controls; 529 cubes and 180/100/8 restored even with legacy stored fadeCurve 4; entrance/drop and particle gates; synchronized face/outline and particle fading; 552 wraps each at speeds 0.2 and 1 with preserved overshoot. Maximum sampled recycling opacity was approximately 0.000016 (0.0016%), consistent with the original near-zero behavior. Rear opacity changed continuously in the sampled loop. Pointer lift/highlights passed at both speeds; the original faint-back-row cutoff was confirmed. Development has 14 sliders (4 public, 7 Interaction, 3 Bloom) and no fade controls; Bloom toggle/reset, Interaction tuning, public sliders, four-field persistence, and reduced-motion static/live updates passed without scene reconstruction. Uninstrumented production desktop 1440×900 and mobile 390×844 checks passed for rendering, public controls/persistence, hidden tuning, and canvas bounds; screenshots showed no obvious hard rear/side cutoff. No page errors were captured. Production build and git diff --check pass; ESLint remains 31 errors / 5 warnings with no new diagnostics, aside from the existing manager warning again naming the restored fade dependencies. The build retains its existing large-chunk advisory. Automated checks and screenshots do not prove perceptual smoothness on every device; final visual acceptance remains David's. v3.4.0 is unreleased and application version stays 3.3.0.
  - **Preserve Original Scene / Dev Tuning follow-up — COMPLETE:** original camera position (0, 40, 40), target (0, 0, -100), FOV 75, camera-distance fade 180/100/8, lighting/materials, bloom, entrance, particles, and 23×23 grid remain the initial/reset baseline. Transient context/live refs add seven Camera sliders, three original-distance Fade sliders, and one depth-row slider to the existing Effects disclosure. No scene reconstruction, new rendering system, or localStorage fields. See [control defaults/ranges](docs/ARCHITECTURE.md#transient-camera-fade-and-depth-testing).
  - Camera ranges: X -60–60, Y 10–100, Z 0–100; target X -60–60, Y -20–40, Z -180–-20; FOV 40–100, all step 1. Fade start 120–300, end 20–160 (step 1, constrained start > end), curve 1–12 (step 0.1). Reset Camera/Fade restore their respective original values. Reset Depth to Original independently restores BASE_DEPTH_ROWS (23). Reset All Scene Tuning restores only Camera, Fade, and Grid Depth; Interaction, Bloom, and public sliders/storage remain untouched. Interaction and Bloom retain their independent Reset Values buttons.
  - Experimental depth: 23–29 rows, step 1; 23 columns stay fixed. Up to six rear rows reuse a dev/opt-in Preview-only pool (529–667 active cubes). Growth/contraction keeps front rows and scrolling phase; it does not retarget the camera or alter particle travel. Depth changes wait for the original entrance to finish; reduced-motion changes apply immediately. Hidden rows cannot render/target/receive neighbor lift, and the scene owns all pooled-resource cleanup. Production remains 529 cubes with tuning hidden.
  - Scoped hover adjustment: direct and expanded targeting prefer opacity > 0.05, preserving direct priority within that tier, then fall back to positive-opacity faint targets. Fully invisible/hidden cubes cannot capture hover, and faint targets cannot steal clearer direct or padded hits. The 1.5× footprint and existing lift/ripple timing, propagation, readiness gates, and blue highlights are unchanged. This operates with the original distance fade and does not restore the rejected gradients.
  - Reset follow-up validation: all five section resets are isolated in animated and reduced-motion browser checks. Modified Interaction/Bloom and public settings/storage survive Reset All. Depth reset restores 23 rows; target Z stays -100 across 23–29 rows. Scene identity remains stable and scrolling continues without restarting the entrance. Production build and diff checks pass; ESLint diagnostics remain unchanged at 31 errors / 5 warnings.
  - Dev-tuning validation: initial camera and all 529 cube transforms/face/outline opacities match the restored baseline exactly. A 1440×900 reduced-motion framebuffer comparison against the pre-change manager differed in only three color-channel samples by one 8-bit level; inspected desktop/mobile images retain the original appearance. All 11 sliders/readouts, camera/fade resets, Reset All (Camera/Fade/Depth only), endpoint constraints, animated/static updates, and four-field persistence passed. 23/24/25/29-row checks preserve width, 10-unit spacing, camera values, and pooled object identities; max-speed wraps retain spacing/overshoot. A 39-target faint-back-row sweep and actual pointer lift passed, with clear-target priority and zero-opacity exclusion checked separately. Entrance/ripple, deferred depth application, particle delay/fading, synchronized outlines, and mobile scrolling passed. Scene teardown disposed all 1,334 pooled geometries and 1,334 materials. Local depth-change-plus-render CPU samples were approximately 5.3 ms median / 6.9 ms maximum across 40 alternating 23/29-row changes; these are not GPU timings or low-end-device guarantees. Production and opt-in Preview builds pass with the existing large-chunk advisory. Ordinary production exposes four public sliders; opt-in Preview exposes all 25 sliders with transient controls/reset. No captured page errors. ESLint remains 31 errors / 5 warnings with no new diagnostics (existing manager warning drops fade fields now read through a ref); git diff --check passes. Final visual tuning/acceptance remains David's.
  - Finalized COMPLETE at David's direction on 2026-10-16, including independent resets and fixed camera target Z = -100. T06 — Scene-control presentation is NEXT (not started). Application version remains 3.3.0 and v3.4.0 remains unreleased; no next-task implementation, push, or tag.

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

The retained title, navigation, Contact heading/subheading, and About changes are scoped in v3.4.0 T05 above. Expertise, About, and Contact remain separate pages. The following portfolio-content directions remain deferred, outside active v3.4.0 tasks:

- **GSAP Animation Editor case study:** remains the next major portfolio-content addition.
- **Home featured projects:** reconsider presentation after the GSAP Animation Editor case study exists; do not simply duplicate the Projects card grid.
- **About:** reconsider as a more personal page that adds something beyond the resume, LinkedIn, Expertise, and project case studies.
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
