import React from 'react';
import { GlobalShell } from '../../components/layout/GlobalShell.jsx';
import { Breadcrumb } from '../../components/navigation/Breadcrumb.jsx';
import { HubSpotFormEmbed } from '../../components/form/HubSpotFormEmbed.jsx';
import { RevealMotion } from '../../components/motion/RevealMotion.jsx';

const ASSETS = '../../assets';

export function InquiryScreen({ navItems }) {
  return (
    <GlobalShell logoSrc={`${ASSETS}/logos/logo.svg`} activeIndex={-1} navItems={navItems} forceVariant="desktop-left-rail">
      <div style={{ maxWidth: 'var(--km-size-container)', margin: '0 auto', padding: '0 var(--km-space-10)' }}>
        <Breadcrumb items={[{ label: 'Top', href: '#' }, { label: 'お問い合わせ' }]} />
        <RevealMotion>
          <h1 style={{ margin: 'var(--km-space-10) 0 var(--km-space-15)', font: '700 var(--km-font-size-heading-2)/1.5 var(--km-font-sans-ja)', letterSpacing: '.05em' }}>お問い合わせ</h1>
        </RevealMotion>
        <RevealMotion delay={150}>
          <div style={{ maxWidth: 'var(--km-size-container-inner)', margin: '0 auto', paddingBottom: 'var(--km-space-15)' }}>
            <p style={{ margin: '0 0 var(--km-space-10)', font: '500 var(--km-font-size-base)/var(--km-line-height-body) var(--km-font-sans-ja)', letterSpacing: '.05em' }}>
              学校見学、取材、その他のお問い合わせは下記フォームよりお送りください。
            </p>
            <HubSpotFormEmbed variant="inquiry" />
          </div>
        </RevealMotion>
      </div>
    </GlobalShell>
  );
}
