import React from "react";
import { usePageReadyController } from "../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../hooks/useNotifyWhenImagesLoaded";
import Container from "../components/Container";
import Panel from "../components/Panel";
import ProjectCard from "../components/ProjectCard";
import "../styles/components/_project-card.scss";

import skeletorBg from "../assets/project-cards/bg_SKELETOR.webp";
import skeletorLogo from "../assets/project-cards/logo_SKELETOR.webp";
import AEIBg from "../assets/project-cards/bg_AEI.webp";
import AEILogo from "../assets/project-cards/logo_AEI.webp";

const Projects = () => {
  const { notifyPageReady } = usePageReadyController();
  
  // Notify once all images on this page have finished loading
  useNotifyWhenImagesLoaded(notifyPageReady);

  return (
    <Container>
      <section>
        <header>
          <h1>Projects</h1>
          <p className="subheading">Selected builds and systems</p>
        </header>

        <div className="project-cards">
          <ProjectCard
            title="Design System"
            description="Modular system used to power fullsail.edu and Craft marketing tools."
            path="/projects/skeletor"
            background={skeletorBg}
            logo={skeletorLogo} 
            label="DEV"
          />
          <ProjectCard
            title="Custom Drupal CMS"
            description="Drupal CMS from scratch"
            path="/projects/AEI"
            background={AEIBg}
            logo={AEILogo} 
            label="DEV  &nbsp;/&nbsp;  DESIGN"
          />
        </div>
      </section>
    </Container>
  );
};

export default Projects;
