# 神山まるごと高専 Design System 抽出結果

## 概要

このデザインシステムは、`kamiyama-ac-jp/` の静的ミラーから観測できる UI 実装を根拠に抽出したものです。原本のソースリポジトリではなく、HTML/CSS/JS bundle/画像/SVG/ローカル表示確認を証拠にしています。

## Core Identity

観測された本体サイトの核は、白背景、黒文字、黒枠、太字の日本語、広い余白、大きな円形/円弧表現です。根拠: EV-0001, EV-0003, EV-0004, EV-0012, EV-0017, EV-0035

LP/campaign は別 theme です。学校説明会 LP は水色/黄緑、未来の学校 FES は青/シアン/ピンク/黄の配色を持ちます。根拠: EV-0026, EV-0027

## Foundations

主要 token は `tokens.json` と `tokens.css` に定義しています。

最重要 token:

| Token | Value | 根拠 |
| --- | --- | --- |
| `color.background` | `#ffffff` | EV-0003 |
| `color.text` | `#000000` | EV-0001 |
| `color.border-strong` | `#000000` | EV-0012 |
| `fontFamily.sans-ja` | system Japanese sans stack | EV-0001 |
| `fontSize.body-large` | `20px` | EV-0004 |
| `lineHeight.body` | `2` | EV-0004 |
| `size.container` | `1024px` | EV-0005 |
| `size.desktop-rail` | `180px` | EV-0007 |
| `motion.base` | `all .35s ease-in-out` | EV-0039 |

## Components

抽出対象コンポーネント:

- GlobalShell
- HeaderNavigation
- OverlayNavigation
- Button
- HoverMaskLink
- Breadcrumb
- LinkCtaCards
- NewsList
- Footer
- HubSpotFormEmbed
- CampaignLandingPage
- RevealMotion

詳細は `components.json` と `02-components.md` を参照してください。

## Interaction

本体サイトの interaction は、opacity hover、黒白反転ボタン、円形 mask、overlay の円形拡大、scroll reveal が中心です。根拠: EV-0009, EV-0010, EV-0014, EV-0016, EV-0020

未確認の状態:

- Button disabled/loading/error
- Form loading/error/disabled
- News empty/loading/error
- Overlay focus trap/escape close
- prefers-reduced-motion

## Responsive

本体の主 breakpoint は `374px`、`767px`、`768px`、`1023px`、`1204px` です。`1204px` 以上で左サイドレールが有効になり、`767px` 以下で SP 表示とコンポーネント縮小が多く発生します。根拠: EV-0006, EV-0007, EV-0015, EV-0018, EV-0019, EV-0032

LP は `750px`、`1080px` 系も使うため、本体 breakpoint と分離してください。根拠: EV-0032

## Brand Assets

本体ロゴ:

- `kamiyama-ac-jp/img/common/logo.svg`
- 根拠: EV-0028

イベント白版ロゴ:

- `kamiyama-ac-jp/miraino-gakko-fes2023/assets/img/common/kamiyama_logo-white.svg`
- 根拠: EV-0029

主要画像フォルダ:

- `kamiyama-ac-jp/img/guidance/`
- `kamiyama-ac-jp/img/school-life/`
- `kamiyama-ac-jp/img/gallery/`
- `kamiyama-ac-jp/img/index/`

## Audit Summary

最重要リスク:

1. `outline:none` による focus 可視性不足。根拠: EV-0002
2. HubSpot フォームの状態が本体コードから監査できない。根拠: EV-0024, EV-0034
3. 本体 token と campaign token が混在しやすい。根拠: EV-0026, EV-0027

詳しくは `05-audit.md` を参照してください。

## 使い方

1. 本体サイト実装には `core` token を優先する。
2. LP 実装では `campaign-tour` または `campaign-event` token を明示的に使う。
3. 外部フォームや SNS 埋め込みの UI は本体 component と混ぜず、third-party として別管理する。
4. 実装前に Evidence ID を参照し、観測事実か推論かを確認する。
