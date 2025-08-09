import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaRobot } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          const sectionId = navItems[i].id;
          setActiveSection(sectionId);
          // Update URL hash without triggering scroll
          if (window.location.hash !== `#${sectionId}`) {
            window.history.replaceState(null, null, `#${sectionId}`);
          }
          break;
        }
      }
    };

    // Set initial active section based on URL hash
    const initialHash = window.location.hash.slice(1);
    if (initialHash && navItems.some(item => item.id === initialHash)) {
      setActiveSection(initialHash);
    }

    // Listen for hash changes to update active section
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && navItems.some(item => item.id === hash)) {
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
    // Update URL hash
    window.history.pushState(null, null, `#${sectionId}`);
    setActiveSection(sectionId);
    
    // Scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="navbar-container">
        {/* Logo */}
        <motion.div 
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaRobot className="logo-icon" />
          <span className="logo-text">VK</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              className={`navbar-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Navigation */}
        <motion.div 
          className={`navbar-mobile ${isOpen ? 'navbar-mobile-open' : ''}`}
          initial={{ opacity: 0, x: '100%' }}
          animate={{ 
            opacity: isOpen ? 1 : 0,
            x: isOpen ? '0%' : '100%'
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="navbar-mobile-content">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                className={`navbar-mobile-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: isOpen ? 1 : 0,
                  x: isOpen ? 0 : 50
                }}
                transition={{ 
                  duration: 0.3,
                  delay: isOpen ? index * 0.1 : 0
                }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Mobile Overlay */}
        {isOpen && (
          <div 
            className="navbar-overlay"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
