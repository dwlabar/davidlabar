import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/_nav-bar.scss";

const Nav = () => {
  return (
    <nav className="nav-bar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/svg-examples">SVG Examples</Link></li>
        <li><Link to="/preloader-test">Preloader Test</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
