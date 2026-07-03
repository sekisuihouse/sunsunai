import React, { useState } from 'react';

/**
 * CampaignLandingPage — themed LP scaffold. NOT part of the core mono theme:
 * wrap in data-km-scope="campaign-tour" (水色/黄緑) or "campaign-event" (青/シアン/ピンク/黄).
 * Renders hero + rounded content sections + campaign CTA using the scope's palette.
 */
function CampaignButton({ children, href }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={href || '#'}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-block', padding: '18px 64px',
        background: hover ? 'var(--km-color-black)' : 'var(--km-color-campaign-accent, var(--km-color-campaign-secondary))',
        color: 'var(--km-color-white)', textDecoration: 'none',
        fontFamily: 'var(--km-font-sans-ja)', fontWeight: 'var(--km-font-weight-bold)',
        fontSize: 'var(--km-font-size-body-large)', letterSpacing: 'var(--km-letter-spacing-body)',
        borderRadius: 'var(--km-radius-pill)', transition: 'var(--km-motion-base)',
        boxShadow: 'var(--km-shadow-soft)',
      }}>{children}</a>
  );
}

export function CampaignLandingPage({ scope = 'campaign-tour', title, subtitle, heroImage, whiteLogoSrc, ctaLabel = '申し込む', sections = [], children }) {
  return (
    <div data-km-scope={scope} style={{
      background: 'var(--km-color-campaign-primary)',
      fontFamily: 'var(--km-font-sans-ja)', letterSpacing: 'var(--km-letter-spacing-body)',
      color: scope === 'campaign-event' ? 'var(--km-color-white)' : 'var(--km-color-black)',
      overflow: 'hidden',
    }}>
      <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--km-space-8)', padding: 'var(--km-space-15) var(--km-space-5)', textAlign: 'center' }}>
        {whiteLogoSrc && <img src={whiteLogoSrc} alt="神山まるごと高専" style={{ width: '180px', height: 'auto' }} />}
        <h1 style={{ margin: 0, fontSize: '44px', fontWeight: 'var(--km-font-weight-bold)', lineHeight: 'var(--km-line-height-normal)' }}>{title}</h1>
        {subtitle && <p style={{ margin: 0, fontSize: 'var(--km-font-size-body-large)', fontWeight: 'var(--km-font-weight-bold)' }}>{subtitle}</p>}
        {heroImage && (
          <img src={heroImage} alt="" style={{
            width: 'min(720px, 100%)', display: 'block',
            borderRadius: scope === 'campaign-event' ? 'var(--km-radius-event-asymmetric)' : 'var(--km-radius-campaign-large)',
          }} />
        )}
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--km-space-10)', alignItems: 'center', padding: '0 var(--km-space-5) var(--km-space-15)' }}>
        {sections.map((s, i) => (
          <section key={i} style={{
            width: 'min(720px, 100%)', boxSizing: 'border-box',
            background: 'var(--km-color-white)', color: 'var(--km-color-black)',
            borderRadius: scope === 'campaign-event' ? 'var(--km-radius-event-asymmetric)' : 'var(--km-radius-campaign-large)',
            padding: 'var(--km-space-10)',
          }}>
            <h2 style={{
              margin: '0 0 var(--km-space-4)', fontSize: 'var(--km-font-size-title-card)',
              color: scope === 'campaign-event' ? 'var(--km-color-campaign-primary)' : 'var(--km-color-black)',
            }}>
              <span style={{ display: 'inline-block', width: '14px', height: '14px', borderRadius: '50%', background: 'var(--km-color-campaign-secondary)', marginRight: '12px' }} />
              {s.heading}
            </h2>
            <p style={{ margin: 0, fontSize: 'var(--km-font-size-base)', lineHeight: 'var(--km-line-height-body)' }}>{s.body}</p>
          </section>
        ))}
        {children}
        <CampaignButton>{ctaLabel}</CampaignButton>
      </div>
    </div>
  );
}
