# 03. Brand And Content

## 観測された事実

### ブランド名・表記

サイト上の中心ブランドは「神山まるごと高専」です。ロゴ SVG は `kamiyama-ac-jp/img/common/logo.svg` に存在し、フッターにも同じブランド表現が使われます。根拠: EV-0028

フッターには `KAMIYAMA educational institute` の著作権表記が含まれますが、法人名や正式な会社名の確定はミラーだけでは行いません。根拠: EV-0011

### ロゴ

本体ロゴ:

- Path: `kamiyama-ac-jp/img/common/logo.svg`
- 用途: 共通ヘッダー/フッターのブランド表示
- 寸法: 252px 系で扱われる
- 根拠: EV-0011, EV-0028

イベント白版ロゴ:

- Path: `kamiyama-ac-jp/miraino-gakko-fes2023/assets/img/common/kamiyama_logo-white.svg`
- 用途: 未来の学校 FES など色背景のイベントページ
- 根拠: EV-0029

### 画像・動画

ミラーには学校案内、学校生活、ギャラリー、トップページ用の画像/動画が多く含まれます。`img/` 以下の写真はデザインの主要素材で、白い余白と黒い UI の中で学校風景・人物・活動を見せる役割です。

代表パス:

- `kamiyama-ac-jp/img/common/logo.svg`
- `kamiyama-ac-jp/img/ogp.jpg`
- `kamiyama-ac-jp/img/guidance/`
- `kamiyama-ac-jp/img/school-life/`
- `kamiyama-ac-jp/img/gallery/`
- `kamiyama-ac-jp/img/index/`

### コピーとトーン

観測されたコピーは、教育理念、学校生活、入試案内、問い合わせへの導線を中心にしています。本文は大きめの 20px、太字、広めの行間で、説明文でも視認性と力強さを優先します。根拠: EV-0004, EV-0022, EV-0023

ナビゲーションは「学校案内」「学校生活」「学校便り」「入試情報」のように短く明確な名詞句で構成されています。根拠: EV-0007, EV-0035

### SNS・外部導線

トップページと共通 UI には note、LINE、Instagram、X などへの外部導線が含まれます。根拠: EV-0021

問い合わせフォームは HubSpot 埋め込みです。根拠: EV-0024, EV-0040

## 複数証拠から推論した規則

1. ブランド表現は、装飾色よりも黒線・大きな円弧・余白・写真で印象を作っています。根拠: EV-0012, EV-0017, EV-0035
2. 本体サイトでは説明的な日本語コピーを大きく太く扱い、学校の独自性を強く提示します。根拠: EV-0004, EV-0022
3. キャンペーンページは本体より色彩が強く、イベントごとの一時的な視覚表現として扱われます。根拠: EV-0026, EV-0027

## 第三者・外部スタイルの区別

- HubSpot: フォーム本体の UI、validation、送信中/エラー状態は第三者領域。根拠: EV-0024, EV-0034
- Google Tag Manager: 計測タグであり、デザインシステム対象外。根拠: EV-0040
- SNS 埋め込み/リンク: 外部ブランドや外部 UI のスタイルは対象外。根拠: EV-0021, EV-0040
- Swiper 等の外部 CSS: 汎用ライブラリとして、製品固有 token とは分離。根拠: EV-0040

## 改善提案

1. ロゴ利用ルールを「本体黒版」「イベント白版」「最小サイズ」「余白」に分けて明文化する。
2. 写真のトリミング比率、hover mask の対象、alt 記述ルールを定義する。
3. LP/campaign 色は本体 brand palette に混ぜず、campaign namespace で管理する。
4. 外部フォームの見た目を揃える必要がある場合は、HubSpot 側の theme 設定と本体 token の対応表を別途作る。
