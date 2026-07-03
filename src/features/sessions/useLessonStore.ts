"use client";

import { useEffect, useMemo, useState } from "react";
import type { LessonSession, Sentiment, TimelineEntry } from "@/types/domain";
import {
  addTimelineEntryToFirestore,
  ensureAnonymousUser,
  isFirebaseEnabled,
  saveSessionToFirestore,
  subscribeSessionFromFirestore,
  subscribeTimelineFromFirestore,
} from "@/lib/firebase";
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
  const [mode, setMode] = useState<"local" | "firestore">("local");

  useEffect(() => {
    const localSession = loadSession();
    setSessionState(localSession);
    setTimelineState(loadTimeline());

    if (!isFirebaseEnabled()) {
      setMode("local");
      return;
    }

    let cleanupSession: (() => void) | null = null;
    let cleanupTimeline: (() => void) | null = null;
    let cancelled = false;

    async function connect() {
      try {
        await ensureAnonymousUser();
        if (cancelled) return;
        setMode("firestore");
        await saveSessionToFirestore(localSession);
        cleanupSession = subscribeSessionFromFirestore(localSession.id, (next) => {
          if (!next) return;
          setSessionState(next);
          saveSession(next);
        });
        cleanupTimeline = subscribeTimelineFromFirestore(localSession.id, (next) => {
          setTimelineState(next);
          saveTimeline(next);
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
  }, []);

  const api = useMemo(
    () => ({
      mode,
      async setSession(next: LessonSession) {
        setSessionState(next);
        saveSession(next);
        if (isFirebaseEnabled()) {
          try {
            await saveSessionToFirestore(next);
            setMode("firestore");
          } catch (error) {
            console.error("Failed to save session to Firestore.", error);
            setMode("local");
          }
        }
      },
      async addStudentComment(
        tableId: number,
        text: string,
        sentiment: Sentiment = "neutral",
      ) {
        const current = loadTimeline();
        const currentSession = loadSession();
        const next: TimelineEntry = {
          id: createId("student"),
          sessionId: currentSession.id,
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
        saveTimeline(next);
      },
    }),
    [mode],
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
