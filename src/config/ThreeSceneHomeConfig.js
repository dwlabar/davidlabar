const ThreeSceneHomeConfig = {
  gridSize: 40,
  cubeSpacing: 8,
  cubeSizeX: 1,
  cubeSizeY: 0.5,
  cubeSizeZ: 1,
  cubeSizeMaxX: 8,
  cubeSizeMaxY: 8,
  cubeSizeMaxZ: 8,
  speed: 0.2,

  // Fade settings
  fadeStart: 240,
  fadeEnd: 120,
  fadeCurve: 8,

  // New effect settings
  waveEffectEnabled: false,  // set to true to enable the wave effect
  waveAmplitude: 3,         // adjust amplitude as needed
  waveFrequency: 0.2,       // adjust frequency as needed
  waveSpeed: 0,           // adjust speed as needed

  randomYEffectEnabled: false, // set to true to enable random Y effect (wave takes precedence)
  randomYRange: 10           // range for random Y positions
};

export default ThreeSceneHomeConfig;
