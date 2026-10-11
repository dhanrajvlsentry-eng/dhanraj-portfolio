import { useEffect, useRef } from 'react';

const INFO_ITEMS = [
  { key: 'Full Name',   val: 'Dhanraj V L',                         icon: '👤' },
  { key: 'Email',       val: 'dhanrajvlgopi@gmail.com',             icon: '📧' },
  { key: 'Phone',       val: '+91 9353427917',                      icon: '📱' },
  { key: 'Location',    val: 'Bengaluru, India',                    icon: '📍' },
  { key: 'College',     val: 'Atria Institute of Technology',       icon: '🏫' },
  { key: 'Course',      val: 'CS & Data Science',                   icon: '📚' },
  { key: 'Year',        val: 'Third Year (2025–26)',                 icon: '📅' },
  { key: 'Grad Year',   val: '2028 (Expected)',                     icon: '🎓' },
];

const INTERESTS = [
  { label: 'Technology',            icon: '💻' },
  { label: 'Artificial Intelligence', icon: '🤖' },
  { label: 'Software Development',  icon: '⚙️' },
  { label: 'Data Science',          icon: '📊' },
  { label: 'Machine Learning',      icon: '🧠' },
];

const LANGUAGES = [
  { label: 'English', flag: '🇬🇧' },
  { label: 'Kannada', flag: '🇮🇳' },
  { label: 'Hindi',   flag: '🇮🇳' },
];

const STAT_CARDS = [
  { val: '8.88', label: 'CGPA', icon: '⭐' },
  { val: '3rd',  label: 'Year',  icon: '📅' },
  { val: '2028', label: 'Grad',  icon: '🎓' },
];

export default function About() {
  const itemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    itemsRef.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ref = i => el => { itemsRef.current[i] = el; };

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Who I Am</span>
          <h2 className="section-title" id="about-title">About Me</h2>
          <div className="section-divider" aria-hidden="true" />
        </div>

        {/* ── Quick-stat row ── */}
        <div className="about__stats-row fade-in" ref={ref(0)}>
          {STAT_CARDS.map(s => (
            <div key={s.label} className="about__stat-chip glass-card">
              <span className="about__stat-chip-icon" aria-hidden="true">{s.icon}</span>
              <span className="about__stat-chip-val">{s.val}</span>
              <span className="about__stat-chip-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="about__grid">
          {/* Left: narrative */}
          <div className="glass-card about__text fade-in delay-1" ref={ref(1)}>
            <p className="about__paragraph">
              I'm <strong>Dhanraj V L</strong>, a third-year undergraduate pursuing{' '}
              <strong>Computer Science and Data Science</strong> at{' '}
              <strong>Atria Institute of Technology, Bengaluru</strong>. I currently hold a
              CGPA of <strong>8.88</strong> and am expected to graduate in <strong>2028</strong>.
            </p>
            <p className="about__paragraph">
              My passion lies at the crossroads of <strong>Artificial Intelligence,
              Machine Learning</strong> and practical software development. I enjoy
              turning complex data into meaningful insights and building systems that
              solve real-world problems.
            </p>
            <p className="about__paragraph">
              I am continuously expanding my expertise in <strong>Python, Data Science</strong>{' '}
              and <strong>AI</strong>, eager to contribute to innovative technology projects
              that create a positive impact.
            </p>

            {/* Languages */}
            <div className="about__interests" style={{ marginTop: '20px' }}>
              <p className="about__interests-title">Languages Spoken</p>
              <div className="about__interests-tags">
                {LANGUAGES.map(l => (
                  <span key={l.label} className="tag tag-gold">
                    {l.flag}&nbsp;{l.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: info grid + interests */}
          <div>
            <div className="glass-card about__info-grid fade-in delay-2" ref={ref(2)}>
              {INFO_ITEMS.map(({ key, val, icon }) => (
                <div key={key} className="about__info-item">
                  <p className="about__info-key">
                    <span aria-hidden="true">{icon}</span> {key}
                  </p>
                  <p className="about__info-val">{val}</p>
                </div>
              ))}
            </div>

            <div
              className="glass-card about__interests fade-in delay-3"
              style={{ marginTop: '16px', padding: '20px 24px' }}
              ref={ref(3)}
            >
              <p className="about__interests-title">Interests &amp; Passions</p>
              <div className="about__interests-tags">
                {INTERESTS.map(({ label, icon }) => (
                  <span key={label} className="tag tag-cyan">
                    {icon}&nbsp;{label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
