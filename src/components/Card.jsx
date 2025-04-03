import React from "react";
import "../styles/components/_card.scss";

const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};

export default Card;