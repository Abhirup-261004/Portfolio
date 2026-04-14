import { useEffect, useState } from 'react';

const emptyState = {
  nav: [],
  hero: {},
  stats: [],
  services: [],
  highlights: [],
  experience: [],
  process: [],
  stackGroups: [],
  cta: {},
  contact: {},
  socialLinks: []
};

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export default function App() {
  const [portfolio, setPortfolio] = useState(emptyState);
  const [status, setStatus] = useState('loading');
  const [activeProjectImages, setActiveProjectImages] = useState({});

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        setPortfolio(data);
        setStatus('ready');
      } catch (error) {
        console.error('Failed to load portfolio', error);
        setStatus('error');
      }
    }

    loadPortfolio();
  }, []);

  if (status === 'loading') {
    return (
      <main className="status-screen">
        <p>Loading your portfolio experience...</p>
      </main>
    );
  }

  if (status === 'error') {
    return (
      <main className="status-screen">
        <p>Unable to load portfolio data. Please start the Node backend.</p>
      </main>
    );
  }

  const {
    nav,
    hero,
    stats,
    services,
    highlights,
    projects,
    process,
    stackGroups,
    cta,
    experience,
    contact,
    socialLinks
  } = portfolio;

  function getActiveProjectImage(project, index) {
    const selectedIndex = activeProjectImages[project.title] ?? 0;
    return project.images?.[selectedIndex] ?? project.images?.[0] ?? '';
  }

  return (
    <div className="page-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="site-header">
        <div className="brand-lockup">
          <span className="brand-mark">AN</span>
          <div>
            <strong>{hero.name}</strong>
            <p>{hero.role}</p>
          </div>
        </div>

        <nav className="site-nav">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="outline-button" href={`mailto:${contact.email}`}>
          Let&apos;s talk
        </a>
      </header>

      <main>
        <section className="hero-grid" id="home">
          <div className="hero-copy">
            <span className="eyebrow">{hero.eyebrow}</span>
            <h1>{hero.headline}</h1>
            <p className="hero-description">{hero.description}</p>

            <div className="hero-actions">
              <a className="primary-button" href="#projects">
                View projects
              </a>
              <a className="text-link" href={hero.resumeLink}>
                Download CV
              </a>
            </div>

            <div className="social-row">
              {socialLinks.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hero-card">
            <div className="portrait-card">
              <div className="portrait-gradient" />
              <div className="portrait-content">
                <p>Currently building</p>
                <h3>{hero.currentFocus}</h3>
                <span>{hero.location}</span>
              </div>
            </div>
            <div className="mini-panel">
              <p>Signature approach</p>
              <strong>{hero.signature}</strong>
            </div>
          </div>
        </section>

        <section className="stats-grid" aria-label="Highlights">
          {stats.map((item) => (
            <article key={item.label} className="stat-card">
              <strong>{item.value}</strong>
              <p>{item.label}</p>
            </article>
          ))}
        </section>

        <section className="card-grid" aria-label="Strengths">
          {highlights.map((item) => (
            <article key={item.title} className="info-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </section>

        <section className="two-column-section" id="about">
          <SectionTitle
            eyebrow="About"
            title="I craft clean, story-driven digital experiences."
            description={hero.about}
          />
          <div className="about-card">
            <p>{hero.longBio}</p>
            <div className="tag-row">
              {hero.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="services">
          <SectionTitle
            eyebrow="Services"
            title="What I can help you build"
            description="From polished portfolio sites to dynamic web applications, I offer a range of services focused on clean design, efficient code, and thoughtful product decisions."
          />
          <div className="card-grid">
            {services.map((service) => (
              <article key={service.title} className="info-card">
                <span className="card-index">{service.index}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects">
          <SectionTitle
            eyebrow="Projects"
            title="Projects that reflect my approach to building products"
            description="A selection of work that reflects my approach to building thoughtful, user-focused products with React and Node.js."
          />
          <div className="project-showcase">
            {projects.map((project, index) => (
              <article
                key={project.id ?? project.title}
                className={`project-showcase-card ${index === 0 ? 'is-featured' : ''}`}
              >
                <div className="project-showcase-visual">
                  <img
                    src={getActiveProjectImage(project, index)}
                    alt={`${project.title} preview`}
                    className="project-showcase-main-image"
                  />
                  <div className="project-showcase-thumbs">
                    {(project.images ?? []).map((image, imageIndex) => (
                      <button
                        key={`${project.title}-${imageIndex}`}
                        type="button"
                        className={`project-showcase-thumb-button ${
                          (activeProjectImages[project.title] ?? 0) === imageIndex ? 'is-active' : ''
                        }`}
                        onClick={() =>
                          setActiveProjectImages((current) => ({
                            ...current,
                            [project.title]: imageIndex
                          }))
                        }
                        aria-label={`Show ${project.title} screenshot ${imageIndex + 1}`}
                      >
                        <img
                          src={image}
                          alt={`${project.title} screen ${imageIndex + 1}`}
                          className="project-showcase-thumb"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="project-showcase-top">
                  <span>{project.category}</span>
                  <strong>{project.metric}</strong>
                </div>

                <div className="project-showcase-copy">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>

                <div className="project-showcase-footer">
                  <div className="tag-row">
                    {project.techStack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>

                  <div className="project-showcase-meta">
                    <p>{project.metricLabel}</p>
                    <div className="project-showcase-links">
                      <a href={project.github} target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                      <a href={project.liveLink} target="_blank" rel="noreferrer">
                        Live Server
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="two-column-layout" id="process">
          <div>
            <SectionTitle
              eyebrow="Process"
              title="A simple, user-focused approach to building products"
              description="I like keeping the process simple, collaborative, and grounded in the final user experience."
            />
          </div>
          <div className="process-list">
            {process.map((item) => (
              <article key={item.step} className="process-card">
                <span className="process-step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="stack">
          <SectionTitle
            eyebrow="Stack"
            title="Tools and technologies I rely on most"
            description="A focus on React and Node.js, with a flexible approach to learning and adopting new tools as needed for each project."
          />
          <div className="stack-grid">
            {stackGroups.map((group) => (
              <article key={group.title} className="stack-card">
                <h3>{group.title}</h3>
                <div className="tag-row">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="interactive-cta" aria-label="Call to action">
          <div className="interactive-cta-copy">
            <span className="eyebrow">{cta.eyebrow}</span>
            <h2>{cta.title}</h2>
            <p>{cta.description}</p>

            <div className="hero-actions">
              <a className="primary-button" href={cta.primaryHref}>
                {cta.primaryLabel}
              </a>
              <a
                className="outline-button"
                href={cta.secondaryHref}
                target="_blank"
                rel="noreferrer"
              >
                {cta.secondaryLabel}
              </a>
            </div>
          </div>

          <div className="interactive-cta-panel">
            <div className="interactive-cta-list">
              {cta.availability?.map((item) => (
                <div key={item} className="interactive-cta-item">
                  <span className="interactive-cta-dot" />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="interactive-cta-mini-grid">
              <article className="interactive-cta-mini-card">
                <strong>UI Focus</strong>
                <p>Interfaces that feel clean, fast, and intentional across devices.</p>
              </article>
              <article className="interactive-cta-mini-card">
                <strong>Build Quality</strong>
                <p>Simple architecture, maintainable code, and product-minded execution.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="two-column-layout" id="experience">
          <div>
            <SectionTitle
              eyebrow="Experience"
              title="My journey through various roles and responsibilities"
            />
          </div>
          <div className="timeline">
            {experience.map((item) => (
              <article key={`${item.company}-${item.period}`} className="timeline-item">
                <div>
                  <span>{item.period}</span>
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                </div>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-banner" id="contact">
          <div>
            <span className="eyebrow">Contact</span>
            <h2>{contact.heading}</h2>
            <p>{contact.description}</p>
          </div>
          <div className="contact-actions">
            <a className="primary-button" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <a className="outline-button" href={`tel:${contact.phone}`}>
              {contact.phoneDisplay}
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Built with React, Node.js, and a careful eye for product details.</p>
        <div className="social-row">
          {socialLinks.map((item) => (
            <a key={`footer-${item.label}`} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
