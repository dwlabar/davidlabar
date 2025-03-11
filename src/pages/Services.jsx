import React from "react";
import Container from "../components/Container";

const Services = () => {
  return (
    <>
      <Container>
        <h1>Services and Specialties</h1>
        
        <div className="panel">
          <p>I design, develop, and bring ideas to life through clean code and thoughtful design. Here’s what I offer:</p>

          <h2>Design & UX</h2>
          <ul>
            <li><strong>UI/UX Design & Development</strong> - Intuitive, user-centered experiences.</li>
            <li><strong>Graphic Design</strong> - Custom branding, visuals, and digital assets.</li>
            <li><strong>Motion Graphics</strong> - Animated elements that enhance engagement.</li>
            <li><strong>Illustration</strong> - Unique, hand-crafted artwork for web and branding.</li>
          </ul>

          <h2>Development</h2>
          <ul>
            <li><strong>Frontend Development</strong> - High-performance, accessible interfaces.</li>
            <li><strong>React & JavaScript</strong> - Interactive, dynamic web applications.</li>
            <li><strong>Shopify, WordPress, Drupal, Craft CMS</strong> - Custom themes & functionality.</li>
            <li><strong>ROBLOX (Lua)</strong> - Game scripting and interactive experiences.</li>
          </ul>

          <h2>Custom Solutions</h2>
          <ul>
            <li><strong>Design Systems</strong> - Scalable, consistent UI components.</li>
            <li><strong>UI Customization</strong> - Tailored interfaces for any platform.</li>
          </ul>

          <p>Have a project in mind? Let's make it happen.</p>
        </div>
      </Container>
    </>
  );
};

export default Services;
