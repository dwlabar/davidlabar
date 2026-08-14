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
  useNotifyWhenImagesLoaded(notifyPageReady, [
    BeannikRoastersLabel,
    BeannikRoastersSite02,
  ]);
  const [modalData, setModalData] = useState(null);

  return (
    <Container>
      <section>
        {/* Page header */}
        <header>
          <h1>BeanNik Roasters</h1>
          <p className="subheading">Long-running design and web support for a small coffee business. Logo, labels, site updates, and simple commerce workflows.</p>
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
          <p>BeanNik is a small batch coffee business I have supported on and off since I graduated from Full Sail. The work changed over time depending on what the business needed.</p>
          <p>I handled the logo, product labels, website updates, ordering flows, and reusable graphics for social and storefront use. It was not one giant project. It was practical support over a long stretch of time.</p>
        </BlockReveal>

        {/* What I Did */}
        <BlockReveal panel title="What I Did">
          <div className="layout-row layout-row--2">
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Designed and refined the BeanNik logo and supporting brand visuals.</li>
                <li className="li">Created product label layouts for different roasts and packaging needs.</li>
                <li className="li">Built and updated website iterations as the business changed.</li>
              </ul>
            </div>
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Set up simple ordering flows, including PayPal and a later Shopify store.</li>
                <li className="li">Prepared graphics for social, storefront, and promotional use.</li>
                <li className="li">Kept the work lightweight so it was useful without becoming overbuilt.</li>
              </ul>
            </div>
          </div>
        </BlockReveal>

        {/* How I Approached It */}
        <BlockReveal panel title="How I Approached It">
          <p>The goal was not to make the most complex website possible. The goal was to make the parts that mattered work well: the logo, the label system, the product presentation, and the basic path to ordering coffee.</p>
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
