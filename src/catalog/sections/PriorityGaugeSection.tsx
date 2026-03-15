import { useState } from "react";
import { PriorityGauge } from "../../../components/atoms/PriorityGauge";
import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import priorityGaugeTsx from "../../../components/atoms/PriorityGauge.tsx?raw";
import priorityGaugeCss from "../../../components/atoms/PriorityGauge.module.css?raw";

const sources = [
  { filename: "PriorityGauge.tsx",        code: priorityGaugeTsx },
  { filename: "PriorityGauge.module.css", code: priorityGaugeCss },
];

function Playground() {
  const [priority, setPriority] = useState<"P1" | "P2" | "P3">("P1");
  const [score, setScore]       = useState(85);

  return (
    <PlaygroundShell
      preview={
        <PriorityGauge score={score} priority={priority} />
      }
      controls={
        <>
          <ControlRow label="Priority">
            {(["P1", "P2", "P3"] as const).map(p => (
              <Pill key={p} active={priority === p} onClick={() => setPriority(p)}>{p}</Pill>
            ))}
          </ControlRow>
          <ControlRow label="Score">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="range"
                min={0} max={100} value={score}
                onChange={e => setScore(Number(e.target.value))}
                style={{ width: "140px", cursor: "pointer" }}
              />
              <span style={{ fontSize: "12px", fontFamily: "'Open Sans', system-ui, sans-serif", color: "#52525B", minWidth: "28px" }}>
                {score}
              </span>
            </div>
          </ControlRow>
        </>
      }
    />
  );
}

export function PriorityGaugeSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atom</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>PriorityGauge</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A semicircular gauge with three severity zones — yellow (low), orange (medium), red (high).
          The needle position is driven by a 0–100 score. Built entirely in SVG, no image assets.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>

      <SectionBlock title="All priorities">
        <div style={{ display: "flex", gap: "32px", alignItems: "flex-end" }}>
          <PriorityGauge score={95} priority="P1" />
          <PriorityGauge score={65} priority="P2" />
          <PriorityGauge score={30} priority="P3" />
        </div>
      </SectionBlock>

      <SectionBlock title="Props">
        <TokenTable rows={[
          { property: "score",    token: "number (0–100)", value: "—",    note: "Controls needle position and displayed number" },
          { property: "priority", token: '"P1" | "P2" | "P3"', value: "—", note: "Label shown below the score" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Tokens">
        <TokenTable rows={[
          { property: "red zone (high)",    token: "--scale-critical-primary", value: "var(--red-500)" },
          { property: "orange zone (mid)",  token: "--scale-high-primary",     value: "var(--orange-600)" },
          { property: "yellow zone (low)",  token: "--warning-primary",        value: "var(--yellow-500)" },
          { property: "needle",             token: "--neutral-700",            value: "#2B3749" },
        ]} />
      </SectionBlock>
    </SplitPage>
  );
}
