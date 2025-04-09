import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

const OverlayContext = createContext();

export const OverlayProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [reason, setReason] = useState(null);
  const pendingCallbackRef = useRef(null);
  const overlayRef = useRef(null);

  const showOverlay = useCallback(
    ({ opacity = 1, reason = null, onVisible = null } = {}) => {
      setOpacity(opacity);
      setReason(reason);
      setVisible(true);

      // Save callback for when transition completes
      pendingCallbackRef.current = onVisible;
    },
    []
  );

  const hideOverlay = useCallback(() => {
    setOpacity(0);

    setTimeout(() => {
      setVisible(false);
      setReason(null);
    }, 500); // Match SCSS transition out
  }, []);

  // Listen for transition end to fire onVisible
  useEffect(() => {
    const overlayEl = overlayRef.current;
    if (!overlayEl) return;

    const handleTransitionEnd = (e) => {
      if (e.propertyName === "opacity" && pendingCallbackRef.current) {
        pendingCallbackRef.current();
        pendingCallbackRef.current = null;
      }
    };

    overlayEl.addEventListener("transitionend", handleTransitionEnd);
    return () => {
      overlayEl.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, []);

  return (
    <OverlayContext.Provider value={{ visible, opacity, reason, showOverlay, hideOverlay, overlayRef }}>
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => useContext(OverlayContext);
