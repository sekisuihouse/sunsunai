import React, { useEffect, useRef, useState } from 'react';

/**
 * RevealMotion — the site's .js-fade scroll reveal: starts opacity 0 / translateY(15px),
 * becomes visible with `all .8s ease-in-out` when scrolled into view.
 */
export function RevealMotion({ children, delay = 0, as = 'div', style }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShow(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShow(true); io.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} style={{
      opacity: show ? 'var(--km-opacity-visible)' : 'var(--km-opacity-hidden)',
      transform: show ? 'translateY(0)' : 'translateY(15px)',
      transition: 'var(--km-motion-reveal)',
      transitionDelay: `${delay}ms`,
      ...style,
    }}>{children}</Tag>
  );
}
