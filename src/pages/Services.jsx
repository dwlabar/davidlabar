import React from "react";
import { usePageReadyController } from "../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../hooks/useNotifyWhenImagesLoaded";
import useOverlayNavigate from "../hooks/useOverlayNavigate";
import Container from "../components/Container";
import Panel from "../components/Panel";
import Card from "../components/Card";
import IconDesign from "../components/IconDesign";
import IconDev from "../components/IconDev";
import IconCustom from "../components/IconCustom";

const Services = () => {
  const { notifyPageReady } = usePageReadyController();

  // Notify once all images on this page have finished loading
  useNotifyWhenImagesLoaded(notifyPageReady);

  const overlayNavigate = useOverlayNavigate();

  const handleClick = (e, path) => {
    e.preventDefault();
    overlayNavigate(path);
  };

  return (
    <>
      <Container>
        <header>
          <h1>What I Build</h1>
          <p className="subheading">
            I design and develop scalable systems, from single-page sites to enterprise frontends. Here's what I offer:
          </p>
        </header>

        <div className="card-grid">
          <Card>
            <div className="card__hero-image">
              {/* <img src="../src/assets/icon-design_isolated_01.webp" /> */}
              <IconDesign />
            </div>
            <div className="card__text">
              <h2 className="card__title">Design & UX</h2>
              <ul className="ul">
                <li className="li"><strong>UI/UX Design:</strong> Interfaces that balance clarity, intent, and flow.</li>
                <li className="li"><strong>Visual Design:</strong> Clean layouts, branded assets, and icon sets.</li>
                <li className="li"><strong>Motion & Interaction:</strong> Thoughtful transitions using GSAP and Three.js.</li>
                <li className="li"><strong>Illustration:</strong> Custom SVG and vector work tailored to your product.</li>
              </ul>
            </div>
          </Card>

          <Card>
            <div className="card__hero-image">
              {/* <img src="../src/assets/icon-development_isolated_01.webp" /> */}
              <IconDev />
            </div>
            <div className="card__text">
              <h2 className="card__title">Development</h2>
              <ul className="ul">
                <li className="li"><strong>Frontend Engineering:</strong> Semantic HTML, modular SCSS, and accessible.</li>
                <li className="li"><strong>React & JavaScript:</strong> Fast, interactive UI with a focus on performance and clarity.</li>
                <li className="li"><strong>CMS Integration:</strong> Custom themes for Drupal, Craft, WordPress, and Shopify.</li>
                <li className="li"><strong>Design Implementation:</strong> Pixel-accurate builds from Figma, XD, or Sketch.</li>
              </ul>
            </div>
          </Card>

          <Card>
            <div className="card__hero-image">
              {/* <img src="../src/assets/icon-custom_isolated_01.webp" /> */}
              <IconCustom />
            </div>
            <div className="card__text">
              <h2 className="card__title">Custom Systems</h2>
              <ul className="ul">
                <li className="li"><strong>Design Systems:</strong> Built for dev and content teams—scalable and modular.</li>
                <li className="li"><strong>Reusable Tools:</strong> Frameworks, templates, and live docs for long-term use.</li>
                <li className="li"><strong>Platform Customization:</strong> Admin panels, UI kits, and tailored workflows.</li>
                <li className="li"><strong>Campaign Systems:</strong> Email and landing page kits for non-dev teams.</li>
              </ul>
            </div>
          </Card>

          <Card className="card--extra">
            <div className="card__text">
              <h2 className="card__title">See how I build systems</h2>
            </div>
            <a href="/case-study/lms" className="bfg-button bfg-button--secondary">View Case Study</a>
          </Card>
        </div>

        <Panel>
          <p>Have a project in mind? Let's make it happen.</p>
          <a href="/contact" className="bfg-button" onClick={(e) => handleClick(e, "/contact")}>Let's Talk About It!</a>
        </Panel>
      </Container>
    </>
  );
};

export default Services;
