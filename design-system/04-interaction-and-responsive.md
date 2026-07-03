# 04. Interaction And Responsive

## Interaction

### Link Hover

観測された事実:

- ナビゲーションリンクは hover で opacity が `.6` になります。根拠: EV-0010
- パンくずリンクも hover で opacity が変化します。根拠: EV-0019

推論した規則:

- テキストリンクの hover は色変更より透明度変化を基準にしています。

### Button Hover / Active

観測された事実:

- `btn-6` は hover/active で文字色と背景を反転し、円形の疑似要素を拡大します。根拠: EV-0014
- `btn_white` と `btn_black` は初期色が異なりますが、反転系の考え方は共有されています。根拠: EV-0013, EV-0014

未確認:

- disabled
- loading
- error

### Overlay Menu

観測された事実:

- `#sp_nav` は closed で opacity 0/pointer-events none、active で opacity 1/pointer-events auto です。根拠: EV-0009
- 背景円が scale で開くため、ブランド特有の円形モーションとして扱えます。根拠: EV-0009

未確認:

- focus trap
- Escape キーで閉じる操作
- aria-expanded

### Reveal / Page Transition

観測された事実:

- `.js-fade` 系は opacity と translateY(15px) で reveal します。根拠: EV-0020
- ページ遷移は `.6s` transition です。根拠: EV-0037

改善提案:

- `prefers-reduced-motion: reduce` を導入し、reveal/transition を抑制できるようにする。

### Form States

観測された事実:

- 問い合わせフォームは HubSpot 埋め込みで、ローカル実装としての input/textarea/select の詳細状態は確認できません。根拠: EV-0024, EV-0034
- 完了ページに success 相当の状態があります。根拠: EV-0025

未確認:

- field error
- loading/submitting
- disabled
- validation success
- empty state

## Responsive

### 表示切り替え

観測された事実:

- `.sp_only` は通常非表示、767px 以下で表示されます。`.pc_only` はその逆です。根拠: EV-0006
- コピー本文内でも `pc_only`/`sp_only` が使われ、改行や文言の見え方を制御しています。根拠: EV-0022

### Layout Breakpoints

| Breakpoint | 観測用途 | 根拠 |
| --- | --- | --- |
| `374px` | 狭い SP の余白補正 | EV-0032 |
| `767px` | SP 表示、ボタン縮小、カード 1 カラム化 | EV-0006, EV-0015, EV-0018 |
| `768px` | hover mask 有効化 | EV-0016 |
| `1023px` | wrapper 幅調整 | EV-0032 |
| `1204px` | left rail header 有効化 | EV-0007 |
| `750px` | LP 固有 SP breakpoint | EV-0032 |
| `1080px` | LP 固有 desktop breakpoint | EV-0032 |

### Component Responsive Behavior

- Header: 1204px 以上で左レール、767px 以下でロゴ/メニューボタン縮小。根拠: EV-0007, EV-0008
- Button: 767px 以下で 312px から 184px へ縮小。根拠: EV-0012, EV-0015
- LinkCtaCards: 767px 以下で 2 カラムから 1 カラムへ。根拠: EV-0017, EV-0018
- Breadcrumb: 767px 以下で高さ 120px から 91px、文字 12px から 11px へ。根拠: EV-0019

## Accessibility

観測されたリスク:

- `outline:none` がグローバルに指定されている。根拠: EV-0002
- hover による視覚差分が多いが、focus-visible の代替が確認できない。根拠: EV-0010, EV-0014, EV-0016
- HubSpot フォームの label/error/focus は本体コードから確認できない。根拠: EV-0024, EV-0034
- motion reduction 対応が確認できない。根拠: EV-0020, EV-0037

改善提案:

1. `:focus-visible` token を追加し、黒/白背景の両方で見える focus ring を定義する。
2. overlay menu に focus trap、Escape close、aria-expanded を追加または確認する。
3. external form の状態を HubSpot 設定側で監査する。
4. `prefers-reduced-motion` で reveal/transition/hover mask を抑制する。
