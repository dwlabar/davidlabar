// Last updated: 3.4.0

import { useLayoutEffect } from "react";
import { useLocation } from "react-router";
import { projects } from "../config/projects";

const routeTitles = {
  "/": "David LaBar | Front-End Developer / UI Engineer / Designer",
  "/projects": "Projects | David LaBar",
  "/expertise": "Expertise | David LaBar",
  "/about": "About | David LaBar",
  "/contact": "Contact | David LaBar",
  "/svg-examples": "SVG Examples | David LaBar",
  "/preloader-test": "Preloader Test | David LaBar",
  ...Object.fromEntries(projects.map(project => [project.path.toLowerCase(), project.name + " | David LaBar"])),
};

export default function DocumentTitle() {
  const { pathname } = useLocation();
  const route = pathname.replace(/\/+$/, "").toLowerCase() || "/";
  const title = routeTitles[route] || "David LaBar";

  // One shell-owned writer handles initial loads, navigation, and back/forward.
  useLayoutEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}
