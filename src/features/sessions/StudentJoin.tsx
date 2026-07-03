"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";
import { Button } from "@/design-system/primitives/Button";
import { AudioCapturePanel } from "@/features/audio/AudioCapturePanel";
import { useLessonStore } from "./useLessonStore";

export function StudentJoin() {
  const { session, addStudentComment } = useLessonStore();
  const [joined, setJoined] = useState(false);
  const [tableId, setTableId] = useState(1);

  if (!session) return null;

  return (
    <div className="km-stack">
      <div className="km-panel">
        <div className="km-panel__header">
          <span>学生参加</span>
          <span className="km-meta">参加コード {session.joinCode}</span>
        </div>
        <div className="km-panel__body">
          {!joined ? (
            <form
              className="km-form"
              onSubmit={(event) => {
                event.preventDefault();
                setJoined(true);
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
