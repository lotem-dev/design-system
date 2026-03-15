import { useState } from "react";
import { Divider } from "../../../components/atoms/Divider";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import dividerTsx from "../../../components/atoms/Divider.tsx?raw";

const sources = [
  { filename: "Divider.tsx", code: dividerTsx },
];

function Playground() {
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");

  const preview = orientation === "horizontal" ? (
    <div style={{ width: "200px", display: "flex", flexDirection: "column" }}>
      <span style={{ fontSize: "13px", color: "var(--text-primary)", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Section A</span>
      <Divider orientation="horizontal" />
      <span style={{ fontSize: "13px", color: "var(--text-primary)", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Section B</span>
    </div>
  ) : (
    <div style={{ display: "flex", alignItems: "center", height: "48px" }}>
      <span style={{ fontSize: "13px", color: "var(--text-primary)", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Item A</span>
      <Divider orientation="vertical" />
      <span style={{ fontSize: "13px", color: "var(--text-primary)", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Item B</span>
    </div>
  );

  return (
    <PlaygroundShell
      preview={preview}
      controls={
        <ControlRow label="Orient.">
          <Pill active={orientation === "horizontal"} onClick={() => setOrientation("horizontal")}>horizontal</Pill>
          <Pill active={orientation === "vertical"}   onClick={() => setOrientation("vertical")}>vertical</Pill>
        </ControlRow>
      }
    />
  );
}

export function DividerSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atom</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Divider</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A visual separator between sections of content. Supports horizontal (between rows) and vertical (between side-by-side elements).
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
    </SplitPage>
  );
}
