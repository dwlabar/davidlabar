import React from "react";
import { usePageReadyController } from "../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../hooks/useNotifyWhenImagesLoaded";
import Container from "../components/Container";
import Panel from "../components/Panel";
import Card from "../components/Card";

const Services = () => {
  const { notifyPageReady } = usePageReadyController();

  // Notify once all images on this page have finished loading
  useNotifyWhenImagesLoaded(notifyPageReady);

  return (
    <>
      <Container>
        <header>
          <h1>Services and Specialties</h1>
          <p className="subheading">I design, develop, and bring ideas to life through clean code and thoughtful design. Here's what I offer:</p>
        </header>        

        <div className="card-grid">
          <Card>
            <div className="card__hero-image">
              <img src="../src/assets/icon-design_isolated_01.webp" />
            </div>
            <div className="card__text">
              <h2 className="card__title">Design & UX</h2>
              <ul className="ul">
                <li className="li"><strong>UI/UX Design: </strong>Clear, user-centered experiences that balance form and function.</li>
                <li className="li"><strong>Visual Design: </strong>Clean layouts, custom branding, and scalable design assets.</li>
                <li className="li"><strong>Motion & Interaction: </strong>Subtle animations and transitions that enhance flow.</li>
                <li className="li"><strong>Illustration: </strong>Custom artwork and iconography tailored to your brand.</li>
              </ul>
            </div>
          </Card>

          <Card>
            <div className="card__hero-image">
              <img src="../src/assets/icon-development_isolated_01.webp" />
            </div>
            <div className="card__text">
              <h2 className="card__title">Development</h2>
              <ul className="ul">
                <li className="li"><strong>Frontend Engineering: </strong>Semantic, accessible UI with performance and polish in mind.</li>
                <li className="li"><strong>React & JavaScript: </strong>Interactive components and dynamic interfaces built with modern frameworks.</li>
                <li className="li"><strong>CMS Integration: </strong>Custom design systems and theming for Drupal, Craft, Shopify, and WordPress.</li>
              </ul>
            </div>
          </Card>

          <Card>
            <div className="card__hero-image">
              <img src="../src/assets/icon-custom_isolated_01.webp" />
            </div>
            <div className="card__text">
              <h2 className="card__title">Custom Solutions</h2>
              <ul className="ul">
                <li className="li"><strong>Design Systems: </strong>Scalable UI libraries developed for real-world products and marketing teams.</li>
                <li className="li"><strong>Platform Customization: </strong>Tailored modules, templates, and UI adjustments for unique workflows.</li>
                <li className="li"><strong>Documentation: </strong>Clear handoffs and internal guides to support long-term use of custom systems.</li>
              </ul>
            </div>
          </Card>
        </div>

        <Panel>
          <p>Have a project in mind? Let's make it happen.</p>
          <a href="/" className="bfg-button">Let's Talk About It!</a>
        </Panel>
      </Container>
    </>
  );
};

export default Services;
