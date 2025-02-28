import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/components/_dev-panel.scss";

const DevPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`dev-panel ${isOpen ? "open" : ""}`}>
      <button className="dev-panel-toggle" onClick={() => setIsOpen(!isOpen)}>
        Dev
      </button>
      {isOpen && (
        <div className="dev-panel-content">
          <h4>Test Pages</h4>
          <ul>
            <li><Link to="/svg-examples">SVG Examples</Link></li>
            <li><Link to="/preloader-test">Preloader Test</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DevPanel;
