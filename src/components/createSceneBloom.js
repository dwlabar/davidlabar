// Last updated: 3.4.0

import { Color, LinearToneMapping, Vector2 } from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// One scene-owned pipeline. It consumes the normally faded scene, including
// transparent faces and outlines; no material overrides or second scene render.
export function createSceneBloom(renderer, scene, camera) {
  const composer = new EffectComposer(renderer);
  const background = renderer.getClearColor(new Color());
  // Canvas antialiasing does not apply to offscreen targets. Retain smooth edges
  // with bounded MSAA on the composer's existing targets, at the renderer's DPR.
  const samples = Math.min(4, renderer.capabilities.maxSamples);
  composer.renderTarget1.samples = samples;
  composer.renderTarget2.samples = samples;
  const renderPass = new RenderPass(scene, camera);
  // The solid scene background clears after the correct target is bound.
  renderPass.clear = false;
  const bloomPass = new UnrealBloomPass(renderer.getSize(new Vector2()));
  const outputPass = new OutputPass();
  composer.addPass(renderPass);
  composer.addPass(bloomPass);
  composer.addPass(outputPass);
  let pixelRatio = renderer.getPixelRatio();

  return {
    render(settings) {
      if (!settings.enabled || settings.strength === 0) {
        renderer.render(scene, camera);
        return;
      }
      bloomPass.strength = settings.strength;
      bloomPass.radius = settings.radius;
      bloomPass.threshold = settings.threshold;
      // Tone-map only the HDR output, without changing the direct-render path
      // or applying a cinematic color curve to the authored scene.
      const toneMapping = renderer.toneMapping;
      const sceneBackground = scene.background;
      // Clear in linear target space; keep the original direct-render clear path.
      scene.background = background;
      renderer.toneMapping = LinearToneMapping;
      try {
        composer.render();
      } finally {
        renderer.toneMapping = toneMapping;
        scene.background = sceneBackground;
      }
    },
    resize(width, height) {
      const nextPixelRatio = renderer.getPixelRatio();
      if (nextPixelRatio !== pixelRatio) {
        pixelRatio = nextPixelRatio;
        composer.setPixelRatio(pixelRatio);
      }
      composer.setSize(width, height);
    },
    dispose() {
      renderPass.dispose();
      // r186's UnrealBloomPass.dispose omits its high-pass shader material.
      bloomPass.materialHighPassFilter.dispose();
      bloomPass.dispose();
      outputPass.dispose();
      composer.dispose();
    }
  };
}
