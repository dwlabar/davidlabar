import React from "react";
import { usePageReadyController } from "../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../hooks/useNotifyWhenImagesLoaded";
import Container from "../components/Container";
import Panel from "../components/Panel";

const Contact = () => {
  const { notifyPageReady } = usePageReadyController();

  // Notify once all images on this page have finished loading
  useNotifyWhenImagesLoaded(notifyPageReady);

  return (
    <>
      <Container>
        <header>
          <h1>Hire Me <span className="subheading">Always Looking For Work</span></h1>
        </header>
        <Panel>
          <p>Tell me about your project or just stop in to say hey!</p>
          <p><a href="mailto:dwlabar@gmail.com">Message David</a></p>
        </Panel>
      </Container>
    </>
  );
};

export default Contact;
