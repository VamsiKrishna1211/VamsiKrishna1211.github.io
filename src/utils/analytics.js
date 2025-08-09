import ReactGA from 'react-ga';

// Google Analytics configuration
const TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID || 'G-XXXXXXXXXX'; // Replace with your actual GA4 tracking ID

export const initGA = () => {
  if (typeof window !== 'undefined' && TRACKING_ID !== 'G-XXXXXXXXXX') {
    ReactGA.initialize(TRACKING_ID, {
      debug: process.env.NODE_ENV === 'development'
    });
  }
};

export const logPageView = () => {
  if (typeof window !== 'undefined' && TRACKING_ID !== 'G-XXXXXXXXXX') {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
};

export const logEvent = (category = '', action = '', label = '') => {
  if (typeof window !== 'undefined' && TRACKING_ID !== 'G-XXXXXXXXXX') {
    ReactGA.event({ category, action, label });
  }
};

export const logException = (description = '', fatal = false) => {
  if (typeof window !== 'undefined' && TRACKING_ID !== 'G-XXXXXXXXXX') {
    ReactGA.exception({ description, fatal });
  }
};
