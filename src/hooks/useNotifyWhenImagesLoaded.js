// useNotifyWhenImagesLoaded.js
import { useEffect } from "react";

/**
 * Marks a route ready after its explicitly declared critical images load.
 * Below-the-fold images are deliberately omitted so they can load normally.
 *
 * @param {Function} callback - Function to call when all visual content is loaded
 * @param {string[]} criticalImageSources - Image URLs required for a clean reveal
 */
const useNotifyWhenImagesLoaded = (callback, criticalImageSources = []) => {
  const sourceKey = JSON.stringify(criticalImageSources.filter(Boolean));

  useEffect(() => {
    let cancelled = false;
    let readyFrame = null;
    const pendingImages = [];
    const sources = [...new Set(JSON.parse(sourceKey))];

    const imagePromises = sources.map((source) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = resolve;
        img.src = source;
        pendingImages.push(img);
      });
    });

    Promise.all(imagePromises).then(() => {
      if (cancelled) return;

      // Let the destination commit its final critical-image layout before reveal.
      readyFrame = requestAnimationFrame(() => {
        if (!cancelled) callback();
      });
    });

    return () => {
      cancelled = true;
      pendingImages.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
      if (readyFrame !== null) cancelAnimationFrame(readyFrame);
    };
  }, [callback, sourceKey]);
};

export default useNotifyWhenImagesLoaded;
