// BeannikRoasters.jsx
// -----------------------------------------------------------------------------

import React, { useState } from "react";
import { usePageReadyController } from "../../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../../hooks/useNotifyWhenImagesLoaded";
import Container from "../../components/Container";
import BlockReveal from "../../components/BlockReveal";
import Modal from "../../components/Modal";
import "../../styles/components/_image.scss";

import BeannikRoastersLabel from "../../assets/projects/BeanNikRoasters/beannik-roasters-label.webp";
import BeannikRoastersSite from "../../assets/projects/BeanNikRoasters/beannik-roasters-site.webp";
import BeannikRoastersLogo from "../../assets/projects/BeanNikRoasters/beannik-roasters-logo.webp";
import BeannikRoastersSite02 from "../../assets/projects/BeanNikRoasters/beannik-roasters-site-02.webp";

// -----------------------------------------------------------------------------
// BeannikRoasters component
// -----------------------------------------------------------------------------

const BeannikRoasters = () => {
  const { notifyPageReady } = usePageReadyController();
  useNotifyWhenImagesLoaded(notifyPageReady);
  const [modalData, setModalData] = useState(null);

  return (
    <Container>
      <section>
        {/* Page header */}
        <header>
          <h1>BeanNik Roasters</h1>
          <p className="subheading">Ongoing design and web support for a family-run coffee business. Logo, packaging labels, and multiple web and commerce iterations over the years.</p>
        </header>

        {/* Screenshot Row */}
        <BlockReveal>
          <div className="layout-row layout-row--2 layout-row--margin-bottom">
            <div className="layout-cell">
              <button
                className="image image--1-1"
                onClick={() =>
                  setModalData({
                    src: BeannikRoastersLabel,
                    alt: "BeanNik Coffee Co. label design with the acorn logo, product details, and packaging layout.",
                  })
                }
              >
                <img src={BeannikRoastersLabel} alt="BeanNik Coffee Co. label design with the acorn logo, product details, and packaging layout." />
              </button>
            </div>
            <div className="layout-cell">
              <button
                className="image image--1-1"
                onClick={() =>
                  setModalData({
                    src: BeannikRoastersSite02,
                    alt: "BeanNik Roasters website screenshot featuring a dark coffee-themed hero section and product tiles.",
                  })
                }
              >
                <img src={BeannikRoastersSite02} alt="BeanNik Roasters website screenshot featuring a dark coffee-themed hero section and product tiles." />
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
                    src: BeannikRoastersSite,
                    alt: "BeanNik Roasters website screenshot showing the coffee hero section and navigation.",
                  })
                }
              >
                <img src={BeannikRoastersSite} alt="BeanNik Roasters website screenshot showing the coffee hero section and navigation." />
              </button>
            </div>
            <div className="layout-cell">
              <button
                className="image image--1-1"
                onClick={() =>
                  setModalData({
                    src: BeannikRoastersLogo,
                    alt: "BeanNik Roasters acorn logo on a simple brown background.",
                  })
                }
              >
                <img src={BeannikRoastersLogo} alt="BeanNik Roasters acorn logo on a simple brown background." />
              </button>
            </div>
          </div>
        </BlockReveal>

        {/* What It Was */}
        <BlockReveal panel title="What It Was">
          <p>BeanNik is a small batch coffee business I have supported on and off since I graduated from Full Sail. I handled design and web needs as they came up over time rather than as one big project.</p>
          <p>The web presence evolved in stages. We started with a simple site, then added PayPal ordering, and later moved to a Shopify store. The most lasting value ended up being the logo and label system, plus the crops and variations used for social.</p>
        </BlockReveal>

        {/* What I Focused On */}
        <BlockReveal panel title="What I Focused On">
          <div className="layout-row layout-row--2">
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Make the logo and label system strong enough to carry the brand.</li>
                <li className="li">Keep layouts simple so content and ordering stayed obvious.</li>
              </ul>
            </div>
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Design for real printing and real constraints, not just mockups.</li>
                <li className="li">Iterate without overbuilding since the business did not live inside a website.</li>
              </ul>
            </div>
          </div>
        </BlockReveal>

        {/* What I Did */}
        <BlockReveal panel title="What I Did">
          <div className="layout-row layout-row--2">
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Designed and refined the BeanNik logo and supporting brand visuals.</li>
                <li className="li">Designed product labels and packaging layouts for different roasts.</li>
                <li className="li">Built multiple website iterations over the years as needs changed.</li>
              </ul>
            </div>
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Helped set up simple ordering flows, including PayPal ordering and a later move to Shopify.</li>
                <li className="li">Created promo and storefront graphics used across different platforms.</li>
                <li className="li">Kept the work lightweight and maintainable since usage was inconsistent.</li>
              </ul>
            </div>
          </div>
        </BlockReveal>

        {/* What This Shows About How I Work */}
        <BlockReveal panel title="What This Shows About How I Work">
          <p>This project highlights how I approach real constraints. I did not treat it like a portfolio piece. I treated it like support work that had to be useful for a small business that does not want to live inside tech.</p>
          <p>I focused effort where it mattered most. The label and logo improvements shipped, got reused, and stayed consistent across platforms, even when the website changed.</p>
        </BlockReveal>

        {/* Tools Used */}
        <BlockReveal panel title="Tools Used">
          <ul className="ul ul--grid">
            <li className="li">Photoshop</li>
            <li className="li">Illustrator</li>
            <li className="li">Inkscape</li>
            <li className="li">Semantic HTML + SCSS</li>
            <li className="li">Responsive layout</li>
            <li className="li">PayPal</li>
            <li className="li">Shopify</li>
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

export default BeannikRoasters;
