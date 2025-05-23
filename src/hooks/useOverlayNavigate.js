import { useNavigate, useLocation } from "react-router-dom";
import { useOverlay } from "../context/OverlayContext";

// Reusable overlay navigation hook
const useOverlayNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showOverlay, setNavOpen } = useOverlay();

  const overlayNavigate = (to) => {
    if (location.pathname === to) {
      setNavOpen(false);
      return;
    }

    setNavOpen(false);

    showOverlay({
      opacity: 1,
      reason: "nav",
      onVisible: () => {
        window.scrollTo(0, 0);
        navigate(to);
      },
    });
  };

  return overlayNavigate;
};

export default useOverlayNavigate;
