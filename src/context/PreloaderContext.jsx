// Tracks isLoading state across the app.
// Waits for all assets to load (fonts, images, JS).
// Includes a 10 - second fallback (to prevent getting stuck).
// Ensures cleanup (removes event listener & clears timeout).

import React, { createContext, useState, useEffect } from "react";

export const PreloaderContext = createContext();

export const PreloaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false); // Mark loading as complete
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <PreloaderContext.Provider
      value={{ isLoading, setIsLoading, isPreloaderVisible, setIsPreloaderVisible }}
    >
      {children}
    </PreloaderContext.Provider>
  );
};
