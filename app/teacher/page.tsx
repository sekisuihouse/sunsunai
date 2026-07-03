import { GlobalShell } from "@/design-system/components/GlobalShell";
import { Button } from "@/design-system/primitives/Button";
import { Container } from "@/design-system/primitives/Container";
import { Section } from "@/design-system/primitives/Section";

export default function TeacherPage() {
  return (
    <GlobalShell>
      <Section>
        <Container className="km-stack">
          <div>
            <p className="km-eyebrow">TEACHER</p>
            <h1 className="km-heading">教員ダッシュボード</h1>
            <p className="km-subheading">
              授業の開始、ライブビュー、授業後レポートへ移動します。
            </p>
          </div>
          <div className="km-grid km-grid--two">
            <div className="km-panel">
              <div className="km-panel__header">現在の授業</div>
              <div className="km-panel__body km-stack">
                <p>デモ授業または作成済みセッションをlocalStorageから読み込みます。</p>
                <Button href="/live" variant="black">ライブビューへ</Button>
              </div>
            </div>
            <div className="km-panel">
              <div className="km-panel__header">新規授業</div>
              <div className="km-panel__body km-stack">
                <p>授業名、教室、教員名、テーブル数を入力して開始します。</p>
                <Button href="/session">授業を作成</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </GlobalShell>
  );
}
