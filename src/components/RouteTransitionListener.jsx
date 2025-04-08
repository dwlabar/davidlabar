import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useOverlay } from "../context/OverlayContext";

const RouteTransitionListener = () => {
  const location = useLocation();
  const prevPath = useRef(location.pathname);
  const { hideOverlay } = useOverlay();

  useEffect(() => {
    // If path changed, hide overlay after mount
    if (location.pathname !== prevPath.current) {
      prevPath.current = location.pathname;

      // Wait one frame to allow layout/DOM to settle
      requestAnimationFrame(() => {
        hideOverlay();
      });
    }
  }, [location.pathname, hideOverlay]);

  return null;
};

export default RouteTransitionListener;
