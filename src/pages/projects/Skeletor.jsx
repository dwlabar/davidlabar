// Skeletor.jsx
// -----------------------------------------------------------------------------
// Project page for the Skeletor design system.
// Sections follow the user's confirmed outline and copy has been rewritten to
// match their voice. No em dash characters and no apostrophes are used.
// Code lines are unwrapped where practical so editors can control wrapping.
// -----------------------------------------------------------------------------

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageReadyController } from "../../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../../hooks/useNotifyWhenImagesLoaded";
import Container from "../../components/Container";
import Panel from "../../components/Panel";

import skeletorWeAreDifferent from "../../assets/projects/skeletor/full-sail-we-are-different.jpg";

gsap.registerPlugin(ScrollTrigger);

// 1. Move this data out of the component so it’s not re-created every render
const panelsData = [
  {
    title: "What It Was",
    content: (
      <>
        <img src={skeletorWeAreDifferent} alt="Responsive full-width hero section from the Full Sail University site, built using the Skeletor design system. Features a layered 3D 'DREAM' sign with backlit panels and subtle depth, overlaid by a translucent gradient and white headline text. Navigation includes a flexible top bar with dropdown menus and global utility links, styled for clarity and hierarchy."></img>
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
      </>
    ),
  },
  {
    title: "BEM Methodology",
    content: (
      <p>
        Every selector follows strict <strong>Block-Element-Modifier</strong> pattern. I avoid element selectors and global resets. Edge case tweaks live in component specific _overrides.scss files, so overrides stay local and never leak across pages.
      </p>
    ),
  },
  {
    title: "Live Docs for Non Devs",
    content: (
      <>
        <svg width="100%" height="150">
          <rect width="100%" height="150" fill="#ccc" />
        </svg>
        <p>
          Fabricator stayed current with every component. Each entry showed the rendered view beside its markup. Producers pasted those snippets into Craft and shipped full pages in hours instead of waiting in the dev queue.
        </p>
      </>
    ),
  },
  {
    title: "Universal Naming",
    content: (
      <p>
        Component classes adopt a universal, descriptive naming convention across all Full Sail properties, eliminating the need for any site-specific prefixes.
      </p>
    ),
  },
  {
    title: "Code Philosophy",
    content: (
      <ul className="ul">
        <li className="li">No use of !important</li>
        <li className="li">Accessible states by default</li>
        <li className="li">Responsive mixins and utilities</li>
      </ul>
    ),
  },
  {
    title: "Semantic Navigation Without Duplication",
    content: (
      <>
        <svg width="100%" height="150">
          <rect width="100%" height="150" fill="#aaa" />
        </svg>
        <p>
          A single semantic menu adapts to mobile layouts using pure CSS. It requires no duplicate markup, remains fully keyboard accessible, and delivers a smooth, snappy animation with no GPU hacks.
        </p>
      </>
    ),
  },
  {
    title: "Tools Used",
    content: (
      <ul className="ul">
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
    ),
  },
  {
    title: "Lasting Impact",
    content: (
      <ul className="ul">
        <li className="li">Used across more than 15 Full Sail properties</li>
        <li className="li">Survived multiple redesigns and staff changes</li>
        <li className="li">Cut page build time from two days to a few hours</li>
        <li className="li">Enabled 20+ non-developers to build layouts</li>
      </ul>
    ),
  },
  {
    title: "See It Live",
    content: (
      <a
        href="https://www.fullsail.edu"
        className="bfg-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit fullsail.edu
      </a>
    ),
  },
];

const Skeletor = () => {
  const { notifyPageReady } = usePageReadyController();
  useNotifyWhenImagesLoaded(notifyPageReady);

  // ref for container if you want to swap to gsap.context later
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    // Array to hold tweens so we can clean them up
    const tweens = panelsData.map((_, i) => {
      const panelEl = containerRef.current.querySelectorAll(".panel")[i];
      if (!panelEl) return null;

      return gsap.fromTo(
        panelEl,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panelEl,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      // kill individual tweens
      tweens.forEach((t) => t && t.kill());
      // kill all ScrollTriggers
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <Container>
      <section ref={containerRef}>
        <header>
          <h1>Skeletor</h1>
          <p className="subheading">
            A modular front end system I built and maintained at Full Sail University from 2013 to 2023
          </p>
        </header>

        {panelsData.map(({ title, content }) => (
          <Panel key={title} className="panel">
            <h2>{title}</h2>
            {content}
          </Panel>
        ))}
      </section>
    </Container>
  );
};

export default Skeletor;
