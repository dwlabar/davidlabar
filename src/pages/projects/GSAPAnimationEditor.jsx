// Last updated: 3.4.0

import { useState } from "react";
import { usePageReadyController } from "../../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../../hooks/useNotifyWhenImagesLoaded";
import Container from "../../components/Container";
import BlockReveal from "../../components/BlockReveal";
import Modal from "../../components/Modal";
import "../../styles/components/_image.scss";

import editorApp from "../../assets/projects/GSAPSVGAE/GSAPSVGAnimationEditor-app.webp";
import editorLogo from "../../assets/projects/GSAPSVGAE/GSAPSVGAnimationEditor-logo.webp";

const projectImages = [
  {
    src: editorApp,
    alt: "GSAP Animation Editor with selected SVG artwork, element properties, and keyframe tracks on the timeline.",
    label: "Enlarge editor screenshot",
  },
  {
    src: editorLogo,
    alt: "GSAP Animation Editor geometric white logo on a dark diagonal background.",
    label: "Enlarge logo artwork",
  },
];

const GSAPAnimationEditor = () => {
  const { notifyPageReady } = usePageReadyController();
  const [modalData, setModalData] = useState(null);

  // Both images form the opening showcase and settle before the route reveals.
  useNotifyWhenImagesLoaded(notifyPageReady, [editorApp, editorLogo]);

  return (
    <Container>
      <section>
        <header>
          <h1>GSAP Animation Editor</h1>
          <p className="subheading">A browser-based SVG animation editor built with React and GSAP.</p>
        </header>

        <BlockReveal>
          <div className="layout-row layout-row--2 layout-row--margin-bottom">
            {projectImages.map((image) => (
              <div className="layout-cell" key={image.src}>
                <button
                  type="button"
                  className="image image--1-1"
                  aria-label={image.label}
                  aria-haspopup="dialog"
                  onClick={() => setModalData(image)}
                >
                  <img src={image.src} alt={image.alt} />
                </button>
              </div>
            ))}
          </div>
        </BlockReveal>

        <BlockReveal panel title="What It Is">
          <p>I wanted a more visual way to animate SVG artwork, so I started building one. The editor lets me import my own SVGs, work with individual elements, and build animations on a timeline instead of writing everything by hand.</p>
          <p>It's still a work in progress as I'm continuing to add features as I go.</p>
        </BlockReveal>

        <BlockReveal panel title="Features">
          <div className="layout-row layout-row--2">
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Import SVG artwork and work with individual elements.</li>
                <li className="li">Build animations using keyframes.</li>
                <li className="li">Adjust keyframe timing and values.</li>
              </ul>
            </div>
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Preview animations as you work.</li>
                <li className="li">Save and reopen projects.</li>
              </ul>
            </div>
          </div>
        </BlockReveal>
      </section>

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

export default GSAPAnimationEditor;
