// Last updated: 3.2.0

import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const subscribers = new Set();
let mediaQuery = null;

const getMediaQuery = () => {
  if (!mediaQuery && typeof window !== "undefined") {
    mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  }
  return mediaQuery;
};

const notifySubscribers = () => {
  subscribers.forEach((subscriber) => subscriber());
};

const subscribe = (subscriber) => {
  const query = getMediaQuery();
  if (!query) return () => {};

  subscribers.add(subscriber);
  if (subscribers.size === 1) {
    query.addEventListener("change", notifySubscribers);
  }

  return () => {
    subscribers.delete(subscriber);
    if (subscribers.size === 0) {
      query.removeEventListener("change", notifySubscribers);
    }
  };
};

const getSnapshot = () => getMediaQuery()?.matches ?? false;
const getServerSnapshot = () => false;

const useReducedMotion = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export default useReducedMotion;
