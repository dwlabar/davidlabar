import React from "react";
import "../styles/components/_container.scss";

const Container = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Container;
