const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact'];
const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollTo = (section) => {
    const id = section.toLowerCase() === 'home' ? 'hero' : section.toLowerCase();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo" aria-label="Site footer">
      <div className="container">
        <div className="footer__inner">
          {/* Logo */}
          <div
            className="footer__logo"
            onClick={() => scrollTo('Home')}
            role="button"
            tabIndex={0}
            aria-label="Scroll to top"
            onKeyDown={e => e.key === 'Enter' && scrollTo('Home')}
          >
            Dhanraj V L
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="footer__links">
              {NAV_LINKS.map(link => (
                <li key={link}>
                  <span
                    className="footer__link"
                    onClick={() => scrollTo(link)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Go to ${link} section`}
                    onKeyDown={e => e.key === 'Enter' && scrollTo(link)}
                  >
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact quick links */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="mailto:dhanrajvlgopi@gmail.com"
              className="tag tag-cyan"
              aria-label="Send email to Dhanraj"
            >
              📧 dhanrajvlgopi@gmail.com
            </a>
            <a
              href="tel:+919353427917"
              className="tag tag-gold"
              aria-label="Call Dhanraj"
            >
              📱 +91 9353427917
            </a>
          </div>

          <div className="footer__divider" aria-hidden="true" />

          {/* Bottom bar */}
          <div className="footer__bottom">
            <p className="footer__copy">
              © {CURRENT_YEAR}{' '}
              <span>Dhanraj V L</span>. All rights reserved.
            </p>
            <p className="footer__copy">
              Built with{' '}
              <span className="footer__heart" aria-label="love">♥</span>
              {' '}using React &amp; Vite · Bengaluru, India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
