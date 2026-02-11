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
  useNotifyWhenImagesLoaded(notifyPageReady);
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
          <p>AEI provided a logo, a printed brochure, and a small set of photography. The goal was a professional web presence that clearly explained services, supported contact requests, and allowed clients to access project documents through secure logins.</p>
        </BlockReveal>

        {/* Why It Worked Long Term */}
        <BlockReveal panel title="Why It Worked Long Term">
          <p>This project stayed healthy because the site was built as a system, not a one-time design. I kept structure and permissions predictable, avoided brittle one-off hacks, and leaned on Drupal patterns that could survive upgrades and handoffs.</p>
        </BlockReveal>

        {/* What I Did */}
        <BlockReveal panel title="What I Did">
          <div className="layout-row layout-row--2">
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Designed and built the entire site in Drupal 6 from scratch.</li>
                <li className="li">Set up secure client logins using Roles and Views to show uploads.</li>
                <li className="li">Configured spam-resistant contact forms using Webform and extras.</li>
              </ul>
            </div>
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Upgraded and maintained the site across versions and is now on Drupal 10.</li>
                <li className="li">Made the site fully responsive years before most clients expected it.</li>
                <li className="li">Managed the project and coordinated with their server team.</li>
              </ul>
            </div>
          </div>
        </BlockReveal>

        {/* Approach */}
        <BlockReveal panel title="Approach">
          <div className="layout-row layout-row--2">
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Built reusable page and content patterns so new pages stayed consistent.</li>
                <li className="li">Kept permissions and access rules clear so client content stayed protected.</li>
              </ul>
            </div>
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Focused on predictable structure so updates and upgrades stayed manageable.</li>
                <li className="li">Made responsive behavior part of the system instead of per-page fixes.</li>
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
          onClose={() => setModalData(null)}
        />
      )}
    </Container>
  );
};

export default AEI;
