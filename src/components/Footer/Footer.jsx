import React from 'react';
import personalData from '../../data/personal.json';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <span className="footer-left">
            <span className="code-comment">{'// '}</span>
            built by{' '}
            <span className="code-variable">{personalData.name}</span>
          </span>
          <span className="footer-right code-comment">
            © {currentYear}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
