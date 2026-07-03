"use client";

import { useMemo, useState } from "react";
import { Bot, Download } from "lucide-react";
import { Button } from "@/design-system/primitives/Button";
import { isFirebaseEnabled, saveReportToFirestore } from "@/lib/firebase";
import { demoReport } from "@/lib/sample-data";
import { generateHeuristicReport } from "@/lib/report";
import type { LessonReport } from "@/types/domain";
import { useLessonStore } from "../sessions/useLessonStore";

export function ReportGenerator() {
  const { session, timeline } = useLessonStore();
  const fallback = useMemo(
    () => (session ? generateHeuristicReport(session, timeline) : demoReport),
    [session, timeline],
  );
  const [report, setReport] = useState<LessonReport>(fallback);
  const [status, setStatus] = useState("未生成");

  async function generate() {
    if (!session) return;
    setStatus("生成中");
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session, timeline }),
    });
    const data = (await response.json()) as { report?: LessonReport; error?: string };
    if (data.report) {
      setReport(data.report);
      setStatus("生成完了");
      if (isFirebaseEnabled()) {
        try {
          await saveReportToFirestore(data.report);
        } catch (error) {
          console.error("Failed to save report to Firestore.", error);
          setStatus("生成完了 / Firestore保存失敗");
        }
      }
    } else {
      setReport(fallback);
      setStatus(data.error ?? "モックレポートを表示中");
    }
  }

  function downloadMarkdown() {
    const blob = new Blob([report.markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lesson-report.md";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="control-grid">
      <div className="km-panel">
        <div className="km-panel__header">
          <span>AI授業分析</span>
          <span className="km-meta">{status}</span>
        </div>
        <div className="km-panel__body km-stack">
          <p>
            OpenAI API が設定済みの場合は Responses API で分析します。未設定の場合は、
            保存されたタイムラインから決定的なモックレポートを生成します。
          </p>
          <div className="app-hero__actions">
            <Button icon={Bot} onClick={generate} variant="black">
              レポート生成
            </Button>
            <Button icon={Download} onClick={downloadMarkdown}>
              Markdown保存
            </Button>
          </div>

          <div className="km-grid km-grid--two">
            <SummaryBlock title="概要" values={[report.summary]} />
            <SummaryBlock title="感情分析" values={[report.sentimentSummary]} />
            <SummaryBlock title="良かった点" values={report.positives} />
            <SummaryBlock title="改善点" values={report.improvements} />
            <SummaryBlock title="つまずき" values={report.stuckMoments} />
            <SummaryBlock title="次回アクション" values={report.nextActions} />
          </div>
        </div>
      </div>

      <div className="km-panel">
        <div className="km-panel__header">
          <span>Markdown出力</span>
          <span className="km-meta">後から編集可能</span>
        </div>
        <pre className="km-panel__body report-markdown">{report.markdown}</pre>
      </div>
    </div>
  );
}

function SummaryBlock({ title, values }: { title: string; values: string[] }) {
  return (
    <section className="metric">
      <span className="km-meta">{title}</span>
      <div className="km-stack km-stack--small">
        {values.length > 0 ? values.map((value) => <span key={value}>{value}</span>) : "なし"}
      </div>
    </section>
  );
}
