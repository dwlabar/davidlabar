import React from "react";
import "../styles/components/_panel.scss";

const Panel = ({ children }) => {
  return <div className="panel">{children}</div>;
};

export default Panel;