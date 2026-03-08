import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'home' },
    { id: 'about', label: 'about' },
    { id: 'experience', label: 'experience' },
    { id: 'projects', label: 'projects' },
    { id: 'skills', label: 'skills' },
    { id: 'education', label: 'education' },
    { id: 'research', label: 'research' },
    { id: 'contact', label: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          const sectionId = navItems[i].id;
          setActiveSection(sectionId);
          if (window.location.hash !== `#${sectionId}`) {
            window.history.replaceState(null, null, `#${sectionId}`);
          }
          break;
        }
      }
    };

    const initialHash = window.location.hash.slice(1);
    if (initialHash && navItems.some((item) => item.id === initialHash)) {
      setActiveSection(initialHash);
    }

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && navItems.some((item) => item.id === hash)) {
        setActiveSection(hash);
      } else if (!hash) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleNavClick = (sectionId) => {
    window.history.pushState(null, null, `#${sectionId}`);
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => handleNavClick('home')}>
          <span className="logo-prompt">{'>'}</span>
          <span className="logo-text">VK</span>
          <span className="logo-cursor">_</span>
        </div>

        {/* Desktop Nav */}
        <div className="navbar-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`navbar-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {activeSection === item.id && <span className="nav-indicator">{'/* '}</span>}
              {item.label}
              {activeSection === item.id && <span className="nav-indicator">{' */'}</span>}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="navbar-mobile">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`navbar-mobile-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <span className="mobile-prefix">./</span>
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Overlay */}
        {isOpen && <div className="navbar-overlay" onClick={() => setIsOpen(false)} />}
      </div>
    </motion.nav>
  );
};

export default Navbar;
