import { useEffect, useRef } from 'react';
import { trackSectionView } from '../utils/analytics';

/**
 * Custom hook to track section views using Intersection Observer
 * @param {string} sectionName - Name of the section to track
 * @param {Object} options - Intersection Observer options
 */
export const useAnalyticsTracking = (sectionName, options = {}) => {
  const elementRef = useRef();
  const hasBeenTracked = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const defaultOptions = {
      threshold: 0.3, // Trigger when 30% of the element is visible
      rootMargin: '0px 0px -50px 0px',
      ...options
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasBeenTracked.current) {
          trackSectionView(sectionName);
          hasBeenTracked.current = true;
          // Once tracked, we can disconnect the observer for this element
          observer.unobserve(element);
        }
      });
    }, defaultOptions);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [sectionName, options]);

  return elementRef;
};
