import { createContext, useContext, useRef } from "react";

const PageReadyContext = createContext();

export const PageReadyProvider = ({ children }) => {
  const callbackRef = useRef(null);

  const registerPageReady = (cb) => {
    callbackRef.current = cb;
  };

  const notifyPageReady = () => {
    if (callbackRef.current) {
      callbackRef.current();
      callbackRef.current = null;
    }
  };

  return (
    <PageReadyContext.Provider value={{ registerPageReady, notifyPageReady }}>
      {children}
    </PageReadyContext.Provider>
  );
};

export const usePageReadyController = () => useContext(PageReadyContext);
