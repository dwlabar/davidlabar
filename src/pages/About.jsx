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
            <p className="tagline">Designer &amp; developer focused on polish and performance</p>
            <p>I'm David LaBar, a front-end specialist with 20 years of experience building everything from Shockwave casino games and CMS themes to React apps and design systems.</p>
            <p>I started by coding my own designs and still chase that level of precision in everything I build.</p>
            <p>At Full Sail University, I shaped the UI architecture for both their online learning platform and FullSail.edu, supporting thousands of students and faculty worldwide. I've also built design systems for marketing teams and shipped accessible sites for brands like Westgate Resorts and Purple Rock Scissors.</p>
            <p>If you need someone who can design it, build it, and obsess over the last 1%, I'm already thinking about edge cases.</p>
          </Panel>

          <Panel>
            <h2 className="tagline">Toolbox</h2>
            <p>From first sketch to final commit, I refine each idea until the interface feels right. I prototype clean, effective solutions that fit your stack.</p>
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
