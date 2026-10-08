// Last updated: 3.4.0

// Transient effects tuning stays separate from persisted cube settings.
export const BLOOM_DEFAULTS = Object.freeze({
  enabled: true,
  strength: 0.08,
  radius: 0.4,
  threshold: 0.15
});

export const BLOOM_CONTROLS = [
  { key: 'strength', label: 'Strength', min: 0, max: 1, step: 0.01 },
  { key: 'radius', label: 'Radius', min: 0, max: 1, step: 0.01 },
  { key: 'threshold', label: 'Threshold', min: 0.02, max: 1, step: 0.01 }
];
