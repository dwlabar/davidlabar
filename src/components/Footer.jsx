import React from "react";
import Container from "../components/Container";
import "../styles/components/_footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text"><strong>&copy;{new Date().getFullYear()} David LaBar Studios</strong> &nbsp; / &nbsp; All rights reserved.</p>
    </footer>
  );
};

export default Footer;
