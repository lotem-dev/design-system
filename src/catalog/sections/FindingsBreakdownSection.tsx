import { useState } from "react";
import { FindingsBreakdown } from "../../../components/visualization/FindingsBreakdown";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow } from "../ui/PlaygroundShell";
import { TokenTable } from "../ui/TokenTable";
import { PropsTable } from "../ui/PropsTable";

import findingsBreakdownTsx from "../../../components/visualization/FindingsBreakdown.tsx?raw";
import findingsBreakdownCss from "../../../components/visualization/FindingsBreakdown.module.css?raw";

const sources = [
  { filename: "FindingsBreakdown.tsx",        code: findingsBreakdownTsx },
  { filename: "FindingsBreakdown.module.css", code: findingsBreakdownCss },
];

function NumericInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span style={{ fontSize: "11px", color: "#71717A", fontFamily: "'Open Sans', system-ui, sans-serif", minWidth: "52px" }}>{label}</span>
      <input
        type="number"
        min={0}
        value={value}
        onChange={e => onChange(Math.max(0, Number(e.target.value)))}
        style={{
          width: "56px", padding: "4px 8px",
          fontSize: "12px", fontFamily: "'Open Sans', system-ui, sans-serif",
          border: "1px solid #E4E4E7", borderRadius: "6px",
          background: "#FFFFFF", color: "#52525B",
        }}
      />
    </div>
  );
}

function Playground() {
  const [critical, setCritical] = useState(3);
  const [high,     setHigh]     = useState(7);
  const [medium,   setMedium]   = useState(12);
  const [low,      setLow]      = useState(5);
  const [copied,   setCopied]   = useState(false);

  const snippet = `<FindingsBreakdown critical={${critical}} high={${high}} medium={${medium}} low={${low}} />`;

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
    <PlaygroundShell
      preview={<FindingsBreakdown critical={critical} high={high} medium={medium} low={low} />}
      controls={
        <ControlRow label="Counts">
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <NumericInput label="Critical" value={critical} onChange={setCritical} />
            <NumericInput label="High"     value={high}     onChange={setHigh} />
            <NumericInput label="Medium"   value={medium}   onChange={setMedium} />
            <NumericInput label="Low"      value={low}      onChange={setLow} />
          </div>
        </ControlRow>
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

export function FindingsBreakdownSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>FindingsBreakdown</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A compact severity breakdown - a proportional segmented bar with counts below it.
          Each segment's width reflects its share of the total findings count.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>

      <SectionBlock title="Props">
        <PropsTable source={findingsBreakdownTsx} />
      </SectionBlock>

      <SectionBlock title="Tokens">
        <TokenTable rows={[
          { property: "critical segment", token: "--scale-critical-primary", value: "var(--red-500)" },
          { property: "high segment",     token: "--scale-high-primary",     value: "var(--orange-600)" },
          { property: "medium segment",   token: "--warning-primary",        value: "var(--yellow-500)" },
          { property: "low segment",      token: "--text-secondary",         value: "var(--neutral-400)" },
        ]} />
      </SectionBlock>
    </SplitPage>
  );
}
