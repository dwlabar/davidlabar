import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const OVERLAY_TRANSITION_FALLBACK_MS = 650;
const OVERLAY_HIDE_FALLBACK_MS = 550;

const OverlayContext = createContext();

export const OverlayProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [reason, setReason] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const pendingCallbackRef = useRef(null);
  const showFallbackRef = useRef(null);
  const hideFallbackRef = useRef(null);
  const settleFrameRef = useRef(null);
  const operationIdRef = useRef(0);
  const overlayRef = useRef(null);

  const clearShowCompletion = useCallback(() => {
    if (showFallbackRef.current !== null) {
      window.clearTimeout(showFallbackRef.current);
      showFallbackRef.current = null;
    }
    if (settleFrameRef.current !== null) {
      cancelAnimationFrame(settleFrameRef.current);
      settleFrameRef.current = null;
    }
  }, []);

  const finishShow = useCallback(
    (operationId) => {
      const pending = pendingCallbackRef.current;
      if (!pending || pending.operationId !== operationId) return;

      clearShowCompletion();
      pendingCallbackRef.current = null;
      pending.callback?.();
    },
    [clearShowCompletion]
  );

  const showOverlay = useCallback(
    ({ opacity: targetOpacity = 1, reason = null, onVisible = null } = {}) => {
      const operationId = ++operationIdRef.current;

      if (hideFallbackRef.current !== null) {
        window.clearTimeout(hideFallbackRef.current);
        hideFallbackRef.current = null;
      }
      clearShowCompletion();

      pendingCallbackRef.current = {
        operationId,
        callback: onVisible,
        targetOpacity,
      };
      setOpacity(targetOpacity);
      setReason(reason);
      setVisible(true);

      settleFrameRef.current = requestAnimationFrame(() => {
        settleFrameRef.current = null;
        const overlay = overlayRef.current;
        const currentOpacity = overlay
          ? Number.parseFloat(getComputedStyle(overlay).opacity)
          : targetOpacity;

        if (
          window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
          Math.abs(currentOpacity - targetOpacity) < 0.01
        ) {
          finishShow(operationId);
        }
      });

      // transitionend can be skipped when the tab is backgrounded or the
      // overlay is already at its target opacity.
      showFallbackRef.current = window.setTimeout(
        () => finishShow(operationId),
        OVERLAY_TRANSITION_FALLBACK_MS
      );
    },
    [clearShowCompletion, finishShow]
  );

  const hideOverlay = useCallback(() => {
    const operationId = ++operationIdRef.current;
    clearShowCompletion();
    pendingCallbackRef.current = null;

    if (hideFallbackRef.current !== null) {
      window.clearTimeout(hideFallbackRef.current);
    }

    setOpacity(0);

    const finishHide = () => {
      if (operationIdRef.current !== operationId) return;
      setVisible(false);
      setReason(null);
      hideFallbackRef.current = null;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishHide();
      return;
    }

    hideFallbackRef.current = window.setTimeout(
      finishHide,
      OVERLAY_HIDE_FALLBACK_MS
    );
  }, [clearShowCompletion]);

  // Complete only the currently active show operation's opacity transition.
  useEffect(() => {
    const overlayEl = overlayRef.current;
    if (!overlayEl) return;

    const handleTransitionEnd = (event) => {
      const pending = pendingCallbackRef.current;
      if (
        event.target === overlayEl &&
        event.propertyName === "opacity" &&
        pending
      ) {
        finishShow(pending.operationId);
      }
    };

    overlayEl.addEventListener("transitionend", handleTransitionEnd);
    return () => {
      overlayEl.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [finishShow]);

  useEffect(() => {
    return () => {
      clearShowCompletion();
      if (hideFallbackRef.current !== null) {
        window.clearTimeout(hideFallbackRef.current);
      }
      pendingCallbackRef.current = null;
    };
  }, [clearShowCompletion]);

  return (
    <OverlayContext.Provider
      value={{
        visible,
        opacity,
        reason,
        showOverlay,
        hideOverlay,
        overlayRef,
        navOpen,
        setNavOpen,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => useContext(OverlayContext);
