# 00. Scope

## 対象

- 対象フォルダ: `kamiyama-ac-jp/`
- 対象サイト: 神山まるごと高専 公式サイトの静的ミラー
- 公開 URL: `https://kamiyama.ac.jp/`
- 出力先: `design-system/`
- 作業日: 2026-07-02
- 作業モード: 元サイトファイルは変更せず、抽出成果物のみ `design-system/` に追加

## スコープ確定

観測された対象は、オリジナルのソースリポジトリではなく、ダウンロード済みサイトの静的ミラーです。`package.json`、Tailwind 設定、Storybook、ビルド設定、テーマ設定の原本は確認できませんでした。実装根拠は、ミラー内の HTML、CSS、JavaScript バンドル、SVG、画像、ダウンロードレポート、ローカル表示確認に限定しています。

優先対象は、実際のユーザー向けページを含む `kamiyama-ac-jp/` です。`codex-design-system-extractor/` は今回使う抽出プロンプト/スキルの説明であり、対象サイトの UI 実装ではないため分析対象外にしました。

## 読み取り・除外方針

集計対象:

- `kamiyama-ac-jp/**/*.html`
- `kamiyama-ac-jp/**/*.css`
- `kamiyama-ac-jp/**/*.js`
- `kamiyama-ac-jp/**/*.svg`
- `kamiyama-ac-jp/img/**`
- `kamiyama-ac-jp/wp/wp-content/themes/kamiyamamarugoto/**`
- `kamiyama-ac-jp/lp/tour/**`
- `kamiyama-ac-jp/miraino-gakko-fes2023/**`

除外または区別:

- `node_modules`、ビルドキャッシュ、パッケージマネージャ成果物: なし
- `_nuxt/` の生成 JS/CSS: 観測対象だが、原作者が直接編集するソースとは区別
- `__external/`、Swiper、HubSpot、Google Tag Manager、SNS 埋め込み: 第三者または外部サービスとして区別
- PDF、docx、xlsx、mp4: ブランド/アセット把握には参照し、トークン抽出の主根拠にはしない

## 確認したリポジトリ情報

- `AGENTS.md`: 現在ワークスペース内では未確認
- README: `codex-design-system-extractor/README.md` は抽出ツール側の説明であり、対象サイトの README ではありません
- package manifest: `package.json` は未確認
- Tailwind/theme config: 未確認
- Storybook: 未確認
- `.fig` ファイル: 未確認

## 技術スタックの観測

観測事実:

- HTML は Nuxt 生成物らしい `data-server-rendered="true"`、`_nuxt/` アセット、ページ遷移用 CSS を含みます。根拠: EV-0037
- WordPress テーマ由来と思われる CSS と画像が `wp/wp-content/themes/kamiyamamarugoto/` に存在します。根拠: EV-0001
- キャンペーン/LP として `lp/tour/` と `miraino-gakko-fes2023/` が独立した CSS を持ちます。根拠: EV-0026, EV-0027

推論:

- 本体サイトの主要デザインシステムはモノクロ基調の WordPress/Nuxt 静的サイトで、LP は別キャンペーン表現として扱うべきです。根拠: EV-0001, EV-0012, EV-0026, EV-0027

## 視覚確認

安全に実行できるローカルサーバーで確認しました。

- ローカル URL: `http://127.0.0.1:8000/`
- Desktop: `design-system/screenshots/home-desktop.png`, `design-system/screenshots/admission-2027-desktop.png`, `design-system/screenshots/inquiry-desktop.png`
- Mobile: `design-system/screenshots/home-mobile.png`

結果:

- 入試ページはデスクトップ幅でヘッダー、左サイドナビ、巨大な円弧見出し、パンくずが描画されました。根拠: EV-0035
- トップページはローカルミラー上で 404 文言が混入しており、完全な再現とは言えません。根拠: EV-0033
- 問い合わせページは HubSpot フォーム領域が空白で、外部埋め込みの再現に失敗しています。根拠: EV-0034

## 限界

- オリジナルのコンポーネントソース、CMS テンプレート、Nuxt 設定、デザイントークン定義は入手できていません。
- HTML の多くは minify/1 行化されているため、行番号はコンテンツブロック単位の根拠になります。
- ローカルミラーでは一部ルーティング、外部フォーム、外部 API、SNS 埋め込みが完全には動作しません。
- 一度だけ出現する値は原則としてトークン化せず、監査候補またはページ固有値として扱いました。
