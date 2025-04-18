import React from "react";
import { useEffect } from "react";
import { usePageReadyController } from "../context/PageReadyContext";
import Container from "../components/Container";
import Panel from "../components/Panel";

const Contact = () => {
  const { notifyPageReady } = usePageReadyController();

  useEffect(() => {
    // Wait for Three.js or assets or animation to complete
    const handle = requestAnimationFrame(() => {
      notifyPageReady();
    });

    return () => cancelAnimationFrame(handle);
  }, [notifyPageReady]);

  return (
    <>
      <Container>
        <h1>Hire Me <span className="subheading">Always Looking For Work</span></h1>
        <Panel>
          <p>Tell me about your project or just stop in to say hey!</p>
          <p><a href="mailto:dwlabar@gmail.com">Message David</a></p>
        </Panel>
      </Container>
    </>
  );
};

export default Contact;
