import React from "react";
import { usePageReadyController } from "../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../hooks/useNotifyWhenImagesLoaded";
import Container from "../components/Container";
import Panel from "../components/Panel";

const About = () => {
  const { notifyPageReady } = usePageReadyController();

  // Notify once all images on this page have finished loading
  useNotifyWhenImagesLoaded(notifyPageReady);
  
  return (
    <>
      <Container>
        <section>
          <header>
            <h1>David LaBar</h1>
            <p className="subheading">UX Engineer / Designer</p>
          </header>
          
          <Panel>
            <p className="tagline">Designer &amp; developer with a deep toolkit and a passion for polish</p>
            <p>
              I've spent my career bridging design and development - starting with raw HTML and Flash in the early 2000s, growing through modular SCSS, JavaScript frameworks, and custom frontend systems.
            </p>

            <p>
              Along the way, I've built frontend systems for dev teams, launched client sites end-to-end, and worked in everything from Flash games to audio production. My background spans both the visual and technical - Photoshop to 3D Studio Max, ActionScript to JavaScript.
            </p>

            <p>
              This portfolio is part playground, part proof-of-skill. It reflects the mindset I bring to every project: curious, detail-obsessed, and always evolving.
            </p>

            <p>
              If you're looking for a hybrid thinker who can move fluidly between design and code, let's connect.
            </p>
          </Panel>

          {/* <Panel>
            <p className="tagline">Front-end engineer and UX problem-solver with a passion for polish.</p>
            <p>I've spent my career bridging design and development - starting with raw HTML and Flash in the early 2000s, growing through modular SCSS, JavaScript frameworks, and custom frontend systems.</p>
            <p>At Full Sail University, I built a design system from scratch: a "Bootstrap-plus" toolkit that powered their LMS and every marketing page across fullsail.edu. I extended that system into custom Eloqua, Silverpop, and Shopify templates, keeping everything on-brand and production-ready.</p>
            <p>Today, I'm exploring real-time 3D with Three.js and modern React workflows, using this portfolio site as a hands-on project to push my skills forward.</p>
            <p>Whether it's scalable SCSS architecture, UI animation with GSAP, semantic markup, or component-driven builds, I bring a detail-obsessed mindset and a commitment to clean, maintainable work.</p>
            <p>If you're looking for someone who can own the front end, collaborate smoothly with designers, and bridge the gap to back-end teams - let's connect.</p>
          </Panel> */}

          <Panel>
            <h2 className="tagline">How I Build</h2>
            <p>A quick look at the stack that powers this site.</p>
            <h3>Core Frontend</h3>
            <ul className="ul">
              <li className="li">HTML / SCSS</li>
              <li className="li">JavaScript (ES6+)</li>
              <li className="li">React / JSX</li>
              <li className="li">GSAP + Three.js</li>
            </ul>
            <h3>Build &nbsp;/&nbsp; Workflow</h3>
            <ul className="ul">
              <li className="li">npm</li>
              <li className="li">Vite</li>
              <li className="li">Git</li>
            </ul>
            <h3>Backend &nbsp;/&nbsp; CMS</h3>
            <ul className="ul">
              <li className="li">Drupal</li>
              <li className="li">Wordpress</li>
              <li className="li">Shopify</li>
              <li className="li">Craft</li>
              <li className="li">Node.js</li>
            </ul>
            <h3>Design</h3>
            <ul className="ul">
              <li className="li">Photoshop / GIMP</li>
              <li className="li">Illustrator / Inkscape</li>
              <li className="li">After Effects / Kdenlive</li>
              <li className="li">Figma / Sketch / XD</li>
            </ul>
            <h3>Game &nbsp;/&nbsp; Interactive</h3>
            <ul className="ul">
              <li className="li">Godot</li>
              <li className="li">Lua / Roblox</li>
              <li className="li">Phaser</li>              
            </ul>
            <p>Rapid tool-adoption: I spin up, prototype, and learn whatever the team throws next.</p>
          </Panel>
        </section>
      </Container>
    </>
  );
};

export default About;
