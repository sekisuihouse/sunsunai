import React, { useState } from 'react';

/**
 * Primary CTA button (btn-6 / btn_white / btn_black).
 * Pill shape, thick black border, bold 20px label.
 * Hover/active inverts colors with an expanding circle (simplified to a scaling pseudo-layer).
 * Desktop: 312px wide, 20px padding, 4px border. Mobile size: 184px, 12px padding, 2px border.
 */
export function Button({ variant = 'white', size = 'default', href, onClick, children, style }) {
  const [hover, setHover] = useState(false);
  const mobile = size === 'mobile';
  const black = variant === 'black';
  const inverted = black ? !hover : hover;
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        width: mobile ? 'var(--km-size-button-mobile)' : 'var(--km-size-button)',
        maxWidth: '100%',
        padding: mobile ? 'var(--km-space-3)' : 'var(--km-space-5)',
        border: `${mobile ? 'var(--km-border-width-button-mobile)' : 'var(--km-border-width-button)'} solid var(--km-color-border-strong)`,
        borderRadius: 'var(--km-radius-pill)',
        background: inverted ? 'var(--km-color-black)' : 'var(--km-color-white)',
        color: inverted ? 'var(--km-color-white)' : 'var(--km-color-black)',
        font: 'inherit',
        fontFamily: 'var(--km-font-sans-ja)',
        fontSize: mobile ? 'var(--km-font-size-button-mobile)' : 'var(--km-font-size-body-large)',
        fontWeight: 'var(--km-font-weight-bold)',
        letterSpacing: 'var(--km-letter-spacing-body)',
        lineHeight: 'var(--km-line-height-normal)',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'var(--km-motion-base)',
        ...style,
      }}
    >
      {/* expanding circle layer (brand motif) */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '130%',
          aspectRatio: '1',
          borderRadius: 'var(--km-radius-circle)',
          background: black ? 'var(--km-color-white)' : 'var(--km-color-black)',
          transform: `translate(-50%,-50%) scale(${hover ? 1.05 : 0})`,
          transition: 'var(--km-motion-base)',
          zIndex: 0,
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </Tag>
  );
}
