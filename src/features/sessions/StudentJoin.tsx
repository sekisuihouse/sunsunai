"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";
import { Button } from "@/design-system/primitives/Button";
import { AudioCapturePanel } from "@/features/audio/AudioCapturePanel";
import {
  ensureAnonymousUser,
  findSessionByJoinCode,
  getSessionFromFirestore,
  isFirebaseEnabled,
  saveParticipantToFirestore,
} from "@/lib/firebase";
import { useLessonStore } from "./useLessonStore";

export function StudentJoin() {
  const searchParams = useSearchParams();
  const { session, setSession, addStudentComment } = useLessonStore();
  const [joined, setJoined] = useState(false);
  const [tableId, setTableId] = useState(1);
  const [status, setStatus] = useState("参加リンクを確認中");

  useEffect(() => {
    const sessionId = searchParams.get("sessionId");
    const code = searchParams.get("code");
    if (!isFirebaseEnabled() || (!sessionId && !code)) {
      setStatus("ローカルデモ授業へ参加できます");
      return;
    }

    async function loadRemoteSession() {
      setStatus("Firestoreから授業を読み込み中");
      const remoteSession = sessionId
        ? await getSessionFromFirestore(sessionId)
        : code
          ? await findSessionByJoinCode(code)
          : null;
      if (remoteSession) {
        await setSession(remoteSession);
        setStatus("授業を読み込みました");
      } else {
        setStatus("授業が見つかりません。参加コードを確認してください");
      }
    }

    void loadRemoteSession();
  }, [searchParams, setSession]);

  if (!session) return null;

  return (
    <div className="km-stack">
      <div className="km-panel">
        <div className="km-panel__header">
          <span>学生参加</span>
          <span className="km-meta">
            参加コード {session.joinCode} / {status}
          </span>
        </div>
        <div className="km-panel__body">
          {!joined ? (
            <form
              className="km-form"
              onSubmit={(event) => {
                event.preventDefault();
                setJoined(true);
                if (isFirebaseEnabled()) {
                  void ensureAnonymousUser().then((user) => {
                    if (!user) return;
                    return saveParticipantToFirestore({
                      sessionId: session.id,
                      participantId: user.uid,
                      role: "student",
                      tableId,
                    });
                  });
                }
              }}
            >
              <label className="km-field">
                <span>テーブル番号</span>
                <select
                  onChange={(event) => setTableId(Number(event.target.value))}
                  value={tableId}
                >
                  {Array.from({ length: session.tableCount }, (_, index) => index + 1).map(
                    (count) => (
                      <option key={count} value={count}>
                        T{String(count).padStart(2, "0")}
                      </option>
                    ),
                  )}
                </select>
              </label>
              <label className="km-field">
                <span>名前 任意</span>
                <input placeholder="未入力でも参加できます" />
              </label>
              <Button icon={LogIn} type="submit" variant="black">
                参加する
              </Button>
            </form>
          ) : (
            <div className="km-stack">
              <p>
                T{String(tableId).padStart(2, "0")} として参加中です。録音から文字起こしするか、
                下の入力欄でデモコメントを送信できます。
              </p>
              <AudioCapturePanel
                label={`T${String(tableId).padStart(2, "0")} 音声取得`}
                onTranscript={(text) => addStudentComment(tableId, text, "neutral")}
                tableId={tableId}
              />
              <ManualCommentForm
                onSubmit={(text) => addStudentComment(tableId, text, "neutral")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ManualCommentForm({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState("");
  return (
    <form
      className="km-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (!text.trim()) return;
        onSubmit(text.trim());
        setText("");
      }}
    >
      <label className="km-field">
        <span>デモコメント</span>
        <textarea
          onChange={(event) => setText(event.target.value)}
          placeholder="ここ難しい、もう一度聞きたい"
          value={text}
        />
      </label>
      <Button type="submit">コメントを送信</Button>
    </form>
  );
}
