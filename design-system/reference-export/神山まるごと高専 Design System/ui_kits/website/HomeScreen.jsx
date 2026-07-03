import React from 'react';
import { GlobalShell } from '../../components/layout/GlobalShell.jsx';
import { Button } from '../../components/actions/Button.jsx';
import { LinkCtaCards } from '../../components/actions/LinkCtaCards.jsx';
import { HoverMaskLink } from '../../components/actions/HoverMaskLink.jsx';
import { NewsList } from '../../components/content/NewsList.jsx';
import { RevealMotion } from '../../components/motion/RevealMotion.jsx';

const ASSETS = '../../assets';

export function HomeScreen({ onNavigate, navItems }) {
  return (
    <GlobalShell logoSrc={`${ASSETS}/logos/logo.svg`} activeIndex={-1} navItems={navItems} forceVariant="desktop-left-rail">
      {/* hero */}
      <section style={{ position: 'relative', maxWidth: 'var(--km-size-container)', margin: '0 auto', padding: 'var(--km-space-25) var(--km-space-10) var(--km-space-15)' }}>
        <RevealMotion>
          <h1 style={{ margin: 0, font: '700 52px/1.6 var(--km-font-sans-ja)', letterSpacing: '.05em' }}>
            人間の未来を<br />変える学校。
          </h1>
        </RevealMotion>
        <RevealMotion delay={150}>
          <p style={{ margin: 'var(--km-space-8) 0 0', font: '500 var(--km-font-size-body-large)/var(--km-line-height-body) var(--km-font-sans-ja)', letterSpacing: '.05em', maxWidth: '30em' }}>
            テクノロジー×デザイン×起業家精神を学ぶ、徳島県神山町の私立高等専門学校。
          </p>
        </RevealMotion>
        <RevealMotion delay={300}>
          <div style={{ position: 'relative', marginTop: 'var(--km-space-15)' }}>
            <img src={`${ASSETS}/img/kamiyama.jpg`} alt="神山町の風景" style={{ display: 'block', width: '100%', aspectRatio: '21/9', objectFit: 'cover' }} />
            <img src={`${ASSETS}/illustrations/illust_01.png`} alt="" style={{ position: 'absolute', right: '-20px', bottom: '-40px', width: '180px' }} />
          </div>
        </RevealMotion>
      </section>

      {/* news */}
      <section style={{ maxWidth: 'var(--km-size-container)', margin: '0 auto', padding: '0 var(--km-space-10) var(--km-space-15)' }}>
        <h2 style={{ margin: '0 0 var(--km-space-15)', font: '700 var(--km-font-size-heading-2)/1.5 var(--km-font-sans-ja)', letterSpacing: '.05em' }}>学校便り</h2>
        <NewsList items={[
          { date: '2026.06.28', category: 'お知らせ', title: '2027年度入試情報を公開しました' },
          { date: '2026.06.15', category: 'イベント', title: '学校説明会（オンライン）の申込を開始しました' },
          { date: '2026.05.30', category: '学校便り', title: '1年生の神山ロングホームルームを実施しました' },
        ]} />
        <div style={{ marginTop: 'var(--km-space-10)' }}>
          <Button size="mobile">一覧を見る</Button>
        </div>
      </section>

      {/* photo nav */}
      <section style={{ maxWidth: 'var(--km-size-container)', margin: '0 auto', padding: '0 var(--km-space-10) var(--km-space-15)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--km-space-8)' }}>
        <HoverMaskLink src={`${ASSETS}/img/curriculum.jpg`} alt="カリキュラム" label="カリキュラム" />
        <HoverMaskLink src={`${ASSETS}/img/oneday.jpg`} alt="1日の流れ" label="1日の流れ" />
        <HoverMaskLink src={`${ASSETS}/img/gallery.jpg`} alt="まるごとギャラリー" label="まるごとギャラリー" />
      </section>

      {/* CTA cards */}
      <section style={{ maxWidth: 'var(--km-size-container)', margin: '0 auto', padding: '0 var(--km-space-10) var(--km-space-15)' }}>
        <LinkCtaCards items={[
          { title: '学校案内', description: '教育理念・カリキュラム・教員紹介。神山まるごと高専のすべて。', image: `${ASSETS}/img/about.jpg`, onClick: (e) => { e && e.preventDefault(); } },
          { title: '入試情報', description: '2027年度入試の概要と出願方法はこちらから。', image: `${ASSETS}/img/admissions.jpg`, linkText: '入試情報を見る', onClick: (e) => { e && e.preventDefault(); onNavigate && onNavigate('admission'); } },
        ]} />
      </section>
    </GlobalShell>
  );
}
