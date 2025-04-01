import React from "react";
import "../styles/components/_logomini.scss";

const LogoMini = () => {
  return (
    <svg
      className="logomini"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="36"
      height="44"
      viewBox="0 0 9.525 11.642"
      preserveAspectRatio="xMinYMin meet"
    >
      <defs>
        <linearGradient id="logomini_bottomHighlightGradient">
          <stop offset="0" stopColor="#0091ff" stopOpacity="1" />
          <stop offset="1" stopColor="#0091ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="logomini_highlightGradient">
          <stop offset="0" stopColor="#626262" stopOpacity="1" />
          <stop offset="1" stopColor="#626262" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id="logomini_coreGradient"
          cx="107.95"
          cy="11.641"
          r="19.05"
          fx="107.95"
          fy="11.641"
          gradientTransform="matrix(.30902 0 0 .38368 -28.596 -4.202)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#4e4e4e" stopOpacity="1" />
          <stop offset="1" stopColor="#202020" stopOpacity="1" />
        </radialGradient>
        <linearGradient
          xlinkHref="#logomini_highlightGradient"
          id="logomini_highlight"
          x1="8.731"
          x2="8.731"
          y1="3.969"
          y2="15.346"
          gradientTransform="translate(-4.233 -3.969)"
          gradientUnits="userSpaceOnUse"
        />
        <linearGradient
          xlinkHref="#logomini_bottomHighlightGradient"
          id="logomini_bottomHighlight"
          x1="8.812"
          x2="8.812"
          y1="14.998"
          y2="5.084"
          gradientTransform="matrix(.96077 0 0 1.04083 -4.233 -3.969)"
          gradientUnits="userSpaceOnUse"
        />
        <radialGradient
          xlinkHref="#logomini_coreGradient"
          id="logomini_core"
          gradientUnits="userSpaceOnUse"
        />
      </defs>
      <path
        id="logomini_base"
        d="M0 10.583v.794h9.525v-.794Zm3.704-4.498V3.97h2.117v2.116zm3.969-3.968H5.292v1.058h1.322v3.704H5.292v1.058h2.38Zm-5.82 5.82h2.38V6.88H2.91V3.175h1.323V2.117h-2.38ZM0 5.557v4.232h9.525V5.556H8.466v3.175H1.058V5.556ZM0 .264v4.233h1.058V1.323h7.409v3.175h1.058V.265Z"
      />
      <path
        id="logomini_core"
        d="M0 10.583v.794h9.525v-.794Zm3.704-4.498V3.97h2.117v2.116zm3.969-3.968H5.292v1.058h1.322v3.704H5.292v1.058h2.38Zm-5.82 5.82h2.38V6.88H2.91V3.175h1.323V2.117h-2.38ZM0 5.557v4.232h9.525V5.556H8.466v3.175H1.058V5.556ZM0 .264v4.233h1.058V1.323h7.409v3.175h1.058V.265Z"
      />
      <path
        id="logomini_bottomHighlight"
        d="M0 11.377v.265h9.525v-.265zM0 9.79v.264h9.525V9.79Zm8.467-5.292v.265h1.058v-.265Zm-3.175 3.44v.264h2.38v-.264zm-3.44 0v.264h2.381v-.264ZM0 4.498v.265h1.058v-.265Zm3.704 1.587v.265h2.117v-.265zm1.588-2.91v.265h1.323v-.265Zm-2.382 0v.265h1.323v-.265ZM1.058 1.323v.264h7.409v-.264Z"
      />
      <path
        id="logomini_highlight"
        d="M0 10.583h9.525v-.264H0Zm1.058-2.116v.264h7.409v-.264Zm7.409-2.91h1.058v-.265H8.467zM0 5.556h1.058v-.265H0Zm5.292 1.058v.264h1.323v-.264zm-1.059.264H2.91v-.264h1.323Zm-.529-3.175v.265h2.117v-.265Zm1.588-1.587h2.38v-.265h-2.38Zm-3.44-.265v.265h2.381v-.265ZM0 0v.265h9.525V0Z"
      />
    </svg>
  );
};

export default LogoMini;
