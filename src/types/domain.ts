export type ParticipantRole = "teacher" | "student";

export type SessionStatus = "draft" | "live" | "ended";

export type Sentiment = "positive" | "neutral" | "confused" | "excited";

export type LessonSession = {
  id: string;
  title: string;
  classroom: string;
  startsAt: string;
  teacherName: string;
  status: SessionStatus;
  tableCount: number;
  joinCode: string;
  startedAt?: string;
  endedAt?: string;
};

export type TimelineEntry = {
  id: string;
  sessionId: string;
  elapsedSeconds: number;
  createdAt: string;
  role: ParticipantRole;
  tableId?: number;
  speakerName?: string;
  text: string;
  source: "microphone" | "manual" | "mock" | "extension";
  sentiment: Sentiment;
};

export type HeatmapBucket = {
  startSeconds: number;
  endSeconds: number;
  count: number;
};

export type LessonReport = {
  sessionId: string;
  generatedAt: string;
  summary: string;
  positives: string[];
  improvements: string[];
  stuckMoments: string[];
  activeMoments: string[];
  interests: string[];
  sentimentSummary: string;
  nextActions: string[];
  markdown: string;
};

export type DanmakuSettings = {
  lanes: "top" | "bottom" | "both";
  opacity: number;
  speed: number;
  fontScale: number;
  paused: boolean;
  hidden: boolean;
};
