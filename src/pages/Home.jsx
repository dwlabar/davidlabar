// Last updated: 3.4.0

import { useRef, useState } from "react";
import useHeaderIntro from "../hooks/useHeaderIntro";
import HeaderIntroContext from "../context/HeaderIntroContext";
import { usePageReadyController } from "../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../hooks/useNotifyWhenImagesLoaded";
import Container from "../components/Container";
import ThreeSceneManager from "../components/ThreeSceneManager";
import ThreeSceneControls from "../components/ThreeSceneControls";
import { ThreeSceneProvider } from "../context/ThreeSceneContext";
import useOverlayNavigate from "../hooks/useOverlayNavigate";
import "../styles/components/_home-header.scss";

const Home = () => {
  const { notifyPageReady } = usePageReadyController();
  const [showControls, setShowControls] = useState(false);
  const headerRef = useRef(null);
  const headerIntro = useHeaderIntro(headerRef);

  // The scene mounts synchronously; reveal after the destination layout commits.
  useNotifyWhenImagesLoaded(notifyPageReady);

  const overlayNavigate = useOverlayNavigate();

  const handleClick = (e, path) => {
    e.preventDefault();
    overlayNavigate(path);
  };

  return (
    <HeaderIntroContext.Provider value={headerIntro}>
      <ThreeSceneProvider>
        <Container>
          <header className="home-header" ref={headerRef}>
            <h1><span>David LaBar</span></h1>
            <p className="subheading">Front-End Developer &nbsp;/&nbsp; Designer</p>
            <a href="/projects" className="bfg-button bfg-button--center" onClick={(e) => handleClick(e, "/projects")}>View My Work</a>
          </header>
        </Container>
        <ThreeSceneControls
          showControls={showControls}
          setShowControls={setShowControls}
        />
        <ThreeSceneManager />
      </ThreeSceneProvider>
    </HeaderIntroContext.Provider>
  );
};

export default Home;
