import React from 'react';

/**
 * ArcPageHeading — the giant arc page title observed on 入試情報 (admission) pages:
 * a huge black-stroke arc spanning the content area, with a vertical title
 * (white-on-black label + large vertical text) centered inside it.
 * Intentional addition: recreated from the observed page motif (EV-0035).
 */
export function ArcPageHeading({ label, title, height = 560 }) {
  return (
    <div style={{ position: 'relative', width: '100%', height, overflow: 'hidden' }}>
      {/* arc: oversized circle border, only top half visible */}
      <span aria-hidden="true" style={{
        position: 'absolute', left: '50%', top: '40px',
        width: 'min(88%, 1040px)', aspectRatio: '1',
        transform: 'translateX(-50%)',
        borderRadius: 'var(--km-radius-circle)',
        border: '5px solid var(--km-color-black)',
        boxSizing: 'border-box',
      }} />
      {/* mask bottom so only the upper arc shows */}
      <span aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: height, bottom: 'auto' }} />
      <div style={{
        position: 'absolute', left: '50%', top: '120px', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'row-reverse', gap: 'var(--km-space-3)', alignItems: 'flex-start',
        writingMode: 'vertical-rl',
        fontFamily: 'var(--km-font-sans-ja)', fontWeight: 'var(--km-font-weight-bold)',
        letterSpacing: '.15em',
      }}>
        {label && (
          <span style={{
            background: 'var(--km-color-black)', color: 'var(--km-color-white)',
            fontSize: '28px', padding: '10px 4px',
          }}>{label}</span>
        )}
        <span style={{ fontSize: '44px', color: 'var(--km-color-black)' }}>{title}</span>
      </div>
    </div>
  );
}
