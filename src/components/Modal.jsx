// Modal.jsx
// Last updated: 3.2.1
// -----------------------------------------------------------------------------
// A responsive modal component. Triggered externally.
// No internal state, relies on parent render logic.
// Includes modal semantics, focus trapping, ESC close, and focus return.
// -----------------------------------------------------------------------------

import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "../styles/components/_modal.scss";

const Modal = ({ src, alt = "", onClose }) => {
  const modalRef = useRef(null);
  const triggerRef = useRef(document.activeElement); // Save focus on open

  // Own the modal keyboard boundary while it is open.
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = Array.from(
        modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

      if (focusable.length === 0) {
        e.preventDefault();
        modalRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const focusIsOutside = !modalRef.current.contains(document.activeElement);

      if (e.shiftKey && (document.activeElement === first || focusIsOutside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || focusIsOutside)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Isolate the page, lock background scroll, and restore the invoking control.
  useEffect(() => {
    const trigger = triggerRef.current;
    const appRoot = document.getElementById("root");
    const closeBtn = modalRef.current?.querySelector(".modal__close");
    const previousOverflow = document.body.style.overflow;
    const rootWasInert = appRoot?.inert ?? false;

    if (appRoot) appRoot.inert = true;
    document.body.style.overflow = "hidden";
    closeBtn?.focus();

    return () => {
      if (appRoot) appRoot.inert = rootWasInert;
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus();
    };
  }, []);

  const modalRoot = document.getElementById("modal_root");
  if (!modalRoot || !src) return null;

  return createPortal(
    <div
      className="modal"
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Project image preview"
      tabIndex="-1"
    >
      <div className="modal__backdrop" onClick={onClose} aria-hidden="true"></div>
      <div className="modal__content">
        <img src={src} alt={alt} />
      </div>
      <button
        className="modal__close"
        type="button"
        onClick={onClose}
        aria-label="Close image preview"
      >
        &#x2715;
      </button>
    </div>,
    modalRoot
  );
};

export default Modal;
