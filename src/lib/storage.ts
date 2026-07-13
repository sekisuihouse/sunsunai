import type { LessonSession, TimelineEntry } from "@/types/domain";
import { demoSession, demoTimeline } from "./sample-data";

const sessionKey = "sunsunai.session";
const timelineKey = "sunsunai.timeline";
const sessionsKey = "sunsunai.sessions";
const timelinePrefix = "sunsunai.timeline.";

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function loadSession(): LessonSession {
  if (typeof window === "undefined") return demoSession;
  const saved = window.localStorage.getItem(sessionKey);
  return safeParse(saved, demoSession);
}

export function saveSession(session: LessonSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(sessionKey, JSON.stringify(session));
  upsertSession(session);
}

export function loadSessionList(): LessonSession[] {
  if (typeof window === "undefined") return [demoSession];
  const saved = safeParse<LessonSession[]>(window.localStorage.getItem(sessionsKey), []);
  const current = loadSession();
  const sessions = saved.some((session) => session.id === current.id)
    ? saved
    : [current, ...saved];
  return sessions.sort((a, b) => Date.parse(b.startsAt) - Date.parse(a.startsAt));
}

export function upsertSession(session: LessonSession) {
  if (typeof window === "undefined") return;
  const sessions = safeParse<LessonSession[]>(window.localStorage.getItem(sessionsKey), []);
  const merged = [
    session,
    ...sessions.filter((saved) => saved.id !== session.id),
  ].sort((a, b) => Date.parse(b.startsAt) - Date.parse(a.startsAt));
  window.localStorage.setItem(sessionsKey, JSON.stringify(merged));
}

export function deleteStoredSession(sessionId: string) {
  if (typeof window === "undefined") return;
  const sessions = safeParse<LessonSession[]>(window.localStorage.getItem(sessionsKey), []);
  window.localStorage.setItem(
    sessionsKey,
    JSON.stringify(sessions.filter((session) => session.id !== sessionId)),
  );
  window.localStorage.removeItem(`${timelinePrefix}${sessionId}`);
  if (loadSession().id === sessionId) {
    window.localStorage.setItem(sessionKey, JSON.stringify(demoSession));
    window.localStorage.setItem(timelineKey, JSON.stringify(demoTimeline));
  }
}

export function loadTimeline(sessionId = loadSession().id): TimelineEntry[] {
  if (typeof window === "undefined") return demoTimeline;
  const perSession = window.localStorage.getItem(`${timelinePrefix}${sessionId}`);
  if (perSession) return safeParse(perSession, []);

  const legacy = safeParse<TimelineEntry[] | null>(
    window.localStorage.getItem(timelineKey),
    null,
  );
  if (legacy?.some((entry) => entry.sessionId === sessionId)) {
    return legacy.filter((entry) => entry.sessionId === sessionId);
  }

  return sessionId === demoSession.id ? demoTimeline : [];
}

export function saveTimeline(timeline: TimelineEntry[], sessionId = loadSession().id) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`${timelinePrefix}${sessionId}`, JSON.stringify(timeline));
  window.localStorage.setItem(timelineKey, JSON.stringify(timeline));
}

export function clearTimeline(sessionId = loadSession().id) {
  saveTimeline([], sessionId);
}

export function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
