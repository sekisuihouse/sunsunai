import React, { useState } from 'react';

function Crumb({ item, isLast }) {
  const [hover, setHover] = useState(false);
  if (isLast || !item.href) {
    return <span style={{ fontWeight: 'var(--km-font-weight-bold)' }}>{item.label}</span>;
  }
  return (
    <a href={item.href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        color: 'inherit', textDecoration: 'none', fontWeight: 'var(--km-font-weight-bold)',
        opacity: hover ? 'var(--km-opacity-hover-muted)' : 1, transition: 'var(--km-motion-base)',
      }}>{item.label}</a>
  );
}

/**
 * Breadcrumb — right-aligned, 12px bold, light-gray dash separators.
 * Wrapper: 120px tall desktop / 91px mobile.
 */
export function Breadcrumb({ items = [], size = 'default' }) {
  const mobile = size === 'mobile';
  return (
    <nav aria-label="breadcrumb" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      height: mobile ? '91px' : '120px', boxSizing: 'border-box',
      fontFamily: 'var(--km-font-sans-ja)',
      fontSize: mobile ? 'var(--km-font-size-xs)' : 'var(--km-font-size-sm)',
      letterSpacing: 'var(--km-letter-spacing-body)', color: 'var(--km-color-text)',
    }}>
      <ol style={{ display: 'flex', alignItems: 'center', gap: 'var(--km-space-4)', listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--km-space-4)' }}>
            {i > 0 && <span aria-hidden="true" style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--km-color-gray-500)' }} />}
            <Crumb item={item} isLast={i === items.length - 1} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
