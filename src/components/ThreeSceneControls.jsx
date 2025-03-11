import { useSceneContext } from '../context/ThreeSceneContext';
import '../styles/components/_three-scene-controls.scss';

const ThreeSceneControls = () => {
  const { settings, updateSetting } = useSceneContext();

  return (
    <div className="scene-controls">
      <label>
        Speed
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={settings.speed}
          onChange={(e) => updateSetting('speed', parseFloat(e.target.value))}
        />
      </label>

      <label>
        Cube Width (X)
        <input
          type="range"
          min="1"
          max="20"
          step="1"
          value={settings.cubeSizeX}
          onChange={(e) => updateSetting('cubeSizeX', parseInt(e.target.value, 10))}
        />
      </label>

      <label>
        Cube Height (Y)
        <input
          type="range"
          min="0.5"
          max="10"
          step="0.5"
          value={settings.cubeSizeY}
          onChange={(e) => updateSetting('cubeSizeY', parseFloat(e.target.value))}
        />
      </label>

      <label>
        Cube Depth (Z)
        <input
          type="range"
          min="1"
          max="20"
          step="1"
          value={settings.cubeSizeZ}
          onChange={(e) => updateSetting('cubeSizeZ', parseInt(e.target.value, 10))}
        />
      </label>
    </div>
  );
};

export default ThreeSceneControls;
