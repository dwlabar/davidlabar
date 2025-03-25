import React from "react";
import Container from "../components/Container";

const About = () => {
  return (
    <>
      <Container>
        <section className="content-block">
          <h1>Hi I'm David LaBar<span className="subheading">UX Engineer</span></h1>
          <p className="tagline">Designer turned developer with a deep toolkit and a passion for polish</p>
          <p>
            I've spent my career bridging the gap between design and development—starting with HTML and CSS in the early 2000s, evolving through Ruby and React, and now exploring real-time 3D with Three.js.
          </p>

          <p>
            Along the way, I've built frontend systems for dev teams, launched client sites end-to-end, and worked in everything from Flash games to audio production. My background spans both the visual and technical—Photoshop to Maya, ActionScript to JavaScript.
          </p>

          <p>
            This portfolio is part playground, part proof-of-skill. It reflects the mindset I bring to every project: curious, detail-obsessed, and always evolving.
          </p>

          <p>
            If you're looking for a hybrid thinker who can move fluidly between design and code, let's connect.
          </p>
        </section>
      </Container>
    </>
  );
};

export default About;
