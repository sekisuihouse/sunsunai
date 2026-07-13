# SunSun AI 現状整理

作成日: 2026-07-06
最終更新: 2026-07-06(ローカル授業管理・タイムライン保存・lint設定を追加後)

## このアプリの概要

SunSun AI は、対面授業で学生の発話やコメントを集め、授業中は弾幕として表示し、授業後はAI授業改善レポートとしてまとめるMVPです。

現在は、Firebase と OpenAI API が未設定でも画面確認できるように、`localStorage` とモック応答へフォールバックする構成になっています。

## 現状できていること

### 基本画面と導線

- トップページでアプリ概要、授業開始、ライブ表示、学生参加、レポート画面への導線を表示できる。
- 教員向けページからライブビューと授業作成画面へ移動できる。
- 学生参加、授業作成、ライブ表示、レポート生成、Chrome拡張説明、引き継ぎ資料表示の画面が用意されている。
- `/design-system` をもとにした `src/design-system` のトークン、グローバルCSS、共通コンポーネントが導入されている。
- 通知UIプリミティブ `Notice`(`src/design-system/primitives/Notice.tsx`、info/success/error の3トーン)が追加され、各フォームのエラー・成功表示に使われている。

### 授業セッション

- 授業名、教室、教員名、テーブル数を入力して授業セッションを作成できる。授業名・教室・教員名は必須バリデーション付きで、不備時はエラー通知を表示して遷移しない。
- セッション作成時に授業IDと参加コードを生成できる。作成直後のステータスは `draft`(下書き)。
- ライブビューの「授業を開始」で `live` 化され `startedAt` が記録される。「授業を終了」で `ended` 化され `endedAt` が記録される。終了後は教員・学生ともコメント投稿フォームが閉じる。
- タイムラインの経過秒は `startedAt`(授業開始時刻)からの実時間で算出される。旧データは `startsAt` へフォールバックし、それも無い場合のみ従来の「+35秒」仮ロジックを使う(`src/features/sessions/useLessonStore.ts` の `computeElapsedSeconds`)。
- Firebase未設定時は、作成したセッションをブラウザの `localStorage` に保存できる。複数授業は `sunsunai.sessions` に一覧保存され、教員画面から選択・削除できる。
- タイムラインは授業IDごとの `localStorage` キーに保存される。新規授業作成時はタイムラインを空にして、デモ用コメントを引き継がない。
- Firebase設定がある場合は、Firestore の `sessions/{sessionId}` にセッションを保存する処理がある。

### 学生参加

- 学生がテーブル番号と名前(任意、20文字まで)を入力して参加できる。名前は参加者情報の保存、弾幕表示(`[T01 たろう] …`)、タイムライン表示(`Table 01 / たろう`)に反映される。
- 参加リンクの `sessionId` または `code` からFirestore上の授業を検索する処理がある。`code` が形式不正(英数4〜8文字以外)の場合はエラー通知を表示する。
- Firebase設定時は匿名認証を行い、参加者情報(名前含む)を `sessions/{sessionId}/participants/{participantId}` に保存する処理がある。
- 手入力のデモコメントを学生コメントとして送信できる。空文字はエラー通知、送信成功は成功通知を約2.5秒表示する。
- ブラウザのマイク録音UIから音声を送信し、文字起こし結果をコメントとして追加できる。
- コメントは送信時に簡易感情分類される(`src/lib/sentiment.ts`)。日本語キーワードの先勝ち判定で confused(難しい/分からない等)→ excited(面白い/すごい等)→ positive(なるほど/わかった等)→ neutral の順に分類され、レポートのつまずき・盛り上がり集計が実データで機能する。
- 授業が `ended` の場合は参加・投稿フォームの代わりに終了通知を表示する。`draft` の場合は「授業開始前」の通知を出し、コメント欄は `live` 中のみ表示する。

### ライブビュー

- 授業名、教室、参加コード、ステータス(下書き/進行中/終了)、コメント数を表示できる。
- ステータスに応じた操作ボタンがある: draft は「授業を開始」、live は「授業を終了」、ended は終了通知+AIレポート導線。
- 学生参加リンクを生成し、クリップボードへコピーできる。
- 学生コメントと教員発話をタイムラインとして表示できる。
- コメントを弾幕風に表示するライブステージがある。
- 弾幕の表示位置、透明度、速度、文字サイズ、一時停止、非表示を調整する型とUIがある。
- 5分単位のコメントヒートマップを表示できる。
- 教員マイクから録音し、文字起こし結果を教員発話としてタイムラインに追加できる。
- ライブ画面からデモコメントを任意のテーブル番号で投入できる。

### 音声と文字起こし

- `MediaRecorder` を使ってブラウザ上で音声録音できる。
- `/api/transcribe` へ音声ファイルを送信できる。
- `OPENAI_API_KEY` がある場合は OpenAI の音声文字起こしAPIへ接続する実装がある。
- APIキーがない場合、またはファイルがない場合は、モックの日本語コメントを返す。
- Firebase設定時は録音ファイルを Storage の `lesson-recordings/{sessionId}/...` にアップロードし、Firestoreに録音メタデータを保存する処理がある。

### AI授業改善レポート

- `/report` で授業タイムラインをもとにレポートを生成できる。
- `OPENAI_API_KEY` と `OPENAI_REPORT_MODEL` がある場合は OpenAI Responses API に分析リクエストを送る実装がある。
- OpenAI設定がない場合は、ヒューリスティックなモックレポートを生成できる。
- レポートには概要、良かった点、改善点、つまずき、盛り上がり、興味テーマ、感情分析、次回アクション、タイムラインを含められる。
- Markdown形式のレポートを画面表示できる。
- Markdownファイルとしてダウンロードできる。
- Firebase設定時は生成レポートを `sessions/{sessionId}/reports` に保存する処理がある。

### Firebase連携の下準備

- Firebaseクライアント設定、匿名認証、Firestore、Storage の接続コードがある。
- Firestore購読により、セッションとタイムラインをリアルタイム更新する処理がある。現在のセッションID変更に追従して購読し直す。
- Firebase環境変数が欠けている場合は自動的にローカル保存へフォールバックする。
- `firebase.json`、`firestore.rules`、`storage.rules` が用意されている。

### Chrome拡張

- `extension/` に Manifest V3 のChrome拡張MVPがある。
- 任意のWebページ上に弾幕表示用のDOMを注入できる。
- `window.postMessage` または `chrome.runtime.onMessage` で `SUNSUN_DANMAKU` メッセージを受け取り、ページ上にコメントを流せる。

## 現状できていないこと・未完了のこと

### 本番運用に必要な認証・権限管理

- 教員ログイン、学生ログイン、管理者ログインは未実装。
- 現状のFirebase認証は匿名認証のみ。
- Firestore/Storageルールは「認証済みなら読み書き可能」に近く、授業ごとのアクセス制御や教員・学生ロール制御は未実装。
- 参加コードを知っている学生だけが対象授業へ参加できる、という厳密な制御はまだない。

### セッション管理

- 複数授業の一覧、選択、削除はローカルモードで実装済み。検索、編集、Firestore上の授業一覧管理は未実装。
- 授業の開始・終了はライブビューから操作できるようになったが、終了後の「再開」機能はない。
- 新規授業作成時のタイムライン初期化は実装済み。
- `localStorage` モードではブラウザごとの保存なので、複数端末での同期はできない。
- 参加者一覧、参加状況、テーブルごとの接続状態表示は未実装。

### リアルタイム同期の完成度

- Firestore購読コードはあるが、環境変数とFirebaseプロジェクト設定が必要。
- ローカル保存とFirestore保存の切り替え時の競合解決、重複対策、オフライン復帰時の整合性管理は未実装。
- コメント送信の入力チェックと成功/エラー通知はクライアント側に追加済みだが、Firestore書き込み失敗時の画面通知・再送・ローディング表示は未実装(コンソールエラーのみ)。

### 音声処理

- 録音は短い手動録音が前提で、連続録音や自動区切り文字起こしは未実装。
- ノイズ除去、話者分離、複数テーブル同時録音の安定運用は未実装。
- 文字起こし結果の編集、破棄、再送信、履歴管理は未実装。
- OpenAI文字起こしAPIのエラー時はモック文言へフォールバックするため、本番では失敗を正しく検知しにくい。

### AI分析の品質管理

- `OPENAI_REPORT_MODEL` は `.env.example` で空欄のため、モデル選定と設定が必要。
- AI分析結果のレビュー、再生成、編集保存、過去レポート一覧は未実装。
- 分析プロンプトは最小限で、教育観点や学校固有の評価軸はまだ深く組み込まれていない。
- モック分析は感情ラベルとキーワードに基づく簡易ロジックで、実際の授業理解を保証するものではない。
- コメントの感情分類(`src/lib/sentiment.ts`)もキーワードの部分一致による簡易実装。否定表現(「難しくない」等)や文脈は考慮されない。

### Chrome拡張の完成度

- 拡張機能はメッセージを受け取って弾幕表示するところまでのMVP。
- Firebaseから直接コメントを購読するbackground scriptは未実装。
- 拡張機能の設定画面、授業選択、ログイン、表示調整UIは未実装。
- 配布用のパッケージ化、ストア公開、権限最小化の検証は未実装。

### UI・アクセシビリティ・運用面

- 授業作成の必須チェック、参加コード形式チェック、コメント送信の成功/エラー通知は実装済み。ただし空状態表示や、より細かいフィールド単位のエラー表示はまだ簡易的。
- 実授業中の大画面投影、スマホ参加、タブレット参加などの実機検証は未確認。
- デザインシステムへの準拠を前提に実装されているが、全画面の視覚回帰テストやスクリーンショット比較は未整備。
- ログ、監査、データ削除、個人情報管理、録音データの保存期間設定は未実装。

### テスト・CI・デプロイ

- `package.json` に `lint`、`type-check`、`test`、`build` コマンドは定義されている。
- `eslint.config.mjs` を追加し、`npm run lint` は `eslint .` を実行する設定に変更済み。
- 自動テストは実質 `type-check` のみで、ユニットテストやE2Eテストは未整備。
- GitHub Actions の `CI` ワークフローを追加済み。`npm ci`、`npm run lint`、`npm run type-check`、`npm run build` を実行する。
- Firebase Hostingや本番デプロイ環境への接続は未完了。

## 動かすための前提

### ローカル確認

```bash
npm install
npm run dev
```

FirebaseとOpenAIを設定しなくても、ローカル画面は `localStorage` とモック応答で確認できます。

### OpenAIを使う場合

`.env.local` に以下を設定します。

```env
OPENAI_API_KEY=
OPENAI_TRANSCRIBE_MODEL=gpt-4o-mini-transcribe
OPENAI_REPORT_MODEL=
```

`OPENAI_REPORT_MODEL` は未設定だとAI分析ではなくモック分析になります。

### Firebaseを使う場合

`.env.local` に以下を設定します。

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Firestore、Authentication、Storageの有効化とルール反映が必要です。

## 2026-07-06 実施済みの改善(コードのみ、外部設定不要)

以下は引き継ぎ時点で実装済みと記録されていた内容。今回の作業環境では `node` / `npm` が未導入のため、再検証はできていない。

1. 経過秒の実時間化: `startedAt` 基準の実経過秒に変更。旧データは `startsAt` フォールバックで後方互換あり(`useLessonStore.ts` の `computeElapsedSeconds`)。
2. 学生名前入力の接続: 参加者保存・弾幕・タイムライン表示に反映(`StudentJoin.tsx`)。
3. 簡易感情分類: `src/lib/sentiment.ts` 新規。コメント送信時に confused/excited/positive/neutral を自動判定。
4. 授業ステータス管理: 作成時 `draft`、開始/終了ボタンで `live`/`ended` 遷移。`ended` 後は教員・学生とも投稿不可。
5. バリデーション+通知UI: `Notice` プリミティブ新規(`src/design-system/primitives/Notice.tsx`、トークン `--km-color-notice-*` を `tokens.css` に追加、スタイルは `components.css` の `.km-notice`)。授業作成の必須チェック、参加コード形式チェック、送信の成功/エラー通知。通知色は本体サイトのcore tokenのみを使用し、キャンペーン色は使わない。

## 2026-07-06 追加改善(今回)

1. 新規授業作成時にタイムラインを初期化し、デモコメントが新しい授業へ混ざらないようにした。
2. `localStorage` の保存を授業ID別タイムラインへ拡張し、旧 `sunsunai.timeline` 形式からも読める互換処理を追加した。
3. 教員画面に `SessionManager` を追加し、ローカル保存済み授業の一覧、選択、ライブ表示への遷移、削除をできるようにした。
4. Firestore購読を初期セッション固定から現在のセッションID追従に変更した。
5. `eslint.config.mjs` を追加し、`package.json` の lint を `eslint .` に変更した。
6. 本体UIでキャンペーン色を使わないよう、通知トークンを白黒・グレー系core tokenへ修正した。
7. `.github/workflows/ci.yml` を追加し、GitHub Actions で lint / type-check / build を実行する土台を作った。

検証メモ: この作業環境では `node` / `npm` が未導入のため、`npm run lint`、`npm run type-check`、`npm run test`、`npm run build` は実行できていない。Node.js が入っている環境で必ず実行すること。

なお `addStudentComment` のシグネチャは `(tableId, text, speakerName?)` に変更済み(sentiment 引数は廃止、内部で自動分類)。

## 次に優先してやるとよいこと

1. Node.js が入った環境で `npm run lint`、`npm run type-check`、`npm run test`、`npm run build` を実行し、必要なら修正する。
2. Firebaseプロジェクトを接続し、複数端末でセッション、学生コメント、ライブビューが同期するか確認する。
3. 教員と学生の認証・権限設計を固め、Firestore/Storageルールを本番向けに絞る。
4. 音声録音を連続運用できる形にする。
5. OpenAIレポートモデルとプロンプトを確定し、実授業データで分析品質を確認する。
6. Chrome拡張に授業選択、Firebase購読、表示設定を追加する。
