import { GlobalShell } from "@/design-system/components/GlobalShell";
import { Container } from "@/design-system/primitives/Container";
import { Section } from "@/design-system/primitives/Section";
import { LiveDashboard } from "@/features/live/LiveDashboard";

export default function LivePage() {
  return (
    <GlobalShell>
      <Section>
        <Container className="km-stack">
          <div>
            <p className="km-eyebrow">LIVE VIEW</p>
            <h1 className="km-heading">リアルタイム弾幕</h1>
            <p className="km-subheading">
              資料を邪魔しないよう、上部・下部・透明度・速度を調整しながら
              学生コメントを表示します。
            </p>
          </div>
          <LiveDashboard />
        </Container>
      </Section>
    </GlobalShell>
  );
}
