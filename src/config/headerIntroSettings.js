// Last updated: 3.4.0

export const HEADER_INTRO_STORAGE_KEY = 'devHeaderIntroSettings';
export const HEADER_INTRO_DEFAULTS = Object.freeze({
  headingStart: 0.74,
  cubeDropStart: 0,
  subheadingStart: 0.84,
  buttonStart: 0.94,
  revealDuration: 0.65,
  maskSoftness: 80,
  startingScale: 110,
  subheadingStartingScale: 100,
  buttonStartingScale: 100,
  zoomDuration: 0.65,
  headingVerticalOffset: -10,
  subheadingVerticalOffset: 10,
  buttonVerticalOffset: 10,
  opacityBlend: 100,
  easing: 'sine.inOut',
});

export const HEADER_INTRO_EASINGS = ['sine.inOut', 'power1.inOut', 'power2.inOut', 'power3.out'];
export const HEADER_INTRO_CONTROLS = [
  { key: 'headingStart', label: 'Heading Start', min: 0, max: 4, step: 0.01, unit: 's' },
  { key: 'cubeDropStart', label: 'Cube Drop Start', min: 0, max: 4, step: 0.01, unit: 's' },
  { key: 'subheadingStart', label: 'Subheading Start', min: 0, max: 4, step: 0.01, unit: 's' },
  { key: 'buttonStart', label: 'Button Start', min: 0, max: 4, step: 0.01, unit: 's' },
  { key: 'revealDuration', label: 'Reveal Duration', min: 0.4, max: 3.5, step: 0.01, unit: 's' },
  { key: 'maskSoftness', label: 'Mask Softness', min: 0, max: 80, step: 1, unit: 'px' },
  { key: 'startingScale', label: 'Heading Starting Scale', min: 80, max: 120, step: 1, unit: '%' },
  { key: 'subheadingStartingScale', label: 'Subheading Starting Scale', min: 80, max: 120, step: 1, unit: '%' },
  { key: 'buttonStartingScale', label: 'Button Starting Scale', min: 80, max: 120, step: 1, unit: '%' },
  { key: 'zoomDuration', label: 'Zoom Duration', min: 0.4, max: 3, step: 0.01, unit: 's' },
  { key: 'headingVerticalOffset', label: 'Heading Vertical Offset', min: -40, max: 40, step: 1, unit: 'px' },
  { key: 'subheadingVerticalOffset', label: 'Subheading Vertical Offset', min: -40, max: 40, step: 1, unit: 'px' },
  { key: 'buttonVerticalOffset', label: 'Button Vertical Offset', min: -40, max: 40, step: 1, unit: 'px' },
  { key: 'opacityBlend', label: 'Opacity Blend', min: 0, max: 100, step: 1, unit: '%' }
];

export const normalizeHeaderIntroSettings = (values) => {
  const settings = { ...HEADER_INTRO_DEFAULTS };
  for (const { key, min, max } of HEADER_INTRO_CONTROLS) {
    if (Number.isFinite(values?.[key]) && values[key] >= min && values[key] <= max) {
      settings[key] = values[key];
    }
  }
  if (HEADER_INTRO_EASINGS.includes(values?.easing)) settings.easing = values.easing;
  // Migrate the old impact-relative timing using the existing nominal 0.58s fall.
  if (values?.headingStart === undefined && Number.isFinite(values?.impactDelay) && values.impactDelay >= 0 && values.impactDelay <= 1.5) {
    settings.headingStart = Number((0.58 + values.impactDelay).toFixed(2));
    if (values.subheadingStart === undefined) settings.subheadingStart = Math.min(4, Number((settings.headingStart + settings.revealDuration * 0.25 / 0.7).toFixed(2)));
    if (values.buttonStart === undefined) settings.buttonStart = Math.min(4, Number((settings.headingStart + settings.revealDuration * 0.6 / 0.7).toFixed(2)));
  }
  // Preserve saved heading movement from both earlier versions of the controls.
  if (values?.headingVerticalOffset === undefined) {
    if (Number.isFinite(values?.verticalOffset) && values.verticalOffset >= -40 && values.verticalOffset <= 40) {
      settings.headingVerticalOffset = values.verticalOffset;
    } else if (values?.verticalOffset === undefined && Number.isFinite(values?.textRise) && values.textRise >= 0 && values.textRise <= 40) {
      settings.headingVerticalOffset = values.textRise;
    }
  }
  return settings;
};
