import React, { useState } from "react";
import { usePageReadyController } from "../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../hooks/useNotifyWhenImagesLoaded";
import Container from "../components/Container";
import ThreeSceneManager from "../components/ThreeSceneManager";
import ThreeSceneControls from "../components/ThreeSceneControls";
import { ThreeSceneProvider } from "../context/ThreeSceneContext";

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
    <ThreeSceneProvider presetName="default">
      <ThreeSceneControls
        showControls={showControls}
        setShowControls={setShowControls}
      />
      <Container>
        <header>
          <h1>Crafting Web Solutions for over 20 years.</h1>
        </header>
      </Container>
      <ThreeSceneManager />
    </ThreeSceneProvider>
  );
};

export default Home;
