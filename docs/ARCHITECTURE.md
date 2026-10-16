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

`DocumentTitle` is the single route-aware document-title owner inside the router. It maps main and example routes centrally, derives case-study names from `src/config/projects.js`, and falls back to David LaBar for unknown paths. It updates on direct loads and client navigation, including back/forward; it does not send analytics events. The same small project data module supplies existing card assets and ordering to Projects. Projects retains its complete card-image readiness gate.

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

`ThreeSceneContext` starts with the flat authored `SCENE_DEFAULTS` in `ThreeSceneDefaults.js` and restores only valid public values from `threeSceneSettings`: `speed`, `cubeSizeX`, `cubeSizeY`, and `cubeSizeZ`. Values must be finite numbers within the current public slider ranges; invalid or missing values fall back individually to authored defaults. Other stored fields, including `gridSize`, fade parameters, and dormant-effect flags, are ignored. Control changes update React state immediately and throttle persistence by 500 milliseconds, writing only those four public fields; unmount cancels a pending write. Initialization does not rewrite storage. The public controls remain Speed, Width, Depth, and Height. Separate transient interaction settings drive seven development/opt-in Preview tuning sliders and Reset Values inside the open controls; these values are not saved to `threeSceneSettings`. The manager reads live interaction settings through a ref without rebuilding the scene.

`ThreeSceneManager` owns scene, camera, renderer, resize observer, resize timer, animation frame, lights, 15 trail meshes, and a 23-by-23 grid of 529 cube meshes with edge overlays. `gridSize: 22` uses inclusive -11 through +11 loops with fixed 10-unit spacing. The initial camera target Z is fixed at -100, independent of gridSize and experimental depth rows; the travel span retains the grid-derived baseline. Transient camera/depth tuning is described below; cube opacity retains the original camera-distance calculation. `cubeLiftField.js` owns independent local interaction sources, neighbor response accumulation, smooth saturation, and wrap invalidation. The manager adds lift to existing base/entrance Y and drives each existing Phong material's blue emissive intensity, without shader hooks or per-cube tweens. Speed, scale, and outline changes are interpolated with owner-cleaned GSAP refs so the scene does not rebuild for those controls. Under reduced motion, the same scene resolves once as a static cube field, particle trails are hidden, no continuous animation frame is scheduled, resize still rerenders, and control changes apply immediately. A live preference change tears down and recreates only this component-owned scene in the appropriate mode. Unmount cleanup cancels any owned frame and resize work, disposes mesh and line geometries/materials, clears scene and renderer caches, releases the WebGL context, and removes the exact canvas from the captured mount. `ThreeSceneControls` scopes its slider listeners to its own control root and removes them on cleanup; its toggle exposes expanded state and the labeled native range controls remain keyboard-operable.

Fresh public defaults in `SCENE_DEFAULTS` are Width 10, Depth 10, Height 7.5, and Speed 0.2. Valid saved public customizations remain unchanged, including values between slider steps; restoration does not round them. There is currently no public scene-reset button. The tuning-only Reset Values button retains its separate behavior.

The same defaults retain dormant Wave and Random Y parameters, both disabled. Wave uses amplitude 3, spatial frequency 0.5, and per-frame speed 0.01 to animate cube base height. Random Y uses range 8 at generation and recycling when Wave is disabled. These implementations remain available for later T07 visual evaluation; there are no public mode controls. Neither is the separate authored entrance impact ripple, which retains its own tuning and lifecycle in the manager. The unused `cellSize` configuration field was removed; the manager continues to own fixed 10-unit spacing.

Pointer acquisition uses the same eligibility policy for direct geometry and the expanded fallback in `cubePointerTarget.js`: first opacity > 0.05 (nearest direct hit, then nearest expanded hit), then positive-opacity faint cubes in that same order. This preserves established targeting for clearer cubes while allowing faint back rows to respond when no clearer target occupies the ray. Zero-opacity/hidden cubes are ineligible. The expanded footprint remains 1.5× in X/Z with unchanged height, using current world matrices and stable grid order for distance ties. No proxy geometry is added. Entrance readiness/reveal gates, stationary-pointer behavior, lift timing/radius/propagation, and blue highlights remain unchanged.

### Scene tuning in Preview

`InteractionTuningControls` owns the shared disclosure for the Interaction and Effects sections, with `EffectsTuningControls` rendering Bloom plus transient Camera, Camera-distance Fade, and Grid Depth Test groups. It renders inside the public cube-control panel only when `import.meta.env.DEV || import.meta.env.VITE_INTERACTION_TUNING === '1'`. Local Vite development enables it automatically. In the Vercel project's environment-variable settings, add `VITE_INTERACTION_TUNING` with value `1`, select **Preview only**, then redeploy the Preview so Vite embeds the flag. Leave it unset for Production. This is a public client-side feature flag, not a secret; no deployment infrastructure is required.

The compact +/− tuning button is anchored to the bottom center of the shared control shell. It exposes its expanded state and controls a labeled inner section below a divider; the section has no independent background or outer border. The shell grows upward and its contents scroll on constrained viewports. Closing the public controls unmounts the tuning disclosure; values remain transient in the Home provider until Reset Values or route teardown. Reset restores the authored defaults from `CUBE_LIFT_DEFAULTS`; the accepted values are recorded under T03 in [ROADMAP.md](../ROADMAP.md). The existing interaction slider ranges and steps are retained. Effects uses its own labeled section and Reset Values button in the same scrolling shell; no second control framework or panel is introduced.

### Camera-distance fading

T11's rear/side linear-gradient experiment was rejected on 2026-10-16. The rollback restored the pre-experiment implementation from commit `8c9ce05`. The subsequent dev-tuning follow-up retains its distance formula and initial appearance while adding live refs and scoped faint-target eligibility. Flattened defaults, the 529-cube baseline, and public-only persistence remain intact.

`ThreeSceneDefaults.js` retains the verified authored values `fadeStart: 180`, `fadeEnd: 100`, and `fadeCurve: 8`. The manager computes camera-to-object distance, returns zero beyond 180 and one below 100, and otherwise uses `((180 - distance) / (180 - 100)) ** 8`. Ordinary cubes multiply this by the existing entrance reveal; the temporary entrance cube uses the same distance calculation with its existing drop envelope. Outlines remain synchronized with face opacity and the outline toggle. Particle trails share the original distance calculation and retain their 0.8 multiplier, travel, reset, and entrance delay.

Original recycling is restored exactly: wrapping subtracts the grid travel span, retains overshoot, clears interaction state, and temporarily sets opacity to zero; the later opacity pass recalculates the very small distance-based opacity in the same frame. There is no experimental zero-frame latch. Fade defaults remain authored configuration; the new transient controls below tune the same distance formula, including the shared particle fade. No gradient calculation or gradient-specific settings remain. Interaction and Bloom tuning retain their existing controls and Preview gate. T11 was finalized COMPLETE at David's direction on 2026-10-16; v3.4.0 remains unreleased.

### Transient camera, fade, and depth testing

`sceneTuningSettings.js` supplies reset defaults and slider metadata through the existing context/live-ref pattern. `ThreeSceneContext` owns `sceneTuning`; it never enters `threeSceneSettings`. Camera updates change the existing position, look-at target, and projection matrix. Fade updates feed the existing distance calculation. Animated rendering consumes changes on the existing loop; reduced motion redraws immediately without scheduling a loop. Cleanup releases the scene-owned update callback. Closing the panel retains transient values; Home teardown/reload restores defaults.

| Control | Original default | Range | Step |
| --- | --- | --- | --- |
| Camera X | 0 | -60–60 | 1 |
| Camera Y | 40 | 10–100 | 1 |
| Camera Z | 40 | 0–100 | 1 |
| Camera target X | 0 | -60–60 | 1 |
| Camera target Y | 0 | -20–40 | 1 |
| Camera target Z | -100 | -180–-20 | 1 |
| Camera FOV | 75 | 40–100 | 1 |
| Fade start | 180 | 120–300 | 1 |
| Fade end | 100 | 20–160 | 1 |
| Fade curve | 8 | 1–12 | 0.1 |
| Grid depth rows | 23 | 23–29 | 1 |

Fade endpoint bounds adjust to keep start at least one unit above end. Reset Camera to Original affects only the seven camera values; Reset Fade to Original affects only the three fade values. Reset Depth to Original affects only depth rows, restoring BASE_DEPTH_ROWS (23). Reset All Scene Tuning restores only camera, fade, and grid depth. Interaction and Bloom retain their independent Reset Values buttons and are untouched by Reset All. Public Speed/Width/Depth/Height values and storage are untouched. Resets do not restart the entrance or rewind scrolling.

Depth testing is experimental and available only through the existing DEV / `VITE_INTERACTION_TUNING=1` gate. Width stays at 23 columns and spacing at 10 units; production still allocates/renders the 529-cube baseline. Dev/opt-in Preview reserves six additional hidden rows once (138 cube/outline pairs), allowing 23–29 active rows / 529–667 cubes without recreating the renderer, scene, passes, or meshes. Growth appends rows behind the current rear; contraction hides the farthest rear rows. Existing front-row positions, phase, and camera values remain intact. Only the cube travel span changes (230–290); particle travel/reset bounds retain their authored values independently of camera/depth tuning. Inactive rows are excluded from rendering, raycasting, and lift-neighbor discovery. Activation/deactivation clears stale lift sources/recipients. The scene teardown disposes the entire pool, including hidden rows.

Depth edits made during the entrance wait until the original entrance completes, preserving its captured ripple distances and timing; static reduced-motion scenes apply immediately. Once active, added rows use the same cube materials, outlines, movement, distance fading, Wave/Random Y implementation, and interaction field. More rows and extreme camera/fade values may reveal edges or increase rendering cost during testing; none changes the production defaults. Final visual acceptance remains with David.

### Bloom rendering and transient effects settings

`src/config/bloomSettings.js` owns authored bloom defaults and slider metadata. `ThreeSceneContext` owns independent transient `bloomSettings`; these values never enter `threeSceneSettings`. The manager reads a live ref, so adjustments do not reconstruct scene objects or passes. Closing controls retains values until the Home provider unmounts; route return/reload restores authored defaults. The existing `VITE_INTERACTION_TUNING=1` Preview-only flag exposes both tuning sections; ordinary production omits both sections while rendering default bloom.

| Control | Default | Range | Step |
| --- | --- | --- | --- |
| Bloom Enabled | On | On/off | — |
| Strength | 0.08 | 0–1 | 0.01 |
| Radius | 0.40 | 0–1 | 0.01 |
| Threshold | 0.15 | 0.02–1 | 0.01 |

`createSceneBloom.js` owns one `EffectComposer` with `RenderPass → UnrealBloomPass → OutputPass`, using the installed Three.js 0.186.0 addons. The existing animation loop invokes it after opacity, entrance, interaction, and wrap updates. It renders the actual faded Phong faces and outlines once, with no material swaps, extra lighting, or hidden-geometry bloom scene. Disabled bloom and strength zero use the original direct renderer path. No bloom parameter has its own animation or frame loop; reduced-motion changes redraw the static scene on demand.

The renderer's antialias option, pixel ratio, clear color, exposure, and normal output configuration are retained. The composer inherits renderer DPR (currently 1) and resizes with the existing observer. Its existing two half-float targets use up to four supported MSAA samples because canvas antialiasing does not cover offscreen targets; UnrealBloomPass retains its standard downsampled mip chain. No additional selective-bloom target is allocated. Slider updates reuse resources, and disabling bloom bypasses GPU passes while retaining resources for immediate re-enabling.

During bloom only, unit-exposure linear tone mapping avoids a cinematic color curve and OutputPass applies final sRGB conversion. A temporary solid scene background uses the authored clear color in the active linear render-target space; this avoids the gray-background defect caused by clearing the target with the prior screen-space clear value. Both renderer tone mapping and scene background are restored in a finally block. Offscreen linear compositing can subtly affect partially transparent pixels; material opacity and recycling calculations remain unchanged. David accepted Phase 1 bloom and his adjusted source defaults on 2026-10-08.

The scene owner disposes RenderPass, UnrealBloomPass, OutputPass, and the composer before renderer teardown. The installed r186 UnrealBloomPass disposal omits `materialHighPassFilter`, so this owner explicitly disposes that material too. Browser instrumentation verified disposal of all 24 tracked post-processing targets/materials through Strict Mode, preference changes, and navigation.

API decisions were checked against the installed addon source and the official [EffectComposer documentation](https://threejs.org/docs/pages/EffectComposer.html), [UnrealBloomPass documentation](https://threejs.org/docs/pages/UnrealBloomPass.html), and [OutputPass documentation](https://threejs.org/docs/pages/OutputPass.html).

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
