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

// -----------------------------------------------------------------------------
// AEI component
// -----------------------------------------------------------------------------

const AEI = () => {
  const { notifyPageReady } = usePageReadyController();
  useNotifyWhenImagesLoaded(notifyPageReady);
  const [modalData, setModalData] = useState(null);

  return (
    <Container>
      <section>
        {/* Page header */}
        <header>
          <h1>Andreyev Engineering</h1>
          <p className="subheading">
            A Drupal site built from scratch for a geotechnical engineering firm. Responsive, secure, and still going after more than a decade.
          </p>
        </header>

        {/* Hero Image */}
        <BlockReveal>
          <button
            className="aspect-16-9"
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
              className="aspect-16-9__image"
            />
          </button>
        </BlockReveal>

        {/* The Ask */}
        <BlockReveal panel title="The Ask">
          <p>
            AEI handed me a printed brochure, a logo, and a handful of low-res photos.
            They needed a professional web presence that clients could use to access
            documents and stay informed about their projects.
          </p>
        </BlockReveal>

        {/* What I Did */}
        <BlockReveal panel title="What I Did">
          <div className="layout-row layout-row--2">
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">
                  Designed and built the entire site in Drupal 6 from scratch.
                </li>
                <li className="li">
                  Set up secure client logins using Roles and Views to show uploads.
                </li>
                <li className="li">
                  Configured spam-resistant contact forms using Webform and extras.
                </li>
              </ul>
            </div>
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">
                  Upgraded and maintained the site across versions - now on Drupal 10.
                </li>
                <li className="li">
                  Made the site fully responsive years before most clients expected it.
                </li>
                <li className="li">
                  Managed the entire project and coordinated with their server team.
                </li>
              </ul>
            </div>
          </div>
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
          caption={modalData.caption}
          onClose={() => setModalData(null)}
        />
      )}
    </Container>
  );
};

export default AEI;
