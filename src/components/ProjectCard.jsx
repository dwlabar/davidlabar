// ProjectCard.jsx

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import useOverlayNavigate from "../hooks/useOverlayNavigate";

const TILE_SIZE = 100; // tile width/height in pixels

const ProjectCard = ({ title, description, subline, path, logo, background, label }) => {
  const overlayNavigate = useOverlayNavigate();
  const cardRef = useRef(null);
  const gridRef = useRef(null);
  const [tiles, setTiles] = useState([]);
  const lastInputWasKeyboard = useRef(false); // Track last input type

  const handleClick = (e) => {
    e.preventDefault(); // prevent native navigation to avoid preloader
    overlayNavigate(path); // use JS navigation
  };

  // Create tile layout based on card size
  const createTiles = () => {
    const card = cardRef.current;
    if (!card) return;
    const { width, height } = card.getBoundingClientRect();

    const cols = Math.ceil(width / TILE_SIZE);
    const rows = Math.ceil(height / TILE_SIZE);
    const tempTiles = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        tempTiles.push({ x: x * TILE_SIZE, y: y * TILE_SIZE, key: `${x}-${y}` });
      }
    }

    setTiles(tempTiles);
  };

  // Animate tiles in on hover/focus
  const animateIn = () => {
    const tileDivs = gridRef.current?.querySelectorAll(".project-card__tile");
    if (!tileDivs) return;
    gsap.killTweensOf(tileDivs);
    gsap.fromTo(
      tileDivs,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: {
          from: "end",
          amount: 0.25
        }
      }
    );
  };

  // Animate tiles out on leave/blur
  const animateOut = () => {
    const tileDivs = gridRef.current?.querySelectorAll(".project-card__tile");
    if (!tileDivs) return;
    gsap.killTweensOf(tileDivs);
    gsap.to(tileDivs, {
      opacity: 0,
      duration: 0.3,
      ease: "power1.inOut"
    });
  };

  // Only trigger animateIn on focus if last input was keyboard
  const handleFocus = () => {
    if (lastInputWasKeyboard.current) {
      animateIn();
    }
  };

  // Setup input method tracking once
  useEffect(() => {
    const handleKeyDown = () => {
      lastInputWasKeyboard.current = true;
    };
    const handleMouseDown = () => {
      lastInputWasKeyboard.current = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useEffect(() => {
    createTiles();
    const handleResize = () => {
      createTiles();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <a
      ref={cardRef}
      className="project-card"
      href={path}
      onClick={handleClick}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
      onFocus={handleFocus}
      onBlur={animateOut}
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Logo */}
      {logo && (
        <div className="project-card__logo">
          <img src={logo} alt={`${title} logo`} />
        </div>
      )}

      {/* Grid Overlay */}
      <div className="project-card__grid" ref={gridRef}>
        {tiles.map((tile) => (
          <div
            key={tile.key}
            className="project-card__tile"
            style={{
              width: TILE_SIZE,
              height: TILE_SIZE,
              position: "absolute",
              left: tile.x,
              top: tile.y
            }}
          />
        ))}
      </div>

      {/* Title and Label */}
      <div className="project-card__bar">
        <div className="project-card__row">
          <h2 className="project-card__title">{title}</h2>
          {label && <span className="project-card__label">{label}</span>}
        </div>
        <div className="project-card__row">
          <div className="project-card__description">{description}</div>
          {/* <div className="project-card__subline">{subline}</div> */}
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
