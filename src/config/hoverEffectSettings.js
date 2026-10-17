// Balanced surface-effect defaults from 17-cube-hover-shader-lab-fixed.
// Timing is in seconds; widths are in unit BoxGeometry local coordinates.
export const HOVER_EFFECT_DEFAULTS = Object.freeze({
  top: true, topIntensity: 1.55, topAttack: 0.6, topDecay: 1.5,
  edge: true, edgeIntensity: 1.8, edgeDelay: 0.13, edgeDecay: 2.0, edgeWidth: 0.052,
  corner: false, cornerIntensity: 1.4, cornerDelay: 0.25,
  cornerTravel: 0.56, cornerFade: 0.40, cornerWidth: 0.065
});

export const HOVER_EFFECT_GROUPS = [
  {
    key: 'top', label: 'Top-face flash', controls: [
      { key: 'topIntensity', label: 'Brightness', min: 0, max: 3.8, step: 0.05 },
      { key: 'topAttack', label: 'Ramp up', min: 0.03, max: 0.6, step: 0.01 },
      { key: 'topDecay', label: 'Fade out', min: 0.1, max: 2.5, step: 0.05 }
    ]
  },
  {
    key: 'edge', label: 'Top perimeter', controls: [
      { key: 'edgeIntensity', label: 'Edge brightness', min: 0, max: 4, step: 0.05 },
      { key: 'edgeDelay', label: 'Start delay', min: 0, max: 1.2, step: 0.01 },
      { key: 'edgeDecay', label: 'Fade out', min: 0.1, max: 2.5, step: 0.05 },
      { key: 'edgeWidth', label: 'Line width', min: 0.008, max: 0.18, step: 0.002 }
    ]
  },
  {
    key: 'corner', label: 'Corner discharge', controls: [
      { key: 'cornerIntensity', label: 'Streak brightness', min: 0, max: 4, step: 0.05 },
      { key: 'cornerDelay', label: 'Start delay', min: 0, max: 1.2, step: 0.01 },
      { key: 'cornerTravel', label: 'Descent time', min: 0.15, max: 2, step: 0.05 },
      { key: 'cornerFade', label: 'Fade after arrival', min: 0.1, max: 1.5, step: 0.05 },
      { key: 'cornerWidth', label: 'Streak width', min: 0.01, max: 0.17, step: 0.005 }
    ]
  }
];
