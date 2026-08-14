import React, { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PreloaderContext } from "../context/PreloaderContext";

const PRELOADER_ABSOLUTE_FALLBACK_MS = 10000;

const Preloader = () => {
  const {
    isLoading,
    setIsPreloaderVisible,
    completeInitialLoad,
  } = useContext(PreloaderContext);
  const [entranceComplete, setEntranceComplete] = useState(false);
  const reducedMotionRef = useRef(false);
  const readyRequestedRef = useRef(false);
  const exitTimelineRef = useRef(null);
  const exitStartedRef = useRef(false);
  readyRequestedRef.current = !isLoading;

  useEffect(() => {
    const preloader = document.querySelector(".preloader");
    const entranceSentinel = document.querySelector(
      ".logo path#logo_bottomHighlight"
    );
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    reducedMotionRef.current = reducedMotionQuery.matches;

    let hasCompletedEntrance = false;
    const completeEntrance = () => {
      if (hasCompletedEntrance) return;
      hasCompletedEntrance = true;
      entranceSentinel?.removeEventListener(
        "animationiteration",
        handleCycleBoundary
      );
      if (preloader) preloader.dataset.state = "hold";
      setEntranceComplete(true);
    };

    const handleCycleBoundary = () => {
      if (readyRequestedRef.current) {
        completeEntrance();
      }
    };

    if (reducedMotionQuery.matches || !preloader || !entranceSentinel) {
      completeEntrance();
    } else {
      preloader.dataset.state = "entrance";
      entranceSentinel.addEventListener(
        "animationiteration",
        handleCycleBoundary
      );
    }

    // A missed destination-ready signal must never leave scroll permanently locked.
    const absoluteFallback = window.setTimeout(() => {
      completeInitialLoad();
      completeEntrance();
    }, PRELOADER_ABSOLUTE_FALLBACK_MS);

    return () => {
      entranceSentinel?.removeEventListener(
        "animationiteration",
        handleCycleBoundary
      );
      window.clearTimeout(absoluteFallback);
    };
  }, [completeInitialLoad]);

  useEffect(() => {
    if (isLoading || !entranceComplete || exitStartedRef.current) return;

    exitStartedRef.current = true;
    document.body.style.overflow = "auto";

    const logo = document.querySelector(".logo");
    const preloader = document.querySelector(".preloader");

    if (!logo || !preloader) {
      setIsPreloaderVisible(false);
      return;
    }

    preloader.dataset.state = "exit";

    if (reducedMotionRef.current) {
      preloader.style.display = "none";
      setIsPreloaderVisible(false);
      return;
    }

    exitTimelineRef.current = gsap
      .timeline({
        onComplete: () => {
          preloader.style.display = "none";
          setIsPreloaderVisible(false);
        },
      })
      .to(logo, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
      })
      .to(preloader, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });

    return () => {
      exitTimelineRef.current?.kill();
    };
  }, [entranceComplete, isLoading, setIsPreloaderVisible]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return null;
};

export default Preloader;
