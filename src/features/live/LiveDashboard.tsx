"use client";

import { useState } from "react";
import { Copy, Download, MessageSquareText } from "lucide-react";
import { AudioCapturePanel } from "@/features/audio/AudioCapturePanel";
import { Button } from "@/design-system/primitives/Button";
import { Heatmap } from "./Heatmap";
import { LiveStage } from "./LiveStage";
import { TimelineList } from "./TimelineList";
import { useLessonStore } from "../sessions/useLessonStore";

export function LiveDashboard() {
  const { session, timeline, addStudentComment, addTeacherSpeech } = useLessonStore();
  const [tableId, setTableId] = useState(3);
  const [manual, setManual] = useState("");

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
          <span className="km-meta">コメント</span>
          <strong>{timeline.length}</strong>
        </div>
      </div>

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
                  if (!manual.trim()) return;
                  addStudentComment(tableId, manual.trim(), "neutral");
                  setManual("");
                }}
              >
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

          <Button href="/report" icon={Download} variant="black">
            AIレポートへ
          </Button>
        </div>
      </div>
    </div>
  );
}
