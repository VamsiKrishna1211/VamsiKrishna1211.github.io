import React from 'react';
import { FaHeart, FaRocket } from 'react-icons/fa';
import personalData from '../../data/personal.json';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-text">
            <p>
              Built with <FaHeart className="heart-icon" /> and <FaRocket className="rocket-icon" /> by{' '}
              <span className="text-gradient">{personalData.name}</span>
            </p>
            <p className="footer-subtitle">
              Powered by React, Three.js, and a passion for autonomous robotics
            </p>
          </div>
          <div className="footer-year">
            <span>© {currentYear}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
