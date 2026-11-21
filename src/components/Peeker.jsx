import React, { useState, useEffect, useRef } from 'react';
import mascot from '../assets/Github_01.png';

const Peeker = () => {
  const [peekState, setPeekState] = useState({
    active: false,
    side: Math.random() > 0.5 ? 'left' : 'right',
    top: Math.floor(Math.random() * 55 + 20) + '%'
  });

  const [isHiddenByFooter, setIsHiddenByFooter] = useState(false);
  const isHiddenRef = useRef(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleFooter = (e) => {
      isHiddenRef.current = e.detail;
      setIsHiddenByFooter(e.detail);
      if (e.detail) setPeekState(prev => ({ ...prev, active: false }));
    };

    window.addEventListener('footer-visible', handleFooter);
    return () => window.removeEventListener('footer-visible', handleFooter);
  }, []);

  useEffect(() => {
    let timerId;
    let frameId;

    const scheduleNextPeek = (delay) => {
      timerId = setTimeout(showPeek, delay);
    };

    const showPeek = () => {
      if (isHiddenRef.current) {
        scheduleNextPeek(1000);
        return;
      }

      const side = Math.random() > 0.5 ? 'left' : 'right';
      const top = Math.floor(Math.random() * 55 + 20) + '%';

      // Move the hidden mascot first; reveal it on the next frame.
      setPeekState({ active: false, side, top });
      frameId = requestAnimationFrame(() => {
        if (isHiddenRef.current) {
          scheduleNextPeek(1000);
          return;
        }

        setPeekState(prev => ({ ...prev, active: true }));
        timerId = setTimeout(() => {
          setPeekState(prev => ({ ...prev, active: false }));
          scheduleNextPeek(800 + Math.random() * 6000 + 6000);
        }, 2500);
      });
    };

    scheduleNextPeek(3000);

    return () => {
      clearTimeout(timerId);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const isVisible = peekState.active && !isHiddenByFooter;
  const imgSize = isMobile ? 110 : 160;
  const revealPct = 40;
  const hidePct = 115;

  const buildTransform = (side, visible) => {
    const tx = side === 'left'
      ? `translateX(${visible ? `-${100 - revealPct}%` : `-${hidePct}%`})`
      : `translateX(${visible ? `${100 - revealPct}%` : `${hidePct}%`})`;
    return `translateY(-50%) ${tx}`;
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: peekState.top,
        left: peekState.side === 'left' ? 0 : 'auto',
        right: peekState.side === 'right' ? 0 : 'auto',
        width: `${imgSize}px`,
        transform: buildTransform(peekState.side, isVisible),
        transition: peekState.active && !isHiddenByFooter
          ? 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          : 'none',
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    >
      <img
        src={mascot}
        alt="Peeking Character"
        style={{
          width: `${imgSize}px`,
          height: 'auto',
          display: 'block',
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.6))',
          transform: `${peekState.side === 'right' ? 'scaleX(-1) ' : ''}${
            isVisible ? 'rotate(35deg) scale(1)' : 'rotate(0deg) scale(0.7)'
          }`,
          transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transformOrigin: 'bottom center',
        }}
      />
    </div>
  );
};

export default Peeker;
