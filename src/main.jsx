// Wraps the entire app in PreloaderProvider, making isLoading available everywhere.
// Ensures Preloader runs before rendering the main app content.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PreloaderProvider } from "./context/PreloaderContext";
import App from "./App";
import Preloader from "./components/Preloader";
import "./styles/app.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PreloaderProvider>
      <Preloader />
      <App />
    </PreloaderProvider>
  </StrictMode>
);
