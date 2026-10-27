// Last updated: 3.4.0

import GSAPAnimationEditorBg from "../assets/project-cards/bg_GSAPanimationEditor.webp";
import GSAPAnimationEditorLogo from "../assets/project-cards/logo_GSAPanimationEditor.webp";
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

// Shared card assets and case-study names; ordering matches the Projects page.
export const projects = [
  {
    name: "GSAP Animation Editor",
    title: "GSAP Animation Editor",
    path: "/projects/gsap-animation-editor",
    background: GSAPAnimationEditorBg,
    logo: GSAPAnimationEditorLogo,
    label: "DEV / DESIGN",
    light: true,
  },
  {
    name: "Skeletor",
    title: "Design System \u00a0/\u00a0 UI Toolkit",
    path: "/projects/skeletor",
    background: skeletorBg,
    logo: skeletorLogo,
    label: "DEV",
  },
  {
    name: "AEI Engineering",
    title: "Custom Drupal CMS",
    path: "/projects/AEI",
    background: AEIBg,
    logo: AEILogo,
    label: "DEV \u00a0/\u00a0 DESIGN",
  },
  {
    name: "BeanNik Roasters",
    title: "Brand \u00a0/\u00a0 Web",
    path: "/projects/BeannikRoasters",
    background: BeannikRoastersBg,
    logo: BeannikRoastersLogo,
    label: "DEV \u00a0/\u00a0 DESIGN",
  },
  {
    name: "Westgate Resorts",
    title: "Marketing Web \u00a0/\u00a0 Email",
    path: "/projects/WestgateResorts",
    background: WestgateResortsBg,
    logo: WestgateResortsLogo,
    label: "DEV \u00a0/\u00a0 DESIGN",
  },
  {
    name: "Dreame",
    title: "Art Commissions",
    path: "/projects/Dreame",
    background: DreameBg,
    logo: DreameLogo,
    label: "DESIGN",
    light: true,
  },
];

export const projectCardImages = projects.flatMap(project => [project.background, project.logo]);
