import React from "react";
import { useEffect } from "react";
import { usePageReadyController } from "../context/PageReadyContext";
import Container from "../components/Container";
import Panel from "../components/Panel";

const About = () => {
  const { notifyPageReady } = usePageReadyController();

  useEffect(() => {
    // Wait for Three.js or assets or animation to complete
    const handle = requestAnimationFrame(() => {
      notifyPageReady();
    });

    return () => cancelAnimationFrame(handle);
  }, [notifyPageReady]);
  
  return (
    <>
      <Container>
        <section className="content-block">
          <h1>David LaBar<span className="subheading">UX Engineer / Designer</span></h1>
          <Panel>
            <p className="tagline">Designer &amp; developer with a deep toolkit and a passion for polish</p>
            <p>
              I've spent my career bridging the gap between design and development—starting with HTML and CSS in the early 2000s, evolving through Ruby and React, and now exploring real-time 3D with Three.js.
            </p>

            <p>
              Along the way, I've built frontend systems for dev teams, launched client sites end-to-end, and worked in everything from Flash games to audio production. My background spans both the visual and technical—Photoshop to Maya, ActionScript to JavaScript.
            </p>

            <p>
              This portfolio is part playground, part proof-of-skill. It reflects the mindset I bring to every project: curious, detail-obsessed, and always evolving.
            </p>

            <p>
              If you're looking for a hybrid thinker who can move fluidly between design and code, let's connect.
            </p>
          </Panel>

          <Panel>
            <p className="tagline">My Toolbox</p>
            <p>Not a complete list by any means but here are my favorites.</p>
            <ul className="ul">
              <li className="li">HTML / SCSS</li>
              <li className="li">JavaScript (ES6+)</li>
              <li className="li">React / JSX</li>
              <li className="li">Three.js / WebGL</li>
              <li className="li">GSAP / SVG</li>
              <li className="li">Node.js</li>
              <li className="li">Git</li>
              <li className="li">Drupal</li>
              <li className="li">Wordpress</li>
              <li className="li">Craft</li>
              <li className="li">Shopify</li>
              <li className="li">Photoshop / GIMP</li>
              <li className="li">Illustrator / Inkscape</li>
              <li className="li">After Effects / Kdenlive</li>
              <li className="li">Pulsar</li>
              <li className="li">Lua / Roblox</li>
              <li className="li">Godot</li>
              <li className="li">Python</li>
            </ul>
          </Panel>
          <Panel>
            <p className="tagline">The Vault</p>
            <p>Let's take a trip down memory lane. Oldies but goodies!</p>
            <ul className="ul">
              <li className="li">Flash / ActionScript</li>
              <li className="li">jQuery</li>
              <li className="li">Bootstrap</li>
              <li className="li">Foundation</li>
              <li className="li">Subversion</li>
              <li className="li">Fireworks</li>
              <li className="li">Dreamweaver</li>
              <li className="li">Director / Shockwave 3D</li>
              <li className="li">IE6</li>
              <li className="li">Table Layouts</li>
              <li className="li">Lightwave</li>
              <li className="li">Maya</li>
              <li className="li">Fruity Loops</li>
              <li className="li">Corel Draw</li>
              <li className="li">Lightwave</li>
              <li className="li">Maya</li>
              <li className="li">Fruity Loops</li>
              <li className="li">Corel Draw</li>
            </ul>
          </Panel>

          {/* <Panel>
            <p className="tagline">Folks I have worked with:</p>
            <div className="layout-row layout-row--3">
              <div className="layout-cell">
                <ul className="ul">
                  <li className="li">Andreyev Engineering Inc</li>
                  <li className="li">Nabavi Construction</li>
                  <li className="li">Florida Hospital (Advent Health)</li>
                  <li className="li">Full Sail University</li>
                </ul>
              </div>
              <div className="layout-cell">
                <ul className="ul">
                  <li className="li">Doc Rivers</li>
                  <li className="li">Jan Stephenson Golf</li>
                  <li className="li">Audiovoid</li>
                  <li className="li">Other Machines</li>
                </ul>
              </div>
              <div className="layout-cell">
                <ul className="ul">
                  <li className="li">Beannik Coffee Company</li>
                  <li className="li">Brainwave Entertainment</li>
                  <li className="li">C&amp;B Properties</li>
                  <li className="li">Dreame</li>
                </ul>
              </div>
            </div>
          </Panel> */}
        </section>
      </Container>
    </>
  );
};

export default About;
