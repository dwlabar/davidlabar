import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SVGExamples from "./pages/SVG-Examples";
import PreloaderTest from "./pages/Preloader-Test";

// Import components
import DevPanel from "./components/DevPanel";
import NavBar from "./components/NavBar"

const NavLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" }
];

const App = () => {
  return (
    <Router>
      {/* Add a navigation bar */}
      <NavBar links={NavLinks} />

      {/* Main content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/SVG-Examples" element={<SVGExamples />} />
          <Route path="/Preloader-Test" element={<PreloaderTest />} />
        </Routes>
      </main>

      {/* Developer Panel (should be outside <main>) */}
      <DevPanel />
    </Router>
  );
};


export default App;
