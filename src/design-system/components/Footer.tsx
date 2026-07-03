import Link from "next/link";
import { Container } from "../primitives/Container";

export function Footer() {
  return (
    <footer className="km-footer">
      <Container className="km-footer__inner">
        <div className="km-stack km-stack--small">
          <strong>SunSun AI</strong>
          <span className="km-meta">
            対面授業の声を可視化し、授業改善レポートまでつなげるMVP。
          </span>
        </div>
        <nav aria-label="フッターナビゲーション" className="km-footer__links">
          <Link href="/live">ライブビュー</Link>
          <Link href="/report">AIレポート</Link>
          <Link href="/extension">拡張機能</Link>
          <Link href="/read">read.md</Link>
        </nav>
      </Container>
    </footer>
  );
}
