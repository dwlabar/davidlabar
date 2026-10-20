// Last updated: 3.4.0

import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { gsap } from "gsap";
import { useOverlay } from "../context/OverlayContext";
import LogoMini from "./LogoMini";
import BurgerIcon from "./BurgerIcon";
import ContactIcon from "./ContactIcon";
import useReducedMotion from "../hooks/useReducedMotion";
import "../styles/components/_nav-bar.scss";

const NavBar = ({ links }) => {
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const tl = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const location = useLocation();
  const navigate = useNavigate();
  const { showOverlay, hideOverlay, setNavOpen } = useOverlay();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || prefersReducedMotion) return;

    const media = gsap.matchMedia();
    media.add("(any-hover: hover) and (any-pointer: fine)", () => {
      let frame = null;
      let previousTime = null;
      let targetX = null;
      let currentX = 0;
      let velocity = 0;
      let idleTimer = null;
      let activity = 0;
      let targetActivity = 0;

      const paintPosition = () => {
        nav.style.setProperty("--nav-border-x", `${currentX}px`);
      };

      const animate = (time) => {
        const delta = Math.min((time - previousTime) / 1000, 0.05);
        previousTime = time;

        // Exact critically damped spring step: retain velocity when the target
        // changes, then settle without oscillation or a frame-rate-dependent lerp.
        const frequency = 14;
        const offset = currentX - targetX;
        const impulse = velocity + frequency * offset;
        const decay = Math.exp(-frequency * delta);
        currentX = targetX + (offset + impulse * delta) * decay;
        velocity = (velocity - frequency * impulse * delta) * decay;

        const positionSettled = Math.abs(currentX - targetX) < 0.05 && Math.abs(velocity) < 0.5;
        if (positionSettled) {
          currentX = targetX;
          velocity = 0;
        }

        // Share the on-demand loop with the idle envelope; reversing the fade
        // starts from its current width/opacity without resetting mouse momentum.
        activity += (targetActivity - activity) * (1 - Math.exp(-6 * delta));
        const activitySettled = Math.abs(targetActivity - activity) < 0.001;
        if (activitySettled) activity = targetActivity;
        nav.style.setProperty("--nav-border-visible", activity);
        nav.style.setProperty("--nav-border-scale", 0.15 + 0.85 * activity);
        paintPosition();

        if (positionSettled && activitySettled) {
          frame = null;
          return;
        }
        frame = window.requestAnimationFrame(animate);
      };

      const requestFrame = () => {
        if (frame !== null) return;
        previousTime = performance.now();
        frame = window.requestAnimationFrame(animate);
      };

      const forgetPointer = () => {
        window.clearTimeout(idleTimer);
        idleTimer = null;
        if (frame !== null) window.cancelAnimationFrame(frame);
        frame = null;
        previousTime = null;
        targetX = null;
        velocity = 0;
        activity = 0;
        targetActivity = 0;
        nav.style.removeProperty("--nav-border-visible");
      };

      const trackPointer = (event) => {
        if (event.pointerType !== "mouse") {
          forgetPointer();
          return;
        }

        const nextX = Math.max(0, Math.min(event.clientX, window.innerWidth));
        if (targetX === null) {
          // The first known position is placed while the glow is still hidden.
          currentX = nextX;
          paintPosition();
        }
        targetX = nextX;
        const insideNav = event.type !== "pointerleave" && nav.contains(event.target);
        nav.style.setProperty("--nav-border-gray", insideNav ? "1" : "0");

        targetActivity = 1;
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => {
          idleTimer = null;
          targetActivity = 0;
          requestFrame();
        }, 1500);
        requestFrame();
      };

      const leaveWindow = (event) => {
        if (event.relatedTarget === null) forgetPointer();
      };
      const handleVisibility = () => {
        if (document.hidden) forgetPointer();
      };

      window.addEventListener("pointermove", trackPointer, { passive: true });
      window.addEventListener("pointerout", leaveWindow);
      window.addEventListener("blur", forgetPointer);
      window.addEventListener("resize", forgetPointer);
      nav.addEventListener("pointerenter", trackPointer);
      nav.addEventListener("pointerleave", trackPointer);
      document.addEventListener("visibilitychange", handleVisibility);

      return () => {
        forgetPointer();
        nav.style.removeProperty("--nav-border-x");
        nav.style.removeProperty("--nav-border-scale");
        nav.style.removeProperty("--nav-border-gray");
        window.removeEventListener("pointermove", trackPointer);
        window.removeEventListener("pointerout", leaveWindow);
        window.removeEventListener("blur", forgetPointer);
        window.removeEventListener("resize", forgetPointer);
        nav.removeEventListener("pointerenter", trackPointer);
        nav.removeEventListener("pointerleave", trackPointer);
        document.removeEventListener("visibilitychange", handleVisibility);
      };
    });

    return () => media.revert();
  }, [prefersReducedMotion]);

  const createMenuTimeline = useCallback(() => {
    tl.current?.kill();
    tl.current = gsap.timeline();
    return tl.current;
  }, []);

  const resetMenu = useCallback(() => {
    tl.current?.kill();
    tl.current = null;
    if (menuRef.current) {
      menuRef.current.classList.remove("nav-bar__ul--mobile-on");
      gsap.set(menuRef.current, { clearProps: "all" });
    }
    setMenuOpen(false);
    setNavOpen(false);
  }, [setNavOpen]);

  const handleNavClick = (e, path) => {
    e.preventDefault();

    if (location.pathname === path) {
      if (menuOpen) {
        closeMenu();
      }
      return;
    }

    const navigateWithOverlay = () => {
      showOverlay({
        opacity: 1,
        reason: "nav",
        onVisible: () => {
          window.scrollTo(0, 0);
          navigate(path);
        }
      });
    };

    if (menuOpen && prefersReducedMotion) {
      resetMenu();
      navigateWithOverlay();
    } else if (menuOpen) {
      createMenuTimeline()
        .to(menuRef.current, {
          opacity: 0,
          scale: 0.90,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            resetMenu();
            navigateWithOverlay();
          }
        });
    } else {
      navigateWithOverlay();
    }
  };

  const openMenu = useCallback(() => {
    if (!menuRef.current) return;
    setMenuOpen(true);
    setNavOpen(true);

    menuRef.current.classList.add("nav-bar__ul--mobile-on");

    if (prefersReducedMotion) {
      tl.current?.kill();
      tl.current = null;
      gsap.set(menuRef.current, { opacity: 1, y: 0, scale: 1 });
      gsap.set(menuRef.current.querySelectorAll("li"), { opacity: 1, y: 0 });
      return;
    }

    createMenuTimeline()
      .fromTo(
        menuRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        }
      )
      .fromTo(
        menuRef.current.querySelectorAll("li"),
        { opacity: 0, y: 0 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out"
        },
        "-=0.2"
      );
  }, [createMenuTimeline, prefersReducedMotion, setNavOpen]);

  const closeMenu = useCallback((restoreFocus = false) => {
    if (!menuRef.current) return;

    const finishClose = () => {
      resetMenu();
      if (restoreFocus) burgerRef.current?.focus();
    };

    if (prefersReducedMotion) {
      finishClose();
      return;
    }

    createMenuTimeline().to(menuRef.current, {
      opacity: 0,
      scale: 0.80,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: finishClose
    });
  }, [createMenuTimeline, prefersReducedMotion, resetMenu]);

  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Clear modifier class and inline styles on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        resetMenu();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [resetMenu]);

  useEffect(() => {
    return () => {
      tl.current?.kill();
      tl.current = null;
    };
  }, []);

  useEffect(() => {
    if (!prefersReducedMotion || !menuRef.current) return;

    tl.current?.kill();
    tl.current = null;
    if (menuOpen) {
      gsap.set(menuRef.current, { opacity: 1, y: 0, scale: 1 });
      gsap.set(menuRef.current.querySelectorAll("li"), { opacity: 1, y: 0 });
    }
  }, [menuOpen, prefersReducedMotion]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuOpen) return;
      if (navRef.current && !navRef.current.contains(e.target)) {
        closeMenu();
        hideOverlay();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [closeMenu, menuOpen, hideOverlay]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeMenu, menuOpen]);

  return (
    <nav className="nav-bar" ref={navRef} aria-label="Primary">
      <LogoMini />
      <button
        ref={burgerRef}
        type="button"
        className="nav-bar__burger"
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation-menu"
      >
        <BurgerIcon isOpen={menuOpen} />
      </button>
      <ul className="nav-bar__ul" id="primary-navigation-menu" ref={menuRef}>
        {/* determine active state including sub‐routes */}
        {links.map(({ name, path }) => (
          <li
            key={path}
            className={`${(location.pathname === path ||
              location.pathname.startsWith(path + "/"))
              ? "active"
              : ""} nav-bar__li`}
          >
            <Link
              to={path}
              className={path === "/contact" ? "nav-bar__contact" : undefined}
              aria-label={path === "/contact" ? "Contact" : undefined}
              onClick={(e) => handleNavClick(e, path)}
              aria-current={(location.pathname === path ||
                location.pathname.startsWith(path + "/")) ? "page" : undefined}
            >
              {path === "/contact" ? (
                <>
                  <ContactIcon />
                  <span className="nav-bar__contact-text">{name}</span>
                </>
              ) : name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
