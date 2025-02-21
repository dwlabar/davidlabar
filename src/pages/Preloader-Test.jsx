import React from "react";
import "../styles/components/_preloader.scss";

const PreloaderAnimationTest = () => {
  return (
    <div className="preloader">
      <div className="logo">
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve"
          width="192" height="220" viewBox="0 0 50.8 58.208" preserveAspectRatio="xMinYMin meet">
          <defs>
            <linearGradient id="logo_bottomHighlightGradient">
              <stop offset="0" stopColor="#0091ff" stopOpacity="1" />
              <stop offset="1" stopColor="#0091ff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="logo_highlightGradient">
              <stop offset="0" stopColor="#626262" stopOpacity="1" />
              <stop offset="1" stopColor="#626262" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="logo_coreGradient">
              <stop offset="0" stopColor="#4e4e4e" stopOpacity="1" />
              <stop offset="1" stopColor="#202020" stopOpacity="1" />
            </linearGradient>
            <linearGradient xlinkHref="#logo_highlightGradient" id="logo_highlight" x1="107.95" x2="107.95" y1="8.467" y2="52.917" gradientUnits="userSpaceOnUse" />
            <linearGradient xlinkHref="#logo_bottomHighlightGradient" id="logo_bottomHighlight" x1="107.95" x2="107.95" y1="57.944" y2="3.44" gradientUnits="userSpaceOnUse" />
            <radialGradient xlinkHref="#logo_coreGradient" id="logo_core" cx="107.95" cy="11.641" r="19.05" fx="107.95" fy="11.641" gradientTransform="matrix(1.2361 0 0 1.5347 -25.486 -9.4)" gradientUnits="userSpaceOnUse" />
          </defs>
          <g id="logo_group">
            <path id="logo_core"
              d="M88.9 49.742v3.175H127v-3.175zm14.817-17.992v-8.467h8.466v8.467zm15.875-15.875-9.525.002v4.231h5.291v14.817h-5.291v4.233h9.525zM96.308 39.158h9.525v-4.233h-5.291V20.108h5.291v-4.233l-9.525.001zM88.9 29.633v16.933H127V29.633h-4.234v12.7H93.133v-12.7Zm0-21.166V25.4h4.233V12.7h29.634v12.7H127V8.467Z" />
            <path id="logo_bottomHighlight"
              d="M93.133 12.7v.53h29.634v-.53zm7.409 7.408v.53h5.291v-.53zm9.525 0v.53h5.291v-.53ZM88.9 25.4v.53h4.233v-.53Zm33.867 0v.53H127v-.53Zm-19.05 6.35v.53h8.466v-.53Zm-7.409 7.408v.53h9.525v-.53zm13.759 0v.53h9.525v-.53ZM88.9 46.566v.53H127v-.53Zm-.001 6.35v.53H127v-.53z" />
            <path id="logo_highlight"
              d="M88.9 7.938v.529H127v-.53Zm16.933 7.408h-9.525v.53l9.525-.001zm13.759 0-9.525.002v.53l9.525-.003zm-15.875 7.408v.53h8.466v-.53zm-10.584 6.35H88.9v.53l4.233-.001zm29.633 0v.529H127v-.53zm-22.224 5.292v.529h5.291v-.53zm9.525 0v.529h5.291v-.53zm-16.934 7.409v.529h29.633v-.53zM88.9 49.213v.529H127v-.53z" />
            <path id="logo_border" d="M83.873 2.91v55.563h48.154V2.91Zm.794.794h46.566V57.68H84.667Z" />
            <path id="logo_border02" d="M82.55 1.588v58.208h50.8V1.588Zm.265.264h50.27v57.68h-50.27Z" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default PreloaderAnimationTest;
