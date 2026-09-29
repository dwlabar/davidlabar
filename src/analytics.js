const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
let initialized = false;

export const initializeAnalytics = () => {
  if (!import.meta.env.PROD || !measurementId || initialized) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  // Keep the normal initial page view; Enhanced Measurement owns history views.
  window.gtag('config', measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  // Owned by the document lifetime, outside React mounts and Strict Mode replay.
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
  initialized = true;
};

const trackEvent = (name, parameters = {}) => {
  if (!initialized) return;
  window.gtag('event', name, parameters);
};

export const trackProjectSelection = (path) => {
  trackEvent('select_content', { content_type: 'project', content_id: path });
};

export const trackContactSuccess = () => {
  trackEvent('generate_lead');
};

export const trackSceneControlsOpen = () => {
  trackEvent('scene_controls_open');
};
