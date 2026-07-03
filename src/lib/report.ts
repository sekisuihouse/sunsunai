import type { LessonReport, LessonSession, TimelineEntry } from "@/types/domain";

export function formatElapsed(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const rest = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${rest}`;
}

export function createReportMarkdown(
  session: LessonSession,
  report: LessonReport,
  timeline: TimelineEntry[],
) {
  const timelineBlock = timeline
    .map((entry) => {
      const speaker =
        entry.role === "teacher"
          ? `Teacher${entry.speakerName ? ` (${entry.speakerName})` : ""}`
          : `Table${String(entry.tableId ?? 0).padStart(2, "0")}`;
      return `### ${formatElapsed(entry.elapsedSeconds)}\n\n${speaker}:\n${entry.text}`;
    })
    .join("\n\n");

  return `# 授業改善レポート

## 授業

- 授業名: ${session.title}
- 教室: ${session.classroom}
- 教員: ${session.teacherName}
- 生成日時: ${report.generatedAt}

## 概要

${report.summary}

## 良かった点

${report.positives.map((item) => `- ${item}`).join("\n")}

## 改善点

${report.improvements.map((item) => `- ${item}`).join("\n")}

## 学生がつまずいた場面

${report.stuckMoments.map((item) => `- ${item}`).join("\n")}

## 盛り上がった場面

${report.activeMoments.map((item) => `- ${item}`).join("\n")}

## 学生が興味を持ったテーマ

${report.interests.map((item) => `- ${item}`).join("\n")}

## コメント感情分析

${report.sentimentSummary}

## 次回への改善提案

${report.nextActions.map((item) => `- ${item}`).join("\n")}

## タイムライン

${timelineBlock}
`;
}

export function generateHeuristicReport(
  session: LessonSession,
  timeline: TimelineEntry[],
): LessonReport {
  const confused = timeline.filter((entry) => entry.sentiment === "confused");
  const excited = timeline.filter((entry) => entry.sentiment === "excited");
  const positive = timeline.filter((entry) => entry.sentiment === "positive");
  const report: LessonReport = {
    sessionId: session.id,
    generatedAt: new Date().toISOString(),
    summary: `${timeline.length}件の発話から、理解の進み具合とつまずき箇所を抽出しました。混乱コメントは${confused.length}件、肯定・興味コメントは${
      positive.length + excited.length
    }件です。`,
    positives:
      positive.length + excited.length > 0
        ? ["学生が反応したテーマが明確で、授業中の関心を追跡できます。"]
        : ["タイムライン保存により、授業後の振り返り材料が残っています。"],
    improvements:
      confused.length > 0
        ? ["混乱コメントが出た直後に、例示・再説明・確認質問を挟んでください。"]
        : ["コメントが少ない時間帯に、短い問いかけを入れて反応を増やしてください。"],
    stuckMoments: confused.map(
      (entry) => `${formatElapsed(entry.elapsedSeconds)}付近: ${entry.text}`,
    ),
    activeMoments: excited.map(
      (entry) => `${formatElapsed(entry.elapsedSeconds)}付近: ${entry.text}`,
    ),
    interests: extractInterests(timeline),
    sentimentSummary:
      confused.length > 0
        ? "一部に理解不安があるため、該当場面の説明方法を重点的に見直してください。"
        : "大きな混乱は少なく、肯定的な反応を中心に授業が進んでいます。",
    nextActions: [
      "ヒートマップの山になった時間帯を録画と照合する。",
      "混乱コメントの直後に追加できる例題を用意する。",
      "次回の授業冒頭で前回のつまずきに触れる。",
    ],
    markdown: "",
  };
  report.markdown = createReportMarkdown(session, report, timeline);
  return report;
}

function extractInterests(timeline: TimelineEntry[]) {
  const text = timeline.map((entry) => entry.text).join(" ");
  const candidates = ["例", "評価基準", "プロトタイプ", "ワーク", "発表", "資料"];
  const found = candidates.filter((word) => text.includes(word));
  return found.length > 0 ? found : ["学生コメントの頻出語"];
}
