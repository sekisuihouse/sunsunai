"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/design-system/primitives/Button";
import { Notice } from "@/design-system/primitives/Notice";
import {
  deleteStoredSession,
  loadSession,
  loadSessionList,
} from "@/lib/storage";
import type { LessonSession } from "@/types/domain";
import { useLessonStore } from "./useLessonStore";

const statusLabels = {
  draft: "下書き",
  live: "進行中",
  ended: "終了",
} as const;

export function SessionManager() {
  const router = useRouter();
  const { session, setSession } = useLessonStore();
  const [sessions, setSessions] = useState<LessonSession[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    setSessions(loadSessionList());
  }, [session]);

  async function selectSession(next: LessonSession) {
    await setSession(next);
    setNotice(`${next.title} を現在の授業にしました`);
  }

  async function openSession(next: LessonSession) {
    await setSession(next);
    router.push("/live");
  }

  async function removeSession(sessionId: string) {
    deleteStoredSession(sessionId);
    const nextSessions = loadSessionList();
    setSessions(nextSessions);
    if (session?.id === sessionId) {
      await setSession(loadSession());
    }
    setNotice("授業を削除しました");
  }

  if (sessions.length === 0) {
    return <Notice>保存済みの授業はまだありません。</Notice>;
  }

  return (
    <div className="km-stack">
      {notice ? <Notice tone="success">{notice}</Notice> : null}
      <div className="session-list" role="list">
        {sessions.map((item) => {
          const active = item.id === session?.id;
          return (
            <article
              className="session-list__item"
              data-active={active}
              key={item.id}
              role="listitem"
            >
              <div className="session-list__body">
                <div className="session-list__title">{item.title}</div>
                <div className="km-meta">
                  {statusLabels[item.status]} / {item.classroom} / {item.teacherName}
                </div>
                <div className="km-meta">
                  参加コード {item.joinCode} / {item.tableCount}テーブル
                </div>
              </div>
              <div className="session-list__actions">
                <Button
                  disabled={active}
                  onClick={() => void selectSession(item)}
                  size="small"
                >
                  {active ? "選択中" : "選択"}
                </Button>
                <Button
                  icon={ExternalLink}
                  onClick={() => void openSession(item)}
                  size="small"
                >
                  開く
                </Button>
                <Button
                  disabled={item.id === "demo-session"}
                  icon={Trash2}
                  onClick={() => void removeSession(item.id)}
                  size="small"
                >
                  削除
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
