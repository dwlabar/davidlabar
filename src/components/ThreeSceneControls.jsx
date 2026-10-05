// Last updated: 3.4.0

import { useThreeSceneContext } from '../context/ThreeSceneContext';
import { useEffect, useRef } from 'react';
import CubeIcon from './CubeIcon';
import { trackSceneControlsOpen } from '../analytics';
import '../styles/components/_three-scene.scss';

const INTERACTION_CONTROLS = import.meta.env.DEV ? [
  { key: 'maxLift', label: 'Lift Height', min: 0, max: 30, step: 0.1 },
  { key: 'effectRadius', label: 'Effect Radius', min: 0.5, max: 6, step: 0.05 },
  { key: 'falloffStrength', label: 'Falloff', min: 0.08, max: 1.1, step: 0.01 },
  { key: 'riseDuration', label: 'Rise Time', min: 0.15, max: 2, step: 0.01 },
  { key: 'sequenceDuration', label: 'Total Duration', min: 2.5, max: 10, step: 0.1 },
  { key: 'propagationDelay', label: 'Propagation Delay', min: 0, max: 0.3, step: 0.005 },
  { key: 'accentStrength', label: 'Blue Highlight', min: 0, max: 1, step: 0.01 }
] : [];

const ThreeSceneControls = ({ showControls, setShowControls }) => {
  const {
    settings, updateSetting, interactionSettings, updateInteractionSetting, resetInteractionSettings
  } = useThreeSceneContext();
  const controlsRef = useRef(null);

  useEffect(() => {
    const sliders = controlsRef.current?.querySelectorAll('input[type="range"]') || [];
    const listeners = Array.from(sliders, (slider) => {
      const updateFill = () => {
        const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.setProperty('--progress', `${value}%`);
      };
      slider.addEventListener('input', updateFill);
      updateFill();
      return { slider, updateFill };
    });

    return () => {
      listeners.forEach(({ slider, updateFill }) => {
        slider.removeEventListener('input', updateFill);
      });
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className={`scene-controls-toggle${showControls ? ' active' : ''}`}
        onClick={() => {
          if (!showControls) trackSceneControlsOpen();
          setShowControls(!showControls);
        }}
        aria-label={showControls ? "Hide scene controls" : "Show scene controls"}
        aria-expanded={showControls}
        aria-controls="scene-controls"
      >
        <CubeIcon isActive={showControls} />
      </button>
      <div
        ref={controlsRef}
        id="scene-controls"
        className={`scene-controls ${showControls ? 'visible' : ''}`}
        role="group"
        aria-label="Scene settings"
        hidden={!showControls}
      >
        <div className="slider-group">
          <div className="slider-control">
            <label htmlFor="speed">Speed</label>
            <input
              type="range"
              id="speed"
              min="0.1"
              max="1"
              step="0.05"
              value={settings.speed}
              onChange={(e) => updateSetting('speed', parseFloat(e.target.value))}
            />
          </div>

          <div className="slider-control">
            <label htmlFor="width">Width</label>
            <input
              type="range"
              id="width"
              min="1"
              max={settings.cubeSizeMaxX}
              step="0.5"
              value={settings.cubeSizeX}
              onChange={(e) => updateSetting('cubeSizeX', parseFloat(e.target.value))}
            />
          </div>

          <div className="slider-control">
            <label htmlFor="depth">Depth</label>
            <input
              type="range"
              id="depth"
              min="1"
              max={settings.cubeSizeMaxZ}
              step="0.5"
              value={settings.cubeSizeZ}
              onChange={(e) => updateSetting('cubeSizeZ', parseFloat(e.target.value))}
            />
          </div>

          <div className="slider-control">
            <label htmlFor="height">Height</label>
            <input
              type="range"
              id="height"
              min="0.5"
              max={settings.cubeSizeMaxY}
              step="0.5"
              value={settings.cubeSizeY}
              onChange={(e) => updateSetting('cubeSizeY', parseFloat(e.target.value))}
            />
          </div>
        </div>
        {import.meta.env.DEV && showControls && (
          <details className="interaction-tuning">
            <summary>Interaction tuning (development)</summary>
            <div className="slider-group">
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
          </details>
        )}
      </div>
    </>
  );
};

export default ThreeSceneControls;
