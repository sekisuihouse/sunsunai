# SunSun AI 引き継ぎ資料

## 概要

SunSun AI は、対面授業の学生発話をリアルタイムに文字起こしし、授業画面へ弾幕表示し、授業後にAI授業改善レポートを生成するMVPです。

現在の実装は、Firebase設定がある場合は Authentication / Firestore / Storage に接続し、未設定でもブラウザだけで画面確認できるように `localStorage` とモック応答へフォールバックします。OpenAI APIキーを設定すると、録音文字起こしとAI分析ルートが実APIへ接続されます。

## 使用デザインシステム

UIは `/design-system` を唯一の仕様として使います。

実装前に必ず確認するファイル:

- `AGENTS.md`
- `design-system/DESIGN_SYSTEM.md`
- `design-system/tokens.json`
- `design-system/components.json`
- `design-system/QUALITY_REPORT.md`
- `design-system/evidence.json`

実装済みのcentral token layer:

- `src/design-system/tokens.css`
- `src/design-system/globals.css`
- `src/design-system/components.css`

主に使っているトークン:

- `--km-color-background`
- `--km-color-text`
- `--km-color-border-strong`
- `--km-font-sans-ja`
- `--km-font-size-body-large`
- `--km-line-height-body`
- `--km-space-*`
- `--km-size-container`
- `--km-size-desktop-rail`
- `--km-border-width-button`
- `--km-motion-base`

本体画面は白背景、黒文字、黒枠、太字日本語、広い余白を使います。キャンペーン色は本体画面に混ぜないでください。

## セットアップ

```bash
npm install
cp .env.example .env.local
npm run dev
```

検証:

```bash
npm run lint
npm run type-check
npm run test
npm run build
```

この作業環境では `node` / `npm` が未導入だったため、上記コマンドは未実行です。Node.js が入っている環境で必ず実行してください。

Firebase SDK を追加しているため、既存の `package-lock.json` がある場合も、まず通常の `npm install` で lock file を更新してください。

## 主要画面

- `/`  
  概要、導線、実装済み機能の確認。

- `/teacher`  
  教員向けダッシュボード。

- `/session`  
  授業セッション作成。現在は `localStorage` に保存。

- `/student`  
  学生テーブル参加。テーブル番号を選び、録音またはデモコメントを送信。

- `/live`  
  ライブビュー。弾幕、ヒートマップ、タイムライン、教員マイク、デモコメント投入。

- `/report`  
  AI授業分析。OpenAI未設定時はヒューリスティックなモックレポートを生成。

- `/extension`  
  Chrome拡張機能の説明とデモ。

- `/read`  
  この `read.md` をアプリ内で表示。

## ディレクトリ構成

```text
app/
  api/
    analyze/route.ts
    transcribe/route.ts
  extension/page.tsx
  live/page.tsx
  read/page.tsx
  report/page.tsx
  session/page.tsx
  student/page.tsx
  teacher/page.tsx
src/
  design-system/
    tokens.css
    globals.css
    components.css
    primitives/
    components/
    motion/
  features/
    audio/
    live/
    reports/
    sessions/
  lib/
  types/
extension/
  manifest.json
  content/
design-system/
  DESIGN_SYSTEM.md
  tokens.json
  components.json
  evidence.json
  QUALITY_REPORT.md
```

## データモデル

型定義は `src/types/domain.ts` にあります。

- `LessonSession`  
  授業ID、授業名、教室、教員、参加コード、テーブル数、状態。

- `TimelineEntry`  
  学生コメント・教員発話の共通イベント。経過秒、テーブル番号、発話内容、感情、取得元を持ちます。

- `LessonReport`  
  授業概要、良かった点、改善点、つまずき、盛り上がり、興味テーマ、感情分析、次回提案、Markdown。

- `DanmakuSettings`  
  弾幕の上下表示、透明度、速度、文字サイズ、一時停止、非表示。

## 現在の保存方式

Firebase設定が入っていない場合、`src/lib/storage.ts` が `localStorage` へ保存します。

- `sunsunai.session`
- `sunsunai.timeline`

Firebase設定が入っている場合、`src/lib/firebase.ts` と `src/features/sessions/useLessonStore.ts` が Firestore へ保存し、教員画面は `onSnapshot` でリアルタイム購読します。

## OpenAI API

APIルート:

- `app/api/transcribe/route.ts`
- `app/api/analyze/route.ts`

環境変数:

```env
OPENAI_API_KEY=
OPENAI_TRANSCRIBE_MODEL=gpt-4o-mini-transcribe
OPENAI_REPORT_MODEL=
```

`OPENAI_API_KEY` が無い場合:

- `/api/transcribe` はモック文字起こしを返します。
- `/api/analyze` は `src/lib/report.ts` のヒューリスティック分析を返します。

`OPENAI_REPORT_MODEL` は空のままにしています。導入時点のOpenAI公式ドキュメントで利用モデルを決めて設定してください。

## 弾幕オーバーレイ

アプリ内:

- `src/features/live/DanmakuOverlay.tsx`
- `src/features/live/LiveStage.tsx`

Chrome拡張:

- `extension/manifest.json`
- `extension/content/danmaku-overlay.js`
- `extension/content/danmaku-overlay.css`

拡張機能はChromeの `chrome://extensions` で「パッケージ化されていない拡張機能」として `extension/` を読み込みます。

テスト用メッセージ:

```js
window.postMessage({
  source: "sunsunai",
  type: "SUNSUN_DANMAKU",
  payload: { tableId: 3, text: "ここ難しい", lane: "top", speed: 12 }
}, "*");
```

将来Firebaseに接続する場合は、content script から直接Firestoreを読むより、拡張機能のbackground scriptで認証・購読し、content scriptへ `chrome.runtime.sendMessage` で渡す構成が安全です。

## Firebase化の方針

すでに準備しているファイル:

- `firebase.json`
- `firestore.rules`
- `storage.rules`
- `src/lib/firebase.ts`
- `src/features/sessions/useLessonStore.ts`

実装済みコレクション:

```text
sessions/{sessionId}
sessions/{sessionId}/timeline/{entryId}
sessions/{sessionId}/participants/{participantId}
sessions/{sessionId}/reports/{reportId}
sessions/{sessionId}/recordings/{recordingId}
```

推奨Storage:

```text
lesson-recordings/{sessionId}/{fileName}
```

Firebaseでサーバーを構築する場合に必要なもの:

1. FirebaseプロジェクトID
2. WebアプリのFirebase config
3. Authenticationの匿名ログイン有効化
4. Firestoreのリージョン
5. Storageの有効化
6. Next.jsをFirebase Hostingで静的配信するか、Firebase App HostingでSSR/API込みにするか

このMVPはAPI Routeを使うため、本番ではFirebase App Hosting、Cloud Run、Vercelのいずれかが扱いやすいです。静的Hostingだけにすると `/api/transcribe` と `/api/analyze` は別サーバーへ分離する必要があります。

### Firebase Consoleでやること

1. Firebase Consoleでプロジェクトを作成する。
2. Webアプリを追加し、表示されたFirebase configを `.env.local` に入れる。
3. Authenticationで「匿名」を有効化する。
4. Firestore Databaseを作成する。
5. Storageを作成する。
6. Firebase CLIを使える環境で rules を反映する。

```bash
firebase login
firebase use <project-id>
firebase deploy --only firestore:rules,storage
```

### `.env.local` 例

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### Firebase接続後の動作

- `/session` で授業作成すると `sessions/{sessionId}` に保存されます。
- `/live` に学生参加リンクが表示されます。
- `/student?sessionId=...&code=...` で学生が授業へ参加できます。
- 学生コメントと教員発話は `sessions/{sessionId}/timeline` に保存されます。
- 教員画面は Firestore の `timeline` をリアルタイム購読して弾幕へ反映します。
- 録音ファイルは `lesson-recordings/{sessionId}/...` へ保存され、メタデータは `sessions/{sessionId}/recordings` に保存されます。

## GitHub

指定リポジトリ:

```text
https://github.com/sekisuihouse/sunsunai
```

この環境には `gh` が無いため、GitHub CLIは使っていません。`git` のみ使えます。

通常の反映手順:

```bash
git remote add origin https://github.com/sekisuihouse/sunsunai.git
git add .
git commit -m "Build SunSun AI MVP"
git push -u origin main
```

認証で失敗した場合は、GitHub Desktop、Personal Access Token、またはGitHub CLIで認証してください。

## 後継が改造するときの注意

- UIを変更する前に `AGENTS.md` と `/design-system` を読む。
- 色、余白、角丸、文字サイズを直接増やさず、まず `src/design-system/tokens.css` に対応があるか見る。
- 本体画面にキャンペーン色を混ぜない。
- 学生コメント、教員発話、AI分析は `TimelineEntry` を中心に拡張する。
- Firebaseへ移行するときは、まず `src/lib/storage.ts` と `useLessonStore.ts` の保存処理だけを差し替える。
- 録音データは個人情報になり得るため、保存期間、同意、閲覧権限を実装前に決める。
- 拡張機能は任意機能として扱い、アプリ本体のライブビューだけでも授業運用できる状態を保つ。
