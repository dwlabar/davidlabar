// Tracks the initial route's loading state separately from the authored
// preloader presentation. The destination route decides when its critical
// content is ready; the Preloader owns the entrance/hold/exit timing.

import React, { createContext, useCallback, useRef, useState } from "react";

export const PreloaderContext = createContext();

export const PreloaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const hasCompletedInitialLoadRef = useRef(false);

  const completeInitialLoad = useCallback(() => {
    if (hasCompletedInitialLoadRef.current) {
      return false;
    }

    hasCompletedInitialLoadRef.current = true;
    setIsLoading(false);
    return true;
  }, []);

  return (
    <PreloaderContext.Provider
      value={{
        isLoading,
        isPreloaderVisible,
        setIsPreloaderVisible,
        completeInitialLoad,
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
};
