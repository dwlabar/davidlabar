import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/components/_nav-bar.scss";

const NavBar = ({ links }) => {
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <ul className="nav-bar__ul">
        {links.map(({ name, path }) => (
          <li key={path} className={`${location.pathname === path ? "active" : ""} nav-bar__li`}>
            <Link to={path}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
