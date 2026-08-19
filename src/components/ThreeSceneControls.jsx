import { useThreeSceneContext } from '../context/ThreeSceneContext';
import { useEffect, useRef } from 'react';
import CubeIcon from './CubeIcon';
import '../styles/components/_three-scene.scss';

const ThreeSceneControls = ({ showControls, setShowControls }) => {
  const { settings, updateSetting } = useThreeSceneContext();
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
          console.log("toggling", !showControls);
          setShowControls(!showControls);
        }}
        aria-label="Toggle Scene Controls"
      >
        <CubeIcon isActive={showControls} />
      </button>
      <div
        ref={controlsRef}
        className={`scene-controls ${showControls ? 'visible' : ''}`}
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
      </div>
    </>
  );
};

export default ThreeSceneControls;
