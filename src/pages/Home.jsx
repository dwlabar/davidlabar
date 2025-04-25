import React, { useState } from "react";
import { usePageReadyController } from "../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../hooks/useNotifyWhenImagesLoaded";
import Container from "../components/Container";
import ThreeSceneManager from "../components/ThreeSceneManager";
import ThreeSceneControls from "../components/ThreeSceneControls";
import { ThreeSceneProvider } from "../context/ThreeSceneContext";
import ThreeSceneHomeConfig from "../config/ThreeSceneHomeConfig";

const Home = () => {
  const { notifyPageReady } = usePageReadyController();
  const [showControls, setShowControls] = useState(false);

  // Wait for images to load, THEN wait a tick before notifyPageReady
  useNotifyWhenImagesLoaded(() => {
    requestAnimationFrame(() => {
      notifyPageReady();
    });
  });

  return (
    <ThreeSceneProvider config={ThreeSceneHomeConfig}>
      <ThreeSceneControls
        showControls={showControls}
        setShowControls={setShowControls}
      />
      <Container>
        <header>
          <h1>Crafting Web Solutions for over 20 years.</h1>
          {/* <p><a href="/" className="bfg-button">Learn More About Me</a></p> */}
        </header>
      </Container>
      <ThreeSceneManager />
      {/* <div className="three-scene"></div> */}
    </ThreeSceneProvider>
  );
};

export default Home;
