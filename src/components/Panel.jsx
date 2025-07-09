import React, { forwardRef } from "react";
import "../styles/components/_panel.scss";

const Panel = forwardRef(({ children, ...props }, ref) => {
  return (
    <div className="panel" ref={ref} {...props}>
      {children}
    </div>
  );
});

export default Panel;
