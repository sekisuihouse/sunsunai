# 02. Components

## GlobalShell

観測された事実:

- 共通 shell は header/navigation/main/footer で構成され、トップ、学校案内、入試、問い合わせで反復します。根拠: EV-0007, EV-0011, EV-0021, EV-0035
- 1204px 以上では左サイドレール、狭い幅では上部固定ヘッダーになります。根拠: EV-0007
- 入試ページのスクリーンショットでは左レールと巨大な円弧見出しが描画されています。根拠: EV-0035

推論した規則:

- GlobalShell はページ固有のグラフィック表現を受け止める白いキャンバスとして設計されています。

改善提案:

- Shell の desktop rail、top header、overlay navigation を仕様上の variant として分ける。
- focus ring と skip link の有無を実装で確認し、不足していれば追加する。

## HeaderNavigation

観測された事実:

- ロゴ、ナビリンク、メニューボタン、下部 CTA で構成されます。根拠: EV-0007, EV-0008, EV-0010
- ナビリンクは 15-16px の太字で、hover は `opacity:.6` です。根拠: EV-0010
- メニューボタンは 3 本線の独自アイコンで、`transition: all .35s ease-in-out` を使います。根拠: EV-0008

Variant:

- `desktop-left-rail`: 1204px 以上、幅 180px
- `tablet-mobile-top`: 1203px 以下、上部 fixed header

State:

- `default`: 確認済み
- `hover`: 確認済み、opacity 低下
- `active/open`: overlay navigation 側で確認済み
- `disabled`, `loading`, `error`: 未確認

Accessibility:

- focus outline が全体で消されているため、キーボード操作時の視認性リスクがあります。根拠: EV-0002

## OverlayNavigation

観測された事実:

- `#sp_nav` は fixed overlay で、閉じた状態は `opacity:0` と `pointer-events:none` です。根拠: EV-0009
- `.active` で `opacity:1`、`pointer-events:auto` になります。根拠: EV-0009
- 背景の `close_bg` は `999rem` の巨大な円形を scale させます。根拠: EV-0009

State:

- `closed`: 確認済み
- `open`: 確認済み
- `hover`: nav link で確認済み
- `focus trap`, `escape close`: 静的ミラーから未確認

改善提案:

- `aria-expanded`、`aria-controls`、focus trap、escape close を実装側で確認する。

## Button

観測された事実:

- 主要ボタンは 312px 幅、20px padding、20px 太字、4px 黒枠です。根拠: EV-0012
- SP は 184px 幅、12px padding、18px、2px 枠です。根拠: EV-0015
- `btn-6`、`btn_white`、`btn_black` が存在します。根拠: EV-0013
- hover/active は色反転と円形疑似要素の拡大です。根拠: EV-0014
- 入試ページには未公開状態に見えるボタン表現があります。根拠: EV-0023

Anatomy:

- link または button
- inner text
- animated span

State:

- `default`: 確認済み
- `hover`: 確認済み
- `active`: 確認済み
- `disabled`, `loading`, `error`: 未確認

Token dependency:

- `size.button`
- `size.button-mobile`
- `borderWidth.button`
- `borderWidth.button-mobile`
- `motion.base`
- `color.black`
- `color.white`

改善提案:

- 無効状態と未公開状態を区別し、disabled の HTML 属性/aria-disabled と視覚表現を揃える。
- focus-visible のスタイルを追加する。

## HoverMaskLink

観測された事実:

- `hover_mask` はデスクトップで円形 mask を拡大する画像/リンク表現です。根拠: EV-0016
- `hover_mask` は HTML 内で多数出現します。根拠: EV-0038

State:

- `default`: 確認済み
- `hover`: 確認済み
- `focus`, `disabled`: 未確認

Responsive:

- `min-width:768px` で効果が有効です。SP 用の hover 代替は確認できません。根拠: EV-0016

## Breadcrumb

観測された事実:

- パンくずは右寄せ、12px 太字、薄いグレーのセパレーターです。根拠: EV-0019
- wrapper height は desktop 120px、SP 91px です。根拠: EV-0019
- 入試ページの視覚確認でも右寄せパンくずが描画されました。根拠: EV-0035

State:

- `default`: 確認済み
- `hover`: link opacity 変化として確認済み
- `selected/current`: current item として確認済み
- `disabled`: 未確認

改善提案:

- `nav aria-label="breadcrumb"` と `ol` 構造の有無を原本テンプレートで確認する。

## LinkCtaCards

観測された事実:

- 2 カラム、4px 黒枠、黒帯タイトル、説明文、link text の構成です。根拠: EV-0017
- SP では 1 カラムになり、タイトル 21px、説明 13px、link text 18px に縮小します。根拠: EV-0018

State:

- `default`: 確認済み
- `hover`: nested hover mask がある場合のみ確認済み
- `empty`: 未確認

改善提案:

- カード全体リンクか、内部リンクかを統一し、読み上げ重複を避ける。

## NewsList

観測された事実:

- トップページとニュース一覧にニュース構造が存在します。根拠: EV-0021
- 共通クラスとリンク hover のスタイルは確認できます。根拠: EV-0010, EV-0038

State:

- `default`: 確認済み
- `hover`: 共通リンクとして確認済み
- `empty`, `loading`, `error`: 未確認

限界:

- ニュース詳細構造の多くは生成 HTML と Nuxt bundle 内にあり、元コンポーネント名は特定できません。

## Footer

観測された事実:

- ロゴ、SNS、ナビ、著作権で構成されます。根拠: EV-0011
- social icon は desktop 50px、SP 40px です。根拠: EV-0011
- ロゴは `img/common/logo.svg` として存在します。根拠: EV-0028

State:

- `default`: 確認済み
- `hover`: 共通 opacity hover として確認済み
- `disabled`: 未確認

## HubSpotFormEmbed

観測された事実:

- 問い合わせフォームは `#hubspot-form` の外部埋め込みです。根拠: EV-0024
- ローカルミラーではフォーム領域が空白に近い状態で表示されました。根拠: EV-0034
- 完了ページは別 URL として存在します。根拠: EV-0025

State:

- `default`: placeholder として確認済み
- `success`: 完了ページとして確認済み
- `loading`, `error`, `disabled`: 本体コードから未確認

第三者スタイル:

- フォーム本体の入力、バリデーション、エラー、送信中状態は HubSpot 側の責務として分離します。

## CampaignLandingPage

観測された事実:

- 学校説明会 LP は水色/黄緑の配色を使います。根拠: EV-0026
- 未来の学校 FES は青/シアン/ピンク/黄のイベント配色を使います。根拠: EV-0027
- イベント用の白ロゴが存在します。根拠: EV-0029

推論した規則:

- 本体デザインシステムの component variant ではなく、campaign theme として分離する方が安全です。

## RevealMotion

観測された事実:

- `.js-fade`、`.fv-fade`、`.fv-fade2` は opacity 0 と translateY(15px) から `.is-show` で表示されます。根拠: EV-0020
- ページ遷移は `.page-enter-active`/`.page-leave-active` の `.6s` transition です。根拠: EV-0037
- `js-fade` は HTML 全体で多数出現します。根拠: EV-0038

改善提案:

- `prefers-reduced-motion` を追加し、reveal/transition を低減できるようにする。
