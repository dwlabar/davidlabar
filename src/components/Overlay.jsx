import React from "react";
import { useOverlay } from "../context/OverlayContext";
import "../styles/components/_overlay.scss";

const Overlay = () => {
  const { visible, opacity, overlayRef, navOpen } = useOverlay();
  const isVisible = visible || navOpen;
  const finalOpacity = navOpen ? 0.8 : opacity;

  return (
    <div
      ref={overlayRef}
      className={`overlay ${isVisible ? "visible" : ""}`}
      style={{ opacity: finalOpacity }}
    />
  );
};

export default Overlay;
