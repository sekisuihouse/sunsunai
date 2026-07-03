import { GlobalShell } from "@/design-system/components/GlobalShell";
import { Container } from "@/design-system/primitives/Container";
import { Section } from "@/design-system/primitives/Section";
import { StudentJoin } from "@/features/sessions/StudentJoin";

export default function StudentPage() {
  return (
    <GlobalShell>
      <Section>
        <Container className="km-stack">
          <div>
            <p className="km-eyebrow">STUDENT TABLE</p>
            <h1 className="km-heading">学生参加</h1>
            <p className="km-subheading">
              テーブルPCごとに参加し、音声またはデモコメントを授業タイムラインへ送ります。
            </p>
          </div>
          <StudentJoin />
        </Container>
      </Section>
    </GlobalShell>
  );
}
