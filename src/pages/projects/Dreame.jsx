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
          <p className="subheading">Commissioned dream art created for the Dreame co-creation platform.</p>
        </header>

        {/* Hero Image */}
        <BlockReveal>
          <button
            className="image image--16-9"
            onClick={() =>
              setModalData({
                src: Dreame01,
                alt: "Commissioned dream artwork created for Dreame.",
              })
            }
          >
            <img src={Dreame01} alt="Commissioned dream artwork created for Dreame." />
          </button>
        </BlockReveal>

        {/* What It Was */}
        <BlockReveal panel title="What It Was">
          <p>Dreame is a platform where people submit personal dreamlike prompts and artists interpret them into original artwork. The work is commissioned and created to match a written concept rather than a marketing brief.</p>
        </BlockReveal>

        {/* What I Did */}
        <BlockReveal panel title="What I Did">
          <div className="layout-row layout-row--2">
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Created multiple commissioned pieces based on written prompts and themes.</li>
                <li className="li">Translated abstract ideas into clear visual composition with readable silhouettes.</li>
                <li className="li">Delivered polished final art in the formats required by the platform.</li>
              </ul>
            </div>
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Worked through revisions when needed to better match intent and tone.</li>
                <li className="li">Maintained consistency across multiple commissions while varying style and mood.</li>
                <li className="li">Balanced speed with quality since commissions were time-bound.</li>
              </ul>
            </div>
          </div>
        </BlockReveal>

        {/* Image Row */}
        <BlockReveal>
          <div className="layout-row layout-row--2 layout-row--margin-bottom">
            <div className="layout-cell">
              <button
                className="image image--1-1"
                onClick={() =>
                  setModalData({
                    src: Dreame02,
                    alt: "Commissioned dream artwork created for Dreame.",
                  })
                }
              >
                <img src={Dreame02} alt="Commissioned dream artwork created for Dreame." />
              </button>
            </div>
            <div className="layout-cell">
              <button
                className="image image--1-1"
                onClick={() =>
                  setModalData({
                    src: Dreame05,
                    alt: "Commissioned dream artwork created for Dreame.",
                  })
                }
              >
                <img src={Dreame05} alt="Commissioned dream artwork created for Dreame." />
              </button>
            </div>
          </div>
        </BlockReveal>

        {/* Process */}
        <BlockReveal panel title="Process">
          <p>The prompts were usually personal and specific, so the challenge was clarity. I would decide on the core idea first, then build composition and lighting around it so the final image read quickly while still feeling surreal and dreamlike.</p>
        </BlockReveal>

        {/* Image Row */}
        <BlockReveal>
          <div className="layout-row layout-row--2 layout-row--margin-bottom">
            <div className="layout-cell">
              <button
                className="image image--16-9"
                onClick={() =>
                  setModalData({
                    src: Dreame03,
                    alt: "Commissioned dream artwork created for Dreame.",
                  })
                }
              >
                <img src={Dreame03} alt="Commissioned dream artwork created for Dreame." />
              </button>
            </div>
            <div className="layout-cell">
              <button
                className="image image--16-9"
                onClick={() =>
                  setModalData({
                    src: Dreame04,
                    alt: "Commissioned dream artwork created for Dreame.",
                  })
                }
              >
                <img src={Dreame04} alt="Commissioned dream artwork created for Dreame." />
              </button>
            </div>
          </div>
        </BlockReveal>

        {/* Content Note */}
        <BlockReveal panel title="Content Note">
          <p>Some commissions for this platform included artistic nudity. I am only showing work here that is safe for a general portfolio site.</p>
        </BlockReveal>

        {/* Tools Used */}
        <BlockReveal panel title="Tools Used">
          <ul className="ul ul--grid">
            <li className="li">Digital illustration workflow</li>
            <li className="li">Photoshop</li>
            <li className="li">Image editing and finishing</li>
            <li className="li">Export for web and print formats</li>
          </ul>
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

export default Dreame;
