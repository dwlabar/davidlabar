// Last updated: 3.4.0

import { useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import HeaderIntroContext from '../context/HeaderIntroContext';
import { HEADER_INTRO_CONTROLS, HEADER_INTRO_DEFAULTS, HEADER_INTRO_EASINGS } from '../config/headerIntroSettings';

const HeaderIntroTuningControls = () => {
  const { settings, updateSetting, resetSettings, replay, replayFull, scrub, finishPreview, progressStore, prefersReducedMotion } = useContext(HeaderIntroContext);
  const progress = useSyncExternalStore(progressStore.subscribe, progressStore.getSnapshot);
  const [copyStatus, setCopyStatus] = useState('');
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      // Closing either disclosure must not strand the header at a partial scrub.
      finishPreview();
    };
  }, [finishPreview]);
  const copySettings = async () => {
    try {
      const properties = Object.keys(HEADER_INTRO_DEFAULTS).map((key) => {
        const value = settings[key];
        return `  ${key}: ${typeof value === 'string' ? `'${value}'` : value},`;
      }).join('\n');
      await navigator.clipboard.writeText(properties);
      if (mountedRef.current) setCopyStatus('Settings copied.');
    } catch {
      if (mountedRef.current) setCopyStatus('Clipboard unavailable. Allow clipboard access and try again.');
    }
  };

  return (
    <section className="effects-tuning header-intro-tuning" aria-labelledby="header-intro-heading">
      <h3 id="header-intro-heading" className="interaction-tuning__heading">Header Intro</h3>
      <p className="header-intro-tuning__note">Start times are seconds from intro start after the preloader. Header replay and scrub affect only the header. Full Intro bypasses the preloader.</p>
      {prefersReducedMotion && <p className="header-intro-tuning__note">Reduced motion is enabled; previews show the completed header.</p>}
      <div className="interaction-tuning__controls">
        {HEADER_INTRO_CONTROLS.map(({ key, label, min, max, step, unit }) => (
          <div className="slider-control" key={key}>
            <label htmlFor={`header-intro-${key}`}>{label}</label>
            <output htmlFor={`header-intro-${key}`}>{settings[key]}{unit}</output>
            <input type="range" id={`header-intro-${key}`} min={min} max={max} step={step}
              value={settings[key]}
              style={{ '--progress': `${(settings[key] - min) / (max - min) * 100}%` }}
              onChange={(event) => updateSetting(key, Number(event.target.value))}
            />
          </div>
        ))}
        <div className="slider-control">
          <label htmlFor="header-intro-easing">Easing</label>
          <select id="header-intro-easing" value={settings.easing} onChange={(event) => updateSetting('easing', event.target.value)}>
            {HEADER_INTRO_EASINGS.map((easing) => <option key={easing} value={easing}>{easing}</option>)}
          </select>
        </div>
        <div className="slider-control">
          <label htmlFor="header-intro-scrub">Scrub</label>
          <output htmlFor="header-intro-scrub">{progress}%</output>
          <input type="range" id="header-intro-scrub" min="0" max="100" step="1" value={progress}
            disabled={prefersReducedMotion}
            style={{ '--progress': `${progress}%` }}
            onChange={(event) => scrub(Number(event.target.value))}
          />
        </div>
        <div className="header-intro-tuning__actions">
          <button type="button" onClick={replay}>Replay Header</button>
          <button type="button" onClick={replayFull}>Replay Full Intro</button>
          <button type="button" onClick={resetSettings}>Reset Values</button>
          <button type="button" onClick={copySettings}>Copy Settings</button>
        </div>
      </div>
      <p className="header-intro-tuning__note" role="status">{copyStatus}</p>
    </section>
  );
};

export default HeaderIntroTuningControls;
