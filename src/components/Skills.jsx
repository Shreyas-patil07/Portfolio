import React, { useEffect, useRef } from 'react';

const categories = [
  {
    id: 'languages',
    title: 'Languages',
    items: ['Python', 'Dart', 'SQL', 'HTML', 'C++', 'CSS'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    items: ['React', 'Vite', 'Flutter'],
  },
  {
    id: 'backend',
    title: 'Backend',
    items: ['FastAPI', 'Flask', 'REST API'],
  },
  {
    id: 'database',
    title: 'Databases',
    items: ['Firebase Firestore', 'Supabase', 'SQLite', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'security',
    title: 'Authentication & Security',
    items: ['Firebase Auth', 'JWT', 'Argon2'],
  },
  {
    id: 'ai',
    title: 'AI & Integrations',
    items: ['Gemini API', 'Prompt Engineering', 'LLM Integration'],
  },
  {
    id: 'cloud',
    title: 'Cloud & Deployment',
    items: ['Vercel', 'Render', 'Cloudinary'],
  },
  {
    id: 'tools',
    title: 'Tools',
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
          <span className="ey">03 — Skills</span>
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
          gap: '14px',
        }}>
          {categories.map(category => (
            <div
              key={category.id}
              className="reveal"
              style={{
                padding: '22px',
                borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(13,17,23,0.42)',
                transition: 'border-color 0.25s ease, background 0.25s ease',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                marginBottom: '18px',
              }}>
                <h3 style={{
                  color: '#e0e2e6',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 650,
                  letterSpacing: '-0.015em',
                }}>
                  {category.title}
                </h3>
                <span style={{
                  color: '#6b7280',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                }}>
                  {String(category.items.length).padStart(2, '0')}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {category.items.map(item => (
                  <span
                    key={item}
                    style={{
                      padding: '7px 10px',
                      borderRadius: '7px',
                      border: '1px solid rgba(255,255,255,0.06)',
                      background: 'rgba(255,255,255,0.025)',
                      color: '#aeb4c0',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '12px',
                      lineHeight: 1.2,
                    }}
                  >
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
