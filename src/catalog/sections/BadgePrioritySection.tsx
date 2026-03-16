import { useState } from "react";
import { BadgePriority, type PriorityScore } from "../../../components/badges/BadgePriority";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import badgePriorityTsx from "../../../components/badges/BadgePriority.tsx?raw";
import badgePriorityCss from "../../../components/badges/BadgePriority.module.css?raw";

const sources = [
  { filename: "BadgePriority.tsx",        code: badgePriorityTsx },
  { filename: "BadgePriority.module.css", code: badgePriorityCss },
];

const SCORES: { priorityScore: PriorityScore; text: string }[] = [
  { priorityScore: "p1", text: "95" },
  { priorityScore: "p2", text: "62" },
  { priorityScore: "p3", text: "28" },
];

function Playground() {
  const [score, setScore] = useState<PriorityScore>("p1");
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
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>BadgePriority</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Displays a numeric priority score inside a pill-shaped badge. Three tiers: P1 (highest), P2, and P3 (lowest) — each with a distinct color.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
    </SplitPage>
  );
}
