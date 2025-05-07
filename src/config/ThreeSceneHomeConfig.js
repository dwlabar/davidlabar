const ThreeSceneHomeConfig = {
  // Settings - Grid
  gridSize: 20,
  cubeSpacing: 8,
  cubeSizeX: 2,
  cubeSizeY: 0.5,
  cubeSizeZ: 2,
  cubeSizeMaxX: 10,
  cubeSizeMaxY: 10,
  cubeSizeMaxZ: 10,
  speed: 0.2,

  // Settings - Fade
  fadeStart: 180,
  fadeEnd: 100,
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
