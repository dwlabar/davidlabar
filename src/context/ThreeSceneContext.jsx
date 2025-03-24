import { createContext, useContext, useState } from 'react';

const defaultSettings = {
  gridSize: 40,
  cubeSizeX: 8,
  cubeSizeY: 1,
  cubeSizeZ: 8,
  cubeSpacing: 0.5,
  speed: 0.3,
};

const ThreeSceneContext = createContext();

export const ThreeSceneProvider = ({ children, config = {} }) => {
  const [settings, setSettings] = useState({ ...defaultSettings, ...config });

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ThreeSceneContext.Provider value={{ settings, updateSetting }}>
      {children}
    </ThreeSceneContext.Provider>
  );
};

export const useThreeSceneContext = () => useContext(ThreeSceneContext);
