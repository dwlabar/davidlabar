// =============================================================================
// THREE SCENE DEFAULTS
// =============================================================================
//
// Authored visual and behavioral defaults for the Home scene.
// Grid layout is fixed: each grid cell is 10×10 units in X and Z. Cubes scale
// within those cells, but spacing and layout do not change.
//
// ============================================================================

export const SCENE_DEFAULTS = {
  // Settings - Grid
  gridSize: 22,               // inclusive -11..11 loops produce 23×23 = 529 cubes
  cubeSizeX: 10,              // initial cube width
  cubeSizeY: 7.5,             // initial cube height
  cubeSizeZ: 10,              // initial cube depth
  cubeSizeMaxX: 10,           // max width = cellSize
  cubeSizeMaxY: 10,           // max height (UI control)
  cubeSizeMaxZ: 10,           // max depth = cellSize
  speed: 0.2,                 // cube movement speed (Z axis)

  // Settings - Fade
  fadeStart: 180,             // distance at which fade starts
  fadeEnd: 100,               // distance at which fade ends
  fadeCurve: 8,               // fade transition curve

  // Effect - Wave
  waveEffectEnabled: false,   // toggle sine-wave Y animation
  waveAmplitude: 3,           // height of wave
  waveFrequency: 0.5,         // spatial frequency
  waveSpeed: 0.01,            // speed of wave

  // Effect - Random Y (fallback)
  randomYEffectEnabled: false,
  randomYRange: 8             // range for random vertical displacement
};
