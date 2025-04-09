import { useThreeSceneContext } from '../context/ThreeSceneContext';
import '../styles/components/_three-scene.scss';
import { useEffect, useState } from 'react';

const ThreeSceneControls = () => {
  const { settings, updateSetting } = useThreeSceneContext();
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const sliders = document.querySelectorAll('.slider-control input[type="range"]');
    sliders.forEach((slider) => {
      const updateFill = () => {
        const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.setProperty('--progress', `${value}%`);
      };
      slider.addEventListener('input', updateFill);
      updateFill();
    });
  }, [settings]);

  return (
    <>
      <button
        className="scene-controls-toggle"
        onClick={() => setShowControls(!showControls)}
        aria-label="Toggle Scene Controls"
      >
        X
      </button>

      <div className={`scene-controls ${showControls ? 'visible' : ''}`}>
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
              max="9"
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
              max="9"
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
              max="9"
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
