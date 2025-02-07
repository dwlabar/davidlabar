import React, { useContext, useEffect } from "react";
import { PreloaderContext } from "../context/PreloaderContext";
import gsap from "gsap";
import "../styles/components/_preloader.scss";

const Preloader = () => {
  const { isLoading, setIsPreloaderVisible } = useContext(PreloaderContext);

  useEffect(() => {
    if (isLoading) {
      // Intro animation
      gsap.fromTo(
        "#davidlabar-logo_core",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
      );

      gsap.to("#davidlabar-logo_bar", {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.out",
        repeat: -1,
        yoyo: true,
        transformOrigin: "center center",
      });
    } else {
      // Exit animation
      const outro = gsap.timeline({
        onComplete: () => {
          console.log("Preloader fully hidden"); // Debugging
          setIsPreloaderVisible(false); // Remove component from DOM
        },
      });

      outro.to("#davidlabar-logo", {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "power2.out",
      });

      // Fade out the background and set display to none
      outro.to(
        ".preloader",
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            const preloader = document.querySelector(".preloader");
            if (preloader) preloader.style.display = "none"; // Hide completely
          },
        },
        "-=0.5" // Overlap the animations
      );
    }
  }, [isLoading, setIsPreloaderVisible]);

  return (
    <div className="preloader">
      <svg
        id="davidlabar-logo"
        width="36"
        height="42"
        viewBox="0 0 36 42"
        role="img"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="davidlabar-logo-group">
          <path
            id="davidlabar-logo_core"
            d="M 14.000005,13.999999 V 22 h 7.999994 V 13.999999 Z M 28.999998,7.0000002 h -9 v 3.9999988 l 5.000001,4e-6 V 25 h -4.999998 v 3.999999 h 8.999997 z M 7.0000029,28.999999 H 15.999999 V 25 H 11.000002 V 10.999999 h 4.999997 V 7.0000002 H 7.0000029 Z m 28.9999971,7 v -16 h -4.000002 v 11.999998 l -27.9999951,4e-6 -3.8e-6,-12.000002 H 3.9437661e-7 V 36.000003 Z M -4.2531519e-7,0 3.9437661e-7,16 H 3.9999991 V 4.0000002 H 31.999998 V 16 H 36 l -10e-7,-16 z"
            fill="red"
          />
          <path
            id="davidlabar-logo_bar"
            d="m 1.1821753e-6,39.000003 v 3 H 35.999999 v -3 z"
            fill="red"
          />
        </g>
      </svg>
    </div>
  );
};

export default Preloader;
