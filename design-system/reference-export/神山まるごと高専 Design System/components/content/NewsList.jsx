import React, { useState } from 'react';

function NewsItem({ item }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={item.href || '#'}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid', gridTemplateColumns: '110px 110px 1fr', gap: 'var(--km-space-5)',
        alignItems: 'baseline', padding: 'var(--km-space-5) 0',
        borderBottom: 'var(--km-border-width-thin) solid var(--km-color-border-subtle)',
        textDecoration: 'none', color: 'var(--km-color-text)',
        fontFamily: 'var(--km-font-sans-ja)', letterSpacing: 'var(--km-letter-spacing-body)',
        opacity: hover ? 'var(--km-opacity-hover-muted)' : 1, transition: 'var(--km-motion-base)',
      }}>
      <time style={{ fontFamily: 'var(--km-font-display-futura)', fontWeight: 600, fontSize: 'var(--km-font-size-base)' }}>{item.date}</time>
      <span style={{
        justifySelf: 'start', fontSize: 'var(--km-font-size-sm)', fontWeight: 'var(--km-font-weight-bold)',
        border: '1px solid var(--km-color-black)', padding: '2px 12px',
      }}>{item.category}</span>
      <span style={{ fontSize: 'var(--km-font-size-base)', fontWeight: 'var(--km-font-weight-bold)', lineHeight: 'var(--km-line-height-relaxed)' }}>{item.title}</span>
    </a>
  );
}

/**
 * NewsList — dated news rows (date / category chip / bold title link).
 * Detailed markup was minified in the mirror; structure is a faithful simplification.
 */
export function NewsList({ items = [] }) {
  return (
    <div style={{ borderTop: 'var(--km-border-width-thin) solid var(--km-color-border-subtle)', maxWidth: 'var(--km-size-container-inner)' }}>
      {items.map((item, i) => <NewsItem key={i} item={item} />)}
    </div>
  );
}
