import React, { useState } from 'react';

const NAV_ITEMS = [
  { label: '学校案内', href: '#' },
  { label: '学校生活', href: '#' },
  { label: '学校便り', href: '#' },
  { label: '入試情報', href: '#' },
];

function NavLink({ item, active }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={item.href}
      onClick={item.onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--km-space-3)',
        textDecoration: 'none', color: 'var(--km-color-text)',
        fontFamily: 'var(--km-font-sans-ja)', fontWeight: 'var(--km-font-weight-bold)',
        fontSize: 'var(--km-font-size-base)', letterSpacing: 'var(--km-letter-spacing-body)',
        opacity: hover ? 'var(--km-opacity-hover-muted)' : 1, transition: 'var(--km-motion-base)',
      }}
    >
      {item.label}
      <span aria-hidden="true" style={{
        display: 'inline-block', width: '30px', height: '2px',
        background: 'var(--km-color-black)',
        opacity: active ? 1 : .35,
      }} />
    </a>
  );
}

/**
 * MenuButton — the 3-line hamburger (45x30 desktop, 28x22 mobile).
 */
export function MenuButton({ open = false, onClick, size = 'default' }) {
  const w = size === 'mobile' ? 28 : 45;
  const h = size === 'mobile' ? 22 : 30;
  const line = { position: 'absolute', left: 0, width: '100%', height: '2px', background: 'currentColor', transition: 'var(--km-motion-base)' };
  return (
    <button aria-label="メニュー" aria-expanded={open} onClick={onClick} style={{
      position: 'relative', width: w, height: h, padding: 0,
      background: 'none', border: 'none', cursor: 'pointer', color: 'var(--km-color-black)',
    }}>
      <span style={{ ...line, top: 0, transform: open ? `translateY(${h / 2 - 1}px) rotate(20deg)` : 'none' }} />
      <span style={{ ...line, top: h / 2 - 1, opacity: open ? 0 : 1 }} />
      <span style={{ ...line, bottom: 0, transform: open ? `translateY(-${h / 2 - 1}px) rotate(-20deg)` : 'none' }} />
    </button>
  );
}

/**
 * HeaderNavigation — desktop-left-rail (≥1204px: 180px rail, 100vh) or tablet-mobile-top (fixed bar).
 */
export function HeaderNavigation({ variant = 'desktop-left-rail', items = NAV_ITEMS, activeIndex = -1, logoSrc, onMenuClick, menuOpen = false }) {
  if (variant === 'tablet-mobile-top') {
    return (
      <header style={{
        position: 'sticky', top: 0, zIndex: 'var(--km-z-index-header)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '72px', padding: '0 var(--km-space-5)',
        background: 'var(--km-color-white)',
      }}>
        {logoSrc && <a href="#"><img src={logoSrc} alt="神山まるごと高専" style={{ height: '48px', width: 'auto', display: 'block' }} /></a>}
        <MenuButton size="mobile" open={menuOpen} onClick={onMenuClick} />
      </header>
    );
  }
  return (
    <header style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      width: 'var(--km-size-desktop-rail)', minHeight: '100vh', boxSizing: 'border-box',
      background: 'var(--km-color-white)', borderRight: 'var(--km-border-width-thin) solid var(--km-color-border-subtle)',
      zIndex: 'var(--km-z-index-header)',
    }}>
      {logoSrc && (
        <a href="#" style={{ display: 'block', padding: 'var(--km-space-5) var(--km-space-5) 0' }}>
          <img src={logoSrc} alt="神山まるごと高専" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </a>
      )}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--km-space-10)', padding: '0 0 0 var(--km-space-8)' }}>
        {items.map((item, i) => <NavLink key={i} item={item} active={i === activeIndex} />)}
      </nav>
      <div style={{ background: 'var(--km-color-black)', color: 'var(--km-color-white)' }}>
        <a href="#" style={{
          display: 'flex', alignItems: 'center', gap: 'var(--km-space-2)',
          padding: 'var(--km-space-4) var(--km-space-5)', textDecoration: 'none', color: 'inherit',
          fontFamily: 'var(--km-font-sans-ja)', fontWeight: 'var(--km-font-weight-bold)', fontSize: 'var(--km-font-size-base-sm)',
          borderBottom: '1px solid rgba(255,255,255,.3)',
        }}>中学生向けLINE</a>
        <a href="#" style={{
          display: 'flex', alignItems: 'center', gap: 'var(--km-space-2)',
          padding: 'var(--km-space-4) var(--km-space-5)', textDecoration: 'none', color: 'inherit',
          fontFamily: 'var(--km-font-sans-ja)', fontWeight: 'var(--km-font-weight-bold)', fontSize: 'var(--km-font-size-base-sm)',
        }}>お問い合わせ</a>
      </div>
    </header>
  );
}
