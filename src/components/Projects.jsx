import React, { useEffect, useRef } from 'react';
import ufLogo from '../assets/UF.png';
import cafeLogo from '../assets/logo00.png';

const projects = [
  {
    id: 'sync-in-it',
    title: 'Sync In It',
    type: 'Android · Audio sharing',
    accent: '#7dd3fc',
    badge: 'ANDROID APP',
    logo: 'https://raw.githubusercontent.com/Shreyas-patil07/Sync-in-it/main/frontend/public/images/sync_in_it.png',
    logoAlt: 'Sync In It logo',
    github: 'https://github.com/Shreyas-patil07/Sync-in-it',
    tags: ['Android', 'Kotlin', 'FastAPI', 'LiveKit Cloud', 'WebRTC'],
    description: 'An Android-first app that streams a host device’s audio to multiple phones over the internet using QR-based invitations.',
    architecture: 'Android + FastAPI / LiveKit Cloud',
    featured: true,
  },
  {
    id: 'dex',
    title: 'Dex',
    type: 'Full-stack · Entertainment',
    accent: '#c4b5fd',
    badge: 'LIVE PRODUCT',
    logo: 'https://raw.githubusercontent.com/Shreyas-patil07/Dex/main/frontend/public/Dex_icon.png',
    logoAlt: 'Dex app icon',
    github: 'https://github.com/Shreyas-patil07/Dex',
    url: 'https://dex-list.vercel.app/',
    tags: ['React 19', 'TypeScript', 'FastAPI', 'Firebase', 'TMDB API'],
    description: 'An entertainment platform for discovering movies and series, tracking watch history, and getting recommendations shaped by personal taste.',
    architecture: 'React + FastAPI / Firebase',
    featured: true,
  },
  {
    id: 'unifind',
    title: 'UNIFIND',
    type: 'Web app · Student marketplace',
    accent: '#4ade80',
    badge: 'HACKATHON WINNER',
    logo: ufLogo,
    logoAlt: 'UNIFIND logo',
    github: 'https://github.com/Shreyas-patil07/UNIFIND',
    url: 'https://teamgambit.tech/home',
    tags: ['React', 'FastAPI', 'Firebase', 'AI Matching'],
    description: 'A university marketplace that helps students trade, connect, and build community through real-time interactions and AI-powered matching.',
    architecture: 'Microservices / Event-driven',
  },
  {
    id: 'cafe',
    title: 'Gaming Cafe Manager',
    type: 'Desktop · Business management',
    accent: '#fbbf24',
    badge: 'OFFLINE-FIRST',
    logo: cafeLogo,
    logoAlt: 'Gaming Cafe logo',
    github: 'https://github.com/Shreyas-patil07/gaming_cafe_manager',
    tags: ['React', 'Node.js', 'SQLite', 'Offline-first'],
    description: 'A management system for gaming centers, covering billing, session tracking, and inventory with local-first operation.',
    architecture: 'Local-first / SQLite',
  },
];

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('v');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.08 }
    );

    sectionRef.current?.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '760px',
          height: '760px',
          top: '-300px',
          right: '-360px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.055) 0%, transparent 68%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div className="inner" style={{ position: 'relative' }}>
        <div className="reveal" style={{ marginBottom: '44px' }}>
          <span className="ey">02 — Work</span>
          <h2 className="sh2">Selected <span className="tg">Projects.</span></h2>
          <p style={{ color: '#9CA3AF', fontSize: '1rem', marginTop: '12px', maxWidth: '500px', lineHeight: 1.7 }}>
            A selection of products and tools I’ve designed, developed, and shipped.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={'project-tile reveal' + (project.featured ? ' project-tile-featured' : '')}
              style={{ '--project-accent': project.accent, transitionDelay: (index * 0.07) + 's' }}
            >
              <div className="project-tile-top">
                <img
                  className="project-tile-logo"
                  src={project.logo}
                  alt={project.logoAlt}
                  loading="lazy"
                />
                <span className="project-tile-badge">{project.badge}</span>
              </div>

              <div className="project-tile-heading">
                <h3>{project.title}</h3>
                <span>{project.type}</span>
              </div>

              <p className="project-tile-description">{project.description}</p>

              <div className="project-tile-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="project-tile-tag">{tag}</span>
                ))}
              </div>

              <div className="project-tile-bottom">
                <span className="project-tile-architecture">{project.architecture}</span>
                <div className="project-tile-links">
                  <a href={project.github} target="_blank" rel="noreferrer" aria-label={'View ' + project.title + ' source on GitHub'}>
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noreferrer" aria-label={'Visit ' + project.title + ' website'}>
                      Live site <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
