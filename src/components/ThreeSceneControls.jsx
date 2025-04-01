import { useThreeSceneContext } from '../context/ThreeSceneContext';
import '../styles/components/_three-scene.scss';
import { useEffect } from 'react';

const ThreeSceneControls = () => {
  const { settings, updateSetting } = useThreeSceneContext();

  useEffect(() => {
    const sliders = document.querySelectorAll('.slider-control input[type="range"]');
    sliders.forEach((slider) => {
      const updateFill = () => {
        const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.setProperty('--progress', `${value}%`);
      };
      slider.addEventListener('input', updateFill);
      updateFill(); // Initialize on mount
    });
  }, [settings]);

  return (
    <div className="scene-controls">
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
            onChange={(e) => updateSetting('cubeSizeX', parseInt(e.target.value))}
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
            onChange={(e) => updateSetting('cubeSizeZ', parseInt(e.target.value))}
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
  );
};

export default ThreeSceneControls;
