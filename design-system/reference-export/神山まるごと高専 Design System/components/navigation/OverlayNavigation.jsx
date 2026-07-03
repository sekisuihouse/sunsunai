import React, { useState } from 'react';

const DEFAULT_ITEMS = [
  { label: '学校案内', href: '#' },
  { label: '学校生活', href: '#' },
  { label: '学校便り', href: '#' },
  { label: '入試情報', href: '#' },
];

function OverlayLink({ item, onNavigate }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={item.href || '#'} onClick={onNavigate}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        color: 'var(--km-color-white)', textDecoration: 'none',
        fontFamily: 'var(--km-font-sans-ja)', fontWeight: 'var(--km-font-weight-bold)',
        fontSize: '24px', letterSpacing: 'var(--km-letter-spacing-body)',
        opacity: hover ? 'var(--km-opacity-hover-muted)' : 1, transition: 'var(--km-motion-base)',
      }}>{item.label}</a>
  );
}

/**
 * OverlayNavigation (#sp_nav) — full-screen overlay opened from the mobile menu button.
 * Closed: opacity 0 + pointer-events none. Open: a giant black circle scales up behind the links.
 */
export function OverlayNavigation({ open = false, items = DEFAULT_ITEMS, onClose }) {
  return (
    <div aria-hidden={!open} style={{
      position: 'fixed', inset: 0, zIndex: 'var(--km-z-index-overlay)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
      transition: 'var(--km-motion-base)', overflow: 'hidden',
    }}>
      {/* close_bg — 999rem circle scaling open */}
      <span aria-hidden="true" style={{
        position: 'absolute', left: '50%', top: '50%',
        width: '250vmax', height: '250vmax',
        borderRadius: 'var(--km-radius-pill)', background: 'var(--km-color-black)',
        transform: `translate(-50%,-50%) scale(${open ? 1 : 0})`,
        transition: 'transform .6s ease-in-out',
      }} />
      <nav style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--km-space-8)' }}>
        {items.map((item, i) => <OverlayLink key={i} item={item} onNavigate={onClose} />)}
      </nav>
      <button onClick={onClose} aria-label="閉じる" style={{
        position: 'absolute', top: 'var(--km-space-5)', right: 'var(--km-space-5)',
        width: '45px', height: '45px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--km-color-white)',
      }}>
        <span style={{ position: 'absolute', left: 0, top: '50%', width: '100%', height: '2px', background: 'currentColor', transform: 'rotate(45deg)' }} />
        <span style={{ position: 'absolute', left: 0, top: '50%', width: '100%', height: '2px', background: 'currentColor', transform: 'rotate(-45deg)' }} />
      </button>
    </div>
  );
}
