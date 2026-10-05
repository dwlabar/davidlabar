// Last updated: 3.4.0

import { useState } from 'react';
import { useThreeSceneContext } from '../context/ThreeSceneContext';

const INTERACTION_CONTROLS = [
  { key: 'maxLift', label: 'Lift Height', min: 0, max: 30, step: 0.1 },
  { key: 'effectRadius', label: 'Effect Radius', min: 0.5, max: 6, step: 0.05 },
  { key: 'falloffStrength', label: 'Falloff', min: 0.08, max: 1.1, step: 0.01 },
  { key: 'riseDuration', label: 'Rise Time', min: 0.15, max: 2, step: 0.01 },
  { key: 'sequenceDuration', label: 'Total Duration', min: 2.5, max: 10, step: 0.1 },
  { key: 'propagationDelay', label: 'Propagation Delay', min: 0, max: 0.3, step: 0.005 },
  { key: 'accentStrength', label: 'Blue Highlight', min: 0, max: 1, step: 0.01 }
];

const InteractionTuningControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { interactionSettings, updateInteractionSetting, resetInteractionSettings } = useThreeSceneContext();

  return (
    <div className="interaction-tuning">
      <div
        id="interaction-tuning-panel"
        className="interaction-tuning__panel"
        role="group"
        aria-label="Interaction tuning"
        hidden={!isOpen}
      >
        {isOpen && (
          <div className="interaction-tuning__controls">
            {INTERACTION_CONTROLS.map(({ key, label, min, max, step }) => (
              <div className="slider-control" key={key}>
                <label htmlFor={`interaction-${key}`}>{label}</label>
                <output htmlFor={`interaction-${key}`}>{interactionSettings[key]}</output>
                <input
                  type="range"
                  id={`interaction-${key}`}
                  min={min}
                  max={max}
                  step={step}
                  value={interactionSettings[key]}
                  style={{ '--progress': `${(interactionSettings[key] - min) / (max - min) * 100}%` }}
                  onChange={(event) => updateInteractionSetting(key, Number(event.target.value))}
                />
              </div>
            ))}
            <button type="button" onClick={resetInteractionSettings}>Reset Values</button>
          </div>
        )}
      </div>
      <button
        type="button"
        className="interaction-tuning__toggle"
        aria-label={isOpen ? 'Hide interaction tuning' : 'Show interaction tuning'}
        aria-expanded={isOpen}
        aria-controls="interaction-tuning-panel"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
    </div>
  );
};

export default InteractionTuningControls;
