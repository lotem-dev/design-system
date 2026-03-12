import { BadgePriority, type PriorityScore } from "../../../components/atoms/BadgePriority";
import { SectionBlock } from "../ui/SectionBlock";
import { PreviewBox } from "../ui/PreviewBox";
import { TokenTable } from "../ui/TokenTable";
import { SplitPage } from "../ui/SplitPage";

import badgePriorityTsx from "../../../components/atoms/BadgePriority.tsx?raw";
import badgePriorityCss from "../../../components/atoms/BadgePriority.module.css?raw";

const sources = [
  { filename: "BadgePriority.tsx",        code: badgePriorityTsx },
  { filename: "BadgePriority.module.css", code: badgePriorityCss },
];

const SCORES: { priorityScore: PriorityScore; text: string; range: string }[] = [
  { priorityScore: "critical", text: "95", range: "81–100" },
  { priorityScore: "high",     text: "62", range: "41–80"  },
  { priorityScore: "medium",   text: "28", range: "0–40"   },
];

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
          Displays a numeric priority score (0–100) inside a pill-shaped badge. The score range determines the severity tier - critical, high, or medium. Unlike BadgeSeverity, this badge always has a visible border and is fully rounded.
        </p>
      </div>

      <SectionBlock title="Preview">
        <PreviewBox align="center">
          {SCORES.map(({ priorityScore, text }) => (
            <BadgePriority key={priorityScore} priorityScore={priorityScore} text={text} />
          ))}
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="Score Ranges">
        <TokenTable rows={SCORES.map(({ priorityScore, range }) => ({
          property: priorityScore,
          token: `score ${range}`,
          value: priorityScore.charAt(0).toUpperCase() + priorityScore.slice(1),
        }))} />
      </SectionBlock>

      <SectionBlock title="Props">
        <TokenTable rows={[
          { property: "priorityScore", token: `"critical" | "high" | "medium"`, value: "required",  note: "Determines color and border" },
          { property: "text",          token: "string",                           value: `"100"`,     note: "The numeric score to display" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Tokens">
        <TokenTable rows={[
          { property: "border-radius",  token: "—",                              value: "999px",     note: "Full pill shape" },
          { property: "border",         token: "--scale-{score}-primary",         value: "1px solid", note: "Matches text color" },
          { property: "critical bg",    token: "--scale-critical-secondary",      value: "var(--red-200)" },
          { property: "critical color", token: "--scale-critical-primary",        value: "var(--red-500)" },
          { property: "high bg",        token: "--scale-high-secondary",          value: "var(--orange-200)" },
          { property: "high color",     token: "--scale-high-primary",            value: "var(--orange-600)" },
          { property: "medium bg",      token: "--scale-medium-secondary",        value: "var(--yellow-100)" },
          { property: "medium color",   token: "--scale-medium-primary",          value: "var(--yellow-500)" },
        ]} />
      </SectionBlock>
    </SplitPage>
  );
}
