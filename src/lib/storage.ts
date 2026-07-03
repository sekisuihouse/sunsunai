import type { LessonSession, TimelineEntry } from "@/types/domain";
import { demoSession, demoTimeline } from "./sample-data";

const sessionKey = "sunsunai.session";
const timelineKey = "sunsunai.timeline";

export function loadSession(): LessonSession {
  if (typeof window === "undefined") return demoSession;
  const saved = window.localStorage.getItem(sessionKey);
  return saved ? (JSON.parse(saved) as LessonSession) : demoSession;
}

export function saveSession(session: LessonSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(sessionKey, JSON.stringify(session));
}

export function loadTimeline(): TimelineEntry[] {
  if (typeof window === "undefined") return demoTimeline;
  const saved = window.localStorage.getItem(timelineKey);
  return saved ? (JSON.parse(saved) as TimelineEntry[]) : demoTimeline;
}

export function saveTimeline(timeline: TimelineEntry[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(timelineKey, JSON.stringify(timeline));
}

export function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
