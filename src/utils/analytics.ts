import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initGA = (measurementId: string): void => {
  if (measurementId) {
    ReactGA.initialize(measurementId, {
      testMode: process.env.NODE_ENV === 'development',
    });
  }
};

// Track page views
export const trackPageView = (path?: string): void => {
  ReactGA.send({ 
    hitType: 'pageview', 
    page: path || window.location.pathname + window.location.search 
  });
};

// Track events
export const trackEvent = (
  action: string, 
  category: string = 'User Interaction', 
  label: string = '', 
  value: number = 0
): void => {
  ReactGA.event({
    action,
    category,
    label,
    value,
  });
};

// Track section views (for single page applications)
export const trackSectionView = (sectionName: string): void => {
  ReactGA.event({
    action: 'view_section',
    category: 'Navigation',
    label: sectionName,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string = ''): void => {
  ReactGA.event({
    action: 'click',
    category: 'Button',
    label: `${buttonName}${location ? ` - ${location}` : ''}`,
  });
};

// Track contact form submissions
export const trackFormSubmission = (formName: string, success: boolean = true): void => {
  ReactGA.event({
    action: success ? 'form_submit_success' : 'form_submit_error',
    category: 'Form',
    label: formName,
  });
};

// Track file downloads
export const trackFileDownload = (fileName: string, fileType: string = ''): void => {
  ReactGA.event({
    action: 'download',
    category: 'File',
    label: `${fileName}${fileType ? ` (${fileType})` : ''}`,
  });
};

// Track external link clicks
export const trackExternalLink = (url: string, linkText: string = ''): void => {
  ReactGA.event({
    action: 'click_external_link',
    category: 'External Link',
    label: `${url}${linkText ? ` - ${linkText}` : ''}`,
  });
};
