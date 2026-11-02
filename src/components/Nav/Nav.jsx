import { useEffect, useRef, useState } from 'react';
import { Link } from '../../router/Link';
import { usePath } from '../../router/Router';
import { navRoutes } from '../../data/routes';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Nav.css';

const isActive = (path, routePath) => path === routePath || path.startsWith(`${routePath}/`);

export default function Nav() {
  const path = usePath();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll('a, button');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    panelRef.current?.querySelector('a, button')?.focus();

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="nav">
      <div className="nav-bar container">
        <Link to="/" className="nav-wordmark" onClick={() => setIsOpen(false)}>
          Vamsi Krishna
        </Link>

        <nav className="nav-desktop" aria-label="Primary">
          {navRoutes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={`nav-link ${isActive(path, route.path) ? 'active' : ''}`}
              aria-current={isActive(path, route.path) ? 'page' : undefined}
            >
              {route.label}
            </Link>
          ))}
          <Link to="/contact" className={`nav-contact ${isActive(path, '/contact') ? 'active' : ''}`}>
            Contact
          </Link>
          <ThemeToggle />
        </nav>

        <div className="nav-mobile-controls">
          <ThemeToggle />
          <button
            ref={toggleRef}
            className="nav-toggle"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className={`nav-toggle-icon ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-nav-panel"
          className="nav-mobile-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {[...navRoutes, { path: '/contact', label: 'Contact' }].map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={`nav-mobile-link ${isActive(path, route.path) ? 'active' : ''}`}
              aria-current={isActive(path, route.path) ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              {route.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
