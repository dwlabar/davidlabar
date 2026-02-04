// Dreame.jsx
// -----------------------------------------------------------------------------

import React, { useState } from "react";
import { usePageReadyController } from "../../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../../hooks/useNotifyWhenImagesLoaded";
import Container from "../../components/Container";
import BlockReveal from "../../components/BlockReveal";
import Modal from "../../components/Modal";
import "../../styles/components/_image.scss";

import Dreame01 from "../../assets/projects/Dreame/Dreame_Generation-Cloud.jpg";
import Dreame02 from "../../assets/projects/Dreame/Dreame_Genesis.jpg";
import Dreame03 from "../../assets/projects/Dreame/Dreame_Magic-Carpet.jpg";
import Dreame04 from "../../assets/projects/Dreame/Dreame_Power-of-Three.jpg";
import Dreame05 from "../../assets/projects/Dreame/Dreame_Together.jpg";

// -----------------------------------------------------------------------------
// Dreame component
// -----------------------------------------------------------------------------

const Dreame = () => {
  const { notifyPageReady } = usePageReadyController();
  useNotifyWhenImagesLoaded(notifyPageReady);
  const [modalData, setModalData] = useState(null);

  return (
    <Container>
      <section>
        {/* Page header */}
        <header>
          <h1>Dreame</h1>
          <p className="subheading">
            Comissioned Dream Art
          </p>
        </header>

        {/* Screenshot Row */}
        <BlockReveal>
          <div className="layout-row layout-row--margin-bottom">
            <div className="layout-cell">
              <button
                className="image image--16-9"
                onClick={() =>
                  setModalData({
                    src: Dreame01,
                    alt: "Hero image from the Dreame site showing wetlands and water features, styled with overlay and type treatments to maximize visual impact from limited source photography.",
                  })
                }
              >
                <img
                  src={Dreame01}
                  alt="Hero image from the Dreame site showing wetlands and water features, styled with overlay and type treatments to maximize visual impact from limited source photography."
                />
              </button>
            </div>
          </div>
        </BlockReveal>

        {/* Screenshot Row */}
        <BlockReveal>
          <div className="layout-row layout-row--2 layout-row--margin-bottom">
            <div className="layout-cell">
              <button
                className="image image--1-1"
                onClick={() =>
                  setModalData({
                    src: Dreame02,
                    alt: "Hero image from the Dreame site showing wetlands and water features, styled with overlay and type treatments to maximize visual impact from limited source photography.",
                  })
                }
              >
                <img
                  src={Dreame02}
                  alt="Hero image from the Dreame site showing wetlands and water features, styled with overlay and type treatments to maximize visual impact from limited source photography."
                />
              </button>
            </div>
          </div>
        </BlockReveal>

        {/* Screenshot Row */}
        <BlockReveal>
          <div className="layout-row layout-row--margin-bottom">
            <div className="layout-cell">
              <button
                className="image image--16-9"
                onClick={() =>
                  setModalData({
                    src: Dreame03,
                    alt: "Hero image from the Dreame site showing wetlands and water features, styled with overlay and type treatments to maximize visual impact from limited source photography.",
                  })
                }
              >
                <img
                  src={Dreame03}
                  alt="Hero image from the Dreame site showing wetlands and water features, styled with overlay and type treatments to maximize visual impact from limited source photography."
                />
              </button>
            </div>
          </div>
        </BlockReveal>

        {/* Screenshot Row */}
        <BlockReveal>
          <div className="layout-row layout-row--margin-bottom">
            <div className="layout-cell">
              <button
                className="image image--16-9"
                onClick={() =>
                  setModalData({
                    src: Dreame04,
                    alt: "Hero image from the Dreame site showing wetlands and water features, styled with overlay and type treatments to maximize visual impact from limited source photography.",
                  })
                }
              >
                <img
                  src={Dreame04}
                  alt="Hero image from the Dreame site showing wetlands and water features, styled with overlay and type treatments to maximize visual impact from limited source photography."
                />
              </button>
            </div>
          </div>
        </BlockReveal>

        {/* Decades of Maintenance */}
        <BlockReveal panel title="Decades of Maintenance">
          <p>
            Dreame handed me a printed brochure, a logo, and a handful of low-res photos.
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

export default Dreame;
