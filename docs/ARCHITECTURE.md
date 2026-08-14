# Architecture

## Current Architecture

### Boot and React startup

`index.html` owns the earliest presentation layer. It provides the dark page background, scroll lock, inline preloader markup, logo SVG, entrance keyframes, and a reduced-motion rule before the Vite bundle is available. It also declares the React `#root` mount and the separate `#modal_root` portal mount.

`src/main.jsx` consumes a temporary `redirectPath` value from `localStorage` when present, then mounts React in `StrictMode`. Provider nesting is:

```text
PageReadyProvider
  PreloaderProvider
    OverlayProvider
      Preloader
      App
```

The providers sit outside the router component rendered by `App`, while route-aware hooks are used by descendants inside the router.

### Routing and application shell

`App.jsx` owns the `BrowserRouter`, shared navigation, transition overlay, route-transition listener, main route outlet, and footer. Its primary routes are home, projects, expertise, about, and contact. Project case studies are separate routes under `/projects`; SVG and preloader example routes are also registered directly.

Internal navigation normally uses either `NavBar` or `useOverlayNavigate`. Both ask `OverlayContext` to make the overlay opaque before scrolling to the top and calling React Router navigation. Selecting the current route closes any open mobile navigation without replaying the route transition.

### Readiness and presentation flow

Three systems cooperate without sharing one global animation timeline:

1. `PreloaderContext` tracks whether the initial destination is loading and whether the preloader remains visible. Initial completion is idempotent.
2. `PageReadyContext` associates one readiness registration with the current React Router location key. An early notification is retained for that key; cleanup invalidates replaced navigation.
3. `OverlayContext` owns overlay visibility, opacity, navigation dimming, transition callbacks, and timeout/request-animation-frame cleanup.

Each routed page calls `useNotifyWhenImagesLoaded`. Pages without declared critical images report ready on the next animation frame. Image-heavy pages pass a small explicit list—typically the first project card or primary case-study imagery. Loading failures count as settled so a failed image cannot deadlock navigation, and cancelled routes detach their image handlers.

`RouteTransitionListener` registers the current location and reveals it after readiness. The first ready destination releases the preloader; later destinations hide the route overlay. An eight-second route fallback prevents an integration error from trapping navigation indefinitely.

The inline preloader entrance continues to an authored cycle boundary once the initial route is ready. `Preloader.jsx` then uses a GSAP timeline to fade the logo and layer. Reduced-motion users skip the animated exit, and a ten-second absolute fallback prevents permanent scroll lock.

The overlay uses the SCSS opacity transition as its visible boundary. It handles `transitionend`, already-settled opacity, reduced motion, background-tab failures, interrupted operations, and timeout cleanup before invoking the active navigation callback.

### GSAP ownership

GSAP is used throughout the current application rather than behind one controller:

- `Preloader` owns the initial exit timeline.
- `NavBar`, `BurgerIcon`, `LogoMini`, and `CubeIcon` own navigation and icon motion.
- `ProjectCard` owns its tile hover/focus tweens.
- `BlockReveal` creates ScrollTrigger reveals for case-study sections.
- `SVG-Examples` demonstrates several SVG animation techniques.
- `ThreeSceneManager` interpolates speed, scale, and outline settings.

Some components clean up their timelines or tweens locally. Lifecycle ownership is not yet consistent across the full system; the roadmap treats that as technical cleanup rather than evidence that GSAP itself should be removed.

### Three.js ownership and settings flow

The Three.js experience exists only on `Home`. `Home` creates `ThreeSceneProvider`, then renders content, `ThreeSceneControls`, and `ThreeSceneManager` within it.

`ThreeSceneContext` merges the named preset from `ThreeScenePresets.js` with saved `threeSceneSettings`. Control changes update React state immediately and throttle persistence by 500 milliseconds. The controls expose speed and cube width, depth, and height.

`ThreeSceneManager` owns scene, camera, renderer, resize observer, animation frame, lights, 20 trail meshes, and a 21-by-21 grid of cube meshes with edge overlays. Speed and scale changes are interpolated with GSAP refs so the scene does not rebuild for those controls. Unmount cleanup cancels the frame, disconnects resize handling, disposes mesh resources and the renderer, and removes the canvas. Resource and frame-loop cleanup still have known areas for focused review.

### Pages, projects, and components

- `src/pages/` contains top-level portfolio pages plus direct development examples.
- `src/pages/projects/` contains the case-study pages. An additional `projects/Projects.jsx` file exists but is not registered by `App.jsx`; the routed hub is `src/pages/Projects.jsx`.
- `Container`, `Panel`, `Card`, and `BlockReveal` provide shared composition patterns.
- `ProjectCard` renders the project link, imagery, label, and GSAP tile interaction.
- `Modal` portals project imagery into `#modal_root`, supports Escape, focuses its close button, and returns focus on unmount.
- `FormContact` integrates Formspree and locally persists draft fields.
- `NavBar`, `Overlay`, and the overlay-navigation hook coordinate desktop and mobile navigation presentation.
- The imported `DevPanel` is not rendered by the current application shell; its example routes remain directly available.

### SCSS organization

`src/styles/app.scss` loads the global, typography, and main-layout layers. Components import their own partials. Shared settings define colors, breakpoints, timing, z-index, and navigation height; tools provide breakpoint and pixel-to-rem helpers. The styles are responsive and use both CSS transitions/keyframes and GSAP-driven inline transforms. Tailwind is not part of the project.

### Assets and local storage

Vite-imported assets in `src/assets/` provide project-card and case-study imagery. The critical subset is preloaded per route; other imagery is left to normal browser loading. `public/` contains the resume PDF and standalone snake and survivor experiments.

Current `localStorage` keys are:

- `redirectPath`: one-time path restoration during React startup.
- `contact_email` and `contact_message`: unsent contact-form drafts, cleared after success.
- `threeSceneSettings`: persisted homepage scene controls.
- `snakeHighScore`: high score for the standalone snake sandbox.

## Possible Future Direction

The site may evolve toward an explicit presentation controller that coordinates boot readiness, interface entrance, Three.js entrance, content entrance, and route transitions. Such a controller would own complex GSAP timelines while leaving the immediate first paint in inline HTML/SVG/CSS.

The Three.js scene may also become a persistent application-level world instead of a homepage-only component. Routes could retain the same renderer and scene while changing camera, lighting, cube behavior, or environmental state. This is a concept, not current architecture.

Readiness may gain a third, element-level layer for specifically authored moments and designed loading placeholders. It should remain scoped: the current direction does not call for preloading the entire portfolio globally.

See [EXPERIENCE.md](EXPERIENCE.md) for the intended product feeling and [MOTION.md](MOTION.md) for motion-system boundaries.
