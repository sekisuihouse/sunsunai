# 05. Audit

## 品質判定

条件付き合格です。静的ミラーから主要 token と component の根拠は抽出できていますが、原本の source component、theme object、CMS template、外部フォーム設定は未確認です。

## 重要リスク

### P1: フォーカス可視性の欠落

観測:

- `outline:none` がグローバルに指定されています。根拠: EV-0002
- ボタン、ナビ、パンくず、hover mask で focus-visible の代替が確認できません。根拠: EV-0010, EV-0014, EV-0016

影響:

- キーボード利用者が現在位置を見失う可能性があります。

提案:

- `--km-focus-ring-color`、`--km-focus-ring-width`、`--km-focus-ring-offset` を追加し、`:focus-visible` に適用する。

### P1: 第三者フォームの状態が本体から監査できない

観測:

- 問い合わせフォームは HubSpot の外部埋め込みです。根拠: EV-0024
- ローカルミラーではフォーム領域が空白です。根拠: EV-0034

影響:

- error、loading、disabled、success inline state の仕様がデザインシステム化できません。

提案:

- HubSpot 側のフォーム設定を別途エクスポート/スクリーンショット化し、フォーム専用コンポーネント仕様を追加する。

### P2: 本体と LP の token 混在

観測:

- 本体は白黒基調です。根拠: EV-0001, EV-0012, EV-0017
- LP は水色/黄緑、イベントは青/シアン/ピンク/黄の別 palette です。根拠: EV-0026, EV-0027

影響:

- すべてを同一 brand palette として扱うと、実装者が本体 UI に campaign 色を誤用する可能性があります。

提案:

- `core`、`campaign-tour`、`campaign-event` の token namespace を分ける。

### P2: Breakpoint の分裂

観測:

- 本体は 767/768/1023/1204px、LP は 750/1080px 系を使います。根拠: EV-0032

影響:

- 同じ SP/desktop 判断がページ群でずれ、改修時に表示差分が出る可能性があります。

提案:

- 本体 breakpoint と campaign breakpoint を命名で分け、移行時に意図を明示する。

### P2: フォント参照の根拠不足

観測:

- `futura-pt-bold` は CSS にありますが、ローカルフォントファイルはありません。根拠: EV-0030

影響:

- 環境によって表示が変わる可能性、ライセンス確認ができない可能性があります。

提案:

- Web font 配信元、契約、fallback を確認し、正式 token にするか削除する。

### P3: 生成 CSS と原本 CSS の境界が曖昧

観測:

- `_nuxt/entry.6d59c889.css` は巨大な生成 CSS です。
- WordPress theme CSS と LP CSS が併存します。根拠: EV-0001, EV-0026, EV-0027

影響:

- 実装者がどのファイルを編集すべきか判断しにくい可能性があります。

提案:

- 原本リポジトリ側で source CSS/component owner を明示する。

## 重複・近似値

- 色: `#fff` と `#ffffff`、`#000` と `#000000` が混在。根拠: EV-0031
- グレー: `#ececec`、`#e5e5e5`、`#e9e8e8`、`#f2f2f2`、`#f7f7f7` が近接。根拠: EV-0031
- Radius: `4px`、`5px`、`6px`、`8px`、`10px` が混在。根拠: EV-0039
- Breakpoint: `767px` と `750px`、`1023px` と `1080px` が役割上近い。根拠: EV-0032

## 未使用・未確認

- Storybook: 未確認
- `.fig`: 未確認
- local font files: 未確認
- original theme object: 未確認
- component source names: 未確認
- form error/loading/disabled states: 未確認
- reduced motion: 未確認

## セキュリティ・秘匿情報

成果物には API key、token、secret、個人情報を含めていません。外部サービスの詳細 ID や問い合わせ先の具体的連絡先も転記していません。

## 優先対応

1. P1 focus-visible token と CSS を追加する。
2. P1 HubSpot フォームの状態を外部設定込みで監査する。
3. P2 token namespace を core/campaign に分離する。
4. P2 breakpoint を整理する。
5. P2 font の配信元とライセンスを確認する。
