import { useState, useEffect } from 'react';

const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme,    setTheme]    = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });

  /* Sync data-theme attribute on root */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  };

  /* Scroll spy */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      const sections = NAV_LINKS.map(l => l.toLowerCase());
      let current = 'Home';
      for (const id of sections) {
        const el = document.getElementById(id === 'home' ? 'hero' : id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = id.charAt(0).toUpperCase() + id.slice(1);
        }
      }
      setActive(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Close mobile menu on Escape */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const scrollTo = (section) => {
    const id = section.toLowerCase() === 'home' ? 'hero' : section.toLowerCase();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="container">
          <div className="navbar__inner">
            <span
              className="navbar__logo"
              onClick={() => scrollTo('Home')}
              role="button"
              tabIndex={0}
              aria-label="Go to top"
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && scrollTo('Home')}
            >
              DV
            </span>

            <ul className="navbar__links">
              {NAV_LINKS.map(link => (
                <li key={link}>
                  <span
                    className={`navbar__link${active === link ? ' active' : ''}`}
                    onClick={() => scrollTo(link)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Navigate to ${link}`}
                    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && scrollTo(link)}
                  >
                    {link}
                  </span>
                </li>
              ))}
            </ul>

            <div className="navbar__actions">
              <button
                id="theme-toggle-btn"
                className="navbar__theme-btn"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              <button
                id="navbar-hamburger-btn"
                className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav-menu"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-nav-menu"
          className={`navbar__mobile${menuOpen ? ' open' : ''}`}
          role="menu"
          aria-hidden={!menuOpen}
        >
          {NAV_LINKS.map(link => (
            <span
              key={link}
              className="navbar__mobile-link"
              onClick={() => scrollTo(link)}
              role="menuitem"
              tabIndex={menuOpen ? 0 : -1}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && scrollTo(link)}
            >
              {link}
            </span>
          ))}
        </div>
      </nav>
    </header>
  );
}
