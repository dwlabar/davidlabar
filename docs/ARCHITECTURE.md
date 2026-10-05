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

`App.jsx` owns the `BrowserRouter`, shared navigation, transition overlay, route-transition listener, main route outlet, and footer. A first-focus skip link targets the persistent `#main-content` region. Its primary routes are home, projects, expertise, about, and contact. Project case studies are separate routes under `/projects`; SVG and preloader example routes are also registered directly.

Internal navigation normally uses either `NavBar` or `useOverlayNavigate`. Both ask `OverlayContext` to make the overlay opaque before scrolling to the top and calling React Router navigation. The primary navigation exposes its name, current-page state, and mobile disclosure state. Escape closes the mobile menu and returns focus to its toggle. Selecting the current route closes any open mobile navigation without replaying the route transition.

### Analytics setup and ownership

`src/analytics.js` owns the native Google tag and three focused event helpers. `main.jsx` initializes it once before mounting React; the asynchronous tag lives for the document lifetime. Development and builds without `VITE_GA_MEASUREMENT_ID` do nothing. Google signals and advertising personalization are disabled in the tag configuration.

Set `VITE_GA_MEASUREMENT_ID` in the production build environment, then rebuild/deploy. For local production-preview verification, use an ignored `.env.local` file; never commit it or a real measurement ID. There is no environment example file to maintain. Vite embeds this public identifier at build time; `npm run dev` does not collect analytics even when it is set.

In GA4 Admin → Data streams → the web stream → Enhanced measurement, enable **Page views → Show advanced settings → Page changes based on browser history events**. The normal tag configuration sends the initial page view, and Enhanced Measurement owns subsequent history views; do not add manual route `page_view` events or a second tag installation. Keep automatic outbound-click and file-download measurement; disable Form interactions to avoid submission-attempt noise alongside the confirmed-success event. Leave unused Site search and Video engagement measurement off.

| Event | Trigger | App-supplied parameters |
| --- | --- | --- |
| `select_content` | Project-card activation by pointer or keyboard | `content_type: project`, `content_id`: authored project route |
| `generate_lead` | Formspree confirms contact submission success, once per successful form instance | None |
| `scene_controls_open` | The cube toggle opens the scene controls | None |

No form values, names, emails, messages, pointer hits, or hover events are sent by these helpers. Standard job-application links can use `utm_source`, `utm_medium`, and `utm_campaign`, for example `https://davidlabar.com/?utm_source=company&utm_medium=application&utm_campaign=frontend_2026`. Use non-personal campaign labels. Analytics leaves URLs intact and relies on GA4 attribution without custom campaign parsing.

Use Tag Assistant with a configured production build and GA4 DebugView for live verification: confirm one initial page view, one per route change/back/forward navigation, the three interactions, and no success event for a failed contact submission. Confirm campaign attribution with a UTM landing URL. Live collection requires access to the configured property and is separate from local build and event-queue checks. See Google's [SPA guidance](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications) and [recommended event reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events).

### Readiness and presentation flow

Three systems cooperate without sharing one global animation timeline:

1. `PreloaderContext` tracks whether the initial destination is loading and whether the preloader remains visible. Initial completion is idempotent.
2. `PageReadyContext` associates one readiness registration with the current React Router location key. An early notification is retained for that key; cleanup invalidates replaced navigation.
3. `OverlayContext` owns overlay visibility, opacity, navigation dimming, transition callbacks, and timeout/request-animation-frame cleanup.

Each routed page calls `useNotifyWhenImagesLoaded`. Pages without declared critical images report ready on the next animation frame. Image-heavy pages pass a small explicit list—typically the first project card or primary case-study imagery. Loading failures count as settled so a failed image cannot deadlock navigation, and cancelled routes detach their image handlers.

`RouteTransitionListener` registers the current location and reveals it after readiness. The first ready destination releases the preloader; later destinations hide the route overlay. An eight-second route fallback prevents an integration error from trapping navigation indefinitely.

The inline preloader entrance continues to an authored cycle boundary once the initial route is ready. `Preloader.jsx` then uses a GSAP timeline to fade the logo and layer. Reduced-motion users skip the animated exit, and a ten-second absolute fallback prevents permanent scroll lock.

The overlay uses the SCSS opacity transition as its visible boundary. It handles `transitionend`, already-settled opacity, reduced motion, background-tab failures, interrupted operations, and timeout cleanup before invoking the active navigation callback.

### Reduced-motion preference

`useReducedMotion` is the application-level preference boundary. It uses React's external-store subscription contract and shares one `MediaQueryList` change listener across all mounted consumers. The listener is attached when the first consumer subscribes, removed after the last unsubscribes, and updates consumers if the OS/browser preference changes while the application is open. The inline `index.html` boot presentation retains its independent CSS media query because it must operate before React starts.

Consumers choose deliberate final states rather than globally disabling animation. Preloader and route-overlay transitions settle directly; navigation, icons, project cards, scroll reveals, and SVG examples remove large or repeating motion while preserving state feedback and visible content.

### GSAP ownership

GSAP is used throughout the current application rather than behind one controller:

- `Preloader` owns the initial exit timeline.
- `NavBar`, `BurgerIcon`, `LogoMini`, and `CubeIcon` own navigation and icon motion.
- `ProjectCard` owns its tile hover/focus tweens.
- `BlockReveal` creates ScrollTrigger reveals for case-study sections.
- `SVG-Examples` demonstrates several SVG animation techniques.
- `ThreeSceneManager` interpolates speed, scale, and outline settings.

Each component cleans up only the GSAP work it owns. `BlockReveal` uses a component-scoped GSAP context so unmount reverts its tween and ScrollTrigger without killing unrelated triggers. Persistent and interaction-created timelines and tweens are retained by their owners and killed on replacement or unmount; this includes the direct SVG example route. The preloader exit also resets its ownership guard during effect cleanup so development Strict Mode replay cannot strand the exit.

### Three.js ownership and settings flow

The Three.js experience exists only on `Home`. `Home` creates `ThreeSceneProvider`, then renders content, `ThreeSceneControls`, and `ThreeSceneManager` within it.

`ThreeSceneContext` merges the named preset from `ThreeScenePresets.js` with saved `threeSceneSettings`. Control changes update React state immediately and throttle persistence by 500 milliseconds. The public controls remain Speed, Width, Depth, and Height. Separate transient interaction settings drive seven development/opt-in Preview tuning sliders and Reset Values inside the open controls; these values are not saved to `threeSceneSettings` or added to presets. The manager reads live interaction settings through a ref without rebuilding the scene.

`ThreeSceneManager` owns scene, camera, renderer, resize observer, resize timer, animation frame, lights, 20 trail meshes, and a 21-by-21 grid of cube meshes with edge overlays. `cubeLiftField.js` owns independent local interaction sources, neighbor response accumulation, smooth saturation, and wrap invalidation. The manager adds lift to existing base/entrance Y and drives each existing Phong material's blue emissive intensity, without shader hooks or per-cube tweens. Speed, scale, and outline changes are interpolated with owner-cleaned GSAP refs so the scene does not rebuild for those controls. Under reduced motion, the same scene resolves once as a static cube field, particle trails are hidden, no continuous animation frame is scheduled, resize still rerenders, and control changes apply immediately. A live preference change tears down and recreates only this component-owned scene in the appropriate mode. Unmount cleanup cancels any owned frame and resize work, disposes mesh and line geometries/materials, clears scene and renderer caches, releases the WebGL context, and removes the exact canvas from the captured mount. `ThreeSceneControls` scopes its slider listeners to its own control root and removes them on cleanup; its toggle exposes expanded state and the labeled native range controls remain keyboard-operable.

Fresh public defaults in `SCENE_PRESETS.default` are Width 10, Depth 10, Height 7.5, and Speed 0.2. The existing `{ ...preset, ...saved }` merge preserves saved customizations without a migration. There is currently no public scene-reset button: clearing `threeSceneSettings` and reloading restores these defaults. The tuning-only Reset Values button retains its separate behavior.

Pointer acquisition keeps the nearest visible-geometry raycast hit first. On a miss, `cubePointerTarget.js` tests the same ray against a 1.5× X/Z unit-box footprint transformed by each cube's current world matrix; height stays unchanged. It selects one nearest eligible cube, with stable grid order breaking exact ties. This scene-owned scratch math creates no proxy meshes or GPU resources and follows live scale, lift, and recycling. The existing pointer/entrance/reduced-motion gates still apply. The 1.5× multiplier is the accepted T03 setting.

### Interaction tuning in Preview

`InteractionTuningControls` renders inside the public cube-control panel only when `import.meta.env.DEV || import.meta.env.VITE_INTERACTION_TUNING === '1'`. Local Vite development enables it automatically. In the Vercel project's environment-variable settings, add `VITE_INTERACTION_TUNING` with value `1`, select **Preview only**, then redeploy the Preview so Vite embeds the flag. Leave it unset for Production. This is a public client-side feature flag, not a secret; no deployment infrastructure is required.

The compact +/− tuning button is anchored to the bottom center of the shared control shell. It exposes its expanded state and controls a labeled inner section below a divider; the section has no independent background or outer border. The shell grows upward and its contents scroll on constrained viewports. Closing the public controls unmounts the tuning disclosure; values remain transient in the Home provider until Reset Values or route teardown. Reset restores the authored defaults from `CUBE_LIFT_DEFAULTS`; the accepted values are recorded under T03 in [ROADMAP.md](../ROADMAP.md). The existing development slider ranges and steps are retained.

### Pages, projects, and components

- `src/pages/` contains top-level portfolio pages plus direct development examples.
- `src/pages/projects/` contains the case-study pages. An additional `projects/Projects.jsx` file exists but is not registered by `App.jsx`; the routed hub is `src/pages/Projects.jsx`.
- `Container`, `Panel`, `Card`, and `BlockReveal` provide shared composition patterns.
- `ProjectCard` renders the project link, imagery, label, and GSAP tile interaction.
- `Modal` portals project imagery into `#modal_root` as a named modal dialog. While mounted it makes the application root inert, locks background scrolling, traps Tab and Shift+Tab, supports Escape and pointer-backdrop close, focuses its named close control, and returns focus to the still-connected opener during cleanup.
- `FormContact` integrates Formspree and locally persists draft fields.
- `NavBar`, `Overlay`, and the overlay-navigation hook coordinate desktop and mobile navigation presentation.
- `DevPanel` is not rendered by the current application shell; its example routes remain directly available.

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
