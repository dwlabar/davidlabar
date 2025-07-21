import React, { useContext, useEffect, useState } from "react";
import { PreloaderContext } from "../context/PreloaderContext";
import gsap from "gsap";

const Preloader = () => {
  const { isLoading, setIsPreloaderVisible } = useContext(PreloaderContext);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    // Lock scroll while preloading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    }

    if (!isLoading) {
      const elements = document.querySelectorAll(
        "#logo_bottomHighlight, #logo_core, #logo_highlight, #logo_border, #logo_border02"
      );

      let hasTriggered = false;

      const fallbackTimeout = setTimeout(() => {
        if (!hasTriggered) {
          setAnimationDone(true);
          hasTriggered = true;
        }
      }, 6000);

      elements.forEach((el) => {
        el.addEventListener(
          "animationiteration",
          () => {
            if (!hasTriggered) {
              setAnimationDone(true);
              hasTriggered = true;
              clearTimeout(fallbackTimeout);
            }
          },
          { once: true }
        );
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (animationDone) {
      // Unlock scroll *before* fade-out to avoid layout shift
      document.body.style.overflow = "auto";

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

  return null;
};

export default Preloader;
