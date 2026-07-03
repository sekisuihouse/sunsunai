import React from 'react';
import { GlobalShell } from '../../components/layout/GlobalShell.jsx';
import { ArcPageHeading } from '../../components/layout/ArcPageHeading.jsx';
import { Breadcrumb } from '../../components/navigation/Breadcrumb.jsx';
import { Button } from '../../components/actions/Button.jsx';
import { LinkCtaCards } from '../../components/actions/LinkCtaCards.jsx';
import { RevealMotion } from '../../components/motion/RevealMotion.jsx';

const ASSETS = '../../assets';

export function AdmissionScreen({ onNavigate, navItems }) {
  return (
    <GlobalShell logoSrc={`${ASSETS}/logos/logo.svg`} activeIndex={3} navItems={navItems} forceVariant="desktop-left-rail">
      <div style={{ maxWidth: 'var(--km-size-container)', margin: '0 auto', padding: '0 var(--km-space-10)' }}>
        <ArcPageHeading label="2027年度" title="入試情報" />
        <Breadcrumb items={[{ label: 'Top', href: '#' }, { label: '入試情報', href: '#' }, { label: '2027年度入試情報' }]} />

        <RevealMotion>
          <section style={{ maxWidth: 'var(--km-size-container-inner)', margin: '0 auto', padding: 'var(--km-space-15) 0' }}>
            <p style={{ margin: 0, font: '500 var(--km-font-size-body-large)/var(--km-line-height-body) var(--km-font-sans-ja)', letterSpacing: '.05em' }}>
              神山まるごと高専は、テクノロジー・デザイン・起業家精神を学ぶ5年制の高等専門学校です。2027年度の入学者選抜に関する情報をお知らせします。
            </p>
            <div style={{ display: 'flex', gap: 'var(--km-space-8)', marginTop: 'var(--km-space-15)', flexWrap: 'wrap' }}>
              <Button>募集要項を見る</Button>
              <Button variant="black">Web出願はこちら</Button>
            </div>
          </section>
        </RevealMotion>

        <RevealMotion>
          <section style={{ maxWidth: 'var(--km-size-container-inner)', margin: '0 auto', padding: '0 0 var(--km-space-15)' }}>
            <LinkCtaCards items={[
              { title: '学校説明会', description: 'オンライン・現地開催の説明会日程と申込はこちら。', image: `${ASSETS}/img/photo_experience.jpg` },
              { title: 'よくある質問', description: '入試・出願・学費に関するよくある質問をまとめました。' },
            ]} />
          </section>
        </RevealMotion>
      </div>
    </GlobalShell>
  );
}
