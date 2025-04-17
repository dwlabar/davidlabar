import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const CubeIcon = ({ isActive }) => {
  const svgRef = useRef(null);

  const paths = {
    top: {
      base: "m 16.000007,6.55119 -8.1829196,4.72441 8.1829196,4.72441 8.18292,-4.72441 z",
      compressed: "m 16.000007,12.55119 -8.18292,4.72441 8.18292,4.724406 8.18292,-4.724406 z",
    },
    left: {
      base: "m 7.8170874,11.2756 v 9.44882 l 8.1829196,4.72441 v -9.44882 z",
      compressed: "m 7.817087,17.2756 v 3.44882 l 8.18292,4.724406 v -3.44882 z",
    },
    right: {
      base: "m 24.182927,11.2756 -8.18292,4.72441 v 9.44882 l 8.18292,-4.72441 z",
      compressed: "m 24.182927,17.2756 -8.18292,4.724406 v 3.44882 l 8.18292,-4.724406 z",
    },
  };

  useEffect(() => {
    const top = svgRef.current.querySelector("path[data-face='top']");
    const left = svgRef.current.querySelector("path[data-face='left']");
    const right = svgRef.current.querySelector("path[data-face='right']");
    const border = svgRef.current.querySelector("path.icon-cube__border");

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(top, { fill: "#8e8e8e", duration: 1.5, ease: "sine.inOut" }, 0);
    tl.to(left, { fill: "#6e6e6e", duration: 1.5, ease: "sine.inOut" }, 0.1);
    tl.to(right, { fill: "#4e4e4e", duration: 1.5, ease: "sine.inOut" }, 0.2);
    tl.to(border, { fill: "#5e5e5e", duration: 1.5, ease: "sine.inOut" }, 0.3);
    return () => tl.kill();
  }, []);

  useEffect(() => {
    const top = svgRef.current.querySelector("path[data-face='top']");
    const left = svgRef.current.querySelector("path[data-face='left']");
    const right = svgRef.current.querySelector("path[data-face='right']");

    gsap.to(top, { attr: { d: isActive ? paths.top.compressed : paths.top.base }, duration: 0.4, ease: "power2.inOut" });
    gsap.to(left, { attr: { d: isActive ? paths.left.compressed : paths.left.base }, duration: 0.4, ease: "power2.inOut" });
    gsap.to(right, { attr: { d: isActive ? paths.right.compressed : paths.right.base }, duration: 0.4, ease: "power2.inOut" });
  }, [isActive]);

  return (
    <svg
      ref={svgRef}
      width="32"
      height="31.999998"
      viewBox="0 0 32 31.999999"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-cube"
      aria-hidden="true"
    >
      <path
        id="icon-cube__border"
        className="icon-cube__border"
        fill="#292929"
        d="M 16.000007,1.82678 3.7256274,8.9134 v 14.17323 l 12.2743796,7.08661 12.27438,-7.08661 V 8.9134 Z"
      />
      <path
        id="icon-cube__back"
        className="icon-cube__back"
        fill="#151515"
        d="M 16.000007,2.77166 4.5439274,9.38584 v 13.22835 l 11.4560796,6.61417 11.45609,-6.61417 V 9.38584 Z"
      />
      <path
        id="icon-cube__cube-top"
        className="icon-cube__cube-top"
        data-face="top"
        fill="#4e4e4e"
        d={paths.top.base}
      />
      <path
        id="icon-cube__cube-left"
        className="icon-cube__cube-left"
        data-face="left"
        fill="#2d2d2d"
        d={paths.left.base}
      />
      <path
        id="icon-cube__cube-right"
        className="icon-cube__cube-right"
        data-face="right"
        fill="#1c1c1c"
        d={paths.right.base}
      />
      <path
        id="icon-cube__border-inner-left"
        className="icon-cube__border-inner-left"
        fill="#1c1c1c"
        d="m 4.5439274,9.38583 v 13.22835 l 0.81829,-0.47244 V 9.85827 L 16.000007,3.71654 V 2.77166 Z"
      />
      <path
        id="icon-cube__border-inner-bottom"
        className="icon-cube__border-inner-bottom"
        fill="#1a1a1a"
        d="m 5.3622174,22.14174 -0.81829,0.47244 11.4560796,6.61418 11.45609,-6.61418 -0.8183,-0.47244 -10.63779,6.14174 z"
      />
      <path
        id="icon-cube__border-inner-right"
        className="icon-cube__border-inner-right"
        fill="#202020"
        d="m 16.000007,2.77166 v 0.94488 l 10.63779,6.14173 v 12.28347 l 0.8183,0.47244 c 0,0 0,-13.22835 0,-13.22835 z"
      />
    </svg>
  );
};

export default CubeIcon;
