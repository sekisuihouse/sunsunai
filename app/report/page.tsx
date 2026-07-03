import { GlobalShell } from "@/design-system/components/GlobalShell";
import { Container } from "@/design-system/primitives/Container";
import { Section } from "@/design-system/primitives/Section";
import { ReportGenerator } from "@/features/reports/ReportGenerator";

export default function ReportPage() {
  return (
    <GlobalShell>
      <Section>
        <Container className="km-stack">
          <div>
            <p className="km-eyebrow">AI REPORT</p>
            <h1 className="km-heading">授業改善レポート</h1>
            <p className="km-subheading">
              学生コメント、教員発話、ヒートマップをもとにMarkdownレポートを生成します。
            </p>
          </div>
          <ReportGenerator />
        </Container>
      </Section>
    </GlobalShell>
  );
}
