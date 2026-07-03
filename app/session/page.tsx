import { GlobalShell } from "@/design-system/components/GlobalShell";
import { Container } from "@/design-system/primitives/Container";
import { Section } from "@/design-system/primitives/Section";
import { SessionCreator } from "@/features/sessions/SessionCreator";

export default function SessionPage() {
  return (
    <GlobalShell>
      <Section>
        <Container className="km-stack">
          <div>
            <p className="km-eyebrow">CREATE SESSION</p>
            <h1 className="km-heading">授業セッション作成</h1>
            <p className="km-subheading">
              MVPでは作成したセッションをブラウザに保存します。Firebase接続後は
              Firestoreの授業コレクションに保存します。
            </p>
          </div>
          <div className="km-panel">
            <div className="km-panel__header">授業情報</div>
            <div className="km-panel__body">
              <SessionCreator />
            </div>
          </div>
        </Container>
      </Section>
    </GlobalShell>
  );
}
