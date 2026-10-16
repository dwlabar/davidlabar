// Last updated: 3.4.0

import { useThreeSceneContext } from '../context/ThreeSceneContext';
import { BLOOM_CONTROLS } from '../config/bloomSettings';
import { SCENE_TUNING_GROUPS } from '../config/sceneTuningSettings';

const EffectsTuningControls = () => {
  const {
    bloomSettings, updateBloomSetting, resetBloomSettings,
    sceneTuning, updateSceneTuning, resetCameraTuning, resetFadeTuning, resetDepthTuning, resetAllSceneTuning
  } = useThreeSceneContext();

  return (
    <section className="effects-tuning" aria-labelledby="effects-tuning-heading">
      <h3 id="effects-tuning-heading" className="interaction-tuning__heading">Effects</h3>
      <div role="group" aria-labelledby="bloom-tuning-heading">
        <h4 id="bloom-tuning-heading" className="interaction-tuning__heading">Bloom</h4>
        <label className="effects-tuning__enabled">
          <input
            type="checkbox"
            checked={bloomSettings.enabled}
            onChange={(event) => updateBloomSetting('enabled', event.target.checked)}
          />
          Bloom Enabled
        </label>
        <div className="interaction-tuning__controls">
          {BLOOM_CONTROLS.map(({ key, label, min, max, step }) => (
            <div className="slider-control" key={key}>
              <label htmlFor={`bloom-${key}`}>{label}</label>
              <output htmlFor={`bloom-${key}`}>{bloomSettings[key].toFixed(2)}</output>
              <input
                type="range"
                id={`bloom-${key}`}
                min={min}
                max={max}
                step={step}
                value={bloomSettings[key]}
                style={{ '--progress': `${(bloomSettings[key] - min) / (max - min) * 100}%` }}
                onChange={(event) => updateBloomSetting(key, Number(event.target.value))}
              />
            </div>
          ))}
          <button type="button" onClick={resetBloomSettings}>Reset Values</button>
        </div>
      </div>
      {SCENE_TUNING_GROUPS.map((group) => (
        <div role="group" aria-labelledby={`scene-tuning-${group.key}`} key={group.key}>
          <h4 id={`scene-tuning-${group.key}`} className="interaction-tuning__heading">{group.label}</h4>
          {group.key === 'depth' && <small>Experimental extra back rows; applies after the entrance finishes.</small>}
          <div className="interaction-tuning__controls">
            {group.controls.map(({ key, label, min, max, step }) => {
              const lower = key === 'fadeStart' ? Math.max(min, sceneTuning.fadeEnd + 1) : min;
              const upper = key === 'fadeEnd' ? Math.min(max, sceneTuning.fadeStart - 1) : max;
              return (
                <div className="slider-control" key={key}>
                  <label htmlFor={`scene-${key}`}>{label}</label>
                  <output htmlFor={`scene-${key}`}>{sceneTuning[key].toFixed(step < 1 ? 1 : 0)}</output>
                  <input
                    type="range"
                    id={`scene-${key}`}
                    min={lower}
                    max={upper}
                    step={step}
                    value={sceneTuning[key]}
                    style={{ '--progress': `${(sceneTuning[key] - lower) / (upper - lower) * 100}%` }}
                    onChange={(event) => updateSceneTuning(key, Number(event.target.value))}
                  />
                </div>
              );
            })}
            {group.key === 'camera' && <button type="button" onClick={resetCameraTuning}>Reset Camera to Original</button>}
            {group.key === 'fade' && <button type="button" onClick={resetFadeTuning}>Reset Fade to Original</button>}
            {group.key === 'depth' && <button type="button" onClick={resetDepthTuning}>Reset Depth to Original</button>}
          </div>
        </div>
      ))}
      <div className="interaction-tuning__controls">
        <button type="button" onClick={resetAllSceneTuning}>Reset All Scene Tuning</button>
      </div>
    </section>
  );
};

export default EffectsTuningControls;
