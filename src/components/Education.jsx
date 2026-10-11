import { useEffect, useRef } from 'react';

const EDUCATION = [
  {
    year: '2024 – 2028 (Expected)',
    degree: 'Bachelor of Engineering',
    stream: 'Computer Science & Data Science',
    institution: 'Atria Institute of Technology, Bengaluru',
    detail:
      'Pursuing a BE in Computer Science with a specialisation in Data Science. ' +
      'The programme covers core CS fundamentals alongside applied machine learning, ' +
      'data analysis, and software engineering practices.',
    cgpa: '8.88',
    current: true,
  },
  {
    year: 'Completed 2024',
    degree: 'Pre-University Certificate (PUC)',
    stream: 'Science (PCMC)',
    institution: 'Karnataka State Board',
    detail:
      'Completed 10+2 with Physics, Chemistry, Mathematics and Computer Science, ' +
      'laying the analytical and scientific foundation for higher studies in CS.',
    cgpa: null,
    current: false,
  },
];

export default function Education() {
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    itemRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Academic Journey</span>
          <h2 className="section-title" id="education-title">Education</h2>
          <div className="section-divider" aria-hidden="true" />
        </div>

        <div className="education__timeline" role="list" aria-label="Education timeline">
          {EDUCATION.map((edu, i) => (
            <div
              key={edu.degree + edu.stream}
              className={`edu-item fade-in delay-${i + 1}`}
              ref={el => (itemRefs.current[i] = el)}
              role="listitem"
            >
              {/* Timeline dot */}
              <div className="edu-item__dot" aria-hidden="true">
                <div
                  className="edu-item__dot-circle"
                  style={
                    edu.current
                      ? { background: 'var(--gold)', boxShadow: '0 0 12px var(--gold)' }
                      : {}
                  }
                />
              </div>

              {/* Card */}
              <article
                className="glass-card edu-item__card"
                style={edu.current ? { borderColor: 'rgba(216,173,85,0.3)' } : {}}
              >
                {/* Year + current badge */}
                <div className="edu-item__meta-row">
                  {edu.current && (
                    <span className="edu-item__current-badge">● Current</span>
                  )}
                  <span className="edu-item__year">{edu.year}</span>
                </div>

                {/* Degree */}
                <h3 className="edu-item__degree">{edu.degree}</h3>
                <p className="edu-item__stream">{edu.stream}</p>

                {/* Institution */}
                <div className="edu-item__inst-row">
                  <span aria-hidden="true">🏫</span>
                  <p className="edu-item__institution">{edu.institution}</p>
                </div>

                <p className="edu-item__detail">{edu.detail}</p>

                {/* CGPA chip */}
                {edu.cgpa && (
                  <div className="edu-item__cgpa" aria-label={`Current CGPA: ${edu.cgpa}`}>
                    ⭐ CGPA&nbsp;<strong>{edu.cgpa}</strong>&nbsp;/ 10
                  </div>
                )}
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
