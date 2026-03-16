import { useState } from "react";
import { Card } from "../../../components/layout/Card";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import cardTsx from "../../../components/layout/Card.tsx?raw";
import cardCss from "../../../components/layout/Card.module.css?raw";

const sources = [
  { filename: "Card.tsx",        code: cardTsx },
  { filename: "Card.module.css", code: cardCss },
];

type CardPadding = "sm" | "md" | "lg";
const PADDINGS: CardPadding[] = ["sm", "md", "lg"];

function Playground() {
  const [padding, setPadding] = useState<CardPadding>("md");
  const [shadow, setShadow]   = useState(true);

  return (
    <PlaygroundShell
      preview={
        <div style={{ width: "280px" }}>
          <Card padding={padding} shadow={shadow}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ fontWeight: 700, fontSize: "14px", color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Card title</div>
              <div style={{ fontSize: "13px", color: "#71717A", lineHeight: "1.5", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
                This is the card body. Any content can go inside — text, inputs, tables, or other components.
              </div>
            </div>
          </Card>
        </div>
      }
      controls={
        <>
          <ControlRow label="Padding">
            {PADDINGS.map(p => <Pill key={p} active={padding === p} onClick={() => setPadding(p)}>{p}</Pill>)}
          </ControlRow>
          <ControlRow label="Shadow">
            <Pill active={shadow}  onClick={() => setShadow(true)}>yes</Pill>
            <Pill active={!shadow} onClick={() => setShadow(false)}>no</Pill>
          </ControlRow>
        </>
      }
    />
  );
}

export function CardSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Card</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A white surface that groups related content together. The most basic layout container in the system — use it for forms, list items, panels, and any self-contained block.
        </p>
      </div>
      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
      <SectionBlock title="Props">
        <PropsTable source={cardTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
