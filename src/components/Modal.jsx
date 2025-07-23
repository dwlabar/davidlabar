// Modal.jsx
// -----------------------------------------------------------------------------
// A responsive modal component. Triggered externally.
// No internal state, relies on parent render logic.
// Includes ESC close and focus return.
// -----------------------------------------------------------------------------

import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "../styles/components/_modal.scss";

const Modal = ({ src, alt = "", caption = "", onClose }) => {
  const modalRef = useRef(null);
  const triggerRef = useRef(document.activeElement); // Save focus on open

  // ESC key closes modal
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Focus trap entry
  useEffect(() => {
    const closeBtn = modalRef.current?.querySelector(".modal__close");
    closeBtn?.focus();
    return () => triggerRef.current?.focus();
  }, []);

  const modalRoot = document.getElementById("modal_root");
  if (!modalRoot || !src) return null;

  return createPortal(
    <div className="modal" ref={modalRef}>
      <div className="modal__backdrop" onClick={onClose}></div>
      <div className="modal__content">
        <img src={src} alt={alt} />
        {caption && <figcaption className="modal__caption">{caption}</figcaption>}
      </div>
      <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          &#x2715;
        </button>
    </div>,
    modalRoot
  );
};

export default Modal;
