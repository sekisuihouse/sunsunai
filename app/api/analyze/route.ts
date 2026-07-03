import { NextResponse } from "next/server";
import { createReportMarkdown, generateHeuristicReport } from "@/lib/report";
import type { LessonReport, LessonSession, TimelineEntry } from "@/types/domain";

type AnalyzeRequest = {
  session?: LessonSession;
  timeline?: TimelineEntry[];
};

export async function POST(request: Request) {
  const body = (await request.json()) as AnalyzeRequest;
  if (!body.session || !body.timeline) {
    return NextResponse.json({ error: "session and timeline are required" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_REPORT_MODEL;

  if (!apiKey || !model) {
    return NextResponse.json({
      report: generateHeuristicReport(body.session, body.timeline),
      mocked: true,
    });
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content:
            "あなたは授業改善を支援する教育分析アシスタントです。日本語で簡潔に、教員が次回授業で実行できる提案を出してください。",
        },
        {
          role: "user",
          content: JSON.stringify({
            session: body.session,
            timeline: body.timeline,
          }),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "lesson_report",
          strict: true,
          schema: reportSchema,
        },
      },
    }),
  });

  if (!response.ok) {
    return NextResponse.json({
      report: generateHeuristicReport(body.session, body.timeline),
      error: `Responses API failed: ${response.status}`,
      mocked: true,
    });
  }

  const data = (await response.json()) as { output_text?: string };
  const parsed = parseReport(data.output_text);
  if (!parsed) {
    return NextResponse.json({
      report: generateHeuristicReport(body.session, body.timeline),
      error: "Responses API returned an unexpected shape",
      mocked: true,
    });
  }

  const report: LessonReport = {
    ...parsed,
    sessionId: body.session.id,
    generatedAt: new Date().toISOString(),
    markdown: "",
  };
  report.markdown = createReportMarkdown(body.session, report, body.timeline);
  return NextResponse.json({ report, mocked: false });
}

function parseReport(text: string | undefined) {
  if (!text) return null;
  try {
    const parsed = JSON.parse(text) as Omit<
      LessonReport,
      "sessionId" | "generatedAt" | "markdown"
    >;
    return parsed;
  } catch {
    return null;
  }
}

const stringArray = {
  type: "array",
  items: { type: "string" },
};

const reportSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "summary",
    "positives",
    "improvements",
    "stuckMoments",
    "activeMoments",
    "interests",
    "sentimentSummary",
    "nextActions",
  ],
  properties: {
    summary: { type: "string" },
    positives: stringArray,
    improvements: stringArray,
    stuckMoments: stringArray,
    activeMoments: stringArray,
    interests: stringArray,
    sentimentSummary: { type: "string" },
    nextActions: stringArray,
  },
};
