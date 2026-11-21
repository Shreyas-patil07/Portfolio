import React, { useState, useEffect, useRef } from 'react';
import mascot from '../assets/Github_01.png';

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const Peeker = () => {
  const [peekState, setPeekState] = useState({
    active: false,
    side: Math.random() > 0.5 ? 'left' : 'right',
    top: randomBetween(18, 78) + '%',
    skipTransition: true
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

      // Keep the normal exit animation when the footer comes into view.
      if (e.detail) {
        setPeekState(prev => ({ ...prev, active: false, skipTransition: false }));
      }
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
      const top = randomBetween(18, 78) + '%';

      // Relocate while hidden without animating across the screen.
      setPeekState({
        active: false,
        side,
        top,
        skipTransition: true
      });

      frameId = requestAnimationFrame(() => {
        if (isHiddenRef.current) {
          scheduleNextPeek(1000);
          return;
        }

        // The reveal always uses the same animation, regardless of position.
        setPeekState(prev => ({ ...prev, active: true, skipTransition: false }));

        timerId = setTimeout(() => {
          // The exit uses the same transition as the entrance.
          setPeekState(prev => ({ ...prev, active: false, skipTransition: false }));
          scheduleNextPeek(randomBetween(6000, 12000));
        }, randomBetween(2200, 3200));
      });
    };

    scheduleNextPeek(randomBetween(2500, 6000));

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
        transition: peekState.skipTransition
          ? 'none'
          : 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
          transition: peekState.skipTransition
            ? 'none'
            : 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transformOrigin: 'bottom center',
        }}
      />
    </div>
  );
};

export default Peeker;
