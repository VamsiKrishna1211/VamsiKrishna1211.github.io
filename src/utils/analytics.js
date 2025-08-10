import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initGA = (measurementId) => {
  if (measurementId) {
    ReactGA.initialize(measurementId, {
      debug: process.env.NODE_ENV === 'development',
    });
  }
};

// Track page views
export const trackPageView = (path) => {
  ReactGA.send({ 
    hitType: 'pageview', 
    page: path || window.location.pathname + window.location.search 
  });
};

// Track events
export const trackEvent = (action, category = 'User Interaction', label = '', value = 0) => {
  ReactGA.event({
    action,
    category,
    label,
    value,
  });
};

// Track section views (for single page applications)
export const trackSectionView = (sectionName) => {
  ReactGA.event({
    action: 'view_section',
    category: 'Navigation',
    label: sectionName,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName, location = '') => {
  ReactGA.event({
    action: 'click',
    category: 'Button',
    label: `${buttonName}${location ? ` - ${location}` : ''}`,
  });
};

// Track contact form submissions
export const trackFormSubmission = (formName, success = true) => {
  ReactGA.event({
    action: success ? 'form_submit_success' : 'form_submit_error',
    category: 'Form',
    label: formName,
  });
};

// Track file downloads
export const trackFileDownload = (fileName, fileType = '') => {
  ReactGA.event({
    action: 'download',
    category: 'File',
    label: `${fileName}${fileType ? ` (${fileType})` : ''}`,
  });
};

// Track external link clicks
export const trackExternalLink = (url, linkText = '') => {
  ReactGA.event({
    action: 'click_external_link',
    category: 'External Link',
    label: `${url}${linkText ? ` - ${linkText}` : ''}`,
  });
};
