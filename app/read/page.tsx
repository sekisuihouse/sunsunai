import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { GlobalShell } from "@/design-system/components/GlobalShell";
import { Container } from "@/design-system/primitives/Container";
import { Section } from "@/design-system/primitives/Section";

export default async function ReadPage() {
  const content = await readFile(join(process.cwd(), "read.md"), "utf8").catch(
    () => "read.md はまだ生成されていません。",
  );
  return (
    <GlobalShell>
      <Section>
        <Container className="km-stack">
          <div>
            <p className="km-eyebrow">HANDOVER</p>
            <h1 className="km-heading">read.md</h1>
          </div>
          <pre className="km-panel km-panel__body report-markdown">{content}</pre>
        </Container>
      </Section>
    </GlobalShell>
  );
}
