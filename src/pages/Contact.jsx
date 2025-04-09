import React from "react";
import { useEffect } from "react";
import { usePageReadyController } from "../context/PageReadyContext";
import Container from "../components/Container";

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
        <h1>Hire Me / Contact</h1>
        <p>Tell me about your project or just stop in to say hey!</p>
        <p><a href="mailto:dwlabar@gmail.com">Message David</a></p>
      </Container>
    </>
  );
};

export default Contact;
