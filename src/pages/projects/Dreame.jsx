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
          <p className="subheading">Commissioned dream art based on written prompts and visual direction.</p>
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
          <p>Dreame was a co-creation platform where people submitted personal, dreamlike prompts and artists interpreted them into original artwork. The work was less about marketing polish and more about visual interpretation.</p>
        </BlockReveal>

        {/* What I Did */}
        <BlockReveal panel title="What I Did">
          <div className="layout-row layout-row--2">
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Created commissioned pieces from written prompts and themes.</li>
                <li className="li">Turned abstract ideas into readable compositions.</li>
                <li className="li">Used lighting, scale, and silhouette to make each piece read quickly.</li>
              </ul>
            </div>
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Adjusted pieces when needed to better match the requested tone.</li>
                <li className="li">Prepared final artwork for the platform requirements.</li>
                <li className="li">Balanced surreal subject matter with clear visual structure.</li>
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
          <p>I usually started by finding the core image inside the prompt. From there I built the composition around one clear read, then used detail and atmosphere to make it feel more dreamlike.</p>
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
