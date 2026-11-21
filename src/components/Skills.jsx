import React, { useEffect, useRef } from 'react';

const categories = [
  {
    id: 'languages',
    title: 'Languages',
    accent: '#a78bfa',
    items: ['Python', 'Kotlin', 'TypeScript', 'Dart', 'SQL', 'HTML', 'C++', 'CSS'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    accent: '#60a5fa',
    items: ['React', 'Vite', 'Flutter'],
  },
  {
    id: 'backend',
    title: 'Backend',
    accent: '#34d399',
    items: ['FastAPI', 'Flask', 'Node.js', 'REST API'],
  },
  {
    id: 'database',
    title: 'Databases',
    accent: '#38bdf8',
    items: ['Firebase Firestore', 'Supabase', 'SQLite', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'security',
    title: 'Authentication & Security',
    accent: '#f472b6',
    items: ['Firebase Auth', 'JWT', 'Argon2'],
  },
  {
    id: 'ai',
    title: 'AI & Integrations',
    accent: '#c084fc',
    items: ['Gemini API', 'TMDB API', 'LiveKit Cloud', 'WebRTC', 'Prompt Engineering', 'LLM Integration'],
  },
  {
    id: 'cloud',
    title: 'Cloud & Deployment',
    accent: '#2dd4bf',
    items: ['Vercel', 'Render', 'Cloudinary'],
  },
  {
    id: 'tools',
    title: 'Tools',
    accent: '#fbbf24',
    items: ['Git & GitHub', 'Postman', 'Android Studio', 'VS Code', 'Antigravity'],
  },
];

const totalSkills = categories.reduce((total, category) => total + category.items.length, 0);

const Skills = () => {
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
    <section id="skills" ref={sectionRef}>
      <div className="inner">
        <div className="reveal" style={{ marginBottom: '40px' }}>
          <span className="ey">04 — Skills</span>
          <h2 className="sh2">Tools I <span className="tg">Use.</span></h2>
          <p style={{ color: '#9CA3AF', fontSize: '1rem', marginTop: '12px', lineHeight: 1.7, maxWidth: '520px' }}>
            Technologies and tools I use to design, build, and ship projects.
          </p>
          <p style={{
            color: '#6b7280',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.04em',
            marginTop: '18px',
          }}>
            {categories.length} CATEGORIES <span style={{ color: '#4b5563', padding: '0 7px' }}>·</span> {totalSkills} TECHNOLOGIES
          </p>
        </div>

        <div className="skills-grid">
          {categories.map(category => (
            <div
              key={category.id}
              className="skill-category-card reveal"
              style={{ '--skill-accent': category.accent }}
            >
              <div className="skill-category-heading">
                <span className="skill-category-dot" />
                <h3>{category.title}</h3>
                <span className="skill-category-count">
                  {String(category.items.length).padStart(2, '0')}
                </span>
              </div>

              <div className="skill-tags">
                {category.items.map(item => (
                  <span key={item} className="skill-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
