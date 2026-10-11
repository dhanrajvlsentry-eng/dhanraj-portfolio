import { useEffect, useRef } from 'react';

const SKILLS = [
  {
    icon: '🐍',
    name: 'Python',
    color: 'blue',
    desc: 'Primary language for scripting, automation, data processing, and building AI/ML pipelines.',
  },
  {
    icon: '📊',
    name: 'Data Science',
    color: 'cyan',
    desc: 'Collecting, cleaning, analysing and visualising data to extract actionable insights.',
  },
  {
    icon: '🤖',
    name: 'Artificial Intelligence',
    color: 'gold',
    desc: 'Studying AI concepts and algorithms and applying them to real-world problem domains.',
  },
  {
    icon: '🧠',
    name: 'Machine Learning',
    color: 'blue',
    desc: 'Building predictive models using supervised and unsupervised learning techniques.',
  },
];

const TECH_PILLS = [
  { label: 'Python',               emoji: '🐍' },
  { label: 'Data Analysis',        emoji: '📈' },
  { label: 'Machine Learning',     emoji: '🤖' },
  { label: 'Artificial Intelligence', emoji: '🧠' },
  { label: 'Data Visualisation',   emoji: '📊' },
  { label: 'Problem Solving',      emoji: '💡' },
  { label: 'Software Development', emoji: '💻' },
  { label: 'Algorithms',           emoji: '⚙️' },
];

const COLOR_MAP = {
  blue: { border: 'rgba(22,119,255,0.35)', glow: 'rgba(22,119,255,0.15)', top: 'var(--blue)' },
  cyan: { border: 'rgba(66,221,245,0.35)', glow: 'rgba(66,221,245,0.12)', top: 'var(--cyan)' },
  gold: { border: 'rgba(216,173,85,0.35)', glow: 'rgba(216,173,85,0.12)', top: 'var(--gold)' },
};

export default function Skills() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    cardRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">What I Know</span>
          <h2 className="section-title" id="skills-title">Skills &amp; Expertise</h2>
          <div className="section-divider" aria-hidden="true" />
        </div>

        <div className="skills__grid">
          {SKILLS.map((skill, i) => {
            const c = COLOR_MAP[skill.color];
            return (
              <article
                key={skill.name}
                className={`glass-card skill-card fade-in delay-${i + 1}`}
                ref={el => (cardRefs.current[i] = el)}
                aria-label={`Skill: ${skill.name}`}
                style={{
                  '--skill-border': c.border,
                  '--skill-glow':   c.glow,
                  '--skill-top':    c.top,
                  borderColor:      c.border,
                }}
              >
                <div className="skill-card__icon-wrap" aria-hidden="true">
                  <span className="skill-card__icon">{skill.icon}</span>
                </div>
                <h3 className="skill-card__name">{skill.name}</h3>
                <p className="skill-card__desc">{skill.desc}</p>
              </article>
            );
          })}
        </div>

        {/* Tech pills */}
        <div
          className="skills__tech-row fade-in delay-5"
          ref={el => (cardRefs.current[SKILLS.length] = el)}
          aria-label="Technology tags"
        >
          {TECH_PILLS.map(({ label, emoji }) => (
            <span key={label} className="skills__tech-pill" aria-label={label}>
              <span aria-hidden="true">{emoji}</span>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
