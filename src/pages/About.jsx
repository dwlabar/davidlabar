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
              Along the way, I've built frontend systems for dev teams, launched client sites end-to-end, and worked in everything from Flash games to audio production. My background spans both the visual and technical - from concept sketch to production code.
            </p>

            {/* <p>
              Along the way, I've built frontend systems for dev teams, launched client sites end-to-end, and worked in everything from Flash games to audio production. My background spans both the visual and technical - Photoshop to 3D Studio Max, ActionScript to JavaScript.
            </p> */}

            <p>
              This portfolio is part playground, part proof-of-skill. It reflects the mindset I bring to every project: build, test, refine, repeat.
            </p>

            {/* <p>
              This portfolio is part playground, part proof-of-skill. It reflects the mindset I bring to every project: curious, detail-obsessed, and always evolving.
            </p> */}

            <p>
              If you're looking for a hybrid thinker who can move fluidly between design and code, let's connect.
            </p>
          </Panel>

          <Panel>
            <h2 className="tagline">Toolbox</h2>
            <p>I sketch, code, and tinker until it clicks. Whatever tools your team's into, I prototype clean, effective solutions that fit your stack.</p>
            <h3>Frontend</h3>
            <ul className="ul">
              <li className="li">HTML / SCSS</li>
              <li className="li">GSAP / SVG</li>
              <li className="li">JavaScript (ES6+)</li>
              <li className="li">React (JSX)</li>
              <li className="li">Three.js (WebGL)</li>
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
              <li className="li">Photoshop</li>
              <li className="li">GIMP</li>
              <li className="li">Illustrator</li>
              <li className="li">Inkscape</li>
              <li className="li">Figma</li>
            </ul>
            <h3>Game &nbsp;/&nbsp; Interactive</h3>
            <ul className="ul">
              <li className="li">Godot</li>
              <li className="li">Lua / Roblox</li>
              <li className="li">Phaser</li>
            </ul>
          </Panel>

          <Panel>
            <h2 className="tagline">Resume & Links</h2>
            <p>If you'd like a deeper dive into my experience, here's a PDF of my resume and a link to my LinkedIn profile.</p>
            <ul>
              <li><a href="/downloads/David-LaBar_Resume-2025.pdf" target="_blank" rel="noopener noreferrer">Download Resume (PDF)</a></li>
              <li><a href="https://www.linkedin.com/in/your-profile/" target="_blank" rel="noopener noreferrer">View LinkedIn</a></li>
            </ul>
          </Panel>
        </section>
      </Container>
    </>
  );
};

export default About;
