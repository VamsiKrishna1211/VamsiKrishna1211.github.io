import personalData from '../../data/personal.json';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <span className="footer-left">
          {personalData.name}
          <span className="footer-location"> — {personalData.location}</span>
        </span>
        <span className="footer-right mono">
          {`hand-rolled React + CSS, no animation library · © ${currentYear}`}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
