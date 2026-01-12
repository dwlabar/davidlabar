// -----------------------------------------------------------------------------
// main.jsx (v0.0.1)
// -----------------------------------------------------------------------------

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PreloaderProvider } from "./context/PreloaderContext";
import { OverlayProvider } from "./context/OverlayContext";
import { PageReadyProvider } from "./context/PageReadyContext";
import App from "./App";
import Preloader from "./components/Preloader";
import "./styles/app.scss";

const redirectPath = localStorage.getItem("redirectPath");
if (redirectPath) {
  localStorage.removeItem("redirectPath");
  window.history.replaceState(null, "", redirectPath);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PageReadyProvider>
      <PreloaderProvider>
        <OverlayProvider>
          <Preloader />
          <App />
        </OverlayProvider>
      </PreloaderProvider>
    </PageReadyProvider>
  </StrictMode>
);
