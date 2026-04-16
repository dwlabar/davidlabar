// -----------------------------------------------------------------------------
// App.jsx (v0.0.1)
// -----------------------------------------------------------------------------

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Expertise from "./pages/Expertise";
import SVGExamples from "./pages/SVG-Examples";
import PreloaderTest from "./pages/Preloader-Test";
import Projects from "./pages/Projects";
import Skeletor from "./pages/projects/Skeletor";
import AEI from "./pages/projects/AEI";
import BeannikRoasters from "./pages/projects/BeannikRoasters";
import Dreame from "./pages/projects/Dreame";
import WestgateResorts from "./pages/projects/WestgateResorts";

// Import components
import DevPanel from "./components/DevPanel";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Overlay from "./components/Overlay";
import RouteTransitionListener from "./components/RouteTransitionListener";

// Updated nav links
const NavLinks = [
  { name: "Home", path: "/" },
  { name: "My Work", path: "/projects" },
  { name: "Expertise", path: "/expertise" },
  { name: "About", path: "/about" },
  { name: "Hire Me", path: "/contact" }
];

const App = () => {
  return (
    <Router>
      <NavBar links={NavLinks} />
      <Overlay />
      <RouteTransitionListener />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/skeletor" element={<Skeletor />} />
          <Route path="/projects/AEI" element={<AEI />} />
          <Route path="/projects/BeannikRoasters" element={<BeannikRoasters />} />
          <Route path="/projects/Dreame" element={<Dreame />} />
          <Route path="/projects/WestgateResorts" element={<WestgateResorts />} />
          <Route path="/SVG-Examples" element={<SVGExamples />} />
          <Route path="/Preloader-Test" element={<PreloaderTest />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
