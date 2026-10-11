import { useEffect, useRef } from 'react';

const PROJECTS = [
  {
    icon: '💼',
    accentColor: 'cyan',
    title: 'FinTech',
    subtitle: 'All-in-One Business Operations Platform',
    status: 'In Progress',
    desc:
      'A comprehensive FinTech platform designed to streamline and centralise business ' +
      'operations, bringing together financial management and operational tools into a ' +
      'single cohesive solution.',
    features: [
      'Centralised dashboard for business operational overview',
      'Financial data management and transaction tracking',
      'Streamlined workflow for business processes',
      'Integrated reporting to support business decisions',
    ],
    tags: ['Python', 'FinTech', 'Business Ops', 'Data Management'],
  },
];

const ACCENT = {
  cyan: {
    border:  'rgba(66,221,245,0.3)',
    top:     'var(--cyan)',
    tagClass:'tag-cyan',
    badge:   'rgba(66,221,245,0.12)',
    badgeTxt:'var(--cyan)',
  },
  gold: {
    border:  'rgba(216,173,85,0.3)',
    top:     'var(--gold)',
    tagClass:'tag-gold',
    badge:   'rgba(216,173,85,0.12)',
    badgeTxt:'var(--gold)',
  },
};

export default function Projects() {
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
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">What I've Built</span>
          <h2 className="section-title" id="projects-title">Projects</h2>
          <div className="section-divider" aria-hidden="true" />
        </div>

        <div className="projects__grid">
          {PROJECTS.map((project, i) => {
            const ac = ACCENT[project.accentColor] || ACCENT.cyan;
            return (
              <article
                key={project.title}
                className={`glass-card project-card fade-in delay-${i + 1}`}
                ref={el => (cardRefs.current[i] = el)}
                aria-label={`Project: ${project.title}`}
                style={{ '--proj-top': ac.top, '--proj-border': ac.border }}
              >
                {/* Top accent bar */}
                <div className="project-card__accent-bar" aria-hidden="true" />

                {/* Header */}
                <div className="project-card__header">
                  <div
                    className="project-card__icon"
                    style={{ borderColor: ac.border }}
                    aria-hidden="true"
                  >
                    {project.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__subtitle">{project.subtitle}</p>
                  </div>
                  {/* Status badge */}
                  <span
                    className="project-card__status"
                    style={{ background: ac.badge, color: ac.badgeTxt }}
                    aria-label={`Status: ${project.status}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Body */}
                <div className="project-card__body">
                  <p className="project-card__desc">{project.desc}</p>
                  <ul className="project-card__features" aria-label="Project highlights">
                    {project.features.map(feat => (
                      <li key={feat} className="project-card__feature">{feat}</li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <footer className="project-card__footer">
                  {project.tags.map(tag => (
                    <span key={tag} className={`tag ${ac.tagClass}`}>{tag}</span>
                  ))}
                </footer>
              </article>
            );
          })}

          {/* Coming-soon card */}
          <div
            className="glass-card project-card project-card--teaser fade-in delay-2"
            ref={el => (cardRefs.current[PROJECTS.length] = el)}
            aria-label="More projects coming soon"
          >
            <div className="project-card__teaser-inner">
              <span className="project-card__teaser-icon" aria-hidden="true">🚀</span>
              <h3 className="project-card__title" style={{ color: 'var(--text-secondary)' }}>
                More Projects Coming
              </h3>
              <p className="project-card__desc">
                Currently working on new AI and data-science projects.
                Stay tuned!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
