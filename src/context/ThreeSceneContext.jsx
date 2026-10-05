import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { SCENE_PRESETS } from '../config/ThreeScenePresets';
import { CUBE_LIFT_DEFAULTS } from '../components/cubeLiftField';

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
  // Transient interaction tuning never enters the persisted public settings.
  const [interactionSettings, setInteractionSettings] = useState(CUBE_LIFT_DEFAULTS);
  const updateInteractionSetting = (key, value) => {
    setInteractionSettings((previous) => {
      const next = { ...previous, [key]: value };
      // Keep a finite settling phase when either duration is tuned live.
      if (key === 'riseDuration') {
        next.sequenceDuration = Math.max(next.sequenceDuration, value + 0.4);
      } else if (key === 'sequenceDuration') {
        next.riseDuration = Math.min(next.riseDuration, value - 0.4);
      }
      return next;
    });
  };
  const resetInteractionSettings = () => setInteractionSettings(CUBE_LIFT_DEFAULTS);

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
    <ThreeSceneContext.Provider value={{
      settings, updateSetting, interactionSettings, updateInteractionSetting, resetInteractionSettings
    }}>
      {children}
    </ThreeSceneContext.Provider>
  );
};

export const useThreeSceneContext = () => useContext(ThreeSceneContext);
