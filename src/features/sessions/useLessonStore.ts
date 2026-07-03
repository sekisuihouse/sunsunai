"use client";

import { useEffect, useMemo, useState } from "react";
import type { LessonSession, Sentiment, TimelineEntry } from "@/types/domain";
import {
  createId,
  loadSession,
  loadTimeline,
  saveSession,
  saveTimeline,
} from "@/lib/storage";

export function useLessonStore() {
  const [session, setSessionState] = useState<LessonSession | null>(null);
  const [timeline, setTimelineState] = useState<TimelineEntry[]>([]);

  useEffect(() => {
    setSessionState(loadSession());
    setTimelineState(loadTimeline());
  }, []);

  const api = useMemo(
    () => ({
      setSession(next: LessonSession) {
        setSessionState(next);
        saveSession(next);
      },
      addStudentComment(tableId: number, text: string, sentiment: Sentiment = "neutral") {
        const current = loadTimeline();
        const next: TimelineEntry = {
          id: createId("student"),
          sessionId: loadSession().id,
          elapsedSeconds: inferNextElapsed(current),
          createdAt: new Date().toISOString(),
          role: "student",
          tableId,
          text,
          source: "manual",
          sentiment,
        };
        const merged = [...current, next];
        setTimelineState(merged);
        saveTimeline(merged);
      },
      addTeacherSpeech(text: string) {
        const current = loadTimeline();
        const currentSession = loadSession();
        const next: TimelineEntry = {
          id: createId("teacher"),
          sessionId: currentSession.id,
          elapsedSeconds: inferNextElapsed(current),
          createdAt: new Date().toISOString(),
          role: "teacher",
          speakerName: currentSession.teacherName,
          text,
          source: "manual",
          sentiment: "neutral",
        };
        const merged = [...current, next];
        setTimelineState(merged);
        saveTimeline(merged);
      },
      replaceTimeline(next: TimelineEntry[]) {
        setTimelineState(next);
        saveTimeline(next);
      },
    }),
    [],
  );

  return { session, timeline, ...api };
}

function inferNextElapsed(timeline: TimelineEntry[]) {
  const last = timeline.reduce(
    (max, entry) => Math.max(max, entry.elapsedSeconds),
    0,
  );
  return last + 35;
}
