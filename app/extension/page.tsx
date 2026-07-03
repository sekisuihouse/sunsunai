import type { CSSProperties } from "react";
import { GlobalShell } from "@/design-system/components/GlobalShell";
import { Button } from "@/design-system/primitives/Button";
import { Container } from "@/design-system/primitives/Container";
import { Section } from "@/design-system/primitives/Section";

export default function ExtensionPage() {
  return (
    <GlobalShell>
      <Section>
        <Container className="km-stack">
          <div>
            <p className="km-eyebrow">BROWSER EXTENSION</p>
            <h1 className="km-heading">Web画面上の弾幕オーバーレイ</h1>
            <p className="km-subheading">
              Chrome Extension の content script で、Meetや資料ページの上に
              弾幕レイヤーを重ねられる構成を用意しています。
            </p>
          </div>

          <div className="control-grid">
            <div className="extension-preview">
              <div className="extension-preview__window" />
              <div
                className="danmaku-layer"
                style={
                  {
                    "--danmaku-opacity": 0.94,
                    "--danmaku-speed": "11s",
                    "--danmaku-font-scale": 1,
                    "--danmaku-state": "running",
                  } as CSSProperties
                }
              >
                <span
                  className="danmaku-comment"
                  data-lane="top"
                  style={{ "--comment-offset": "var(--km-space-5)" } as CSSProperties}
                >
                  [T03] Google Meetの上にも表示できます
                </span>
                <span
                  className="danmaku-comment"
                  data-lane="bottom"
                  style={{ "--comment-offset": "var(--km-space-15)" } as CSSProperties}
                >
                  [T08] 資料を邪魔しない透明度に調整
                </span>
              </div>
            </div>

            <div className="km-panel">
              <div className="km-panel__header">導入手順</div>
              <div className="km-panel__body km-stack">
                <p>
                  `extension/` を Chrome の「パッケージ化されていない拡張機能」として読み込みます。
                  MVPでは `window.postMessage` か拡張機能メッセージで弾幕を追加できます。
                </p>
                <pre className="report-markdown">{`window.postMessage({
  source: "sunsunai",
  type: "SUNSUN_DANMAKU",
  payload: { tableId: 3, text: "ここ難しい" }
}, "*");`}</pre>
                <Button href="/live">ライブ画面へ戻る</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </GlobalShell>
  );
}
