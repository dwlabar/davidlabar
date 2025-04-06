import React from "react";
import Container from "../components/Container";
import Panel from "../components/Panel";
import Card from "../components/Card";

const Services = () => {
  return (
    <>
      <Container>
        <h1>Services and Specialties</h1>
        
        {/* <Panel>
          <p>I design, develop, and bring ideas to life through clean code and thoughtful design. Here’s what I offer:</p>

          <div className="layout-row layout-row--3">
            <div className="layout-cell">
              <h2>Design & UX</h2>
              <ul className="ul">
                <li className="li"><strong>UI/UX Design & Development</strong> - Intuitive, user-centered experiences.</li>
                <li className="li"><strong>Graphic Design</strong> - Custom branding, visuals, and digital assets.</li>
                <li className="li"><strong>Motion Graphics</strong> - Animated elements that enhance engagement.</li>
                <li className="li"><strong>Illustration</strong> - Unique, hand-crafted artwork for web and branding.</li>
              </ul>
            </div>

            <div className="layout-cell">
              <h2>Development</h2>
              <ul className="ul">
                <li className="li"><strong>Frontend Development</strong> - High-performance, accessible interfaces.</li>
                <li className="li"><strong>React & JavaScript</strong> - Interactive, dynamic web applications.</li>
                <li className="li"><strong>Shopify, WordPress, Drupal, Craft CMS</strong> - Custom themes & functionality.</li>
                <li className="li"><strong>ROBLOX (Lua)</strong> - Game scripting and interactive experiences.</li>
              </ul>
            </div>

            <div className="layout-cell">
              <h2>Custom Solutions</h2>
              <ul className="ul">
                <li className="li"><strong>Design Systems</strong> - Scalable, consistent UI components.</li>
                <li className="li"><strong>UI Customization</strong> - Tailored interfaces for any platform.</li>
              </ul>
            </div>
          </div>

          <p>Have a project in mind? Let's make it happen.</p>
        </Panel> */}

        <Panel>
          <p>I design, develop, and bring ideas to life through clean code and thoughtful design. Here’s what I offer:</p>
          <div className="layout-row layout-row--3">
            <div className="layout-cell">
              <Card>
                <div className="card__hero-image"><img src="../src/assets/icon-design_isolated_01.webp"></img></div>
                <div className="card__text">
                  <h2 className="card__title">Design & UX</h2>
                  <ul className="ul">
                    <li className="li"><strong>UI/UX Design & Development</strong> - Intuitive, user-centered experiences.</li>
                    <li className="li"><strong>Graphic Design</strong> - Custom branding, visuals, and digital assets.</li>
                    <li className="li"><strong>Motion Graphics</strong> - Animated elements that enhance engagement.</li>
                    <li className="li"><strong>Illustration</strong> - Unique, hand-crafted artwork for web and branding.</li>
                  </ul>
                </div>
              </Card>
            </div>
            <div className="layout-cell">
              <Card>
                <div className="card__hero-image"><img src="../src/assets/icon-development_isolated_01.webp"></img></div>
                <div className="card__text">
                  <h2 className="card__title">Development</h2>
                  <ul className="ul">
                    <li className="li"><strong>Frontend Development</strong> - High-performance, accessible interfaces.</li>
                    <li className="li"><strong>React & JavaScript</strong> - Interactive, dynamic web applications.</li>
                    <li className="li"><strong>Shopify, WordPress, Drupal, Craft CMS</strong> - Custom themes & functionality.</li>
                    <li className="li"><strong>ROBLOX (Lua)</strong> - Game scripting and interactive experiences.</li>
                  </ul>
                </div>
              </Card>
            </div>
            <div className="layout-cell">
              <Card>
                <div className="card__hero-image"><img src="../src/assets/icon-design_isolated_01.webp"></img></div>
                <div className="card__text">
                  <h2 className="card__title">Custom Solutions</h2>
                  <ul className="ul">
                    <li className="li"><strong>Design Systems</strong> - Scalable, consistent UI components.</li>
                    <li className="li"><strong>UI Customization</strong> - Tailored interfaces for any platform.</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </Panel>
      </Container>
    </>
  );
};

export default Services;
