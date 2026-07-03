import React, { useState } from 'react';

/**
 * HoverMaskLink — image link whose picture is revealed/zoomed through a circular mask
 * on hover (desktop-only effect on the original site, min-width 768px).
 */
export function HoverMaskLink({ src, alt = '', href = '#', width = '100%', aspectRatio = '3 / 2', label, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'block', width, textDecoration: 'none', color: 'var(--km-color-text)' }}
    >
      <span style={{ display: 'block', position: 'relative', width: '100%', aspectRatio, overflow: 'hidden' }}>
        <img
          src={src}
          alt={alt}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            transform: hover ? 'scale(1.05)' : 'scale(1)',
            transition: 'var(--km-motion-base)',
          }}
        />
        {/* circular mask sweep */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', left: '50%', top: '50%',
            width: '20%', aspectRatio: '1',
            borderRadius: 'var(--km-radius-circle)',
            background: 'rgba(255,255,255,.35)',
            transform: `translate(-50%,-50%) scale(${hover ? 16 : 0})`,
            opacity: hover ? 0 : 1,
            transition: 'transform .6s ease-in-out, opacity .6s ease-in-out',
            pointerEvents: 'none',
          }}
        />
      </span>
      {label && (
        <span style={{
          display: 'block', marginTop: 'var(--km-space-3)',
          fontFamily: 'var(--km-font-sans-ja)', fontWeight: 'var(--km-font-weight-bold)',
          fontSize: 'var(--km-font-size-base)', letterSpacing: 'var(--km-letter-spacing-body)',
          opacity: hover ? 'var(--km-opacity-hover-muted)' : 1, transition: 'var(--km-motion-base)',
        }}>{label}</span>
      )}
    </a>
  );
}
