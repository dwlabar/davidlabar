import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/components/_nav-bar.scss";

const NavBar = ({ links }) => {
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <ul className="nav-bar__ul">
        <div className="nav-bar__logo">
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="42"
            viewBox="0 0 9.525 11.113"
            aria-label="Nav Bar Icon"
          >
            <path d="M0 10.319v.794h9.525v-.794zm3.704-6.615v2.117h2.117V3.704zm3.969-1.852H5.292V2.91h1.323v3.705H5.292v1.058h2.38zm-5.82 5.82h2.38V6.616H2.91V2.91h1.323V1.852h-2.38zm7.672 1.853V5.292H8.467v3.175H1.058V5.292H0v4.233ZM0 0v4.233h1.058V1.058h7.409v3.175h1.058V0Z" />
          </svg>
          <div className="nav-bar__logo-text">DAVIDLABAR.COM</div>
        </div>
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
