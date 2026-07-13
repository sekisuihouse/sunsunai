"use client";

import { useEffect, useMemo, useState } from "react";
import type { LessonSession, TimelineEntry } from "@/types/domain";
import { classifySentiment } from "@/lib/sentiment";
import {
  addTimelineEntryToFirestore,
  ensureAnonymousUser,
  isFirebaseEnabled,
  saveSessionToFirestore,
  subscribeSessionFromFirestore,
  subscribeTimelineFromFirestore,
} from "@/lib/firebase";
import {
  clearTimeline,
  createId,
  loadSession,
  loadTimeline,
  saveSession,
  saveTimeline,
} from "@/lib/storage";

export function useLessonStore() {
  const [session, setSessionState] = useState<LessonSession | null>(null);
  const [timeline, setTimelineState] = useState<TimelineEntry[]>([]);
  const [mode, setMode] = useState<"local" | "firestore">("local");

  useEffect(() => {
    const localSession = loadSession();
    setSessionState(localSession);
    setTimelineState(loadTimeline());
    setMode(isFirebaseEnabled() ? "firestore" : "local");
  }, []);

  useEffect(() => {
    if (!session || !isFirebaseEnabled()) return;
    const sessionId = session.id;
    let cleanupSession: (() => void) | null = null;
    let cleanupTimeline: (() => void) | null = null;
    let cancelled = false;

    async function connect() {
      try {
        const currentSession = loadSession();
        if (currentSession.id !== sessionId) return;
        await ensureAnonymousUser();
        if (cancelled) return;
        setMode("firestore");
        await saveSessionToFirestore(currentSession);
        cleanupSession = subscribeSessionFromFirestore(sessionId, (next) => {
          if (!next) return;
          setSessionState(next);
          saveSession(next);
        });
        cleanupTimeline = subscribeTimelineFromFirestore(sessionId, (next) => {
          setTimelineState(next);
          saveTimeline(next, sessionId);
        });
      } catch (error) {
        console.error("Firebase connection failed. Falling back to localStorage.", error);
        setMode("local");
      }
    }

    void connect();

    return () => {
      cancelled = true;
      cleanupSession?.();
      cleanupTimeline?.();
    };
  }, [session?.id]);

  const api = useMemo(() => {
    async function persistSession(next: LessonSession) {
      setSessionState(next);
      saveSession(next);
      setTimelineState(loadTimeline(next.id));
      if (isFirebaseEnabled()) {
        try {
          await saveSessionToFirestore(next);
          setMode("firestore");
        } catch (error) {
          console.error("Failed to save session to Firestore.", error);
          setMode("local");
        }
      }
    }

    return {
      mode,
      setSession: persistSession,
      resetTimeline() {
        const currentSession = loadSession();
        clearTimeline(currentSession.id);
        setTimelineState([]);
      },
      async startLesson() {
        await persistSession({
          ...loadSession(),
          status: "live",
          startedAt: new Date().toISOString(),
        });
      },
      async endLesson() {
        await persistSession({
          ...loadSession(),
          status: "ended",
          endedAt: new Date().toISOString(),
        });
      },
      async addStudentComment(tableId: number, text: string, speakerName?: string) {
        const current = loadTimeline();
        const currentSession = loadSession();
        if (currentSession.status === "ended") return;
        const trimmedName = speakerName?.trim();
        const next: TimelineEntry = {
          id: createId("student"),
          sessionId: currentSession.id,
          elapsedSeconds: computeElapsedSeconds(currentSession, current),
          createdAt: new Date().toISOString(),
          role: "student",
          tableId,
          text,
          source: "manual",
          sentiment: classifySentiment(text),
          ...(trimmedName ? { speakerName: trimmedName } : {}),
        };
        const merged = [...current, next];
        setTimelineState(merged);
        saveTimeline(merged, currentSession.id);
        if (isFirebaseEnabled()) {
          try {
            await addTimelineEntryToFirestore(next);
            setMode("firestore");
          } catch (error) {
            console.error("Failed to save student comment to Firestore.", error);
            setMode("local");
          }
        }
      },
      async addTeacherSpeech(text: string) {
        const current = loadTimeline();
        const currentSession = loadSession();
        if (currentSession.status === "ended") return;
        const next: TimelineEntry = {
          id: createId("teacher"),
          sessionId: currentSession.id,
          elapsedSeconds: computeElapsedSeconds(currentSession, current),
          createdAt: new Date().toISOString(),
          role: "teacher",
          speakerName: currentSession.teacherName,
          text,
          source: "manual",
          sentiment: "neutral",
        };
        const merged = [...current, next];
        setTimelineState(merged);
        saveTimeline(merged, currentSession.id);
        if (isFirebaseEnabled()) {
          try {
            await addTimelineEntryToFirestore(next);
            setMode("firestore");
          } catch (error) {
            console.error("Failed to save teacher speech to Firestore.", error);
            setMode("local");
          }
        }
      },
      replaceTimeline(next: TimelineEntry[]) {
        setTimelineState(next);
        saveTimeline(next, loadSession().id);
      },
    };
  }, [mode]);

  return { session, timeline, ...api };
}

function computeElapsedSeconds(
  session: LessonSession,
  timeline: TimelineEntry[],
) {
  const base = session.startedAt ?? session.startsAt;
  const startMs = base ? Date.parse(base) : Number.NaN;
  if (!Number.isNaN(startMs)) {
    return Math.max(0, Math.floor((Date.now() - startMs) / 1000));
  }
  return inferNextElapsed(timeline);
}

function inferNextElapsed(timeline: TimelineEntry[]) {
  const last = timeline.reduce(
    (max, entry) => Math.max(max, entry.elapsedSeconds),
    0,
  );
  return last + 35;
}
