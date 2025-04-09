import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useOverlay } from "../context/OverlayContext";
import { usePageReadyController } from "../context/PageReadyContext";

const RouteTransitionListener = () => {
  const location = useLocation();
  const prevPath = useRef(location.pathname);
  const { hideOverlay } = useOverlay();
  const { registerPageReady } = usePageReadyController();

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      prevPath.current = location.pathname;

      registerPageReady(() => {
        hideOverlay();
      });
    }
  }, [location.pathname, registerPageReady, hideOverlay]);

  return null;
};

export default RouteTransitionListener;
