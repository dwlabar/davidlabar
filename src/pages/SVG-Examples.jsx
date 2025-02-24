import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SvgAnimationExamples = () => {
  // Fill Animation Example
  const fillRectRef = useRef(null);
  useEffect(() => {
    gsap.to(fillRectRef.current, {
      duration: 2,
      attr: { fill: '#FF0000' },
      repeat: -1,
      yoyo: true
    });
  }, []);

  // Stroke Animation Example
  const strokeCircleRef = useRef(null);
  useEffect(() => {
    gsap.to(strokeCircleRef.current, {
      duration: 2,
      attr: { stroke: '#00FF00', 'stroke-width': 10 },
      repeat: -1,
      yoyo: true
    });
  }, []);

  // Drawing Animation Example
  const drawingCircleRef = useRef(null);
  useEffect(() => {
    // For a circle with r=50, circumference ~314
    gsap.to(drawingCircleRef.current, {
      duration: 3,
      attr: { 'stroke-dashoffset': 0 },
      ease: 'power1.inOut'
    });
  }, []);

  // Gradient Stop Color Animation Example
  const gradientStop1Ref = useRef(null);
  const gradientStop2Ref = useRef(null);
  useEffect(() => {
    gsap.to(gradientStop1Ref.current, {
      duration: 2,
      attr: { 'stop-color': '#FF0000' },
      repeat: -1,
      yoyo: true
    });
    gsap.to(gradientStop2Ref.current, {
      duration: 2,
      attr: { 'stop-color': '#0000FF' },
      repeat: -1,
      yoyo: true
    });
  }, []);

  // Gradient Stop Offset Animation Example
  const gradientStopOffset1Ref = useRef(null);
  const gradientStopOffset2Ref = useRef(null);
  useEffect(() => {
    gsap.to(gradientStopOffset1Ref.current, {
      duration: 2,
      attr: { offset: 0.5 },
      repeat: -1,
      yoyo: true
    });
    gsap.to(gradientStopOffset2Ref.current, {
      duration: 2,
      attr: { offset: 0.5 },
      repeat: -1,
      yoyo: true
    });
  }, []);

  // Gradient Transform Animation Example (fixed)
  const gradientTransformRef = useRef(null);
  useEffect(() => {
    const obj = { rotation: 0 };
    gsap.to(obj, {
      rotation: 360,
      duration: 4,
      repeat: -1,
      ease: 'linear',
      onUpdate: () => {
        if (gradientTransformRef.current) {
          gradientTransformRef.current.setAttribute(
            'gradientTransform',
            `rotate(${obj.rotation},100,50)`
          );
        }
      }
    });
  }, []);

  // CSS Variable Gradient Animation Example
  const svgVariableRef = useRef(null);
  useEffect(() => {
    gsap.to(svgVariableRef.current, {
      duration: 2,
      css: { '--myStopColor': '#00FFFF' },
      repeat: -1,
      yoyo: true
    });
  }, []);

  // Synchronized Animations Example
  const syncRectRef = useRef(null);
  const syncCircleRef = useRef(null);
  const syncPathRef = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(syncRectRef.current, {
      duration: 1,
      attr: { fill: '#FFA500' }
    })
      .to(syncCircleRef.current, {
        duration: 1,
        attr: { stroke: '#800080', 'stroke-width': 8 }
      })
      .to(syncPathRef.current, {
        duration: 1,
        attr: { 'stroke-dashoffset': 0 },
        ease: 'power1.inOut'
      });
  }, []);

  return (
    <>
      <h1>SVG Animation Examples with GSAP</h1>

      {/* Fill Animation Example */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Fill Animation</h2>
        <svg width="120" height="120">
          <rect
            ref={fillRectRef}
            x="10"
            y="10"
            width="100"
            height="100"
            fill="#00FF00"
          />
        </svg>
      </section>

      {/* Stroke Animation Example */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Stroke Animation</h2>
        <svg width="120" height="120">
          <circle
            ref={strokeCircleRef}
            cx="60"
            cy="60"
            r="40"
            fill="none"
            stroke="#000000"
            strokeWidth="4"
          />
        </svg>
      </section>

      {/* Drawing Animation Example */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Drawing Animation</h2>
        <svg width="140" height="140">
          <circle
            ref={drawingCircleRef}
            cx="70"
            cy="70"
            r="50"
            fill="none"
            stroke="#000000"
            strokeWidth="4"
            strokeDasharray="314"
            strokeDashoffset="314"
          />
        </svg>
      </section>

      {/* Gradient Stop Color Animation Example */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Gradient Stop Color Animation</h2>
        <svg width="200" height="100">
          <defs>
            <linearGradient id="grad1">
              <stop
                ref={gradientStop1Ref}
                offset="0%"
                stopColor="#FFFF00"
              />
              <stop
                ref={gradientStop2Ref}
                offset="100%"
                stopColor="#00FFFF"
              />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="180" height="80" fill="url(#grad1)" />
        </svg>
      </section>

      {/* Gradient Stop Offset Animation Example */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Gradient Stop Offset Animation</h2>
        <svg width="200" height="100">
          <defs>
            <linearGradient id="grad2">
              <stop
                ref={gradientStopOffset1Ref}
                offset="0%"
                stopColor="#FF00FF"
              />
              <stop
                ref={gradientStopOffset2Ref}
                offset="100%"
                stopColor="#00FF00"
              />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="180" height="80" fill="url(#grad2)" />
        </svg>
      </section>

      {/* Gradient Transform Animation Example */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Gradient Transform Animation</h2>
        <svg width="200" height="100">
          <defs>
            <linearGradient
              id="grad3"
              ref={gradientTransformRef}
              gradientUnits="userSpaceOnUse"
              gradientTransform="rotate(0,100,50)"
            >
              <stop offset="0%" stopColor="#FF0000" />
              <stop offset="100%" stopColor="#0000FF" />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="180" height="80" fill="url(#grad3)" />
        </svg>
      </section>

      {/* CSS Variable Gradient Animation Example */}
      <section style={{ marginBottom: '40px' }}>
        <h2>CSS Variable Gradient Animation</h2>
        <svg
          ref={svgVariableRef}
          width="200"
          height="100"
          style={{ '--myStopColor': '#0000FF' }}
        >
          <defs>
            <linearGradient id="grad4">
              <stop offset="0%" stopColor="var(--myStopColor)" />
              <stop offset="100%" stopColor="#FF0000" />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="180" height="80" fill="url(#grad4)" />
        </svg>
      </section>

      {/* Synchronized Animations Example */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Synchronized Animations</h2>
        <svg width="240" height="120">
          <rect
            ref={syncRectRef}
            x="10"
            y="10"
            width="70"
            height="100"
            fill="#0000FF"
          />
          <circle
            ref={syncCircleRef}
            cx="130"
            cy="60"
            r="30"
            fill="none"
            stroke="#000000"
            strokeWidth="4"
          />
          <path
            ref={syncPathRef}
            d="M200,110 L230,10"
            fill="none"
            stroke="#FF0000"
            strokeWidth="4"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
        </svg>
      </section>
    </>
  );
};

export default SvgAnimationExamples;
