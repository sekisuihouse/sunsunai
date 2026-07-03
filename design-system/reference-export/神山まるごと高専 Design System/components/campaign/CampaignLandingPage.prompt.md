Campaign LP scaffold. Campaign pages are a SEPARATE theme from the mono core site — colored full-bleed background, white rounded sections (40px radius; event scope uses 50px asymmetric corners), white event logo, pill CTA.

```jsx
<CampaignLandingPage
  scope="campaign-tour"
  title="学校説明会"
  subtitle="神山まるごと高専を体験しよう"
  whiteLogoSrc="assets/logos/kamiyama_logo-white.svg"
  sections={[{ heading: '開催概要', body: '…' }]}
  ctaLabel="申し込む"
/>
```

`scope="campaign-tour"` = 水色 #58C3F5 / 黄緑 #92DF55. `scope="campaign-event"` = 青 #243FAB / シアン #00A0E9 / ピンク #E4007F / 黄 #FFE100. Never leak these colors into core-site work.
