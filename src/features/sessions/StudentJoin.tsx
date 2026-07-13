"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";
import { Button } from "@/design-system/primitives/Button";
import { Notice } from "@/design-system/primitives/Notice";
import { AudioCapturePanel } from "@/features/audio/AudioCapturePanel";
import {
  ensureAnonymousUser,
  findSessionByJoinCode,
  getSessionFromFirestore,
  isFirebaseEnabled,
  saveParticipantToFirestore,
} from "@/lib/firebase";
import { useLessonStore } from "./useLessonStore";

const joinCodePattern = /^[a-z0-9]{4,8}$/i;

export function StudentJoin() {
  const searchParams = useSearchParams();
  const { session, setSession, addStudentComment } = useLessonStore();
  const [joined, setJoined] = useState(false);
  const [tableId, setTableId] = useState(1);
  const [studentName, setStudentName] = useState("");
  const [status, setStatus] = useState("参加リンクを確認中");
  const [codeError, setCodeError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get("sessionId");
    const code = searchParams.get("code");
    if (code && !joinCodePattern.test(code)) {
      setCodeError("参加コードの形式が正しくありません");
    }
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
  const ended = session.status === "ended";

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
          {codeError ? <Notice tone="error">{codeError}</Notice> : null}
          {ended ? (
            <Notice>この授業は終了しました。コメントの受付は締め切られています。</Notice>
          ) : !joined ? (
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
                      name: studentName.trim() || undefined,
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
                <input
                  maxLength={20}
                  onChange={(event) => setStudentName(event.target.value)}
                  placeholder="未入力でも参加できます"
                  value={studentName}
                />
              </label>
              <Button icon={LogIn} type="submit" variant="black">
                参加する
              </Button>
            </form>
          ) : (
            <div className="km-stack">
              <p>
                T{String(tableId).padStart(2, "0")}
                {studentName.trim() ? ` ${studentName.trim()}` : ""} として参加中です。
                録音から文字起こしするか、下の入力欄でデモコメントを送信できます。
              </p>
              {session.status === "draft" ? (
                <Notice>授業開始前です。開始までお待ちください。</Notice>
              ) : (
                <>
                  <AudioCapturePanel
                    label={`T${String(tableId).padStart(2, "0")} 音声取得`}
                    onTranscript={(text) =>
                      addStudentComment(tableId, text, studentName.trim() || undefined)
                    }
                    tableId={tableId}
                  />
                  <ManualCommentForm
                    onSubmit={(text) =>
                      addStudentComment(tableId, text, studentName.trim() || undefined)
                    }
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ManualCommentForm({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState("");
  const [notice, setNotice] = useState<{ tone: "success" | "error"; text: string } | null>(
    null,
  );
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showNotice(tone: "success" | "error", message: string) {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    setNotice({ tone, text: message });
    noticeTimer.current = setTimeout(() => setNotice(null), 2500);
  }

  return (
    <form
      className="km-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (!text.trim()) {
          showNotice("error", "コメントを入力してください");
          return;
        }
        onSubmit(text.trim());
        setText("");
        showNotice("success", "コメントを送信しました");
      }}
    >
      {notice ? <Notice tone={notice.tone}>{notice.text}</Notice> : null}
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
