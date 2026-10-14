// Last updated: 3.4.0

import { useThreeSceneContext } from '../context/ThreeSceneContext';
import { BLOOM_CONTROLS } from '../config/bloomSettings';

const EffectsTuningControls = () => {
  const {
    bloomSettings, updateBloomSetting, resetBloomSettings
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
    </section>
  );
};

export default EffectsTuningControls;
