import { useEffect } from "react";

const useNotifyWhenImagesLoaded = (callback) => {
  useEffect(() => {
    const images = document.querySelectorAll("img");
    let loadedCount = 0;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        callback();
      }
    };

    if (images.length === 0) {
      callback();
    } else {
      images.forEach((img) => {
        if (img.complete) {
          checkAllLoaded();
        } else {
          img.addEventListener("load", checkAllLoaded);
          img.addEventListener("error", checkAllLoaded);
        }
      });
    }

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", checkAllLoaded);
        img.removeEventListener("error", checkAllLoaded);
      });
    };
  }, [callback]);
};

export default useNotifyWhenImagesLoaded;
