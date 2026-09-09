// Last updated: 3.2.0

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import useReducedMotion from "../hooks/useReducedMotion";

const BurgerIcon = ({ isOpen }) => {
  const topRef = useRef();
  const center01Ref = useRef();
  const center02Ref = useRef();
  const bottomRef = useRef();
  const tlRef = useRef();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    gsap.set(topRef.current, { y: 0 });
    gsap.set(bottomRef.current, { y: 0 });
    gsap.set([center01Ref.current, center02Ref.current], {
      rotation: 0,
      scale: 1,
      transformOrigin: "center center"
    });

    const tl = gsap.timeline({ paused: true });

    // Slide top and bottom
    tl.to(topRef.current, {
      duration: 0.3,
      y: -4,
      ease: "power2.inOut"
    }, 0);

    tl.to(bottomRef.current, {
      duration: 0.3,
      y: 4,
      ease: "power2.inOut"
    }, 0);

    // Rotate + scale center bars into an X
    tl.to(center01Ref.current, {
      duration: 0.3,
      rotation: 45,
      scale: 0.6,
      transformOrigin: "center center",
      ease: "power2.inOut"
    }, 0);

    tl.to(center02Ref.current, {
      duration: 0.3,
      rotation: -45,
      scale: 0.6,
      transformOrigin: "center center",
      ease: "power2.inOut"
    }, 0);

    tlRef.current = tl;

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      gsap.set(topRef.current, { y: isOpen ? -4 : 0 });
      gsap.set(bottomRef.current, { y: isOpen ? 4 : 0 });
      gsap.set(center01Ref.current, {
        rotation: isOpen ? 45 : 0,
        scale: isOpen ? 0.6 : 1,
        transformOrigin: "center center"
      });
      gsap.set(center02Ref.current, {
        rotation: isOpen ? -45 : 0,
        scale: isOpen ? 0.6 : 1,
        transformOrigin: "center center"
      });
    } else if (tlRef.current) {
      isOpen ? tlRef.current.play() : tlRef.current.reverse();
    }
  }, [isOpen, prefersReducedMotion]);

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        ref={bottomRef}
        d="M0,26v-4h8l2,2h12l2-2h8v4z"
        id="icon-burger__bottom"
        fill="#151515"
      />
      <path
        ref={center01Ref}
        d="M0,14c0,0.61588,0,4,0,4H32v-4z"
        id="icon-burger__center-01"
        fill="#151515"
      />
      <path
        ref={center02Ref}
        d="M0,14c0,0.61588,0,4,0,4H32v-4z"
        id="icon-burger__center-02"
        fill="#151515"
      />
      <path
        ref={topRef}
        d="M0,6v4h8l2-2h12l2,2h8v-4z"
        id="icon-burger__top"
        fill="#151515"
      />
    </svg>
  );
};

export default BurgerIcon;
