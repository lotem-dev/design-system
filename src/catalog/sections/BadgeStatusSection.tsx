import { useState } from "react";
import { BadgeStatus } from "../../../components/atoms/BadgeStatus";
import type { BadgeStatusValue as BadgeStatusType } from "../../../components/atoms/BadgeStatus";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import badgeTsx from "../../../components/atoms/BadgeStatus.tsx?raw";

const sources = [
  { filename: "BadgeStatus.tsx", code: badgeTsx },
];

const STATUSES: BadgeStatusType[] = ["open", "fixed", "ignored"];

function Playground() {
  const [status, setStatus] = useState<BadgeStatusType>("open");

  return (
    <PlaygroundShell
      preview={<BadgeStatus status={status} />}
      controls={
        <ControlRow label="Status">
          {STATUSES.map(s => <Pill key={s} active={status === s} onClick={() => setStatus(s)}>{s}</Pill>)}
        </ControlRow>
      }
    />
  );
}

export function BadgeStatusSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atoms</span>
          <span style={{ fontSize: "11px", color: "#D4D4D8" }}>/</span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Badges</span>
        </div>
        <h1 style={{ margin: "0 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>BadgeStatus</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Displays the current status of a security finding. Label, colors, and border are all
          determined by the <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>status</code> prop.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
    </SplitPage>
  );
}
