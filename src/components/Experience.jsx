import React, { useEffect, useRef } from 'react';

const entries = [
  {
    kind: 'EXPERIENCE',
    title: 'Back-end Web Development Intern',
    organization: 'ElevanceSkills',
    period: '11–18 August 2026',
    description: 'Completed a focused internship in back-end web development, applying technical problem-solving, adaptability, teamwork, and clear communication.',
    accent: '#a78bfa',
  },
  {
    kind: 'EDUCATION',
    title: 'B.E. Computer Engineering',
    organization: 'Smt. Indira Gandhi College of Engineering · Ghansoli',
    period: 'June 2024 – June 2028',
    description: 'Currently in the third year of the undergraduate Computer Engineering programme.',
    accent: '#60a5fa',
  },
];

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('v');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    sectionRef.current?.querySelectorAll('.reveal').forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef}>
      <div className="inner">
        <div className="reveal" style={{ marginBottom: '36px' }}>
          <span className="ey">02 — Background</span>
          <h2 className="sh2">Experience & <span className="tg">Education.</span></h2>
          <p style={{ color: '#9CA3AF', fontSize: '1rem', marginTop: '12px', lineHeight: 1.7, maxWidth: '540px' }}>
            The academic foundation and practical experience behind the work.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '18px' }}>
          {entries.map(entry => (
            <article key={entry.kind} className="reveal" style={{
              padding: '26px', borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)',
              borderTop: '2px solid ' + entry.accent,
              background: 'linear-gradient(145deg, rgba(19,24,36,0.78), rgba(10,13,20,0.78))',
            }}>
              <div style={{ color: entry.accent, fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.12em', marginBottom: '20px' }}>{entry.kind}</div>
              <h3 style={{ color: '#f3f4f6', fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.35rem', fontWeight: 700, marginBottom: '7px' }}>{entry.title}</h3>
              <div style={{ color: '#c4b5fd', fontSize: '13px', marginBottom: '8px' }}>{entry.organization}</div>
              <div style={{ color: '#737d8c', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', marginBottom: '16px' }}>{entry.period}</div>
              <p style={{ color: '#9CA3AF', fontSize: '13px', lineHeight: 1.75 }}>{entry.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
