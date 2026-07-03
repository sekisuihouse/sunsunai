import React, { useState } from 'react';

const SNS = ['note', 'LINE', 'Instagram', 'X'];

function SnsIcon({ label, size }) {
  const [hover, setHover] = useState(false);
  return (
    <a href="#" aria-label={label}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size, borderRadius: 'var(--km-radius-circle)',
        background: 'var(--km-color-black)', color: 'var(--km-color-white)',
        textDecoration: 'none', fontFamily: 'var(--km-font-display-futura)',
        fontWeight: 700, fontSize: size * 0.28,
        opacity: hover ? 'var(--km-opacity-hover-muted)' : 1, transition: 'var(--km-motion-base)',
      }}>{label === 'Instagram' ? 'Ig' : label === 'LINE' ? 'LN' : label}</a>
  );
}

function FooterLink({ label, href }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={href || '#'} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        color: 'inherit', textDecoration: 'none',
        fontSize: 'var(--km-font-size-base-sm)', fontWeight: 'var(--km-font-weight-bold)',
        opacity: hover ? 'var(--km-opacity-hover-muted)' : 1, transition: 'var(--km-motion-base)',
      }}>{label}</a>
  );
}

/**
 * Footer — logo (252px), nav groups, circular SNS links (50px desktop / 40px mobile), copyright.
 * NOTE: SNS glyphs are typographic placeholders — original SVG icons were not in the provided mirror.
 */
export function Footer({ logoSrc, size = 'default', navGroups }) {
  const mobile = size === 'mobile';
  const groups = navGroups || [
    { items: [{ label: '学校案内' }, { label: '学校生活' }, { label: '学校便り' }, { label: '入試情報' }] },
    { items: [{ label: 'お問い合わせ' }, { label: 'プライバシーポリシー' }, { label: '情報公開' }] },
  ];
  return (
    <footer style={{
      marginTop: 'var(--km-space-25)',
      padding: mobile ? 'var(--km-space-15) var(--km-space-5)' : 'var(--km-space-25) var(--km-space-15) var(--km-space-10)',
      fontFamily: 'var(--km-font-sans-ja)', letterSpacing: 'var(--km-letter-spacing-body)',
      color: 'var(--km-color-text)', background: 'var(--km-color-white)',
      borderTop: 'var(--km-border-width-thin) solid var(--km-color-border-subtle)',
    }}>
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 'var(--km-space-15)',
        justifyContent: 'space-between', alignItems: 'flex-start',
        maxWidth: 'var(--km-size-container)', margin: '0 auto',
      }}>
        {logoSrc && <img src={logoSrc} alt="神山まるごと高専" style={{ width: mobile ? '180px' : 'var(--km-size-logo)', height: 'auto' }} />}
        <div style={{ display: 'flex', gap: 'var(--km-space-15)', flexWrap: 'wrap' }}>
          {groups.map((g, i) => (
            <nav key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--km-space-4)' }}>
              {g.items.map((item, j) => <FooterLink key={j} {...item} />)}
            </nav>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 'var(--km-space-4)' }}>
          {SNS.map((s) => <SnsIcon key={s} label={s} size={mobile ? 40 : 50} />)}
        </div>
      </div>
      <p style={{
        maxWidth: 'var(--km-size-container)', margin: 'var(--km-space-15) auto 0',
        fontSize: 'var(--km-font-size-sm)', fontWeight: 'var(--km-font-weight-medium)',
      }}>© KAMIYAMA educational institute</p>
    </footer>
  );
}
