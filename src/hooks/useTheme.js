import { useState, useEffect, useCallback } from 'react';

const getInitialTheme = () => {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
};

export const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document
      .getElementById('theme-color-meta')
      ?.setAttribute('content', theme === 'light' ? '#f3ede0' : '#1e1e2e');
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* localStorage unavailable (private mode / disabled) — theme still applies for this session */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme };
};
