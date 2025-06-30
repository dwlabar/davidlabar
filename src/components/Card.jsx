import React from "react";
import "../styles/components/_card.scss";

const Card = ({ children, className = "" }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

export default Card;