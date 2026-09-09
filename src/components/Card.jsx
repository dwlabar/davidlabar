// Last updated: 3.2.1

import "../styles/components/_card.scss";

const Card = ({ children, className = "" }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

export default Card;