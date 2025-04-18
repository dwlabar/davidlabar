const ThreeSceneHomeConfig = {
  // Settings - Grid
  gridSize: 40,
  cubeSpacing: 8,
  cubeSizeX: 1,
  cubeSizeY: 0.5,
  cubeSizeZ: 1,
  cubeSizeMaxX: 8,
  cubeSizeMaxY: 8,
  cubeSizeMaxZ: 8,
  speed: 0.2,

  // Settings - Fade
  fadeStart: 240,
  fadeEnd: 120,
  fadeCurve: 8,

  // Effect - Wave
  waveEffectEnabled: false,    // toggle sine‑wave on Y
  waveAmplitude: 3,            // height of the wave
  waveFrequency: 0.5,          // spatial frequency along X and Z
  waveSpeed: 0.01,             // how fast the wave propagates

  // Effect - Random Y (fallback)
  randomYEffectEnabled: false,
  randomYRange: 8              // range for random Y when wave disabled
};

export default ThreeSceneHomeConfig;
