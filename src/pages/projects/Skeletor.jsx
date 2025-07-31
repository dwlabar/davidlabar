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

import skeletorWeAreDifferent from "../../assets/projects/skeletor/full-sail-we-are-different.jpg";
import skeletorFabricator from "../../assets/projects/skeletor/full-sail-fabricator.jpg";
import skeletorMobileMenu from "../../assets/projects/skeletor/full-sail-mobile-menu.jpg";

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
          <h1>Skeletor</h1>
          <p className="subheading">
            A modular front end system I built and maintained at Full Sail University
            from 2013 to 2023
          </p>
        </header>

        {/* What It Was */}
        <BlockReveal panel title="What It Was">
          <p>
            Skeletor began as a SCSS and JavaScript design system that replaced a
            bloated Bootstrap fork inside the Full Sail Online learning platform
            (LMS). Over a decade it became the shared foundation powering
            multiple properties:
          </p>
          <ul className="ul ul--grid">
            <li className="li">fullsail.edu</li>
            <li className="li">Full Sail Armada</li>
            <li className="li">Full Sail Labs</li>
            <li className="li">Full Sail Online (LMS)</li>
            <li className="li">Hall of Fame</li>
            <li className="li">Monarch Initiative</li>
          </ul>
        </BlockReveal>

        <BlockReveal>
          <button 
            className="aspect-16-9" 
            onClick={() =>
              setModalData({
                src: skeletorWeAreDifferent,
                alt:
                  "Responsive full-width hero section from the Full Sail University site, built using the Skeletor design system. Features a layered 3D 'DREAM' sign with backlit panels and subtle depth, overlaid by a translucent gradient and white headline text. Navigation includes a flexible top bar with dropdown menus and global utility links, styled for clarity and hierarchy.",
              })
            }
            >
            <img
              src={skeletorWeAreDifferent}
              alt="Responsive full-width hero section from the Full Sail University site, built using the Skeletor design system. Features a layered 3D 'DREAM' sign with backlit panels and subtle depth, overlaid by a translucent gradient and white headline text. Navigation includes a flexible top bar with dropdown menus and global utility links, styled for clarity and hierarchy."
              className="aspect-16-9__image"
            />
          </button>
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

        {/* Live Docs for Non Devs */}
        <BlockReveal panel title="Live Docs for Non Devs">
          <p>
            Fabricator stayed current with every component. Each entry showed the
            rendered view beside its markup. Producers pasted those snippets into
            Craft and shipped full pages in hours instead of waiting in the dev queue.
          </p>
        </BlockReveal>

        <BlockReveal>
          <button 
            className="aspect-16-9" 
            onClick={() =>
              setModalData({
                src: skeletorFabricator,
                alt:
                  "Responsive full-width hero section from the Full Sail University site, built using the Skeletor design system. Features a layered 3D 'DREAM' sign with backlit panels and subtle depth, overlaid by a translucent gradient and white headline text. Navigation includes a flexible top bar with dropdown menus and global utility links, styled for clarity and hierarchy.",
              })
            }
            >
            <img
              src={skeletorFabricator}
              alt="Responsive full-width hero section from the Full Sail University site, built using the Skeletor design system. Features a layered 3D 'DREAM' sign with backlit panels and subtle depth, overlaid by a translucent gradient and white headline text. Navigation includes a flexible top bar with dropdown menus and global utility links, styled for clarity and hierarchy."
              className="aspect-16-9__image"
            />
          </button>
        </BlockReveal>

        {/* Universal Naming */}
        <BlockReveal panel title="Universal Naming">
          <p>
            Component classes adopt a universal, descriptive naming convention across
            all Full Sail properties, eliminating the need for any site-specific prefixes.
          </p>
        </BlockReveal>

        {/* Code Philosophy */}
        <BlockReveal panel title="Code Philosophy">
          <ul className="ul ul--grid">
            <li className="li">No use of !important</li>
            <li className="li">Accessible states by default</li>
            <li className="li">Responsive mixins and utilities</li>
          </ul>
        </BlockReveal>

        {/* Semantic Navigation Without Duplication */}
        <BlockReveal panel title="Semantic Navigation Without Duplication">
          <p>
            A single semantic menu adapts to mobile layouts using pure CSS. It
            requires no duplicate markup, remains fully keyboard accessible, and
            delivers a smooth, snappy animation with no GPU hacks.
          </p>
        </BlockReveal>

        <BlockReveal>
          <button 
            className="aspect-16-9" 
            onClick={() =>
              setModalData({
                src: skeletorMobileMenu,
                alt:
                  "Responsive full-width hero section from the Full Sail University site, built using the Skeletor design system. Features a layered 3D 'DREAM' sign with backlit panels and subtle depth, overlaid by a translucent gradient and white headline text. Navigation includes a flexible top bar with dropdown menus and global utility links, styled for clarity and hierarchy.",
              })
            }
            >
            <img
              src={skeletorMobileMenu}
              alt="Responsive full-width hero section from the Full Sail University site, built using the Skeletor design system. Features a layered 3D 'DREAM' sign with backlit panels and subtle depth, overlaid by a translucent gradient and white headline text. Navigation includes a flexible top bar with dropdown menus and global utility links, styled for clarity and hierarchy."
              className="aspect-16-9__image"
            />
          </button>
        </BlockReveal>

        {/* Tools Used */}
        <BlockReveal panel title="Tools Used">
          <ul className="ul ul--grid">
            <li className="li">SCSS</li>
            <li className="li">Node.js & npm</li>
            <li className="li">Vanilla JavaScript</li>
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
        </BlockReveal>

        {/* See It Live */}
        <BlockReveal panel title="See It Live">
          <a
            href="https://www.fullsail.edu"
            className="bfg-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit fullsail.edu
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
