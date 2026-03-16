import { useState } from "react";
import { Progress } from "../../../components/visualization/Progress";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import progressTsx from "../../../components/visualization/Progress.tsx?raw";
import progressCss from "../../../components/visualization/Progress.module.css?raw";

const sources = [
  { filename: "Progress.tsx",        code: progressTsx },
  { filename: "Progress.module.css", code: progressCss },
];

type ProgressColor = "brand" | "success" | "warning" | "error";
type ProgressSize  = "sm" | "md";
const COLORS: ProgressColor[] = ["brand", "success", "warning", "error"];
const SIZES:  ProgressSize[]  = ["sm", "md"];

function Playground() {
  const [value, setValue]   = useState(60);
  const [color, setColor]   = useState<ProgressColor>("brand");
  const [size, setSize]     = useState<ProgressSize>("md");

  return (
    <PlaygroundShell
      preview={
        <div style={{ width: "280px" }}>
          <Progress value={value} color={color} size={size} />
        </div>
      }
      controls={
        <>
          <ControlRow label="Value">
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={e => setValue(Number(e.target.value))}
              style={{ width: "160px", accentColor: "var(--brand-primary)" }}
            />
            <span style={{ fontSize: "12px", color: "#71717A", minWidth: "32px" }}>{value}%</span>
          </ControlRow>
          <ControlRow label="Color">
            {COLORS.map(c => <Pill key={c} active={color === c} onClick={() => setColor(c)}>{c}</Pill>)}
          </ControlRow>
          <ControlRow label="Size">
            {SIZES.map(s => <Pill key={s} active={size === s} onClick={() => setSize(s)}>{s}</Pill>)}
          </ControlRow>
        </>
      }
    />
  );
}

export function ProgressSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Progress</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Shows how far along a task is from 0% to 100%. Four semantic color variants and two bar heights for different visual weight needs.
        </p>
      </div>
      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
      <SectionBlock title="Props">
        <PropsTable source={progressTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
