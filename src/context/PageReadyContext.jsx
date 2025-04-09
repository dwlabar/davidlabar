// Provides a simple mechanism to coordinate when the page (or specific component setup)
// is considered "ready" and trigger a one-time callback in response.
//
// Useful for deferring animations, transitions, or logic that should only run after initial
// layout/rendering is complete. Consumers can register a callback via `registerPageReady`,
// and call `notifyPageReady` to invoke it once.

import { createContext, useContext, useRef } from "react";

// Create a context to share page readiness functions across the component tree
const PageReadyContext = createContext();

// Provider component that wraps children and gives access to register/notify functions
export const PageReadyProvider = ({ children }) => {
  // A ref to hold the callback that should run when the page is ready
  const callbackRef = useRef(null);

  // Function to register a callback to be executed once the page is ready
  const registerPageReady = (cb) => {
    callbackRef.current = cb;
  };

  // Function to invoke the registered callback and clear it afterward
  const notifyPageReady = () => {
    if (callbackRef.current) {
      callbackRef.current(); // Call the callback
      callbackRef.current = null; // Reset the ref to prevent duplicate calls
    }
  };

  return (
    // Provide the register and notify functions to all children
    <PageReadyContext.Provider value={{ registerPageReady, notifyPageReady }}>
      {children}
    </PageReadyContext.Provider>
  );
};

// Custom hook to access the context from any component
export const usePageReadyController = () => useContext(PageReadyContext);
