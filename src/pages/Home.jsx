import React from "react";
import { useEffect } from "react";
import { usePageReadyController } from "../context/PageReadyContext";
import Container from "../components/Container";
import ThreeSceneManager from "../components/ThreeSceneManager";
import ThreeSceneControls from "../components/ThreeSceneControls";
import { ThreeSceneProvider } from "../context/ThreeSceneContext";
import ThreeSceneHomeConfig from "../config/ThreeSceneHomeConfig";

const Home = () => {
  const { notifyPageReady } = usePageReadyController();

  useEffect(() => {
    // Wait for Three.js or assets or animation to complete
    const handle = requestAnimationFrame(() => {
      notifyPageReady();
    });

    return () => cancelAnimationFrame(handle);
  }, [notifyPageReady]);
  
  return (
    <ThreeSceneProvider config={ThreeSceneHomeConfig}>
      <ThreeSceneControls />
      <Container>
        <h1>Crafting Web Solutions for over 20 years.</h1>
        <p>Learn More About Me</p>
      </Container>
      <ThreeSceneManager />
      {/* <div className="three-scene"></div> */}
    </ThreeSceneProvider>
  );
};

export default Home;
