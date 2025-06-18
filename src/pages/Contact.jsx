import React from "react";
import { usePageReadyController } from "../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../hooks/useNotifyWhenImagesLoaded";
import Container from "../components/Container";
import Panel from "../components/Panel";
import ContactForm from '../components/FormContact';

const Contact = () => {
  const { notifyPageReady } = usePageReadyController();

  // Notify once all images on this page have finished loading
  useNotifyWhenImagesLoaded(notifyPageReady);

  return (
    <>
      <Container>
        <header>
          <h1>Hire Me</h1>
          <p className="subheading">Tell Me About Your Project</p>
        </header>
        <Panel>
          <div className="layout-row layout-row--2">
            <div className="layout-cell">
              <p className="no-margin-top">I'm currently available for freelance or full-time opportunities. Whether you need a polished front-end, a custom design system, or just someone who can bring design and dev together. I'd love to hear what you're working on.</p>
              <p>Let me know a bit about your project and how to reach you. I'll get back to you as soon as I can.</p>
            </div>
            <div className="layout-cell">
              <ContactForm />
            </div>
          </div>
        </Panel>
      </Container>
    </>
  );
};

export default Contact;
