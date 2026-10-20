// Last updated: 3.4.0

import { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { PreloaderContext } from '../context/PreloaderContext';
import { SCENE_TUNING_ENABLED } from '../config/sceneTuningSettings';
import { HEADER_INTRO_DEFAULTS, HEADER_INTRO_STORAGE_KEY, normalizeHeaderIntroSettings } from '../config/headerIntroSettings';
import useReducedMotion from './useReducedMotion';

const readSettings = () => {
  if (SCENE_TUNING_ENABLED) {
    try {
      return normalizeHeaderIntroSettings(JSON.parse(localStorage.getItem(HEADER_INTRO_STORAGE_KEY)));
    } catch { /* Unavailable or malformed storage uses authored defaults. */ }
  }
  return { ...HEADER_INTRO_DEFAULTS };
};

// Only the tuning slider subscribes to playback progress, avoiding scene rerenders.
const createProgressStore = () => {
  let progress = 100;
  const listeners = new Set();
  return {
    getSnapshot: () => progress,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    set: (value) => {
      const next = Math.round(value);
      if (next === progress) return;
      progress = next;
      listeners.forEach((listener) => listener());
    }
  };
};

const useHeaderIntro = (headerRef) => {
  const { isPreloaderVisible } = useContext(PreloaderContext);
  const prefersReducedMotion = useReducedMotion();
  // Capture the same initial-load gate as the scene; navigation never replays it.
  const [animateHeader] = useState(() => isPreloaderVisible && !prefersReducedMotion);
  const [settings, setSettings] = useState(readSettings);
  const settingsRef = useRef(settings);
  const actionsRef = useRef(null);
  const sceneIntroRef = useRef(null);
  const initialConsumedRef = useRef(false);
  const [progressStore] = useState(createProgressStore);

  const saveSettings = useCallback((next) => {
    if (!SCENE_TUNING_ENABLED) return;
    settingsRef.current = next;
    setSettings(next);
    try {
      localStorage.setItem(HEADER_INTRO_STORAGE_KEY, JSON.stringify(next));
    } catch { /* Storage restrictions must not interrupt the header or controls. */ }
  }, []);
  const updateSetting = useCallback((key, value) => {
    saveSettings(normalizeHeaderIntroSettings({ ...settingsRef.current, [key]: value }));
  }, [saveSettings]);
  const resetSettings = useCallback(() => saveSettings({ ...HEADER_INTRO_DEFAULTS }), [saveSettings]);

  useLayoutEffect(() => {
    let context = null;
    let timeline = null;
    let sequence = null;
    let previewing = false;
    const dispose = () => {
      context?.revert();
      context = null;
      timeline = null;
    };
    const settle = () => {
      dispose();
      progressStore.set(100);
    };
    const prepare = () => {
      dispose();
      progressStore.set(0);
      const { headingStart, subheadingStart, buttonStart, revealDuration, maskSoftness, startingScale, subheadingStartingScale, buttonStartingScale, zoomDuration, headingVerticalOffset, subheadingVerticalOffset, buttonVerticalOffset, opacityBlend, easing } = settingsRef.current;
      // Prepare before paint; rebuilding for scrub/replay restores the prior context first.
      context = gsap.context(() => {
        const heading = headerRef.current.querySelector('h1');
        const title = heading.querySelector('span');
        const subheading = headerRef.current.querySelector('.subheading');
        const button = headerRef.current.querySelector('.bfg-button');
        gsap.set(heading, { overflow: 'hidden' });
        if (maskSoftness > 0) {
          // Start the feather below the entire box; finish it entirely above the box.
          // Percentage-based travel remains correct across responsive line wrapping.
          const mask = `linear-gradient(to bottom, transparent calc(var(--header-mask-edge) - ${maskSoftness}px), #000 var(--header-mask-edge))`;
          gsap.set(heading, {
            '--header-mask-edge': `calc(100% + ${maskSoftness}px)`,
            maskImage: mask,
            webkitMaskImage: mask
          });
        } else {
          gsap.set(heading, { clipPath: 'inset(100% 0 0 0)' });
        }
        // Default scale, offset, and blend leave text transform and opacity untouched.
        if (headingVerticalOffset !== 0) gsap.set(title, { y: headingVerticalOffset, force3D: false });
        if (startingScale !== 100) gsap.set(title, { scale: startingScale / 100, force3D: false, transformOrigin: '50% 50%' });
        if (opacityBlend > 0) gsap.set(title, { opacity: 1 - opacityBlend / 100 });
        gsap.set([subheading, button], { autoAlpha: 0 });
        if (subheadingVerticalOffset !== 0) gsap.set(subheading, { y: subheadingVerticalOffset, force3D: false });
        if (buttonVerticalOffset !== 0) gsap.set(button, { y: buttonVerticalOffset, force3D: false });
        if (subheadingStartingScale !== 100) gsap.set(subheading, { scale: subheadingStartingScale / 100, force3D: false, transformOrigin: '50% 50%' });
        if (buttonStartingScale !== 100) gsap.set(button, { scale: buttonStartingScale / 100, force3D: false, transformOrigin: '50% 50%' });
        timeline = gsap.timeline({
          paused: true,
          onUpdate: () => progressStore.set(timeline.progress() * 100),
          onComplete: settle
        });
        timeline.to(heading, {
          ...(maskSoftness > 0 ? { '--header-mask-edge': 'calc(0% + 0px)' } : { clipPath: 'inset(0% 0 0 0)' }),
          duration: revealDuration,
          ease: easing
        }, headingStart);
        if (headingVerticalOffset !== 0) timeline.to(title, { y: 0, duration: revealDuration, ease: easing }, headingStart);
        if (startingScale !== 100) timeline.to(title, { scale: 1, duration: zoomDuration, ease: easing }, headingStart);
        if (subheadingStartingScale !== 100) timeline.to(subheading, { scale: 1, duration: zoomDuration, ease: easing }, subheadingStart);
        if (buttonStartingScale !== 100) timeline.to(button, { scale: 1, duration: zoomDuration, ease: easing }, buttonStart);
        if (opacityBlend > 0) timeline.to(title, { opacity: 1, duration: revealDuration, ease: easing }, headingStart);
        // Each element uses the same sequence origin, independent of reveal length.
        timeline
          .to(subheading, { autoAlpha: 1, ...(subheadingVerticalOffset !== 0 ? { y: 0 } : {}), duration: 0.55, ease: 'power2.out' }, subheadingStart)
          .to(button, { autoAlpha: 1, ...(buttonVerticalOffset !== 0 ? { y: 0 } : {}), duration: 0.55, ease: 'power2.out' }, buttonStart);
      }, headerRef);
      return timeline;
    };

    const startSequence = (resetScene) => {
      sequence?.kill();
      sequence = null;
      if (prefersReducedMotion || !sceneIntroRef.current || (resetScene && !sceneIntroRef.current.reset())) {
        settle();
        return;
      }
      // One clock schedules both the header and the existing scene's drop trigger.
      // Header-only preview may replace its child without cancelling a pending drop.
      const headerTimeline = prepare();
      sequence = gsap.timeline({ paused: true });
      sequence.add(headerTimeline.paused(false), 0);
      sequence.call(() => sceneIntroRef.current?.start(), [], settingsRef.current.cubeDropStart);
      sequence.play(0);
    };

    actionsRef.current = {
      startInitial: () => {
        if (!animateHeader || initialConsumedRef.current) return;
        initialConsumedRef.current = true;
        startSequence(false);
      },
      replay: () => {
        initialConsumedRef.current = true;
        previewing = true;
        if (prefersReducedMotion) settle();
        else prepare().play();
      },
      replayFull: () => {
        initialConsumedRef.current = true;
        previewing = false;
        startSequence(true);
      },
      scrub: (value) => {
        initialConsumedRef.current = true;
        previewing = true;
        const percent = Math.max(0, Math.min(100, value));
        if (prefersReducedMotion || percent === 100) settle();
        else prepare().progress(percent / 100).pause();
      },
      finishPreview: () => {
        if (previewing) {
          previewing = false;
          settle();
        }
      }
    };

    if (prefersReducedMotion) {
      initialConsumedRef.current = true;
      settle();
    } else if (animateHeader && !initialConsumedRef.current) {
      prepare();
    }
    return () => {
      actionsRef.current = null;
      sequence?.kill();
      dispose();
    };
  }, [animateHeader, headerRef, prefersReducedMotion, progressStore]);

  useEffect(() => {
    if (!isPreloaderVisible) actionsRef.current?.startInitial();
  }, [isPreloaderVisible, prefersReducedMotion]);

  const replay = useCallback(() => actionsRef.current?.replay(), []);
  const replayFull = useCallback(() => actionsRef.current?.replayFull(), []);
  const scrub = useCallback((value) => actionsRef.current?.scrub(value), []);
  const finishPreview = useCallback(() => actionsRef.current?.finishPreview(), []);
  return { settings, updateSetting, resetSettings, replay, replayFull, sceneIntroRef, scrub, finishPreview, progressStore, prefersReducedMotion };
};

export default useHeaderIntro;
