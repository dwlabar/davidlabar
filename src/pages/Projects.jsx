// Last updated: 3.4.0

import { usePageReadyController } from "../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../hooks/useNotifyWhenImagesLoaded";
import Container from "../components/Container";
import ProjectCard from "../components/ProjectCard";
import "../styles/components/_project-card.scss";

import { projects, projectCardImages } from "../config/projects";
const Projects = () => {
  const { notifyPageReady } = usePageReadyController();
  
  // All project-card backgrounds and logos are required for a clean destination reveal.
  useNotifyWhenImagesLoaded(notifyPageReady, projectCardImages);

  return (
    <Container>
      <section>
        <header>
          <h1>Projects</h1>
          <p className="subheading">Selected builds and systems</p>
        </header>

        <div className="project-cards">
          {projects.map(project => <ProjectCard key={project.path} {...project} />)}
        </div>
      </section>
    </Container>
  );
};

export default Projects;
