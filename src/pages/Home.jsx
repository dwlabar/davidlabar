import React from "react";
import Container from "../components/Container";
import ThreeSceneManager from "../components/ThreeSceneManager";
import ThreeSceneControls from "../components/ThreeSceneControls";
import { SceneProvider } from "../context/ThreeSceneContext";
import ThreeSceneHomeConfig from "../config/ThreeSceneHomeConfig";

const Home = () => {
  return (
    <SceneProvider config={ThreeSceneHomeConfig}>
      <ThreeSceneManager />
      <ThreeSceneControls />
      <Container>
        <h1>Crafting Web Solutions for over 20 years.</h1>
        <p>Learn More About Me</p>
      </Container>
    </SceneProvider>
  );
};

export default Home;
