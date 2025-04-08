import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PreloaderProvider } from "./context/PreloaderContext";
import { OverlayProvider } from "./context/OverlayContext";
import App from "./App";
import Preloader from "./components/Preloader";
import "./styles/app.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PreloaderProvider>
      <OverlayProvider>
        <Preloader />
        <App />
      </OverlayProvider>
    </PreloaderProvider>
  </StrictMode>
);
