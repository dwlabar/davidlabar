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
        <svg
          width="50.763672"
          height="50.863277"
          viewBox="0 0 50.763672 50.86328"
          version="1.1"
          id="icon-cube"
          className="icon-cube"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:svg="http://www.w3.org/2000/svg">
          <defs id="cube-defs" />
          <path d="m 25.382234,9.4227634 -16,3.9999986 16,6 16,-6 z" id="cube-top" />
          <path d="m 9.382234,13.422762 v 22 l 16,6 v -22 z" id="cube-left" />
          <path d="M 25.382812,0 0,6.3457031 v 0.78125 34.2187499 l 25.382812,9.517578 25.38086,-9.517578 V 6.3457031 Z m 0,2.0625 23.38086,5.84375 V 39.958984 L 25.382812,48.726562 2,39.958984 V 7.90625 Z" id="cube-border" />
          <path d="m 41.382234,13.422762 v 22 l -16,6 v -22 z" id="cube-right" />
        </svg>
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
