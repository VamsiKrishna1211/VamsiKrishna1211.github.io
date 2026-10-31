import { useState } from 'react';
import './CookieBanner.css';

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => {
    try { return !localStorage.getItem('cookie_consent'); } catch { return false; }
  });

  const updateConsent = (granted) => {
    const value = granted ? 'granted' : 'denied';
    try {
      localStorage.setItem('cookie_consent', value);
    } catch {
      /* private browsing or storage disabled — consent still applies for this load */
    }
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: value });
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-banner-text">
        Uses Google Analytics for traffic only — no personal data stored.
      </div>
      <div className="cookie-banner-actions">
        <button className="cookie-btn cookie-btn-decline" onClick={() => updateConsent(false)}>
          decline
        </button>
        <button className="cookie-btn cookie-btn-accept" onClick={() => updateConsent(true)}>
          accept
        </button>
      </div>
    </div>
  );
}
