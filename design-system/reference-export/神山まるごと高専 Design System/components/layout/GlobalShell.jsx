import React, { useEffect, useState } from 'react';
import { HeaderNavigation } from '../navigation/HeaderNavigation.jsx';
import { OverlayNavigation } from '../navigation/OverlayNavigation.jsx';
import { Footer } from './Footer.jsx';

/**
 * GlobalShell — the common page frame: left rail header ≥1204px,
 * top fixed header + overlay menu below that; white main canvas; footer.
 */
export function GlobalShell({ children, logoSrc, whiteLogoSrc, activeIndex = -1, navItems, forceVariant }) {
  const [wide, setWide] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1204 : true);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1204px)');
    const fn = (e) => setWide(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  const isRail = forceVariant ? forceVariant === 'desktop-left-rail' : wide;

  if (isRail) {
    return (
      <div style={{ display: 'flex', alignItems: 'stretch', background: 'var(--km-color-white)', minHeight: '100vh' }}>
        <div style={{ position: 'sticky', top: 0, alignSelf: 'flex-start', height: '100vh' }}>
          <HeaderNavigation variant="desktop-left-rail" logoSrc={logoSrc} activeIndex={activeIndex} items={navItems} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <main>{children}</main>
          <Footer logoSrc={logoSrc} />
        </div>
      </div>
    );
  }
  return (
    <div style={{ background: 'var(--km-color-white)', minHeight: '100vh' }}>
      <HeaderNavigation variant="tablet-mobile-top" logoSrc={logoSrc} menuOpen={menuOpen} onMenuClick={() => setMenuOpen(!menuOpen)} />
      <OverlayNavigation open={menuOpen} items={navItems} onClose={() => setMenuOpen(false)} />
      <main>{children}</main>
      <Footer logoSrc={logoSrc} size="mobile" />
    </div>
  );
}
