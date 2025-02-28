import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SVGExamples from "./pages/SVG-Examples";
import PreloaderTest from "./pages/Preloader-Test";
import DevPanel from "./components/DevPanel";

// Import components
import NavBar from "./components/NavBar"

const App = () => {
  return (
    <Router>
      <>
        {/* Add a navigation bar */}
        <NavBar />

        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/SVG-Examples" element={<SVGExamples />} />
          <Route path="/Preloader-Test" element={<PreloaderTest />} />
        </Routes>

        {/* Developer Panel */}
        <DevPanel />
      </>
    </Router>
  );
};

export default App;
