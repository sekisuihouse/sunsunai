import type { LessonReport, LessonSession, TimelineEntry } from "@/types/domain";
import { createReportMarkdown } from "./report";

export const demoSession: LessonSession = {
  id: "demo-session",
  title: "デザイン思考入門",
  classroom: "A-301",
  startsAt: new Date().toISOString(),
  teacherName: "山田先生",
  status: "live",
  tableCount: 12,
  joinCode: "SUNSUN",
};

export const demoTimeline: TimelineEntry[] = [
  {
    id: "ev-001",
    sessionId: demoSession.id,
    elapsedSeconds: 75,
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    role: "student",
    tableId: 3,
    text: "ここ難しい、例がもう一つほしい",
    source: "mock",
    sentiment: "confused",
  },
  {
    id: "ev-002",
    sessionId: demoSession.id,
    elapsedSeconds: 132,
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    role: "student",
    tableId: 8,
    text: "なるほど、プロトタイプって早く試すことなんだ",
    source: "mock",
    sentiment: "positive",
  },
  {
    id: "ev-003",
    sessionId: demoSession.id,
    elapsedSeconds: 220,
    createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    role: "teacher",
    speakerName: demoSession.teacherName,
    text: "失敗を早く見つけるために、低コストで試します",
    source: "mock",
    sentiment: "neutral",
  },
  {
    id: "ev-004",
    sessionId: demoSession.id,
    elapsedSeconds: 410,
    createdAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    role: "student",
    tableId: 11,
    text: "このワーク面白い、他の案も見たい",
    source: "mock",
    sentiment: "excited",
  },
  {
    id: "ev-005",
    sessionId: demoSession.id,
    elapsedSeconds: 530,
    createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    role: "student",
    tableId: 5,
    text: "評価基準が少し分からない",
    source: "mock",
    sentiment: "confused",
  },
];

export const demoReport: LessonReport = {
  sessionId: demoSession.id,
  generatedAt: new Date().toISOString(),
  summary:
    "学生はプロトタイプの意図を理解し始めている一方、評価基準と具体例に関する補足を求めています。",
  positives: [
    "ワークへの反応が強く、後半に興味が高まっています。",
    "教員発話と学生コメントが同じテーマへ収束しています。",
  ],
  improvements: [
    "評価基準をワーク開始前に一枚で提示してください。",
    "抽象説明の直後に短い例を追加してください。",
  ],
  stuckMoments: ["1分15秒付近: 例が不足しているという反応", "8分50秒付近: 評価基準への迷い"],
  activeMoments: ["6分50秒付近: ワークへの興味が増加"],
  interests: ["プロトタイプ", "低コストな試作", "相互評価"],
  sentimentSummary: "混乱コメントが一部あるが、肯定・興味のコメントも増えている。",
  nextActions: [
    "次回は導入3分で評価基準を共有する。",
    "学生コメントが増えた箇所を動画と合わせて確認する。",
  ],
  markdown: "",
};

demoReport.markdown = createReportMarkdown(demoSession, demoReport, demoTimeline);
