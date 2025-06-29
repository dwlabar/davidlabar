// DevIcon.jsx
import React from "react";

const DevIcon = ({ idPrefix = "icon-dev" }) => (
  <svg
    id="icon-dev"
    viewBox="0 0 84.666602 84.666658"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id={`${idPrefix}_gradient2`}
        x1="143.93336"
        y1="121.1792"
        x2="143.93336"
        y2="170.39169"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-101.60002,-98.954169)"
      >
        <stop offset="0" style={{ stopColor: "#7acafd", stopOpacity: 1 }} />
        <stop offset="1" style={{ stopColor: "#0286eb", stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    <path
      id={`${idPrefix}_border`}
      d="m 0,1e-6 v 84.66666 H 84.6666 V 1e-6 Z m 5.29165,5.29167 h 74.08328 v 74.08333 H 5.29165 Z"
      fill="#222222"
    />
    <path
      id={`${idPrefix}_grid`}
      d="m 79.37493,10.583361 v 1.05833 H 58.20826 v 10.58334 h -1.05834 v -11.64167 z m -21.16667,51.85833 v 4.7625 l 21.16667,-0.0139 v 1.07228 H 57.14992 v -5.82083 z M 5.29167,10.583361 v 1.05833 h 21.16667 v 10.58334 h 1.05834 v -11.64167 z m 21.16667,51.85833 v 4.7625 l -21.16667,-0.0139 v 1.07228 h 22.22501 v -5.82083 z m 28.57499,-51.85836 h -25.4 v 11.64167 h 1.05834 V 11.641671 H 53.975 v 10.58333 h 1.05833 z m -25.39999,51.85836 v 5.82084 h 8.64289 l 0.7059,-1.05834 h -8.29045 v -4.7625 z m 24.34167,0 v 4.7625 h -8.29045 l 0.7059,1.05834 h 8.64288 v -5.82084 z"
      fill="#222222"
      fillOpacity="0.5"
    />
    <path
      id={`${idPrefix}_core`}
      d="m 29.63333,34.924991 v 3.175 l -9.525,4.23334 9.525,4.23333 v 3.175 l -12.7,-6.35 v -2.11667 z m 25.4,0 v 3.175 l 9.525,4.23334 -9.525,4.23333 v 3.175 l 12.7,-6.35 v -2.11667 z m -9.10374,-1.07321 -6.50129,16.93334 h -1.70297 l 6.51199,-16.93334 z m -33.22958,-11.62675 -2.11667,2.11666 v 35.98334 l 2.11667,2.11666 h 26.45833 v 2.91042 l -2.64583,3.96875 v 2.11667 h 11.64167 v -2.11667 l -2.64584,-3.96875 v -2.91042 h 26.45834 l 2.11666,-2.11666 v -35.98334 l -2.11666,-2.11666 z m 0.79375,1.32291 h 57.67917 l 1.5875,1.5875 v 34.39584 l -1.5875,1.5875 H 13.49376 l -1.5875,-1.5875 v -34.39584 z m 26.72292,39.95209 h 4.23333 v 1.85208 l 2.64583,3.96875 v 1.05833 h -9.525 v -1.05833 l 2.64584,-3.96875 z"
      fill={`url(#${idPrefix}_gradient2)`}
    />
  </svg>
);

export default DevIcon;
