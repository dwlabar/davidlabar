# Experience Direction

DavidLaBar.com should feel like an authored application or digital space, not a generic portfolio assembled from interchangeable sections. The presentation is part of the product being demonstrated: the portfolio itself should show UI/UX judgment, front-end craft, interaction design, and creative-development ability.

## Core Principles

- Presentation is functional evidence of the work, not decoration applied after the fact.
- The site may wait for assets required for a specific authored moment instead of revealing visually incomplete content.
- Loading determines when presentation **may** advance. The presentation system determines when it **visually** advances.
- Animations should reach intentional visual boundaries. They should not visibly pause, skip, cut off, or strand the interface in an awkward intermediate state.
- Unconventional presentation is encouraged; unconventional usability is not. Navigation, project information, and contact paths must remain obvious and accessible.
- The route overlay is a restrained content-transition layer. Its existence is intentional and should not be treated as an error to remove by default.
- Performance, accessibility, responsiveness, and visual quality are themselves part of the portfolio demonstration.
- Authored presentation should not be removed solely to maximize immediate HTML visibility. Its cost and purpose should be evaluated with evidence.

## Readiness Layers

The intended model has three scopes:

1. **Boot readiness:** enough application and destination state exists for the initial presentation to advance.
2. **Route readiness:** the destination's critical above-the-fold presentation assets are settled before the route overlay reveals it.
3. **Future section or element readiness:** a particular authored moment may wait for its own assets without blocking the entire route.

Readiness must remain proportional to the presentation. Do not preload the full portfolio globally merely to gain animation control.

Future unloaded imagery may use deliberately designed placeholders—subtle gradient or shimmer wipes, masks, fades, or another site-specific treatment—so deferred content looks intentional rather than broken. Those treatments are a direction, not a current implementation.

## Startup and World Direction

The conceptual startup progression is:

```text
boot → logo/preloader → interface entrance → Three.js entrance → content entrance
```

These phases may overlap when that produces a better experience; they are not required to behave like a rigid movie timeline.

Three.js is intended to grow from a homepage scene into a persistent virtual or environmental layer. Future navigation may change camera position, lighting, cube behavior, or scene state while retaining the same underlying world. The current implementation remains homepage-owned, so this direction must not be documented or coded as if persistence already exists.

The experience should degrade gracefully for reduced motion, weaker hardware, or WebGL limitations without becoming visually careless. Alternate presentation can be quieter and less expensive while retaining hierarchy, intent, and feedback.

Implementation boundaries are documented in [ARCHITECTURE.md](ARCHITECTURE.md), and motion-specific guidance lives in [MOTION.md](MOTION.md).
