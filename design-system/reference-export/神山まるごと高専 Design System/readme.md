# 神山まるごと高専 Design System

Design system for **神山まるごと高専** (Kamiyama Marugoto College of Design, Engineering and Entrepreneurship) — a private 5-year kōsen in Kamiyama, Tokushima teaching テクノロジー×デザイン×起業家精神. Copyright line: `© KAMIYAMA educational institute`.

**Sources** (extraction evidence, not assumed accessible to readers):
- Static mirror analysis of `https://kamiyama.ac.jp/` — provided as the mounted `design-system/` folder (tokens.css/json, components.json, 00–05 docs, QUALITY_REPORT, screenshots). Original Nuxt/WordPress source, Storybook, Figma, and local font files were NOT available.
- Uploaded site imagery + logos in `uploads/` (curated copies in `assets/`).

Two surfaces:
1. **本体サイト (core)** — monochrome: white canvas, black text, thick black borders, big circles/arcs, generous whitespace.
2. **Campaign LPs** — separate themes: 学校説明会 tour LP (水色/黄緑) and 未来の学校FES event LP (青/シアン/ピンク/黄). Never mix campaign colors into core.

## CONTENT FUNDAMENTALS

- **Language**: Japanese. Descriptive, sincere, mission-driven copy — e.g. hero-scale statements like 「人間の未来を変える学校。」 and plain explanatory body text about 教育理念/入試/学校生活.
- **Navigation & labels**: short noun phrases — 学校案内 / 学校生活 / 学校便り / 入試情報 / お問い合わせ. No verbs, no exclamation marks in chrome.
- **Body voice**: explanatory but forceful — body text is set LARGE (20px) and often bold; even paragraphs carry visual weight. Interviews/quotes are used prominently (e.g. lecturer quote blocks with name + affiliation + 「インタビューはこちら」).
- **CTAs**: clear directives to 学校案内 / 入試 / 問い合わせ — 「トップページへ戻る」「インタビューはこちら」 style; button labels are short actions or destinations.
- **Casing/format**: dates as `2026.06.28` in Futura-style display type; English appears sparingly (logo, copyright, dates).
- **Emoji**: none, anywhere.

## VISUAL FOUNDATIONS

- **Color**: white #fff canvas, black #000 text/borders; grays #f7f7f7–#c4c4c4 for separators and muted surfaces only. Identity comes from black line-work, not hue. Campaign palettes live in `data-km-scope="campaign-tour|campaign-event"` scopes.
- **Type**: OS Japanese sans stack (Yu Gothic / Hiragino / Meiryo), weight 500 base / 700 for everything structural. Body 20px · line-height 2 · letter-spacing .05em. Nav 15–16px bold, breadcrumb 12px (SP 11px), card titles 30px, h2 35px. Display face for dates/Latin: `futura-pt-bold` — **substituted with Google Fonts "Jost"** (no font file in mirror; see caveat).
- **Signature motifs**: giant circles and arcs — arc in the logo, giant 5px-stroke arc page headings with vertical text (入試情報), circular hover masks on images, expanding-circle button hover, full-screen circle scaling open behind the overlay menu. Vertical writing (writing-mode: vertical-rl) with white-on-black label boxes.
- **Backgrounds**: flat white; light gray #f7f7f7 bands for quote/section breaks; photography full-width within the container; hand-drawn-style PNG illustrations sprinkled as accents. No gradients, no patterns, no blur.
- **Borders**: black, thick and structural — 4px on buttons/cards (2px SP), 1px #e5e5e5 hairlines for list separators.
- **Radius**: 4/6/10px small radii; pill (999rem) buttons; 50% circles. Campaign-only: 40px and 50px-asymmetric (50px 0 50px 0).
- **Shadows**: rare and soft — `0 4px 15px #0000001a` (soft) / `0 0 15px` (ambient). Cards are defined by borders, not shadows.
- **Motion**: `all .35s ease-in-out` base (buttons, menu, masks); page transitions .6s; scroll reveal `.js-fade` = opacity 0 + translateY(15px) → visible over .8s ease-in-out. No bounces/springs.
- **Hover**: text links drop to opacity .6; buttons invert white↔black with an expanding circle; images zoom slightly under a circular mask sweep (desktop ≥768px only).
- **Layout**: container 1024px, inner column 812px; ≥1204px a 180px full-height left nav rail; below that a fixed top header + full-screen overlay menu. ≤1023px container = calc(100% − 50px); ≤374px = calc(100% − 30px). Big vertical rhythm: 60–100px around headings/footer.
- **Imagery**: real photography of the town, students, activities — warm, natural, documentary; frequently cropped in circles. Illustrations are loose black-line hand-drawn PNGs with color accents.
- **Accessibility flags** (from audit): original site sets `outline:none` globally — this system adds a `--km-focus-ring` token + `:focus-visible` rule instead; `prefers-reduced-motion` support added in `tokens/base.css`. HubSpot form states unauditable (third-party).

## ICONOGRAPHY

- No icon font and no icon system in the mirror. UI glyphs are **built from primitives**: 3-line hamburger (45×30 / 28×22 SP), plain rule-line marks next to nav links, thin dash breadcrumb separators — all drawn with borders/spans, not glyph fonts.
- Hand-drawn PNG illustrations (`assets/illustrations/`, ~40 files: illust_01, ph01_i*, ph02_i*, sd01–03_i*, ss01_i*) act as the decorative "icon" layer of the brand.
- SNS links (note / LINE / Instagram / X) render as 50px (40px SP) black circles. **Original SNS SVG icons were not in the uploads — Footer uses typographic placeholders; swap in real icons when provided.**
- No emoji, no unicode-symbol icons.
- Logos: `assets/logos/logo.svg` (black, header/footer, 252px basis) and `assets/logos/kamiyama_logo-white.svg` (white, for colored/event backgrounds).

## Components

Inventory ported 1:1 from the source extraction (`design-system/components.json`):

- `Button` (+ variants white/black, size mobile) — components/actions/
- `HoverMaskLink` — components/actions/
- `LinkCtaCards` — components/actions/
- `HeaderNavigation` (+ `MenuButton`) — components/navigation/
- `OverlayNavigation` — components/navigation/
- `Breadcrumb` — components/navigation/
- `GlobalShell` — components/layout/
- `Footer` — components/layout/
- `NewsList` — components/content/
- `HubSpotFormEmbed` (third-party placeholder) — components/form/
- `CampaignLandingPage` — components/campaign/
- `RevealMotion` — components/motion/

**Intentional additions**:
- `ArcPageHeading` (components/layout/) — the giant-arc vertical page title observed on the admission page (EV-0035); needed for page recreations, promoted to a component.
- `--km-focus-ring` token + focus-visible rule — replaces the original `outline:none` (a11y fix recommended by the source audit).

## Index

- `styles.css` — global CSS entry (imports everything under `tokens/`)
- `tokens/` — colors, typography, fonts, layout, effects, base
- `components/` — React primitives (see list above; each has `.d.ts` + `.prompt.md` + card HTML)
- `ui_kits/website/` — 本体サイト click-through (Home / 入試情報 / お問い合わせ)
- `ui_kits/campaign_lp/` — campaign LP scaffold (tour ⇄ event toggle)
- `guidelines/` — foundation specimen cards (Colors / Type / Layout / Effects / Brand)
- `assets/` — logos, photography (`img/`), illustrations
- `research/` — extraction screenshots of the original site
- `SKILL.md` — agent skill entry point

## Caveats

- `futura-pt-bold` (Adobe) has no license/file here → **Jost substitution**; replace when licensed files arrive.
- Body face is the OS Japanese sans stack — no webfont binary is shipped by design.
- Mirrored top page contained 404 content; home hero here is reconstructed from motifs + copy, not pixel-copied.
- HubSpot form UI is third-party and intentionally left as a marked placeholder.
- SNS icons + LP-specific artwork were not in the uploads (placeholders used).
