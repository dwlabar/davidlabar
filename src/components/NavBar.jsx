import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useOverlay } from "../context/OverlayContext";
import LogoMini from "./LogoMini";
import BurgerIcon from "./BurgerIcon";
import "../styles/components/_nav-bar.scss";

const NavBar = ({ links }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showOverlay, setNavOpen } = useOverlay();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e, path) => {
    e.preventDefault();

    if (location.pathname === path) {
      setMenuOpen(false);
      setNavOpen(false);
      return; // do nothing if already on the same route
    }

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
  };

  const toggleMenu = () => {
    const nextState = !menuOpen;
    setMenuOpen(nextState);
    setNavOpen(nextState);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-bar__logo">
        <LogoMini />
        <div className="nav-bar__logo-text">DAVIDLABAR.COM</div>
      </div>

      <ul className={`nav-bar__ul ${menuOpen ? "visible" : "hidden"}`}>
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

      <div className="nav-bar__burger" onClick={toggleMenu}>
        <BurgerIcon isOpen={menuOpen} />
      </div>
    </nav>
  );
};

export default NavBar;
