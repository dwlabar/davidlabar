// =============================================================================
// THREE SCENE PRESETS
// =============================================================================
//
// Each preset defines the visual and behavioral configuration of the 3D scene.
// Grid layout is fixed: each grid cell is 10×10 units in X and Z. Cubes scale
// within those cells, but spacing and layout do not change.
//
// ============================================================================

export const SCENE_PRESETS = {
  default: {
    // Settings - Grid
    gridSize: 20,               // number of cells across (X and Z)
    cellSize: 10,               // fixed grid cell size (used in layout, not animated)
    cubeSizeX: 2,               // initial cube width
    cubeSizeY: 0.5,             // initial cube height
    cubeSizeZ: 2,               // initial cube depth
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
  }

  // Add more named presets below as needed...
};
