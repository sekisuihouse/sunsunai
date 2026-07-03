# INTAKE FORM

## 会社名と概要（またはデザインシステム名）

デザインシステム名: 神山まるごと高専 Design System（静的ミラー抽出版）

会社名/組織名: 神山まるごと高専 / KAMIYAMA educational institute（フッター表記。法人種別や正式登記名はコードからは未確定）

概要: 神山まるごと高専の公式サイトから抽出したデザインシステムです。用途は学校案内、学校生活紹介、ニュース、入試情報、問い合わせ、イベント/説明会 LP への導線提供です。主要ユーザーは受験検討者、中学生・保護者、学校関係者、ニュース閲覧者です。主要画面はトップページ、学校案内、学校生活、学校便り/ニュース、入試情報、問い合わせ、キャンペーン LP です。対応デバイスは desktop/tablet/mobile で、1204px 以上では左サイドレール型ナビ、767px 以下では SP 表示に切り替わります。デザイン上の特徴は、白背景、黒文字、黒い太枠、太字の日本語、広い余白、大きな円弧/円形マスク、写真素材、控えめな opacity hover と reveal motion です。

## デザインシステムと製品の例

- 公開 URL: `https://kamiyama.ac.jp/`
- ローカルミラー: `kamiyama-ac-jp/`
- トップページ: `kamiyama-ac-jp/index.html`
- 学校案内 About: `kamiyama-ac-jp/guidance/about/index.html`
- 入試情報 2027: `kamiyama-ac-jp/admission/2027/index.html`
- 問い合わせ: `kamiyama-ac-jp/inquiry/index.html`
- 問い合わせ完了: `kamiyama-ac-jp/inquiry/complete/index.html`
- 学校説明会 LP: `kamiyama-ac-jp/lp/tour/`
- 未来の学校 FES 2023: `kamiyama-ac-jp/miraino-gakko-fes2023/`
- 主要コンポーネント: GlobalShell、HeaderNavigation、OverlayNavigation、Button、HoverMaskLink、Breadcrumb、LinkCtaCards、NewsList、Footer、HubSpotFormEmbed、CampaignLandingPage、RevealMotion
- Storybook: リポジトリ内では確認できませんでした
- デモ URL: 公開 URL 以外はコード内で確認できませんでした

## 添付を推奨するコードフォルダ

1. `kamiyama-ac-jp/wp/wp-content/themes/kamiyamamarugoto/`  
   本体サイトの共通 CSS、ロゴ複製、WordPress テーマ由来アセットが含まれるため。

2. `kamiyama-ac-jp/_nuxt/`  
   Nuxt 生成 CSS/JS があり、ページ固有 UI の生成済みスタイル確認に必要なため。

3. `kamiyama-ac-jp/img/`  
   ロゴ、OGP、学校案内、学校生活、ギャラリー、トップ用写真/動画などブランド素材の中心のため。

4. `kamiyama-ac-jp/lp/tour/`  
   学校説明会 LP のキャンペーンテーマ、色、ボタン、レスポンシブが本体と異なるため。

5. `kamiyama-ac-jp/miraino-gakko-fes2023/`  
   未来の学校 FES のイベントテーマ、白ロゴ、鮮やかな配色、LP コンポーネント確認に必要なため。

6. `kamiyama-ac-jp/**/*.html`  
   静的ミラーでは元コンポーネントソースがないため、実際の class 使用頻度、コピー、ページ構成の確認に必要なため。

## 添付を推奨する `.fig` ファイル

リポジトリ内では確認できませんでした。

## 添付を推奨するフォント、ロゴ、アセット

- `kamiyama-ac-jp/img/common/logo.svg`  
  本体ヘッダー/フッターのブランドロゴ。252px 系で利用されます。

- `kamiyama-ac-jp/wp/wp-content/themes/kamiyamamarugoto/img/common/logo.svg`  
  WordPress theme 配下の同一ロゴ複製。テーマ実装と照合する場合に必要です。

- `kamiyama-ac-jp/miraino-gakko-fes2023/assets/img/common/kamiyama_logo-white.svg`  
  イベント/色背景用の白版ロゴです。

- `kamiyama-ac-jp/img/ogp.jpg`  
  OGP 用の代表画像です。

- `kamiyama-ac-jp/img/guidance/`  
  学校案内ページで使われる写真群です。

- `kamiyama-ac-jp/img/school-life/`  
  学校生活ページで使われる写真群です。

- `kamiyama-ac-jp/img/gallery/`  
  ギャラリー系の写真群です。

- `kamiyama-ac-jp/img/index/`  
  トップページ用の画像/動画群です。

フォント: ミラー内に `woff`、`woff2`、`ttf`、`otf` のローカルフォントファイルは確認できませんでした。CSS では `futura-pt-bold` が参照されますが、配信元とライセンスは不明です。本文は OS 標準の日本語 sans-serif stack です。

## その他のメモ

配色: 本体は白、黒、薄いグレーが中心です。学校説明会 LP は水色 `#58C3F5` と黄緑 `#92DF55`、未来の学校 FES は青 `#243FAB`、シアン `#00A0E9`、ピンク `#E4007F`、黄 `#FFE100` を使います。LP 色は本体 token と分離するのが安全です。

角丸: 本体は黒い太枠と円形 mask が中心で、頻出角丸は 4px、6px、10px です。LP では 40px や 50px 非対称角丸も使われます。

余白: 本体コンテナは 1024px、内部コンテナは 812px。主要ボタンは desktop 312px、SP 184px。フッターや見出し周辺には 60px から 100px 程度の大きな余白があります。

ブランドボイス: 太字で大きめの日本語本文、短いナビ名詞句、学校案内/入試/問い合わせへ明確に誘導する構成です。推測ですが、説明的でありながら黒線と円形表現で独自性を出す方針です。

レスポンシブ: 1204px 以上で左サイドレール型ナビ、767px 以下で SP 表示に切り替わります。LP では 750px/1080px も使われます。

アクセシビリティ: `outline:none` が確認され、focus-visible の不足リスクがあります。HubSpot フォーム本体の label/error/focus 状態は本体コードから確認できません。

テーマ: core、本体、campaign-tour、campaign-event を分けるのが安全です。

例外: ローカルミラーではトップページに 404 文言が混入し、問い合わせフォームの外部埋め込みは空白に近い状態でした。原本サイトまたは本番環境での再確認が必要です。

技術的制約: 対象は静的ミラーであり、Nuxt/WordPress の原本ソース、theme object、Storybook、`.fig`、local font file は確認できません。
