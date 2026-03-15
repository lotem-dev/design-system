import { useState } from "react";
import { BadgeSeverity, type SeverityScale } from "../../../components/atoms/BadgeSeverity";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import badgeSeverityTsx from "../../../components/atoms/BadgeSeverity.tsx?raw";
import badgeSeverityCss from "../../../components/atoms/BadgeSeverity.module.css?raw";

const sources = [
  { filename: "BadgeSeverity.tsx",        code: badgeSeverityTsx },
  { filename: "BadgeSeverity.module.css", code: badgeSeverityCss },
];

const SCALES: SeverityScale[] = ["critical", "high", "medium", "low"];

function Playground() {
  const [scale, setScale] = useState<SeverityScale>("critical");
  const [size, setSize]   = useState<"sm" | "lg">("lg");

  return (
    <PlaygroundShell
      preview={<BadgeSeverity scale={scale} size={size} />}
      controls={
        <>
          <ControlRow label="Scale">
            {SCALES.map(s => <Pill key={s} active={scale === s} onClick={() => setScale(s)}>{s}</Pill>)}
          </ControlRow>
          <ControlRow label="Size">
            <Pill active={size === "lg"} onClick={() => setSize("lg")}>lg</Pill>
            <Pill active={size === "sm"} onClick={() => setSize("sm")}>sm</Pill>
          </ControlRow>
        </>
      }
    />
  );
}

export function BadgeSeveritySection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atoms</span>
          <span style={{ fontSize: "11px", color: "#D4D4D8" }}>/</span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Badges</span>
        </div>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>BadgeSeverity</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Displays the severity level of a security finding. Comes in two sizes — large for prominent display, small for dense tables and lists.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
    </SplitPage>
  );
}
