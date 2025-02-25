import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/components/_nav-bar.scss";

const Nav = () => {
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <ul>
        <li className={location.pathname === "/" ? "active" : ""}><Link to="/">Home</Link></li>
        <li className={location.pathname === "/about" ? "active" : ""}><Link to="/about">About</Link></li>
        <li className={location.pathname === "/contact" ? "active" : ""}><Link to="/contact">Contact</Link></li>
        <li className={location.pathname === "/svg-examples" ? "active" : ""}><Link to="/svg-examples">SVG Examples</Link></li>
        <li className={location.pathname === "/preloader-test" ? "active" : ""}><Link to="/preloader-test">Preloader Test</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
