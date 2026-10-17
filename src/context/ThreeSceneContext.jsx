// Last updated: 3.4.0

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { SCENE_DEFAULTS } from '../config/ThreeSceneDefaults';
import { CUBE_LIFT_DEFAULTS } from '../components/cubeLiftField';
import { BLOOM_DEFAULTS } from '../config/bloomSettings';
import { HOVER_EFFECT_DEFAULTS } from '../config/hoverEffectSettings';
import { BASE_DEPTH_ROWS, CAMERA_DEFAULTS, FADE_DEFAULTS, SCENE_TUNING_DEFAULTS } from '../config/sceneTuningSettings';

const LOCAL_STORAGE_KEY = 'threeSceneSettings';

// Only public controls may override authored defaults or enter localStorage.
const PUBLIC_SETTING_LIMITS = {
  speed: [0.1, 1],
  cubeSizeX: [1, SCENE_DEFAULTS.cubeSizeMaxX],
  cubeSizeY: [0.5, SCENE_DEFAULTS.cubeSizeMaxY],
  cubeSizeZ: [1, SCENE_DEFAULTS.cubeSizeMaxZ]
};

const getPublicSettings = (values) => Object.fromEntries(
  Object.entries(PUBLIC_SETTING_LIMITS).flatMap(([key, [min, max]]) => {
    const value = values?.[key];
    return Number.isFinite(value) && value >= min && value <= max ? [[key, value]] : [];
  })
);

const ThreeSceneContext = createContext();

export const ThreeSceneProvider = ({ children }) => {
  const saveTimeout = useRef(null);

  // Restore valid public customizations; obsolete stored scene fields are ignored.
  const getInitialSettings = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      return { ...SCENE_DEFAULTS, ...getPublicSettings(saved) };
    } catch {
      return { ...SCENE_DEFAULTS };
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

  const [bloomSettings, setBloomSettings] = useState(BLOOM_DEFAULTS);
  const updateBloomSetting = (key, value) => {
    setBloomSettings((previous) => ({ ...previous, [key]: value }));
  };
  const resetBloomSettings = () => setBloomSettings(BLOOM_DEFAULTS);

  const [hoverSettings, setHoverSettings] = useState(HOVER_EFFECT_DEFAULTS);
  const updateHoverSetting = (key, value) => {
    setHoverSettings((previous) => ({ ...previous, [key]: value }));
  };
  const resetHoverSettings = () => setHoverSettings(HOVER_EFFECT_DEFAULTS);

  const [sceneTuning, setSceneTuning] = useState(SCENE_TUNING_DEFAULTS);
  const updateSceneTuning = (key, value) => {
    setSceneTuning((previous) => {
      const next = { ...previous, [key]: value };
      // Preserve a nonzero fade interval even when endpoints are tuned live.
      if (key === 'fadeStart') next.fadeStart = Math.max(value, previous.fadeEnd + 1);
      if (key === 'fadeEnd') next.fadeEnd = Math.min(value, previous.fadeStart - 1);
      return next;
    });
  };
  const resetCameraTuning = () => setSceneTuning((previous) => ({ ...previous, ...CAMERA_DEFAULTS }));
  const resetFadeTuning = () => setSceneTuning((previous) => ({ ...previous, ...FADE_DEFAULTS }));
  const resetDepthTuning = () => setSceneTuning((previous) => ({ ...previous, depthRows: BASE_DEPTH_ROWS }));
  const resetAllSceneTuning = () => setSceneTuning(SCENE_TUNING_DEFAULTS);

  const updateSetting = (key, value) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: value };

      // Throttle localStorage saving
      clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(getPublicSettings(updated)));
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
      settings, updateSetting, interactionSettings, updateInteractionSetting, resetInteractionSettings,
      bloomSettings, updateBloomSetting, resetBloomSettings,
      hoverSettings, updateHoverSetting, resetHoverSettings,
      sceneTuning, updateSceneTuning, resetCameraTuning, resetFadeTuning, resetDepthTuning, resetAllSceneTuning
    }}>
      {children}
    </ThreeSceneContext.Provider>
  );
};

export const useThreeSceneContext = () => useContext(ThreeSceneContext);
