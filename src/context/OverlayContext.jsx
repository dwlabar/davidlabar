import React, { createContext, useContext, useState, useCallback } from 'react';

const OverlayContext = createContext();

export const OverlayProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [reason, setReason] = useState(null);

  const showOverlay = useCallback(({ opacity = 1, reason = null } = {}) => {
    setOpacity(opacity);
    setReason(reason);
    setVisible(true);
  }, []);

  const hideOverlay = useCallback(() => {
    setOpacity(0);

    setTimeout(() => {
      setVisible(false);
      setReason(null);
    }, 300); // matches CSS transition
  }, []);

  return (
    <OverlayContext.Provider value={{ visible, opacity, reason, showOverlay, hideOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => useContext(OverlayContext);
