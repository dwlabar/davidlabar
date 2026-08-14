// Skeletor.jsx
// -----------------------------------------------------------------------------
// Project page for the Skeletor design system.
// Copy tightened for V4 while keeping the existing component structure intact.
// -----------------------------------------------------------------------------

import React, { useState } from "react";
import { usePageReadyController } from "../../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../../hooks/useNotifyWhenImagesLoaded";
import Container from "../../components/Container";
import BlockReveal from "../../components/BlockReveal";
import Modal from "../../components/Modal";
import "../../styles/components/_image.scss";

import skeletorWeAreDifferent from "../../assets/projects/skeletor/full-sail-we-are-different.jpg";
import skeletorFabricator from "../../assets/projects/skeletor/full-sail-fabricator.jpg";
import skeletorMobileMenu from "../../assets/projects/skeletor/full-sail-mobile-menu.jpg";
import skeletorFooter from "../../assets/projects/skeletor/full-sail-footer.jpg";

// -----------------------------------------------------------------------------
// Skeletor component
// -----------------------------------------------------------------------------

const Skeletor = () => {
  const { notifyPageReady } = usePageReadyController();
  useNotifyWhenImagesLoaded(notifyPageReady, [skeletorWeAreDifferent]);
  const [modalData, setModalData] = useState(null);

  return (
    <Container>
      <section>
        {/* Page header */}
        <header>
          <h1>Skeletor</h1>
          <p className="subheading">A modular front-end system I built and maintained at Full Sail University from 2013 to 2023.</p>
        </header>

        <BlockReveal>
          <button
            className="image image--16-9"
            onClick={() =>
              setModalData({
                src: skeletorWeAreDifferent,
                alt: "Full Sail site hero built with Skeletor. Layered visual header, clear hierarchy, and a system-driven navigation layout.",
              })
            }
          >
            <img src={skeletorWeAreDifferent} alt="Full Sail site hero built with Skeletor. Layered visual header, clear hierarchy, and a system-driven navigation layout." />
          </button>
        </BlockReveal>

        {/* What It Was */}
        <BlockReveal panel title="What It Was">
          <p>Skeletor was the front-end system I built and maintained at Full Sail. It started in the Full Sail Online LMS as a cleaner replacement for a bloated Bootstrap fork, then later became the shared UI foundation for fullsail.edu and several related properties.</p>
          <p>The work was mostly SCSS, JavaScript, reusable components, Craft CMS templates, documentation, and a lot of cleanup around consistency.</p>
          <ul className="ul ul--grid">
            <li className="li">fullsail.edu</li>
            <li className="li">Full Sail Armada</li>
            <li className="li">Full Sail Labs</li>
            <li className="li">Full Sail Online LMS</li>
            <li className="li">Hall of Fame</li>
            <li className="li">Monarch Initiative</li>
          </ul>
        </BlockReveal>

        {/* What I Was Solving */}
        <BlockReveal panel title="What I Was Solving">
          <div className="layout-row layout-row--2">
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Multiple properties needed one shared UI language.</li>
                <li className="li">Design changes needed to scale without breaking older pages.</li>
                <li className="li">Developers needed reusable templates instead of one-off builds.</li>
              </ul>
            </div>
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Producers needed safe building blocks inside Craft.</li>
                <li className="li">Accessibility and responsive behavior needed to be built in.</li>
                <li className="li">The system had to survive redesigns, staff changes, and daily content work.</li>
              </ul>
            </div>
          </div>
        </BlockReveal>

        <BlockReveal>
          <button
            className="image image--16-9"
            onClick={() =>
              setModalData({
                src: skeletorFooter,
                alt: "Full Sail footer layout built with Skeletor components and shared front-end patterns.",
              })
            }
          >
            <img src={skeletorFooter} alt="Full Sail footer layout built with Skeletor components and shared front-end patterns." />
          </button>
        </BlockReveal>

        {/* What I Built */}
        <BlockReveal panel title="What I Built">
          <div className="layout-row layout-row--2">
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Reusable SCSS components using strict BEM naming.</li>
                <li className="li">Responsive layout patterns and shared breakpoints.</li>
                <li className="li">Navigation, buttons, cards, forms, media blocks, and content modules.</li>
              </ul>
            </div>
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Craft CMS templates that producers could use safely.</li>
                <li className="li">Fabricator documentation with rendered examples and markup.</li>
                <li className="li">JavaScript behavior that stayed reusable and easy to maintain.</li>
              </ul>
            </div>
          </div>
        </BlockReveal>

        {/* Technical Decisions */}
        <BlockReveal panel title="Technical Decisions">
          <div className="layout-row layout-row--2">
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Kept selectors predictable with Block-Element-Modifier structure.</li>
                <li className="li">Avoided global overrides that could leak across components.</li>
                <li className="li">Kept edge cases close to the component that owned them.</li>
              </ul>
            </div>
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Used shared naming across properties instead of site-specific prefixes.</li>
                <li className="li">Made accessibility and responsive behavior part of the base component work.</li>
                <li className="li">Fixed root issues in the system instead of patching single pages.</li>
              </ul>
            </div>
          </div>
        </BlockReveal>

        <BlockReveal>
          <button
            className="image image--16-9"
            onClick={() =>
              setModalData({
                src: skeletorFabricator,
                alt: "Fabricator documentation for Skeletor components. Live rendered examples next to copyable markup.",
              })
            }
          >
            <img src={skeletorFabricator} alt="Fabricator documentation for Skeletor components. Live rendered examples next to copyable markup." />
          </button>
        </BlockReveal>

        {/* Documentation and Publishing */}
        <BlockReveal panel title="Documentation and Publishing">
          <p>Fabricator stayed tied to the component work. Each entry showed a rendered example beside the markup, which made it easier for producers to build pages in Craft without waiting on a developer for every layout.</p>
          <p>That mattered because the system was used by more than developers. The documentation gave people a safe path to build with the system instead of inventing new one-off patterns.</p>
        </BlockReveal>

        <BlockReveal>
          <button
            className="image image--16-9"
            onClick={() =>
              setModalData({
                src: skeletorMobileMenu,
                alt: "Mobile navigation built from the same semantic markup as desktop. Layout adapts with CSS and keeps keyboard behavior intact.",
              })
            }
          >
            <img src={skeletorMobileMenu} alt="Mobile navigation built from the same semantic markup as desktop. Layout adapts with CSS and keeps keyboard behavior intact." />
          </button>
        </BlockReveal>

        {/* Navigation Example */}
        <BlockReveal panel title="Navigation Example">
          <p>One example was the main navigation. Desktop and mobile used the same semantic menu instead of duplicate markup. CSS handled the layout shift, and the keyboard behavior stayed intact.</p>
          <p>That kind of decision is not flashy, but it reduces future bugs. If the structure only exists once, fixes only need to happen once.</p>
        </BlockReveal>

        {/* Tools Used */}
        <BlockReveal panel title="Tools Used">
          <ul className="ul ul--grid">
            <li className="li">SCSS</li>
            <li className="li">Vanilla JavaScript</li>
            <li className="li">Node.js</li>
            <li className="li">Craft CMS</li>
            <li className="li">Gulp</li>
            <li className="li">Browsersync</li>
            <li className="li">Fabricator</li>
            <li className="li">IcoMoon</li>
            <li className="li">SiteImprove</li>
          </ul>
        </BlockReveal>

        {/* Lasting Impact */}
        <BlockReveal panel title="Lasting Impact">
          <ul className="ul ul--grid">
            <li className="li">Used across more than 15 Full Sail properties</li>
            <li className="li">Survived multiple redesigns and staff changes</li>
            <li className="li">Cut page build time from two days to a few hours</li>
            <li className="li">Enabled 20+ non-developers to build layouts</li>
          </ul>
          <p>Skeletor was valuable because it made the front-end layer more predictable. Teams could move faster because they were not fighting the same UI problems over and over.</p>
        </BlockReveal>

        {/* See It Live */}
        <BlockReveal panel title="See It Live">
          <a href="https://www.fullsail.edu" className="bfg-button" target="_blank" rel="noopener noreferrer">
            Visit fullsail.edu
          </a>
        </BlockReveal>
      </section>

      {/* Single Modal instance - opens when modalData is non-null */}
      {modalData && (
        <Modal
          src={modalData.src}
          alt={modalData.alt}
          onClose={() => setModalData(null)}
        />
      )}
    </Container>
  );
};

export default Skeletor;
