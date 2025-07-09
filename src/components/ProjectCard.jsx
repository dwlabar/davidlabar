import React from "react";
import useOverlayNavigate from "../hooks/useOverlayNavigate";

const ProjectCard = ({ title, description, path, logo, background, label }) => {
  const overlayNavigate = useOverlayNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    overlayNavigate(path);
  };

  return (
    <a className="project-card" style={{ backgroundImage: `url(${background})` }} onClick={handleClick}>
      {logo && (
        <div className="project-card__logo">
          <img src={logo} alt={`${title} logo`} />
        </div>
      )}
      <div className="project-card__bar">
        <h2 className="project-card__title">{title}</h2>
        {label && <span className="project-card__label">{label}</span>}
      </div>
      {/* <p className="project-card__desc">{description}</p> */}
      {/* <a href={path} className="bfg-button bfg-button--secondary" onClick={handleClick}>
        View Project
      </a> */}
    </a>
  );
};

export default ProjectCard;
