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
            <p className="subheading">UX Engineer / Front-End Developer</p>
          </header>

          <Panel>
            <p className="tagline">Pixel Perfect Reliable Front-End</p>
            <p>
              I have built for the web since the early 2000s. I started with HTML, CSS, and Flash, then moved into SCSS, JavaScript frameworks, and component systems as the landscape evolved.
            </p>

            <p>
              Most of my work lives between design and front-end. I have launched client sites, built design systems, themed major CMS platforms, and learned new tools when projects required them without slowing the schedule.
            </p>

            <p>
              This site shows what I care about: structure, detail, and the way things feel when you use them.
            </p>
          </Panel>
          
          {/* <Panel>
            <p className="tagline">Designer &amp; developer with a deep toolkit and a passion for polish</p>
            <p>
              I've spent my career bridging design and development - starting with raw HTML and Flash in the early 2000s, growing through modular SCSS, JavaScript frameworks, and custom frontend systems.
            </p>

            <p>
              Along the way, I've built frontend systems for dev teams, launched client sites end-to-end, and worked in everything from Flash games to audio production. My background spans both the visual and technical - from concept sketch to production code.
            </p>

            <p>
              This portfolio is part playground, part proof-of-skill. It reflects the mindset I bring to every project: build, test, refine, repeat.
            </p>

            <p>
              If you're looking for a hybrid thinker who can move fluidly between design and code, let's connect.
            </p>
          </Panel> */}

          <Panel>
            <h2 className="tagline">Toolbox</h2>
            <p>From first sketch to final commit, I refine each idea until the interface feels right. I work with whatever tools your team prefers, delivering clean, reliable components that plug neatly into your stack.</p>
            {/* <p>I sketch, code, and tinker until it clicks. Whatever tools your team's into, I prototype clean, effective solutions that fit your stack.</p> */}
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
            <p>See more details of my experience.</p>
            <div className="btn-group">
              <a href="/downloads/David-LaBar_Resume-2025.pdf" className="bfg-button" target="_blank" rel="noopener noreferrer">View Resume</a>
              <a href="https://www.linkedin.com/in/davidlabar/" className="bfg-button" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
            </div>
          </Panel>
        </section>
      </Container>
    </>
  );
};

export default About;
