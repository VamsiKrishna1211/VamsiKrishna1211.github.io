import { useEffect, useRef } from 'react';
import { trackSectionView } from '../utils/analytics';

interface UseAnalyticsTrackingOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
}

/**
 * Custom hook to track section views using Intersection Observer
 * @param sectionName - Name of the section to track
 * @param options - Intersection Observer options
 */
export const useAnalyticsTracking = (
  sectionName: string, 
  options: UseAnalyticsTrackingOptions = {}
): React.RefObject<HTMLDivElement> => {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasBeenTracked = useRef<boolean>(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const defaultOptions: IntersectionObserverInit = {
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
