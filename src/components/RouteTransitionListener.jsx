import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useOverlay } from "../context/OverlayContext";
import { usePageReadyController } from "../context/PageReadyContext";
import { PreloaderContext } from "../context/PreloaderContext";

const ROUTE_READY_FALLBACK_MS = 8000;

const RouteTransitionListener = () => {
  const location = useLocation();
  const { hideOverlay } = useOverlay();
  const { registerPageReady } = usePageReadyController();
  const { completeInitialLoad } = useContext(PreloaderContext);

  useEffect(() => {
    let active = true;
    let fallback = null;

    const revealDestination = () => {
      if (!active) return;
      active = false;
      if (fallback !== null) window.clearTimeout(fallback);

      // The first destination releases the preloader. Later destinations
      // release the route overlay.
      if (!completeInitialLoad()) {
        hideOverlay();
      }
    };

    const unregister = registerPageReady(revealDestination);

    // Prevent a page integration bug from deadlocking navigation forever.
    fallback = window.setTimeout(
      revealDestination,
      ROUTE_READY_FALLBACK_MS
    );

    return () => {
      active = false;
      if (fallback !== null) window.clearTimeout(fallback);
      unregister();
    };
  }, [
    completeInitialLoad,
    hideOverlay,
    location.key,
    registerPageReady,
  ]);

  return null;
};

export default RouteTransitionListener;
