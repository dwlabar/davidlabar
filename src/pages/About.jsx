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
            <p className="subheading">Designing and Building for Over 20 Years</p>
          </header>

          <BlockReveal panel>
            <p className="tagline">From design to code</p>
            <p>I started out as a web designer, but I didn&apos;t want to stop at the mockup. I wanted to build what I designed. That eventually turned into a career working on both sides of the process.</p>
            <p>I spent about 10 years at Full Sail University, working on everything from Full Sail Online and internal applications to fullsail.edu and Craft CMS sites. A lot of that work involved building reusable components, keeping interfaces consistent, and making things easier for both users and content teams.</p>
            <p>These days I&apos;m exploring React, GSAP, SVG, and Three.js, and getting back to the kind of experimenting that got me interested in web design in the first place. I still enjoy the little details, whether it&apos;s getting a layout just right, making an interaction feel natural, or figuring out a better way to build something.</p>
          </BlockReveal>

          <BlockReveal panel>
            <h2 className="tagline">Toolbox</h2>
            <p>I use these tools to connect design and implementation, with reusable components, clear styling, and interfaces that are straightforward to maintain.</p>
            <h3>Frontend</h3>
            <ul className="ul ul--grid">
              <li className="li">HTML / SCSS</li>
              <li className="li">JavaScript (ES6+)</li>
              <li className="li">React (JSX)</li>
              <li className="li">GSAP / SVG</li>
              <li className="li">Three.js (WebGL)</li>
            </ul>
            <h3>CMS</h3>
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
              <li className="li">Illustrator</li>
              <li className="li">GIMP</li>
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
