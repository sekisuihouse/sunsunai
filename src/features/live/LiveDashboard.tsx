"use client";

import { useRef, useState } from "react";
import { Copy, Download, MessageSquareText, Play, Square } from "lucide-react";
import { AudioCapturePanel } from "@/features/audio/AudioCapturePanel";
import { Button } from "@/design-system/primitives/Button";
import { Notice } from "@/design-system/primitives/Notice";
import { Heatmap } from "./Heatmap";
import { LiveStage } from "./LiveStage";
import { TimelineList } from "./TimelineList";
import { useLessonStore } from "../sessions/useLessonStore";

const statusLabels = {
  draft: "下書き",
  live: "進行中",
  ended: "終了",
} as const;

export function LiveDashboard() {
  const { session, timeline, addStudentComment, addTeacherSpeech, startLesson, endLesson } =
    useLessonStore();
  const [tableId, setTableId] = useState(3);
  const [manual, setManual] = useState("");
  const [notice, setNotice] = useState<{ tone: "success" | "error"; text: string } | null>(
    null,
  );
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showNotice(tone: "success" | "error", text: string) {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    setNotice({ tone, text });
    noticeTimer.current = setTimeout(() => setNotice(null), 2500);
  }

  if (!session) return null;
  const joinUrl =
    typeof window === "undefined"
      ? ""
      : `${window.location.origin}/student?sessionId=${encodeURIComponent(
          session.id,
        )}&code=${encodeURIComponent(session.joinCode)}`;

  return (
    <div className="km-stack">
      <div className="session-summary">
        <div className="metric">
          <span className="km-meta">授業</span>
          <strong>{session.title}</strong>
        </div>
        <div className="metric">
          <span className="km-meta">教室</span>
          <strong>{session.classroom}</strong>
        </div>
        <div className="metric">
          <span className="km-meta">参加コード</span>
          <strong>{session.joinCode}</strong>
        </div>
        <div className="metric">
          <span className="km-meta">ステータス</span>
          <strong>{statusLabels[session.status]}</strong>
        </div>
        <div className="metric">
          <span className="km-meta">コメント</span>
          <strong>{timeline.length}</strong>
        </div>
      </div>

      {session.status === "draft" ? (
        <div className="km-stack">
          <Notice>授業開始前です。開始すると経過時間の記録が始まります。</Notice>
          <Button icon={Play} onClick={() => void startLesson()} variant="black">
            授業を開始
          </Button>
        </div>
      ) : null}
      {session.status === "live" ? (
        <Button icon={Square} onClick={() => void endLesson()}>
          授業を終了
        </Button>
      ) : null}
      {session.status === "ended" ? (
        <Notice>授業は終了しました。AIレポートで振り返りができます。</Notice>
      ) : null}

      <div className="km-panel">
        <div className="km-panel__header">
          <span>学生参加リンク</span>
          <span className="km-meta">配布用URL</span>
        </div>
        <div className="km-panel__body km-stack">
          <p>{joinUrl}</p>
          <Button
            icon={Copy}
            onClick={() => {
              if (joinUrl) void navigator.clipboard?.writeText(joinUrl);
            }}
            size="small"
          >
            リンクをコピー
          </Button>
        </div>
      </div>

      <LiveStage timeline={timeline} />

      <div className="control-grid">
        <div className="km-stack">
          <div className="km-panel">
            <div className="km-panel__header">
              <span>コメントヒートマップ</span>
              <span className="km-meta">5分単位</span>
            </div>
            <div className="km-panel__body">
              <Heatmap timeline={timeline} />
            </div>
          </div>

          <div className="km-panel">
            <div className="km-panel__header">
              <span>タイムライン</span>
              <span className="km-meta">教員発話 / 学生コメント</span>
            </div>
            <div className="km-panel__body">
              <TimelineList timeline={timeline} />
            </div>
          </div>
        </div>

        <div className="km-stack">
          {session.status !== "ended" ? (
            <>
              <AudioCapturePanel label="教員マイク" onTranscript={addTeacherSpeech} />

              <div className="km-panel">
                <div className="km-panel__header">
                  <span>デモコメント投入</span>
                  <MessageSquareText aria-hidden size={18} />
                </div>
                <div className="km-panel__body">
                  <form
                    className="km-form"
                    onSubmit={(event) => {
                      event.preventDefault();
                      if (!manual.trim()) {
                        showNotice("error", "コメントを入力してください");
                        return;
                      }
                      void addStudentComment(tableId, manual.trim());
                      setManual("");
                      showNotice("success", "コメントを送信しました");
                    }}
                  >
                    {notice ? <Notice tone={notice.tone}>{notice.text}</Notice> : null}
                    <label className="km-field">
                      <span>テーブル</span>
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
                      <span>コメント</span>
                      <textarea
                        onChange={(event) => setManual(event.target.value)}
                        placeholder="評価基準が分かりにくい"
                        value={manual}
                      />
                    </label>
                    <Button type="submit">弾幕へ送信</Button>
                  </form>
                </div>
              </div>
            </>
          ) : null}

          <Button href="/report" icon={Download} variant="black">
            AIレポートへ
          </Button>
        </div>
      </div>
    </div>
  );
}
