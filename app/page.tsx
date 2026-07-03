import { ArrowRight, MonitorPlay, Radio, Sparkles } from "lucide-react";
import { GlobalShell } from "@/design-system/components/GlobalShell";
import { LinkCtaCards } from "@/design-system/components/LinkCtaCards";
import { NewsList } from "@/design-system/components/NewsList";
import { Button } from "@/design-system/primitives/Button";
import { Container } from "@/design-system/primitives/Container";
import { Section } from "@/design-system/primitives/Section";
import { RevealMotion } from "@/design-system/motion/RevealMotion";

export default function HomePage() {
  return (
    <GlobalShell>
      <section className="app-hero">
        <div className="app-hero__media" aria-hidden>
          <img alt="" src="/design-assets/img/feature.jpg" />
        </div>
        <Container className="app-hero__content">
          <p className="km-eyebrow">REALTIME COMMENT / AI FEEDBACK</p>
          <h1 className="km-heading">授業改善支援システム</h1>
          <p className="km-subheading">
            12テーブルの対面授業で学生の声を文字起こしし、弾幕として投影し、
            授業後にAIレポートへまとめるMVPです。
          </p>
          <div className="app-hero__actions">
            <Button href="/session" icon={Radio} variant="black">
              授業を開始
            </Button>
            <Button href="/live" icon={MonitorPlay}>
              ライブを見る
            </Button>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <RevealMotion>
            <div className="km-stack">
              <div>
                <p className="km-eyebrow">MVP FLOW</p>
                <h2 className="km-heading">音声から弾幕、レポートまで</h2>
              </div>
              <LinkCtaCards
                cards={[
                  {
                    href: "/student",
                    title: "学生参加",
                    description:
                      "テーブル番号を選び、録音またはデモコメントからリアルタイム反応を送ります。",
                    action: "参加画面へ",
                  },
                  {
                    href: "/report",
                    title: "AIレポート",
                    description:
                      "タイムライン、ヒートマップ、学生コメントから授業改善Markdownを生成します。",
                    action: "分析画面へ",
                  },
                ]}
              />
            </div>
          </RevealMotion>
        </Container>
      </Section>

      <Section tight>
        <Container>
          <div className="km-grid km-grid--two">
            <div className="km-panel">
              <div className="km-panel__header">
                <span>実装済み</span>
                <Sparkles aria-hidden size={18} />
              </div>
              <div className="km-panel__body">
                <NewsList
                  items={[
                    {
                      date: "MVP",
                      label: "Live",
                      title: "弾幕表示、録音UI、タイムライン保存、ヒートマップを実装",
                    },
                    {
                      date: "MVP",
                      label: "AI",
                      title: "OpenAI APIキー未設定時もモック分析で画面確認可能",
                    },
                    {
                      date: "MVP",
                      label: "Extension",
                      title: "Chrome拡張機能でWeb画面上に弾幕を重ねる構成を追加",
                    },
                  ]}
                />
              </div>
            </div>
            <div className="km-panel">
              <div className="km-panel__header">
                <span>次の作業</span>
                <ArrowRight aria-hidden size={18} />
              </div>
              <div className="km-panel__body km-stack">
                <p>
                  Firebaseに接続すると、現在localStorageに保存しているセッションと
                  タイムラインを複数端末で同期できます。
                </p>
                <Button href="/read" size="small">
                  引き継ぎ資料を見る
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </GlobalShell>
  );
}
