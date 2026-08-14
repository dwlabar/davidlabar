# Repository Working Agreement

DavidLaBar.com is a React + Vite + SCSS portfolio. Follow these rules when working in this repository:

- Preserve working code, existing comments, and authored presentation unless the task specifically changes them.
- Do not remove or rewrite functionality without a concrete, evidence-based reason. Distinguish defects from stylistic preferences.
- Use 2-space indentation for new and edited code.
- Do not introduce Tailwind. The styling system is SCSS, organized into settings, tools, base, layouts, and component partials.
- Treat GSAP and Three.js as intentional core technologies, not dependencies to remove by default.
- Prefer reusable, modular implementations and avoid unnecessary rewrites.
- Treat accessibility, performance, responsive behavior, and visual quality as requirements.
- Give every animation, timeline, render loop, listener, observer, timer, and transition callback an explicit owner and cleanup path.
- Preserve compatibility and current behavior outside the requested scope.
- Run validation appropriate to the change, including relevant lint/build commands and `git diff --check`.
- Report the existing lint baseline separately from any regressions introduced by the current work.
- Leave changes uncommitted unless the user explicitly instructs otherwise.

Architecture and experience decisions live in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/EXPERIENCE.md](docs/EXPERIENCE.md), and [docs/MOTION.md](docs/MOTION.md).
