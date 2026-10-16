// Last updated: 3.4.0

import { SCENE_DEFAULTS } from './ThreeSceneDefaults';

export const SCENE_TUNING_ENABLED = import.meta.env.DEV || import.meta.env.VITE_INTERACTION_TUNING === '1';
export const BASE_DEPTH_ROWS = SCENE_DEFAULTS.gridSize + 1;
export const MAX_DEPTH_ROWS = BASE_DEPTH_ROWS + 6;

export const CAMERA_DEFAULTS = Object.freeze({
  cameraX: 0,
  cameraY: 40,
  cameraZ: 40,
  targetX: 0,
  targetY: 0,
  targetZ: -100,
  fov: 75
});
export const FADE_DEFAULTS = Object.freeze({
  fadeStart: SCENE_DEFAULTS.fadeStart,
  fadeEnd: SCENE_DEFAULTS.fadeEnd,
  fadeCurve: SCENE_DEFAULTS.fadeCurve
});
export const SCENE_TUNING_DEFAULTS = Object.freeze({
  ...CAMERA_DEFAULTS,
  ...FADE_DEFAULTS,
  depthRows: BASE_DEPTH_ROWS
});

export const SCENE_TUNING_GROUPS = [
  { key: 'camera', label: 'Camera', controls: [
    { key: 'cameraX', label: 'Camera X', min: -60, max: 60, step: 1 },
    { key: 'cameraY', label: 'Camera Y', min: 10, max: 100, step: 1 },
    { key: 'cameraZ', label: 'Camera Z', min: 0, max: 100, step: 1 },
    { key: 'targetX', label: 'Camera target X', min: -60, max: 60, step: 1 },
    { key: 'targetY', label: 'Camera target Y', min: -20, max: 40, step: 1 },
    { key: 'targetZ', label: 'Camera target Z', min: -180, max: -20, step: 1 },
    { key: 'fov', label: 'Camera FOV', min: 40, max: 100, step: 1 }
  ] },
  { key: 'fade', label: 'Camera-distance Fade', controls: [
    { key: 'fadeStart', label: 'Fade start', min: 120, max: 300, step: 1 },
    { key: 'fadeEnd', label: 'Fade end', min: 20, max: 160, step: 1 },
    { key: 'fadeCurve', label: 'Fade curve', min: 1, max: 12, step: 0.1 }
  ] },
  { key: 'depth', label: 'Grid Depth Test', controls: [
    { key: 'depthRows', label: 'Grid depth rows', min: BASE_DEPTH_ROWS, max: MAX_DEPTH_ROWS, step: 1 }
  ] }
];
