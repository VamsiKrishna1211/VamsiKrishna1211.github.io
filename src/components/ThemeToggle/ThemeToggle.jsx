import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';
import { trackButtonClick } from '../../utils/analytics';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  const handleClick = () => {
    toggleTheme();
    trackButtonClick('theme_toggle', `navbar_to_${nextTheme}`);
  };

  return (
    <button
      className="theme-toggle"
      onClick={handleClick}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
