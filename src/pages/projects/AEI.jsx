// Skeletor.jsx
// -----------------------------------------------------------------------------
// Project page for the Skeletor design system.
// Sections follow the user's confirmed outline and copy has been rewritten to
// match their voice. No em dash characters and no apostrophes are used.
// Code lines are unwrapped where practical so editors can control wrapping.
// -----------------------------------------------------------------------------

import React, { useState } from "react";
import { usePageReadyController } from "../../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../../hooks/useNotifyWhenImagesLoaded";
import Container from "../../components/Container";
import BlockReveal from "../../components/BlockReveal";
import Modal from "../../components/Modal";
import "../../styles/components/_image.scss";

import AEIHome from "../../assets/projects/AEI/AEI-home.jpg";
import skeletorFabricator from "../../assets/projects/skeletor/full-sail-fabricator.jpg";

// -----------------------------------------------------------------------------
// Skeletor component
// -----------------------------------------------------------------------------

const Skeletor = () => {
  const { notifyPageReady } = usePageReadyController();
  useNotifyWhenImagesLoaded(notifyPageReady);
  const [modalData, setModalData] = useState(null);

  return (
    <Container>
      <section>
        {/* Page header */}
        <header>
          <h1>Andreyev <br />Engineering Inc.</h1>
          <p className="subheading">
            Custom Drupal Website Spaning a Decade
          </p>
        </header>

        <BlockReveal>
          <div className="aspect-16-9">
            <img
              src={AEIHome}
              alt="Responsive full-width hero section from the Full Sail University site, built using the Skeletor design system. Features a layered 3D 'DREAM' sign with backlit panels and subtle depth, overlaid by a translucent gradient and white headline text. Navigation includes a flexible top bar with dropdown menus and global utility links, styled for clarity and hierarchy."
              onClick={() =>
                setModalData({
                  src: AEIHome,
                  alt:
                    "Responsive full-width hero section from the Full Sail University site, built using the Skeletor design system. Features a layered 3D 'DREAM' sign with backlit panels and subtle depth, overlaid by a translucent gradient and white headline text. Navigation includes a flexible top bar with dropdown menus and global utility links, styled for clarity and hierarchy.",
                })
              }
              className="aspect-16-9__image"
            />
          </div>
        </BlockReveal>

        {/* What It Was */}
        <BlockReveal panel title="What It Was">
          <p>
            Skeletor began as a SCSS and JavaScript design system that replaced a
            bloated Bootstrap fork inside the Full Sail Online learning platform
            (LMS). Over a decade it became the shared foundation powering
            multiple properties:
          </p>
          <ul className="ul">
            <li className="li">fullsail.edu</li>
            <li className="li">Full Sail Armada</li>
            <li className="li">Full Sail Labs</li>
            <li className="li">Full Sail Online (LMS)</li>
            <li className="li">Hall of Fame</li>
            <li className="li">Monarch Initiative</li>
          </ul>
        </BlockReveal>

        {/* BEM Methodology */}
        <BlockReveal panel title="BEM Methodology">
          <p>
            Every selector follows strict <strong>Block-Element-Modifier</strong> pattern.
            I avoid element selectors and global resets. Edge case tweaks live in
            component-specific _overrides.scss files, so overrides stay local and never
            leak across pages.
          </p>
        </BlockReveal>

        {/* See It Live */}
        <BlockReveal panel title="See It Live">
          <a
            href="https://www.andreyevengineering.com"
            className="bfg-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit AndreyevEngineering.com
          </a>
        </BlockReveal>
      </section>

      {/* Single Modal instance — opens when modalData is non-null */}
      {modalData && (
        <Modal
          src={modalData.src}
          alt={modalData.alt}
          caption={modalData.caption}
          onClose={() => setModalData(null)}
        />
      )}
    </Container>
  );
};

export default Skeletor;
