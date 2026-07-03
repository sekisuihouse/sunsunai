Site header navigation. Two variants from the original site: `desktop-left-rail` (≥1204px — 180px-wide full-height rail: logo top, bold noun-phrase nav links with rule marks, black LINE/お問い合わせ CTA block at bottom) and `tablet-mobile-top` (fixed top bar with logo + 3-line MenuButton).

```jsx
<HeaderNavigation logoSrc="assets/logos/logo.svg" activeIndex={3} />
<HeaderNavigation variant="tablet-mobile-top" logoSrc="assets/logos/logo.svg" menuOpen={open} onMenuClick={() => setOpen(!open)} />
```

Also exports `MenuButton` (45×30 desktop / 28×22 mobile, animates to an X). Nav hover = opacity .6.
