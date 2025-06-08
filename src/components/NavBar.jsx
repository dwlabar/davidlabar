import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { useOverlay } from "../context/OverlayContext";
import LogoMini from "./LogoMini";
import BurgerIcon from "./BurgerIcon";
import "../styles/components/_nav-bar.scss";

const NavBar = ({ links }) => {
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const tl = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { showOverlay, hideOverlay, setNavOpen } = useOverlay();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e, path) => {
    e.preventDefault();

    if (location.pathname === path) {
      if (menuOpen) {
        closeMenu();
      }
      return;
    }

    if (menuOpen) {
      tl.current = gsap.timeline();
      tl.current
        .to(menuRef.current, {
          opacity: 0,
          scale: 0.90,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            menuRef.current.classList.remove("nav-bar__ul--mobile-on");
            gsap.set(menuRef.current, { clearProps: "all" });
            setMenuOpen(false);
            setNavOpen(false);

            showOverlay({
              opacity: 1,
              reason: "nav",
              onVisible: () => {
                window.scrollTo(0, 0);
                navigate(path);
              }
            });
          }
        });
    } else {
      showOverlay({
        opacity: 1,
        reason: "nav",
        onVisible: () => {
          window.scrollTo(0, 0);
          navigate(path);
        }
      });
    }
  };

  const openMenu = () => {
    if (!menuRef.current) return;
    setMenuOpen(true);
    setNavOpen(true);

    menuRef.current.classList.add("nav-bar__ul--mobile-on");

    tl.current = gsap.timeline();
    tl.current
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
  };

  const closeMenu = () => {
    if (!menuRef.current) return;
    setMenuOpen(false);
    setNavOpen(false);

    if (tl.current) tl.current.kill();

    tl.current = gsap.timeline();
    tl.current.to(menuRef.current, {
      opacity: 0,
      scale: 0.80,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        menuRef.current.classList.remove("nav-bar__ul--mobile-on");
        gsap.set(menuRef.current, { clearProps: "all" });
      }
    });
  };

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
        setMenuOpen(false);
        setNavOpen(false);
        if (menuRef.current) {
          menuRef.current.classList.remove("nav-bar__ul--mobile-on");
          gsap.set(menuRef.current, { clearProps: "all" });
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  }, [menuOpen, hideOverlay]);

  return (
    <nav className="nav-bar" ref={navRef}>
      <LogoMini />
      <button className="nav-bar__burger" onClick={toggleMenu}>
        <BurgerIcon isOpen={menuOpen} />
      </button>
      <ul className="nav-bar__ul" ref={menuRef}>
        {links.map(({ name, path }) => (
          <li
            key={path}
            className={`${location.pathname === path ? "active" : ""} nav-bar__li`}
          >
            <Link to={path} onClick={(e) => handleNavClick(e, path)}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;