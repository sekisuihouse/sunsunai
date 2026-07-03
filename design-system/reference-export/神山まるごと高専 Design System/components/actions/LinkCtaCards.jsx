import React, { useState } from 'react';

/**
 * LinkCtaCards — 2-column link cards with 4px black border, black title bar,
 * description and arrow link text. Collapses to 1 column ≤767px (handled by grid autofit).
 */
function Card({ item }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={item.href || '#'}
      onClick={item.onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexDirection: 'column', textDecoration: 'none',
        color: 'var(--km-color-text)',
        border: 'var(--km-border-width-button) solid var(--km-color-border-strong)',
        background: 'var(--km-color-white)',
      }}
    >
      <span style={{
        display: 'block', background: 'var(--km-color-black)', color: 'var(--km-color-white)',
        fontFamily: 'var(--km-font-sans-ja)', fontWeight: 'var(--km-font-weight-bold)',
        fontSize: 'var(--km-font-size-title-card)', lineHeight: 'var(--km-line-height-normal)',
        letterSpacing: 'var(--km-letter-spacing-body)', textAlign: 'center',
        padding: 'var(--km-space-4) var(--km-space-5)',
      }}>{item.title}</span>
      {item.image && (
        <span style={{ display: 'block', overflow: 'hidden' }}>
          <img src={item.image} alt="" style={{
            display: 'block', width: '100%', aspectRatio: '2 / 1', objectFit: 'cover',
            transform: hover ? 'scale(1.04)' : 'scale(1)', transition: 'var(--km-motion-base)',
          }} />
        </span>
      )}
      <span style={{
        display: 'block', padding: 'var(--km-space-5)',
        fontFamily: 'var(--km-font-sans-ja)', fontWeight: 'var(--km-font-weight-medium)',
        fontSize: 'var(--km-font-size-base)', lineHeight: 'var(--km-line-height-relaxed)',
        letterSpacing: 'var(--km-letter-spacing-body)',
      }}>{item.description}</span>
      <span style={{
        display: 'block', padding: '0 var(--km-space-5) var(--km-space-5)', marginTop: 'auto',
        fontFamily: 'var(--km-font-sans-ja)', fontWeight: 'var(--km-font-weight-bold)',
        fontSize: 'var(--km-font-size-base)', letterSpacing: 'var(--km-letter-spacing-body)',
        textDecoration: 'underline', textUnderlineOffset: '4px',
        opacity: hover ? 'var(--km-opacity-hover-muted)' : 1, transition: 'var(--km-motion-base)',
      }}>{item.linkText || '詳しく見る'}</span>
    </a>
  );
}

export function LinkCtaCards({ items = [], columns = 2 }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(min(320px, 100%), 1fr))`,
      gap: 'var(--km-space-8)',
      maxWidth: columns === 2 ? 'var(--km-size-container)' : 'none',
    }}>
      {items.map((item, i) => <Card key={i} item={item} />)}
    </div>
  );
}
