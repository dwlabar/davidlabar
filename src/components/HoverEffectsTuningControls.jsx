import { useThreeSceneContext } from '../context/ThreeSceneContext';
import { HOVER_EFFECT_GROUPS } from '../config/hoverEffectSettings';

const HoverEffectsTuningControls = () => {
  const { hoverSettings, updateHoverSetting, resetHoverSettings } = useThreeSceneContext();

  return (
    <section className="effects-tuning" aria-labelledby="hover-effects-heading">
      <h3 id="hover-effects-heading" className="interaction-tuning__heading">Hover Effects</h3>
      {HOVER_EFFECT_GROUPS.map((group) => (
        <div role="group" aria-labelledby={`hover-heading-${group.key}`} key={group.key}>
          <h4 id={`hover-heading-${group.key}`} className="interaction-tuning__heading">{group.label}</h4>
          <label className="effects-tuning__enabled">
            <input
              type="checkbox"
              checked={hoverSettings[group.key]}
              onChange={(event) => updateHoverSetting(group.key, event.target.checked)}
            />
            {group.label} Enabled
          </label>
          <div className="interaction-tuning__controls">
            {group.controls.map(({ key, label, min, max, step }) => (
              <div className="slider-control" key={key}>
                <label htmlFor={`hover-${key}`}>{label}</label>
                <output htmlFor={`hover-${key}`}>{hoverSettings[key]}</output>
                <input
                  type="range"
                  id={`hover-${key}`}
                  min={min}
                  max={max}
                  step={step}
                  value={hoverSettings[key]}
                  style={{ '--progress': `${(hoverSettings[key] - min) / (max - min) * 100}%` }}
                  onChange={(event) => updateHoverSetting(key, Number(event.target.value))}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="interaction-tuning__controls">
        <button type="button" onClick={resetHoverSettings}>Reset Hover Effects</button>
      </div>
    </section>
  );
};

export default HoverEffectsTuningControls;
