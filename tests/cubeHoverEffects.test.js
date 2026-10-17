import assert from 'node:assert/strict';
import test from 'node:test';
import { Mesh, MeshPhongMaterial, ShaderLib } from 'three';
import { createCubeHoverEffects } from '../src/components/cubeHoverEffects.js';
import { HOVER_EFFECT_DEFAULTS as defaults } from '../src/config/hoverEffectSettings.js';

function fixture(count = 2) {
  const cubes = Array.from({ length: count }, () => new Mesh(undefined, new MeshPhongMaterial({
    color: 0x373737, emissive: 0x0286eb, emissiveIntensity: 0.27,
    transparent: true, opacity: 0.4, shininess: 100
  })));
  const effects = createCubeHoverEffects(cubes);
  const shaders = cubes.map((cube) => {
    const shader = { ...ShaderLib.phong, uniforms: {} };
    cube.material.onBeforeCompile(shader);
    return shader;
  });
  effects.update(10, defaults);
  return { cubes, shaders, effects };
}

test('529 independent pulses overlap and active re-entry cannot restart a cube', () => {
  const { cubes, shaders, effects } = fixture(529);
  cubes.forEach((cube, index) => effects.enter(cube, 10 + index / 1000));
  effects.enter(cubes[0], 10.5);
  assert.equal(shaders[0].uniforms.uHoverStart.value, 10);
  effects.update(11.1, defaults);
  assert.equal(shaders[0].uniforms.uHoverStart.value, -1);
  assert.equal(shaders[528].uniforms.uHoverStart.value, 10.528);
  effects.update(12, defaults);
  assert.ok(shaders.every((shader) => shader.uniforms.uHoverStart.value === -1));
  effects.enter(cubes[0], 12);
  assert.equal(shaders[0].uniforms.uHoverStart.value, 12);
  effects.dispose();
});

test('independent delay/travel/fade controls determine full pulse lifetime', () => {
  const { cubes, shaders, effects } = fixture();
  const settings = { ...defaults, top: false, edge: false, corner: true,
    cornerDelay: 1.2, cornerTravel: 2, cornerFade: 1.5 };
  effects.update(10, settings);
  effects.enter(cubes[0], 10);
  effects.update(14.7, settings);
  assert.equal(shaders[0].uniforms.uHoverStart.value, 10);
  effects.update(14.81, settings);
  assert.equal(shaders[0].uniforms.uHoverStart.value, -1);
  effects.dispose();
});

test('recycling and pooled-row deactivation clear only the affected cube', () => {
  const { cubes, shaders, effects } = fixture(667);
  effects.enter(cubes[0], 10);
  effects.enter(cubes[1], 10);
  effects.forget(cubes[0]);
  cubes[0].userData.gridActive = false;
  effects.enter(cubes[0], 10.2);
  assert.equal(shaders[0].uniforms.uHoverStart.value, -1);
  assert.equal(shaders[1].uniforms.uHoverStart.value, 10);
  cubes[0].userData.gridActive = true;
  effects.enter(cubes[0], 10.3);
  assert.equal(shaders[0].uniforms.uHoverStart.value, 10.3);
  effects.dispose();
});

test('invisible cubes and disabled effects cannot start pulses', () => {
  const { cubes, shaders, effects } = fixture();
  cubes[0].material.opacity = 0;
  cubes[1].visible = false;
  cubes.forEach((cube) => effects.enter(cube, 10));
  assert.ok(shaders.every((shader) => shader.uniforms.uHoverStart.value === -1));
  cubes[1].visible = true;
  effects.update(10, { ...defaults, top: false, edge: false, corner: false });
  effects.enter(cubes[1], 10);
  assert.equal(shaders[1].uniforms.uHoverStart.value, -1);
  effects.dispose();
});

test('tuning shares uniforms without recompilation or changing Phong properties', () => {
  const { cubes, shaders, effects } = fixture();
  const versions = cubes.map((cube) => cube.material.version);
  effects.enter(cubes[0], 10);
  effects.update(10.2, { ...defaults, topIntensity: 2, corner: true });
  assert.equal(shaders[0].uniforms.uTopIntensity, shaders[1].uniforms.uTopIntensity);
  assert.equal(shaders[1].uniforms.uTopIntensity.value, 2);
  assert.equal(shaders[1].uniforms.uCornerOn.value, 1);
  assert.notEqual(shaders[0].uniforms.uHoverStart, shaders[1].uniforms.uHoverStart);
  cubes.forEach((cube, index) => {
    assert.equal(cube.material.version, versions[index]);
    assert.equal(cube.material.type, 'MeshPhongMaterial');
    assert.equal(cube.material.opacity, 0.4);
    assert.equal(cube.material.emissiveIntensity, 0.27);
    assert.equal(cube.material.shininess, 100);
    assert.equal(cube.material.color.getHex(), 0x373737);
  });
  effects.dispose();
});

test('teardown clears retained uniform state and releases material hooks', () => {
  const { cubes, shaders, effects } = fixture();
  effects.enter(cubes[0], 10);
  effects.dispose();
  assert.ok(shaders.every((shader) => shader.uniforms.uHoverStart.value === -1));
  assert.ok(cubes.every((cube) => !Object.hasOwn(cube.material, 'onBeforeCompile') &&
    !Object.hasOwn(cube.material, 'customProgramCacheKey')));
});
