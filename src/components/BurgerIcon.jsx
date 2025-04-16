import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const BurgerIcon = ({ isOpen }) => {
  const topRef = useRef();
  const center01Ref = useRef();
  const center02Ref = useRef();
  const bottomRef = useRef();
  const tlRef = useRef();

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (tlRef.current) {
      isOpen ? tlRef.current.play() : tlRef.current.reverse();
    }
  }, [isOpen]);

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
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
