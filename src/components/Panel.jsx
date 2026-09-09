// Last updated: 3.2.1

import { forwardRef } from "react";
import "../styles/components/_panel.scss";

const Panel = forwardRef(({ children, ...props }, ref) => {
  return (
    <div className="panel" ref={ref} {...props}>
      {children}
    </div>
  );
});

Panel.displayName = "Panel";

export default Panel;
