import React, { useState } from "react";
import { usePageReadyController } from "../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../hooks/useNotifyWhenImagesLoaded";
import Container from "../components/Container";
import ThreeSceneManager from "../components/ThreeSceneManager";
import ThreeSceneControls from "../components/ThreeSceneControls";
import { ThreeSceneProvider } from "../context/ThreeSceneContext";
import useOverlayNavigate from "../hooks/useOverlayNavigate";

const Home = () => {
  const { notifyPageReady } = usePageReadyController();
  const [showControls, setShowControls] = useState(false);

  // Wait for images to load, THEN wait a tick before notifyPageReady
  useNotifyWhenImagesLoaded(() => {
    requestAnimationFrame(() => {
      notifyPageReady();
    });
  });

  const overlayNavigate = useOverlayNavigate();

  const handleClick = (e, path) => {
    e.preventDefault();
    overlayNavigate(path);
  };

  return (
    <ThreeSceneProvider presetName="default">
      <Container>
        <header>
          {/* <h1>Crafting Web Solutions for over 20 years.</h1> */}
          {/* <h1>I'm <strong>David LaBar</strong> and I make web stuff.</h1> */}
          {/* <h1><strong>David LaBar</strong></h1> */}
          <h1>David LaBar</h1>
          <p className="subheading">Front-End Developer &nbsp;/&nbsp; UI Engineer &nbsp;/&nbsp; Designer</p>
          {/* <div className="divider"></div> */}
          <a href="/projects" className="bfg-button bfg-button--center" onClick={(e) => handleClick(e, "/projects")}>View My Work</a>
        </header>
      </Container>
      <ThreeSceneControls
        showControls={showControls}
        setShowControls={setShowControls}
      />
      <ThreeSceneManager />
    </ThreeSceneProvider>
  );
};

export default Home;
