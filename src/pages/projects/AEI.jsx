// AEI.jsx
// -----------------------------------------------------------------------------

import React, { useState } from "react";
import { usePageReadyController } from "../../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../../hooks/useNotifyWhenImagesLoaded";
import Container from "../../components/Container";
import BlockReveal from "../../components/BlockReveal";
import Modal from "../../components/Modal";
import "../../styles/components/_image.scss";

import AEIHome from "../../assets/projects/AEI/AEI-home.jpg";

// -----------------------------------------------------------------------------
// AEI component
// -----------------------------------------------------------------------------

const AEI = () => {
  const { notifyPageReady } = usePageReadyController();
  useNotifyWhenImagesLoaded(notifyPageReady, [AEIHome]);
  const [modalData, setModalData] = useState(null);

  return (
    <Container>
      <section>
        {/* Page header */}
        <header>
          <h1>Andreyev Engineering</h1>
          <p className="subheading">A Drupal site built from scratch for a geotechnical engineering firm. Responsive, secure, and maintained across major Drupal upgrades through Drupal 10.</p>
        </header>

        {/* Hero Image */}
        <BlockReveal>
          <button
            className="image image--16-9"
            onClick={() =>
              setModalData({
                src: AEIHome,
                alt: "Hero image from the AEI site showing wetlands and water features, styled with overlay and type treatments to maximize visual impact from limited source photography.",
              })
            }
          >
            <img
              src={AEIHome}
              alt="Hero image from the AEI site showing wetlands and water features, styled with overlay and type treatments to maximize visual impact from limited source photography."
            />
          </button>
        </BlockReveal>

        {/* Starting Point */}
        <BlockReveal panel title="Starting Point">
          <p>AEI came to me with a logo, a printed brochure, and a small set of photography. The site needed to explain their services clearly, support contact requests, and give clients a secure way to access project documents.</p>
        </BlockReveal>

        {/* What I Did */}
        <BlockReveal panel title="What I Did">
          <div className="layout-row layout-row--2">
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Designed and built the original Drupal 6 site from scratch.</li>
                <li className="li">Created responsive layouts before that was a common client requirement.</li>
                <li className="li">Set up secure client logins using Drupal roles, permissions, and Views.</li>
              </ul>
            </div>
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Configured Webform contact workflows with spam protection.</li>
                <li className="li">Maintained and upgraded the site across major Drupal versions.</li>
                <li className="li">Coordinated updates and deployment details with their server team.</li>
              </ul>
            </div>
          </div>
        </BlockReveal>

        {/* Why It Held Up */}
        <BlockReveal panel title="Why It Held Up">
          <p>The site stayed manageable because the structure was kept simple and predictable. Content patterns, permissions, and responsive behavior were handled as part of the system instead of patched together page by page.</p>
          <p>That made the site easier to update, easier to hand off, and easier to keep alive through major CMS upgrades.</p>
        </BlockReveal>

        {/* Tools Used */}
        <BlockReveal panel title="Tools Used">
          <ul className="ul ul--grid">
            <li className="li">Drupal 6-10</li>
            <li className="li">Views, Webform, and Permissions modules</li>
            <li className="li">Semantic HTML + SCSS</li>
            <li className="li">Responsive design and media queries</li>
            <li className="li">Server coordination and deployment planning</li>
            <li className="li">Photoshop &amp; Illustrator</li>
          </ul>
        </BlockReveal>

        {/* See It Live */}
        <BlockReveal panel title="See It Live">
          <a
            href="https://www.andreyevengineering.com"
            className="bfg-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit andreyevengineering.com
          </a>
        </BlockReveal>
      </section>

      {/* Modal for image view */}
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

export default AEI;
