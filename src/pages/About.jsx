// Last updated: 3.4.0

import { usePageReadyController } from "../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../hooks/useNotifyWhenImagesLoaded";
import Container from "../components/Container";
import BlockReveal from "../components/BlockReveal";

const About = () => {
  const { notifyPageReady } = usePageReadyController();

  // This text-only route is ready after its destination layout commits.
  useNotifyWhenImagesLoaded(notifyPageReady);
  
  return (
    <>
      <Container>
        <section>
          <header>
            <h1>About Me</h1>
            <p className="subheading">Front-End Developer / UI Engineer / Designer</p>
          </header>

          <BlockReveal panel>
            <p className="tagline">From interface design to working UI</p>
            <p>My background spans visual design and front-end development. I build application UI, reusable systems, and CMS-driven sites with attention to responsive behavior and accessibility.</p>
            <p>I started by coding my own designs. I still enjoy the work most when I can connect design decisions with how an interface actually behaves.</p>
            <p>At Full Sail University, my work included Full Sail Online and internal application UI, followed by fullsail.edu and Craft CMS marketing properties. That work brought together shared components, front-end patterns, and content-team workflows.</p>
            <p>My current work includes React UI, Figma, GSAP, SVG, and Three.js, with a focus on browser-based interfaces and interactive tools.</p>
          </BlockReveal>

          <BlockReveal panel>
            <h2 className="tagline">Toolbox</h2>
            <p>I use these tools to connect design and implementation, with reusable components, clear styling, and interfaces that are straightforward to maintain.</p>
            {/* <p>From first sketch to final commit, I refine each idea until the interface feels right. I prototype clean, effective solutions that fit your stack.</p> */}
            <h3>Frontend</h3>
            <ul className="ul ul--grid">
              <li className="li">HTML / SCSS</li>
              <li className="li">GSAP / SVG</li>
              <li className="li">JavaScript (ES6+)</li>
              <li className="li">React (JSX)</li>
              <li className="li">Three.js (WebGL)</li>
            </ul>
            <h3>CMS &nbsp;/&nbsp; Front-End Integration</h3>
            <ul className="ul ul--grid">
              <li className="li">Drupal</li>
              <li className="li">WordPress</li>
              <li className="li">Shopify</li>
              <li className="li">Craft CMS</li>
            </ul>
            <h3>Design</h3>
            <ul className="ul ul--grid">
              <li className="li">Figma</li>
              <li className="li">Photoshop</li>
              <li className="li">GIMP</li>
              <li className="li">Illustrator</li>
              <li className="li">Inkscape</li>
            </ul>
          </BlockReveal>

          <BlockReveal panel>
            <p>See more details of my experience.</p>
            <div className="btn-group">
              <a href="/downloads/David-LaBar_Resume-2025.pdf" className="bfg-button" target="_blank" rel="noopener noreferrer">View Resume</a>
              <a href="https://www.linkedin.com/in/davidlabar/" className="bfg-button" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
            </div>
          </BlockReveal>
        </section>
      </Container>
    </>
  );
};

export default About;
