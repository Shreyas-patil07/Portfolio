import React, { useEffect, useRef } from 'react';

const DexTeaser = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: '🎬', title: 'Discover Movies & Series', desc: 'Explore trending titles, search across movies and TV, and open detailed pages with credits, videos, and India streaming availability when provided by TMDB.' },
    { icon: '📚', title: 'Track Your Watch History', desc: 'Organize titles as watched, want-to-watch, or in-future, with optional ratings, dates, and personal notes.' },
    { icon: '🧠', title: 'Build Your Taste Profile', desc: 'Watched titles contribute genre, keyword, people, and decade signals to an evolving personal entertainment profile.' },
    { icon: '✨', title: 'Get Personalised Picks', desc: 'Explore three recommendation lanes: Safe for relevance, Adjacent for variety, and Wildcard for more novel discoveries.' },
  ];

  return (
    <section id="dex" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: '1200px', height: '1200px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 55%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="inner" style={{ position: 'relative' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="ey" style={{ justifyContent: 'center' }}>04 — Featured Build</span>
          <h2 className="sh2" style={{ marginBottom: '20px' }}>
            Introducing <span className="tg">Dex.</span>
          </h2>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '8px', background: 'rgba(196,181,253,0.08)', border: '1px solid rgba(196,181,253,0.22)', marginBottom: '20px' }}>
            <span className="pulse-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#c4b5fd', display: 'inline-block', flexShrink: 0, boxShadow: '0 0 8px rgba(196,181,253,0.5)' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#c4b5fd', letterSpacing: '0.07em', fontWeight: 600 }}>PRODUCT IN DEVELOPMENT</span>
          </div>

          <p style={{ color: '#9CA3AF', fontSize: '1.1rem', maxWidth: '620px', margin: '0 auto', lineHeight: 1.75 }}>
            Discover films and series, keep a structured watch history, and build an entertainment taste profile that powers personalised recommendations.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '28px' }}>
            <a className="btn-primary btn-m" href="https://dex-list.vercel.app/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
              Explore Dex ↗
            </a>
            <a className="btn-secondary btn-m" href="https://github.com/Shreyas-patil07/Dex" target="_blank" rel="noreferrer">
              View Source ↗
            </a>
          </div>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px', marginBottom: '56px' }}>
          {features.map((f) => (
            <div key={f.title} className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '28px', lineHeight: 1 }}>{f.icon}</span>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#e0e2e6' }}>{f.title}</h3>
              <p style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal glass-hi" style={{ borderRadius: '20px', padding: '40px', maxWidth: '860px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', gap: '7px', marginBottom: '24px', alignItems: 'center' }}>
            {['#f87171', '#fbbf24', '#34d399'].map((c, i) => (
              <div key={i} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c, opacity: 0.7 }} />
            ))}
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#4b5563', marginLeft: 'auto' }}>GET /api/recommendations</span>
          </div>
          <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(10px, 2.8vw, 13px)', lineHeight: 1.9, overflowX: 'auto' }}>
            <code>
              <span className="sh-c">// Personalised recommendations for the signed-in user</span>{'\n'}
              <span className="sh-p">const</span>{' '}
              <span style={{ color: '#e0e2e6', fontWeight: 600 }}>response</span>{' = '}
              <span className="sh-s2">await</span>{' '}
              <span className="sh-s2">fetch</span><span className="sh-p">('/api/recommendations', {'{'}</span>{'\n'}
              {'  '}<span className="sh-key">headers</span><span className="sh-p">: {'{'}</span>{'\n'}
              {'    '}<span className="sh-key">Authorization</span><span className="sh-p">: </span><span className="sh-str">'Bearer firebase-id-token'</span>{'\n'}
              {'  '}<span className="sh-p">{'}'}</span>{'\n'}
              <span className="sh-p">{'}');</span>{'\n'}
              <span className="sh-p">const</span>{' '}
              <span style={{ color: '#e0e2e6', fontWeight: 600 }}>recommendations</span>{' = '}
              <span className="sh-s2">await</span>{' '}
              <span className="sh-s2">response.json</span><span className="sh-p">();</span>{'\n'}
              <span className="sh-c">// safe · adjacent · wildcard</span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default DexTeaser;
