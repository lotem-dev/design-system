import { useState } from "react";
import { PriorityGauge } from "../../../components/visualization/PriorityGauge";
import { TokenTable } from "../ui/TokenTable";
import { PropsTable } from "../ui/PropsTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import priorityGaugeTsx from "../../../components/visualization/PriorityGauge.tsx?raw";
import priorityGaugeCss from "../../../components/visualization/PriorityGauge.module.css?raw";

const sources = [
  { filename: "PriorityGauge.tsx",        code: priorityGaugeTsx },
  { filename: "PriorityGauge.module.css", code: priorityGaugeCss },
];

function Playground() {
  const [priority, setPriority] = useState<"P1" | "P2" | "P3">("P1");
  const [score, setScore]       = useState(85);
  const [copied, setCopied]     = useState(false);

  const snippet = `<PriorityGauge score={${score}} priority="${priority}" />`;

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
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

    <div style={{ marginTop: "12px" }}>
      <div style={{ position: "relative" }}>
        <pre style={{
          margin: 0, padding: "14px 52px 14px 16px",
          backgroundColor: "#18181B", borderRadius: "8px",
          fontSize: "12px", fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          color: "#E4E4E7", lineHeight: "1.7", overflowX: "auto", whiteSpace: "pre",
        }}>
          {snippet}
        </pre>
        <button onClick={copy} style={{
          position: "absolute", top: "10px", right: "10px",
          padding: "3px 10px", fontSize: "11px",
          fontFamily: "'Open Sans', system-ui, sans-serif", fontWeight: 600,
          color: copied ? "#A1A1AA" : "#71717A",
          backgroundColor: "#27272A", border: "1px solid #3F3F46",
          borderRadius: "5px", cursor: "pointer", transition: "color 0.15s",
        }}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
    </>
  );
}

export function PriorityGaugeSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>PriorityGauge</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A semicircular gauge with three severity zones - yellow (low), orange (medium), red (high).
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
        <PropsTable source={priorityGaugeTsx} />
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
