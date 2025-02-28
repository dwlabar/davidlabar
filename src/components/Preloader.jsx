import React, { useContext, useEffect, useState } from "react";
import { PreloaderContext } from "../context/PreloaderContext";
import gsap from "gsap";

const Preloader = () => {
  const { isLoading, setIsPreloaderVisible } = useContext(PreloaderContext);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Wait for the current animation loop to complete before stopping
      const elements = document.querySelectorAll(
        "#logo_bottomHighlight, #logo_core, #logo_highlight, #logo_border, #logo_border02"
      );

      elements.forEach((el) => {
        el.addEventListener(
          "animationiteration",
          () => {
            setAnimationDone(true);
          },
          { once: true }
        );
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (animationDone) {
      const logo = document.querySelector(".logo");
      const preloader = document.querySelector(".preloader");

      if (logo && preloader) {
        gsap.to(logo, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(preloader, {
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              onComplete: () => {
                preloader.style.display = "none";
                setIsPreloaderVisible(false);
              },
            });
          },
        });
      }
    }
  }, [animationDone, setIsPreloaderVisible]);

  return null; // No UI needed since preloader is in index.html
};

export default Preloader;
