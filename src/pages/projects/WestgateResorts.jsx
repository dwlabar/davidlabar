// WestgateResorts.jsx
// -----------------------------------------------------------------------------

import React, { useState } from "react";
import { usePageReadyController } from "../../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../../hooks/useNotifyWhenImagesLoaded";
import Container from "../../components/Container";
import BlockReveal from "../../components/BlockReveal";
import Modal from "../../components/Modal";
import "../../styles/components/_image.scss";

import westgateCome2Orlando from "../../assets/projects/WestgateResorts/westgate-resorts_come-2-orlando.png";
import westgateEmail from "../../assets/projects/WestgateResorts/westgate-resorts_email.png";
import westgateLogoGreen from "../../assets/projects/WestgateResorts/westgate-resorts_logo-green.png";
import westgateMyrtleBeach from "../../assets/projects/WestgateResorts/westgate-resorts_myrtle-beach-vacation-store.png";
import westgateNationalCruiseTours from "../../assets/projects/WestgateResorts/westgate-resorts_national-cruise-tours.png";
import westgateReferral from "../../assets/projects/WestgateResorts/westgate-resorts_referral.png";
import westgateSite from "../../assets/projects/WestgateResorts/westgate-resorts_site.jpg";
import westgateTravelEventGuide from "../../assets/projects/WestgateResorts/westgate-resorts_travel-event-guide.png";

// -----------------------------------------------------------------------------
// WestgateResorts component
// -----------------------------------------------------------------------------

const WestgateResorts = () => {
  const { notifyPageReady } = usePageReadyController();
  useNotifyWhenImagesLoaded(notifyPageReady);
  const [modalData, setModalData] = useState(null);

  return (
    <Container>
      <section>
        {/* Page header */}
        <header>
          <h1>Westgate Resorts</h1>
          <p className="subheading">Internet marketing, owner referral, and high-volume web production.</p>
        </header>

        <BlockReveal>
          <div className="layout-row layout-row--2 layout-row--margin-bottom">
            <div className="layout-cell">
              <button
                className="image image--16-9"
                onClick={() =>
                  setModalData({
                    src: westgateCome2Orlando,
                    alt: "Westgate Resorts Come 2 Orlando vacation site.",
                  })
                }
              >
                <img src={westgateCome2Orlando} alt="Westgate Resorts Come 2 Orlando vacation site." />
              </button>
            </div>
            <div className="layout-cell">
              <button
                className="image image--16-9"
                onClick={() =>
                  setModalData({
                    src: westgateSite,
                    alt: "Westgate Resorts vacation marketing site.",
                  })
                }
              >
                <img src={westgateSite} alt="Westgate Resorts vacation marketing site." />
              </button>
            </div>
          </div>
        </BlockReveal>

        {/* What It Was */}
        <BlockReveal panel title="What It Was">
          <p>I worked for two departments at the same time at Westgate: Internet Marketing and Owner Referral. Most of my day-to-day work was tied to Internet Marketing, where I designed and built resort sites, vacation offer pages, landing pages, banners, and emails under very fast deadlines.</p>
          <p>A lot of it was aggressive marketing work and high-volume production. Not the kind of work I would make today, but it shows how much design and front-end work I was doing early on.</p>
        </BlockReveal>

        <BlockReveal>
          <div className="layout-row layout-row--2 layout-row--margin-bottom">
            <div className="layout-cell">
              <button
                className="image image--16-9"
                onClick={() =>
                  setModalData({
                    src: westgateMyrtleBeach,
                    alt: "Westgate Resorts Myrtle Beach vacation site.",
                  })
                }
              >
                <img src={westgateMyrtleBeach} alt="Westgate Resorts Myrtle Beach vacation site." />
              </button>
            </div>
            <div className="layout-cell">
              <button
                className="image image--16-9"
                onClick={() =>
                  setModalData({
                    src: westgateNationalCruiseTours,
                    alt: "Westgate Resorts National Cruise Tours site.",
                  })
                }
              >
                <img src={westgateNationalCruiseTours} alt="Westgate Resorts National Cruise Tours site." />
              </button>
            </div>
          </div>
        </BlockReveal>

        {/* What I Did */}
        <BlockReveal panel title="What I Did">
          <div className="layout-row layout-row--2">
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Designed and coded vacation sites, resort sites, landing pages, and email campaigns.</li>
                <li className="li">Worked with a copywriter and a ColdFusion developer. I handled the design, HTML, CSS, and JavaScript before handing work off when needed.</li>
                <li className="li">Designed logos for many of the marketing sites and offers.</li>
              </ul>
            </div>
            <div className="layout-cell">
              <ul className="ul">
                <li className="li">Built the HTML and CSS for a custom Owner Referral email system used by timeshare owners.</li>
                <li className="li">Created banners and landing pages for affiliate vendors and third parties.</li>
                <li className="li">Supported early SEO and A/B testing work as the team shifted away from relying only on paid traffic.</li>
              </ul>
            </div>
          </div>
        </BlockReveal>

        <BlockReveal>
          <div className="layout-row layout-row--2 layout-row--margin-bottom">
            <div className="layout-cell">
              <button
                className="image image--16-9"
                onClick={() =>
                  setModalData({
                    src: westgateEmail,
                    alt: "Westgate Resorts custom email system for Owner Referral.",
                  })
                }
              >
                <img src={westgateEmail} alt="Westgate Resorts custom email system for Owner Referral." />
              </button>
            </div>
            <div className="layout-cell">
              <button
                className="image image--16-9"
                onClick={() =>
                  setModalData({
                    src: westgateReferral,
                    alt: "Westgate Resorts referral marketing page.",
                  })
                }
              >
                <img src={westgateReferral} alt="Westgate Resorts referral marketing page." />
              </button>
            </div>
          </div>
        </BlockReveal>

        {/* Why I Am Showing It */}
        <BlockReveal panel title="Why I Am Showing It">
          <p>I am not showing this work because it looks current. I am showing it because it reflects the amount of design and front-end production I was doing at the time. It also shows the kind of speed and variety the job demanded.</p>
          <p>This was one of those roles where I had to figure things out fast, teach myself what I needed, and keep shipping.</p>
        </BlockReveal>

        <BlockReveal>
          <div className="layout-row layout-row--2 layout-row--margin-bottom">
            <div className="layout-cell">
              <button
                className="image image--16-9"
                onClick={() =>
                  setModalData({
                    src: westgateLogoGreen,
                    alt: "Westgate Green program logo.",
                  })
                }
              >
                <img src={westgateLogoGreen} alt="Westgate Green program logo." />
              </button>
            </div>
            <div className="layout-cell">
              <button
                className="image image--16-9"
                onClick={() =>
                  setModalData({
                    src: westgateTravelEventGuide,
                    alt: "Westgate Resorts Travel Event Guide site.",
                  })
                }
              >
                <img src={westgateTravelEventGuide} alt="Westgate Resorts Travel Event Guide site." />
              </button>
            </div>
          </div>
        </BlockReveal>

        {/* Tools Used */}
        <BlockReveal panel title="Tools Used">
          <ul className="ul ul--grid">
            <li className="li">HTML</li>
            <li className="li">CSS</li>
            <li className="li">JavaScript</li>
            <li className="li">Photoshop</li>
            <li className="li">Flash</li>
            <li className="li">ColdFusion workflow</li>
            <li className="li">Google Analytics</li>
            <li className="li">A/B testing</li>
          </ul>
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

export default WestgateResorts;