import { useEffect, useRef } from 'react';

// Fail-visible: the hidden starting class is only ever added here, by JS,
// after the element already exists in the DOM. Content with no JS, or on a
// browser without IntersectionObserver, simply renders — it is never the
// only thing standing between a visitor and visible content.
export const useInView = (rootMargin = '0px 0px -10% 0px') => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    el.classList.add('reveal-pending');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [rootMargin]);

  return ref;
};
