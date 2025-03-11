import { createContext, useContext, useState } from 'react';

const defaultSettings = {
  gridSize: 41,
  cubeSizeX: 8,
  cubeSizeY: 1,
  cubeSizeZ: 8,
  cubeSpacing: 0.5,
  speed: 0.3,
};

const SceneContext = createContext();

export const SceneProvider = ({ children, config = {} }) => {
  const [settings, setSettings] = useState({ ...defaultSettings, ...config });

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SceneContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SceneContext.Provider>
  );
};

export const useSceneContext = () => useContext(SceneContext);
