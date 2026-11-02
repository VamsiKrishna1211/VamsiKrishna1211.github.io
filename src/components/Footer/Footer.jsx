import { Link } from '../../router/Link';
import { navRoutes } from '../../data/routes';
import personalData from '../../data/personal.json';
import resumePDF from '../../assets/Robotics-Resume-Aug-2026.pdf';
import './Footer.css';

const elsewhere = [
  { label: 'GitHub', href: personalData.github },
  { label: 'LinkedIn', href: personalData.linkedin },
  { label: 'Google Scholar', href: personalData.scholar },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-id">
          <p className="footer-name">{personalData.name}</p>
          <p>Robotics & perception engineer, {personalData.location}</p>
          <a href={`mailto:${personalData.email}`} className="link-underline footer-email">
            {personalData.email}
          </a>
        </div>
        <nav aria-label="Footer">
          <ul className="footer-list">
            {navRoutes.map((route) => (
              <li key={route.path}>
                <Link to={route.path} className="link-underline">
                  {route.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/contact" className="link-underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <ul className="footer-list">
          {elsewhere.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href={resumePDF} target="_blank" rel="noopener noreferrer" className="link-underline">
              Résumé (PDF)
            </a>
          </li>
        </ul>
      </div>
      <p className="container footer-legal mono">© {currentYear} {personalData.name} · Built by hand with React and CSS</p>
    </footer>
  );
}
