import React from "react";
import { usePageReadyController } from "../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../hooks/useNotifyWhenImagesLoaded";
import Container from "../components/Container";
import ProjectCard from "../components/ProjectCard";
import "../styles/components/_project-card.scss";

import skeletorBg from "../assets/project-cards/bg_SKELETOR.webp";
import skeletorLogo from "../assets/project-cards/logo_SKELETOR.webp";
import AEIBg from "../assets/project-cards/bg_AEI.webp";
import AEILogo from "../assets/project-cards/logo_AEI.webp";
import BeannikRoastersBg from "../assets/project-cards/bg_BeanNikRoasters.webp";
import BeannikRoastersLogo from "../assets/project-cards/logo_BeanNikRoasters.webp";
import DreameBg from "../assets/project-cards/bg_Dreame.webp";
import DreameLogo from "../assets/project-cards/logo_Dreame.webp";
import WestgateResortsBg from "../assets/project-cards/bg_WestgateResorts.webp";
import WestgateResortsLogo from "../assets/project-cards/logo_WestgateResorts.webp";

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
            title="Design System &nbsp;/&nbsp; UI Toolkit"
            path="/projects/skeletor"
            background={skeletorBg}
            logo={skeletorLogo} 
            label="DEV"
          />
          <ProjectCard
            title="Custom Drupal CMS"
            path="/projects/AEI"
            background={AEIBg}
            logo={AEILogo} 
            label="DEV  &nbsp;/&nbsp;  DESIGN"
          />
          <ProjectCard
            title="Brand &nbsp;/&nbsp; Web"
            path="/projects/BeannikRoasters"
            background={BeannikRoastersBg}
            logo={BeannikRoastersLogo}
            label="DEV  &nbsp;/&nbsp;  DESIGN"
          />
          <ProjectCard
            title="Marketing Web &nbsp;/&nbsp; Email"
            path="/projects/WestgateResorts"
            background={WestgateResortsBg}
            logo={WestgateResortsLogo}
            label="DEV  &nbsp;/&nbsp;  DESIGN"
          />
          <ProjectCard
            title="Art Commissions"
            path="/projects/Dreame"
            background={DreameBg}
            logo={DreameLogo}
            label="DESIGN" 
            light
          />
        </div>
      </section>
    </Container>
  );
};

export default Projects;
