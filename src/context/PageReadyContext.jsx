// Coordinates destination readiness by React Router location key. A ready signal
// can arrive before or after the transition listener registers, but it can only
// complete the matching route and is invalidated when that navigation is replaced.

import { createContext, useCallback, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";

// Create a context to share page readiness functions across the component tree
const PageReadyContext = createContext();

// Provider component that wraps children and gives access to register/notify functions
export const PageReadyProvider = ({ children }) => {
  const activeRegistrationRef = useRef(null);
  const readyRoutesRef = useRef(new Set());
  const registrationIdRef = useRef(0);

  const registerPageReadyForRoute = useCallback((routeKey, callback) => {
    const registrationId = ++registrationIdRef.current;
    activeRegistrationRef.current = { routeKey, callback, registrationId };

    if (readyRoutesRef.current.delete(routeKey)) {
      activeRegistrationRef.current = null;
      callback();
    }

    return () => {
      if (activeRegistrationRef.current?.registrationId === registrationId) {
        activeRegistrationRef.current = null;
      }
      readyRoutesRef.current.delete(routeKey);
    };
  }, []);

  const notifyPageReadyForRoute = useCallback((routeKey) => {
    const registration = activeRegistrationRef.current;

    if (registration?.routeKey === routeKey) {
      activeRegistrationRef.current = null;
      registration.callback();
      return;
    }

    readyRoutesRef.current.add(routeKey);
  }, []);

  return (
    <PageReadyContext.Provider
      value={{ registerPageReadyForRoute, notifyPageReadyForRoute }}
    >
      {children}
    </PageReadyContext.Provider>
  );
};

// Bind page notifications and transition registrations to this location instance.
export const usePageReadyController = () => {
  const location = useLocation();
  const { registerPageReadyForRoute, notifyPageReadyForRoute } =
    useContext(PageReadyContext);

  const registerPageReady = useCallback(
    (callback) => registerPageReadyForRoute(location.key, callback),
    [location.key, registerPageReadyForRoute]
  );

  const notifyPageReady = useCallback(
    () => notifyPageReadyForRoute(location.key),
    [location.key, notifyPageReadyForRoute]
  );

  return { registerPageReady, notifyPageReady };
};
