import { useState } from "react";
import { BadgePriority, type PriorityScore } from "../../../components/atoms/BadgePriority";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import badgePriorityTsx from "../../../components/atoms/BadgePriority.tsx?raw";
import badgePriorityCss from "../../../components/atoms/BadgePriority.module.css?raw";

const sources = [
  { filename: "BadgePriority.tsx",        code: badgePriorityTsx },
  { filename: "BadgePriority.module.css", code: badgePriorityCss },
];

const SCORES: { priorityScore: PriorityScore; text: string }[] = [
  { priorityScore: "critical", text: "95" },
  { priorityScore: "high",     text: "62" },
  { priorityScore: "medium",   text: "28" },
];

function Playground() {
  const [score, setScore] = useState<PriorityScore>("critical");
  const entry = SCORES.find(s => s.priorityScore === score)!;

  return (
    <PlaygroundShell
      preview={<BadgePriority priorityScore={entry.priorityScore} text={entry.text} />}
      controls={
        <ControlRow label="Score">
          {SCORES.map(s => (
            <Pill key={s.priorityScore} active={score === s.priorityScore} onClick={() => setScore(s.priorityScore)}>
              {s.priorityScore}
            </Pill>
          ))}
        </ControlRow>
      }
    />
  );
}

export function BadgePrioritySection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atoms</span>
          <span style={{ fontSize: "11px", color: "#D4D4D8" }}>/</span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Badges</span>
        </div>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>BadgePriority</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Displays a numeric priority score (0–100) inside a pill-shaped badge. The score range determines the severity tier — critical, high, or medium.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
    </SplitPage>
  );
}
