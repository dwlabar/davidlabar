import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { SCENE_PRESETS } from '../config/ThreeScenePresets';

const LOCAL_STORAGE_KEY = 'threeSceneSettings';

const ThreeSceneContext = createContext();

export const ThreeSceneProvider = ({ children, presetName = 'default' }) => {
  const saveTimeout = useRef(null);

  // Get initial settings from preset + saved localStorage values
  const getInitialSettings = () => {
    const preset = SCENE_PRESETS[presetName] || {};
    try {
      const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      return { ...preset, ...saved };
    } catch {
      return { ...preset };
    }
  };

  const [settings, setSettings] = useState(getInitialSettings);

  const updateSetting = (key, value) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: value };

      // Throttle localStorage saving
      clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      }, 500);

      return updated;
    });
  };

  // Cleanup any pending localStorage write
  useEffect(() => {
    return () => {
      clearTimeout(saveTimeout.current);
    };
  }, []);

  return (
    <ThreeSceneContext.Provider value={{ settings, updateSetting }}>
      {children}
    </ThreeSceneContext.Provider>
  );
};

export const useThreeSceneContext = () => useContext(ThreeSceneContext);
