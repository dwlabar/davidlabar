import { Color } from 'three';
import { HOVER_EFFECT_DEFAULTS } from '../config/hoverEffectSettings.js';

const VARYINGS = `
varying vec3 vHoverLocal;
varying vec3 vHoverNormal;
`;

// Port only the prototype's additive surface light, not its base shading,
// permanent outlines, movement, or renderer. Phong owns those existing outputs.
const SURFACE_SHADER = `
uniform float uHoverTime;
uniform float uHoverStart;
uniform float uTopOn;
uniform float uTopIntensity;
uniform float uTopAttack;
uniform float uTopDecay;
uniform float uEdgeOn;
uniform float uEdgeIntensity;
uniform float uEdgeDelay;
uniform float uEdgeDecay;
uniform float uEdgeWidth;
uniform float uCornerOn;
uniform float uCornerIntensity;
uniform float uCornerDelay;
uniform float uCornerTravel;
uniform float uCornerFade;
uniform float uCornerWidth;
uniform vec3 uHoverAccent;

float hoverPulse(float age, float attack, float decay) {
  float rise = smoothstep(0.0, max(attack, 0.001), age);
  float fall = 1.0 - smoothstep(attack, attack + max(decay, 0.001), age);
  return rise * fall;
}

vec3 hoverSurfaceLight() {
  vec3 n = normalize(vHoverNormal);
  bool top = n.y > 0.5;
  bool bottom = n.y < -0.5;
  bool sideX = abs(n.x) > 0.5;
  vec3 color = vec3(0.0);
  if (uHoverStart >= 0.0 && !bottom) {
    float age = uHoverTime - uHoverStart;
    if (top && uTopOn > 0.5) {
      float light = hoverPulse(age, uTopAttack, uTopDecay) * uTopIntensity;
      color += uHoverAccent * light * 0.80;
      color += uHoverAccent * light * light * 0.10;
    }
    if (top && uEdgeOn > 0.5) {
      float ringDistance = min(0.5 - abs(vHoverLocal.x), 0.5 - abs(vHoverLocal.z));
      float edgeSoftness = max(fwidth(ringDistance), 0.001);
      float ring = 1.0 - smoothstep(uEdgeWidth * 0.55, uEdgeWidth + edgeSoftness, ringDistance);
      float light = hoverPulse(age - uEdgeDelay, 0.065, uEdgeDecay) * uEdgeIntensity * ring;
      color += uHoverAccent * light;
      color += uHoverAccent * light * light * 0.12;
    }
    if (!top && uCornerOn > 0.5) {
      float horizontal = sideX ? abs(vHoverLocal.z) : abs(vHoverLocal.x);
      float cornerDistance = 0.5 - horizontal;
      float feather = max(fwidth(cornerDistance), 0.001);
      float cornerMask = 1.0 - smoothstep(uCornerWidth * 0.45, uCornerWidth + feather, cornerDistance);
      float travelAge = age - uCornerDelay;
      float progress = clamp(travelAge / max(uCornerTravel, 0.001), 0.0, 1.0);
      float frontY = 0.5 - progress;
      float behind = vHoverLocal.y - frontY;
      float head = exp(-pow(behind / 0.055, 2.0));
      float tail = smoothstep(-0.02, 0.045, behind) * (1.0 - smoothstep(0.13, 0.55, behind));
      float dischargeEnvelope = smoothstep(-0.015, 0.045, travelAge) *
        (1.0 - smoothstep(uCornerTravel, uCornerTravel + uCornerFade, travelAge));
      float energy = (head + tail * 0.30) * cornerMask * dischargeEnvelope * uCornerIntensity;
      color += uHoverAccent * energy;
    }
  }
  return color;
}
`;

const uniformName = (key) => `u${key[0].toUpperCase()}${key.slice(1)}${
  typeof HOVER_EFFECT_DEFAULTS[key] === 'boolean' ? 'On' : ''
}`;

export function createCubeHoverEffects(cubes) {
  const uniforms = {
    uHoverTime: { value: 0 },
    uHoverAccent: { value: new Color('#0286eb') }
  };
  const keys = Object.keys(HOVER_EFFECT_DEFAULTS);
  for (const key of keys) uniforms[uniformName(key)] = { value: Number(HOVER_EFFECT_DEFAULTS[key]) };
  const starts = new Map();
  const active = new Set();
  let currentSettings;
  let lifetime = 0;

  for (const cube of cubes) {
    const start = { value: -1 };
    const material = cube.material;
    starts.set(cube, start);
    material.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms, { uHoverStart: start });
      shader.vertexShader = VARYINGS + shader.vertexShader.replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\nvHoverLocal = position;\nvHoverNormal = normal;'
      );
      shader.fragmentShader = VARYINGS + SURFACE_SHADER + shader.fragmentShader.replace(
        '#include <emissivemap_fragment>',
        '#include <emissivemap_fragment>\ntotalEmissiveRadiance += hoverSurfaceLight();'
      );
    };
    // All cubes share one program variant; only their start uniform differs.
    material.customProgramCacheKey = () => 'cube-hover-surface-v1';
  }

  const forget = (cube) => {
    const start = starts.get(cube);
    if (start) start.value = -1;
    active.delete(cube);
  };

  return {
    enter(cube, time) {
      if (!starts.has(cube) || cube.userData.gridActive === false || !cube.visible ||
        cube.material.opacity <= 0 || lifetime === 0) return;
      const start = starts.get(cube);
      // An active cube finishes independently, including rapid re-entry.
      if (start.value >= 0 && time - start.value < lifetime) return;
      start.value = time;
      active.add(cube);
    },
    update(time, settings) {
      uniforms.uHoverTime.value = time;
      if (settings !== currentSettings) {
        currentSettings = settings;
        for (const key of keys) uniforms[uniformName(key)].value = Number(settings[key]);
        const duration = Math.max(
          settings.top ? settings.topAttack + settings.topDecay : 0,
          settings.edge ? settings.edgeDelay + 0.065 + settings.edgeDecay : 0,
          settings.corner ? settings.cornerDelay + settings.cornerTravel + settings.cornerFade : 0
        );
        lifetime = duration > 0 ? duration + 0.1 : 0;
      }
      for (const cube of active) {
        if (time - starts.get(cube).value >= lifetime) forget(cube);
      }
    },
    forget,
    dispose() {
      // The manager disposes these materials immediately after releasing hooks.
      for (const cube of cubes) {
        forget(cube);
        delete cube.material.onBeforeCompile;
        delete cube.material.customProgramCacheKey;
      }
      starts.clear();
      active.clear();
    }
  };
}
