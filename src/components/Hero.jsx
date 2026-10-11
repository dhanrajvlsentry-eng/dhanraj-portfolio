import { useState, useEffect } from 'react';

const profileImg = `${import.meta.env.BASE_URL}images/profile.jpg`;

/* Typed-text words cycle */
const ROLES = [
  'CS & Data Science Student',
  'Python Developer',
  'AI & ML Enthusiast',
  'Problem Solver',
];

function useTyped(words, typingSpeed = 80, deletingSpeed = 45, pauseMs = 1600) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState('typing'); // 'typing' | 'pausing' | 'deleting'

  useEffect(() => {
    const word = words[wordIdx % words.length];
    let timeout;

    if (phase === 'typing') {
      if (display.length < word.length) {
        timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pauseMs);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 300);
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(d => d.slice(0, -1)), deletingSpeed);
      } else {
        setWordIdx(i => i + 1);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [display, phase, wordIdx, words, typingSpeed, deletingSpeed, pauseMs]);

  return display;
}

export default function Hero() {
  const [imgError, setImgError] = useState(false);
  const typedRole = useTyped(ROLES);

  const scrollTo = id =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero section" aria-label="Hero section">
      {/* Ambient background orbs */}
      <div className="hero__bg-orb hero__bg-orb--1" aria-hidden="true" />
      <div className="hero__bg-orb hero__bg-orb--2" aria-hidden="true" />
      <div className="hero__bg-orb hero__bg-orb--3" aria-hidden="true" />

      <div className="container">
        <div className="hero__inner">

          {/* ── Left: text ── */}
          <div className="hero__content">

            <p className="hero__eyebrow">
              <span className="hero__eyebrow-dot" aria-hidden="true" />
              Open to Internships &amp; Collaborations
            </p>

            <h1 className="hero__name">
              <span className="hero__name-first">Dhanraj&nbsp;</span>
              <span className="hero__name-last">V&nbsp;L</span>
            </h1>

            {/* Typed role line */}
            <div className="hero__typed-wrap" aria-live="polite" aria-label={`Role: ${typedRole}`}>
              <span className="hero__typed">{typedRole}</span>
              <span className="hero__cursor" aria-hidden="true">|</span>
            </div>

            <p className="hero__tagline">
              Third-year <strong>Computer Science &amp; Data Science</strong> student at{' '}
              <strong>Atria Institute of Technology, Bengaluru</strong> — building
              intelligent systems where <strong>AI, Machine Learning</strong> and clean code converge.
            </p>

            <div className="hero__meta" role="list" aria-label="Quick facts">
              <span className="tag tag-cyan" role="listitem">📍 Bengaluru, India</span>
              <span className="tag tag-blue" role="listitem">🎓 3rd Year · 2028</span>
              <span className="tag tag-gold" role="listitem">⭐ CGPA 8.88</span>
            </div>

            <div className="hero__actions">
              <button
                id="hero-projects-btn"
                className="btn btn-primary"
                onClick={() => scrollTo('projects')}
                aria-label="Explore my projects"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                Explore Projects
              </button>

              <button
                id="hero-contact-btn"
                className="btn btn-gold"
                onClick={() => scrollTo('contact')}
                aria-label="Contact Dhanraj"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Contact Me
              </button>
            </div>
          </div>

          {/* ── Right: portrait ── */}
          <div className="hero__visual" aria-label="Profile photo of Dhanraj V L">
            <div className="hero__photo-frame">
              <div className="hero__photo-glow" aria-hidden="true" />
              <div className="hero__photo-ring" aria-hidden="true" />

              <div className="hero__photo-wrap">
                {imgError ? (
                  /* Fallback initials avatar */
                  <div className="hero__photo-fallback" role="img" aria-label="Initials avatar: DV">
                    <span>DV</span>
                    <p className="hero__photo-fallback-hint">
                      Copy your photo to<br />
                      <code>public/images/profile.jpg</code>
                    </p>
                  </div>
                ) : (
                  <img
                    src={profileImg}
                    alt="Dhanraj V L – profile photograph"
                    loading="eager"
                    decoding="async"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>

              <div className="hero__photo-badge" aria-label="CGPA 8.88">CGPA 8.88</div>

              <div className="hero__stat hero__stat--cgpa glass-card" aria-hidden="true">
                <div className="hero__stat-val">8.88</div>
                <div className="hero__stat-label">CGPA</div>
              </div>
              <div className="hero__stat hero__stat--year glass-card" aria-hidden="true">
                <div className="hero__stat-val">2028</div>
                <div className="hero__stat-label">Grad Year</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <button
        className="hero__scroll"
        onClick={() => scrollTo('about')}
        aria-label="Scroll to About section"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <span>Scroll</span>
      </button>
    </section>
  );
}
