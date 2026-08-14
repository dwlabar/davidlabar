# Motion

Motion on DavidLaBar.com should feel authored, coordinated, and part of one coherent application or world. It should explain state, establish hierarchy, and support the site's presentation; unrelated effects added only for decoration dilute that intent.

## Current Implementation

- Inline CSS in `index.html` owns the earliest logo/preloader entrance because it can begin before the Vite application bundle is ready.
- React and GSAP own the preloader exit after route readiness and the authored entrance cycle reach a safe boundary.
- The navigation overlay uses a CSS opacity transition with explicit completion and timeout handling in `OverlayContext`.
- GSAP timelines and tweens are currently distributed across navigation, SVG icons, project cards, block reveals, SVG examples, and Three.js settings.
- CSS also owns global/component transitions and several repeating visual effects.
- Reduced-motion handling currently covers the inline preloader and overlay transition, with a direct preloader exit. It is not yet a complete application-wide alternate mode.

Current animations should finish at intentional visual boundaries. Avoid arbitrary timeout cutoffs that can leave a partially transformed element visible. Fallbacks are still appropriate for preventing deadlocks, but their settled visual state must be deliberate.

## Future Direction

Complex choreography should move toward explicit GSAP timelines or presentation controllers rather than being inferred from several independent CSS animations. A future boot approach may be:

1. Render immediate inline HTML, SVG, and CSS for first paint.
2. Initialize application JavaScript underneath that presentation.
3. Once GSAP and application state are ready, let a presentation controller own the more complex preloader exit and application-entry choreography.

Do not load a separate copy of GSAP in `index.html` merely to animate first paint unless later profiling and design work demonstrate that it is justified. CSS is the appropriate early-boot tool today.

The future motion system should establish reusable conventions for:

- durations and easing
- stagger and sequencing
- interface and content entrances
- hover and focus feedback
- page transitions
- reduced-motion alternatives

Pointer and keyboard interactions should receive equivalent intentional feedback, even when the exact visual response differs. Reduced motion should be designed as an alternate presentation mode rather than implemented as a late blanket removal of all feedback.

Every timeline, tween, ScrollTrigger, CSS/JavaScript handoff, render loop, listener, timer, and callback needs explicit lifecycle ownership and cleanup. That discipline is required whether motion remains component-local or later becomes centrally coordinated.

See [EXPERIENCE.md](EXPERIENCE.md) for the creative intent and [ARCHITECTURE.md](ARCHITECTURE.md) for the current owners.
