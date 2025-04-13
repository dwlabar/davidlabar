import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useOverlay } from "../context/OverlayContext";
import LogoMini from "./LogoMini";
import "../styles/components/_nav-bar.scss";

const NavBar = ({ links }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showOverlay, setNavOpen } = useOverlay();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setMenuOpen(false);
    setNavOpen(false);

    showOverlay({
      opacity: 1,
      reason: "nav",
      onVisible: () => {
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
        <Link to="/">
          <LogoMini />
        </Link>
        <div className="nav-bar__logo-text">DAVIDLABAR.COM</div>
      </div>

      <ul className={`nav-bar__ul ${menuOpen ? "open" : "closed"}`}>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 12.7 12.7"
          aria-label="Nav Bar Mobile Icon"
        >
          <path d="M0 0v12.7h12.7V0Zm.53.53h11.64v11.64H.53Z" fill="#373737" />
          <path d="M3.175 3.969v1.058h6.35V3.97z" fill="#373737" />
          <path d="M3.175 5.82v1.06h6.35V5.82z" fill="#373737" />
          <path d="M3.175 7.673V8.73h6.35V7.673z" fill="#373737" />
        </svg>
      </div>
    </nav>
  );
};

export default NavBar;
