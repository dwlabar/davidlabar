// Last updated: 3.2.0

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { useOverlay } from "../context/OverlayContext";
import LogoMini from "./LogoMini";
import BurgerIcon from "./BurgerIcon";
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
              onClick={(e) => handleNavClick(e, path)}
              aria-current={(location.pathname === path ||
                location.pathname.startsWith(path + "/")) ? "page" : undefined}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
