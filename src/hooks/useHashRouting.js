import { useEffect, useRef } from 'react';

export const useHashRouting = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    const handleInitialHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash && !isInitialized.current) {
        // Wait for DOM to be fully rendered
        let attempts = 0;
        const maxAttempts = 20;
        const checkAndScroll = () => {
          const targetSection = document.getElementById(hash);
          if (targetSection) {
            // Section found, scroll to it
            targetSection.scrollIntoView({ behavior: 'smooth' });
            isInitialized.current = true;
          } else if (attempts < maxAttempts) {
            // Section not ready yet, try again in 50ms
            attempts += 1;
            setTimeout(checkAndScroll, 50);
          }
        };

        // Start checking after a short delay
        setTimeout(checkAndScroll, 100);
      }
    };

    // Handle hash on initial load
    handleInitialHash();

    // Also handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const targetSection = document.getElementById(hash);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
};
