import React from "react";
import { useOverlay } from "../context/OverlayContext";
import "../styles/components/_overlay.scss";

const Overlay = () => {
  const { visible, opacity, overlayRef } = useOverlay();

  return (
    <div
      ref={overlayRef}
      className={`overlay ${visible ? "visible" : ""}`}
      style={{ opacity }}
    />
  );
};

export default Overlay;
