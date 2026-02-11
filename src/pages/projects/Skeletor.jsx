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
import skeletorFooter from "../../assets/projects/skeletor/full-sail-footer.jpg";

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
          <p className="subheading">A modular front end system I built and maintained at Full Sail University from 2013 to 2023</p>
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

        {/* Quick positioning */}
        <BlockReveal panel title="Why This Matters">
          <p>Skeletor is not just a set of styles. It is a shared UI layer that reduced drift across teams, properties, and content workflows. The goal was simple. People needed to ship pages and features without constantly re-solving the UI layer or breaking the system over time.</p>
          <p>The difference is not the framework. The difference is how it was structured, named, constrained, documented, and maintained so it stayed usable after years of redesigns and staff changes.</p>
        </BlockReveal>

        {/* What It Was */}
        <BlockReveal panel title="What It Was">
          <p>Skeletor began as a SCSS and JavaScript design system that replaced a bloated Bootstrap fork inside the Full Sail Online learning platform (LMS). Over a decade it became the shared foundation powering multiple properties and workflows:</p>
          <ul className="ul ul--grid">
            <li className="li">fullsail.edu</li>
            <li className="li">Full Sail Armada</li>
            <li className="li">Full Sail Labs</li>
            <li className="li">Full Sail Online (LMS)</li>
            <li className="li">Hall of Fame</li>
            <li className="li">Monarch Initiative</li>
          </ul>
          <p>The hard part was not building components. The hard part was keeping one system stable across multiple codebases, multiple teams, and multiple publishing paths without it turning into a pile of exceptions.</p>
        </BlockReveal>

        <BlockReveal>
          <button
            className="image image--16-9"
            onClick={() =>
              setModalData({
                src: skeletorFooter,
                alt: "Full Sail site hero built with Skeletor. Layered visual header, clear hierarchy, and a system-driven navigation layout.",
              })
            }
          >
            <img src={skeletorFooter} alt="Full Sail site hero built with Skeletor. Layered visual header, clear hierarchy, and a system-driven navigation layout." />
          </button>
        </BlockReveal>

        {/* The Real Constraints */}
        <BlockReveal panel title="The Real Constraints">
          <div className="layout-row layout-row--2">
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Multiple properties needed one shared UI language.</li>
                <li className="li">Design changes had to scale without breaking older pages.</li>
                <li className="li">Developers needed reusable templates, not one-off builds.</li>
              </ul>
            </div>
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Producers needed safe building blocks in Craft.</li>
                <li className="li">Accessibility and responsiveness had to be default behavior.</li>
                <li className="li">The system had to survive staff changes and redesign cycles.</li>
              </ul>
            </div>
          </div>
          <p>My focus was reducing risk. When a system is used by many people, small decisions determine whether it stays clean or becomes impossible to maintain.</p>
        </BlockReveal>

        {/* How I Operated */}
        <BlockReveal panel title="How I Operated">
          <p>My role was often the UI layer between backend work, design intent, and the reality of publishing systems. When those collided, I aimed for solutions that were consistent, teachable, and hard to misuse.</p>
          <div className="layout-row layout-row--2">
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Fix root causes in the system, not symptoms on a page.</li>
                <li className="li">Constrain variation so the system stays coherent.</li>
                <li className="li">Make the correct option the easiest option.</li>
              </ul>
            </div>
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Keep naming and structure obvious for future maintainers.</li>
                <li className="li">Treat accessibility as system behavior, not a checklist.</li>
                <li className="li">Document components so non devs can ship safely.</li>
              </ul>
            </div>
          </div>
        </BlockReveal>

        {/* BEM Methodology */}
        <BlockReveal panel title="BEM Methodology">
          <p>Every selector follows strict <strong>Block-Element-Modifier</strong> pattern. I avoid element selectors and global resets. Edge case tweaks live in component-specific _overrides.scss files, so overrides stay local and never leak across pages.</p>
          <p>This was not style preference. It was enforcement. When multiple teams touch the UI, selectors must be predictable or the system decays.</p>
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

        {/* Live Docs for Non Devs */}
        <BlockReveal panel title="Live Docs for Non Devs">
          <p>Fabricator stayed current with every component. Each entry showed the rendered view beside its markup. Producers pasted those snippets into Craft and shipped full pages in hours instead of waiting in the dev queue.</p>
          <p>The point was enablement without chaos. Documentation reduced one-off requests and kept output aligned to system rules.</p>
        </BlockReveal>

        {/* Universal Naming */}
        <BlockReveal panel title="Universal Naming">
          <p>Component classes adopt a universal, descriptive naming convention across all Full Sail properties, eliminating the need for any site-specific prefixes.</p>
          <p>Universal naming is about mental load. When people move between properties, the component language stays the same. That reduces drift and keeps changes predictable.</p>
        </BlockReveal>

        {/* Code Philosophy */}
        <BlockReveal panel title="Code Philosophy">
          <ul className="ul ul--grid">
            <li className="li">No use of !important</li>
            <li className="li">No global overrides that bleed across components</li>
            <li className="li">Overrides live next to the component that owns the edge case</li>
            <li className="li">Accessible states by default</li>
            <li className="li">Responsive mixins and utilities for consistent breakpoints</li>
            <li className="li">Components designed for reuse by developers and producers</li>
          </ul>
          <p>These rules exist to prevent a slow collapse into special cases. A UI system is only valuable if it stays maintainable after hundreds of changes.</p>
        </BlockReveal>

        {/* Decision Examples */}
        <BlockReveal panel title="Decision Examples">
          <p>These are the types of decisions I made repeatedly. Not flashy features. Small architectural choices that kept the UI layer stable for years.</p>
          <div className="layout-row layout-row--2">
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">When a designer wanted twenty button variations, I pushed for a small set of modifiers that covered the intent without fragmenting the component.</li>
                <li className="li">When a layout needed a one-off tweak, I contained it in the component override so it did not become a global rule.</li>
              </ul>
            </div>
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">When content teams needed speed, I invested in docs and markup patterns so they could ship safely without frontend.</li>
                <li className="li">When a bug appeared, I fixed the root cause in the system so the fix applied everywhere instead of patching a page.</li>
              </ul>
            </div>
          </div>
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

        {/* Semantic Navigation Without Duplication */}
        <BlockReveal panel title="Semantic Navigation Without Duplication">
          <p>A single semantic menu adapts to mobile layouts using pure CSS. It requires no duplicate markup, remains fully keyboard accessible, and delivers a smooth, snappy animation with no GPU hacks.</p>
          <p>This is not about showing off. It is about reducing future bugs. When desktop and mobile use the same structure, behavior stays aligned and fixes apply once.</p>
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
          <p>Tools changed over the years. The approach did not. Consistent naming, controlled variation, predictable overrides, and documentation that lets other people ship without breaking the system.</p>
        </BlockReveal>

        {/* Lasting Impact */}
        <BlockReveal panel title="Lasting Impact">
          <ul className="ul ul--grid">
            <li className="li">Used across more than 15 Full Sail properties</li>
            <li className="li">Survived multiple redesigns and staff changes</li>
            <li className="li">Cut page build time from two days to a few hours</li>
            <li className="li">Enabled 20+ non-developers to build layouts</li>
          </ul>
          <p>The impact is stability. When a system is built cleanly, teams move faster because they stop fighting the UI layer.</p>
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
