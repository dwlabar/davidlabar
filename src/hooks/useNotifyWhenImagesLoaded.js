// useNotifyWhenImagesLoaded.js
import { useEffect } from "react";

/**
 * Hook to delay page-ready state until all visual images are loaded.
 * - Waits for <img> tags in DOM
 * - Scans for CSS background images
 * - Preloads any found URLs
 *
 * @param {Function} callback - Function to call when all visual content is loaded
 */
const useNotifyWhenImagesLoaded = (callback) => {
  useEffect(() => {
    const root = document.body; // could be scoped further
    const imgElements = Array.from(root.querySelectorAll("img"));
    const allElements = Array.from(root.querySelectorAll("*"));

    // --- Track all background-image URLs found in computed styles
    const backgroundUrls = new Set();

    allElements.forEach((el) => {
      const style = getComputedStyle(el);
      const bgImage = style.getPropertyValue("background-image");

      // Look for `url("...")` or `url(...)`
      const match = bgImage.match(/url\(["']?(.*?)["']?\)/);
      if (match && match[1]) {
        backgroundUrls.add(match[1]);
      }
    });

    // --- Create promises for <img> tags
    const imgPromises = imgElements.map((img) => {
      return new Promise((resolve) => {
        if (img.complete && img.naturalHeight !== 0) {
          resolve(); // Already loaded
        } else {
          img.onload = img.onerror = resolve; // Wait for load or fail
        }
      });
    });

    // --- Create promises for background-image URLs
    const bgPromises = Array.from(backgroundUrls).map((url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = resolve;
        img.src = url;
      });
    });

    // --- Wait for all images to finish loading, then notify
    Promise.all([...imgPromises, ...bgPromises]).then(() => {
      callback();
    });
  }, [callback]);
};

export default useNotifyWhenImagesLoaded;
