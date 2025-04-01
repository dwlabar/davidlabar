import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/components/_nav-bar.scss";
import LogoMini from "./LogoMini";

const NavBar = ({ links }) => {
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <ul className="nav-bar__ul">
        <div className="nav-bar__logo">
          <Link to="/">
            <LogoMini></LogoMini>
          </Link>
          <div className="nav-bar__logo-text">DAVIDLABAR.COM</div>
        </div>
        {links.map(({ name, path }) => (
          <li key={path} className={`${location.pathname === path ? "active" : ""} nav-bar__li`}>
            <Link to={path}>{name}</Link>
          </li>
        ))}
        <div className="nav-bar__burger">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 12.7 12.7"
            aria-label="Nav Bar Icon"
          >
            <path d="M0 0v12.7h12.7V0Zm.53.53h11.64v11.64H.53Z" fill="#373737" fillOpacity="1" />
            <path d="M3.175 3.969v1.058h6.35V3.97z" fill="#373737" fillOpacity="1" />
            <path d="M3.175 5.82v1.06h6.35V5.82z" fill="#373737" fillOpacity="1" />
            <path d="M3.175 7.673V8.73h6.35V7.673z" fill="#373737" fillOpacity="1" />
          </svg>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
