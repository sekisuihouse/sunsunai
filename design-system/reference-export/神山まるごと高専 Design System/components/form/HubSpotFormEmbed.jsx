import React from 'react';

/**
 * HubSpotFormEmbed — placeholder frame for the third-party HubSpot form (#hubspot-form).
 * The real form is script-rendered by HubSpot; its inputs/validation/error states are
 * NOT part of this design system. This renders a clearly-marked placeholder.
 */
export function HubSpotFormEmbed({ variant = 'inquiry', height = 480 }) {
  return (
    <div id="hubspot-form" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 'var(--km-space-4)', minHeight: height, boxSizing: 'border-box',
      border: '1px dashed var(--km-color-gray-500)', background: 'var(--km-color-surface-muted)',
      fontFamily: 'var(--km-font-sans-ja)', letterSpacing: 'var(--km-letter-spacing-body)',
      color: 'var(--km-color-text)', padding: 'var(--km-space-10)', textAlign: 'center',
    }}>
      <span style={{ fontSize: 'var(--km-font-size-base)', fontWeight: 'var(--km-font-weight-bold)' }}>
        {variant === 'mailmagazine' ? 'メールマガジン登録フォーム' : 'お問い合わせフォーム'}
      </span>
      <span style={{ fontSize: 'var(--km-font-size-base-sm)', lineHeight: 'var(--km-line-height-relaxed)' }}>
        HubSpot 外部埋め込み（第三者レンダリング）<br />
        フォーム本体の UI・validation・エラー状態は HubSpot 側の責務です。
      </span>
    </div>
  );
}
