import { BadgeSeverity, type SeverityScale } from "../../../components/atoms/BadgeSeverity";
import { SectionBlock } from "../ui/SectionBlock";
import { PreviewBox } from "../ui/PreviewBox";
import { TokenTable } from "../ui/TokenTable";
import { SplitPage } from "../ui/SplitPage";

import badgeSeverityTsx from "../../../components/atoms/BadgeSeverity.tsx?raw";
import badgeSeverityCss from "../../../components/atoms/BadgeSeverity.module.css?raw";

const sources = [
  { filename: "BadgeSeverity.tsx",        code: badgeSeverityTsx },
  { filename: "BadgeSeverity.module.css", code: badgeSeverityCss },
];

const SCALES: SeverityScale[] = ["critical", "high", "medium", "low"];

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
          Displays the severity level of a security finding. Comes in two sizes - large for prominent display, small for dense tables and lists. Color is fully driven by tokens so it responds to theme changes.
        </p>
      </div>

      <SectionBlock title="Large (default)">
        <PreviewBox>
          {SCALES.map(scale => (
            <BadgeSeverity key={scale} scale={scale} size="lg" />
          ))}
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="Small">
        <PreviewBox align="center">
          {SCALES.map(scale => (
            <BadgeSeverity key={scale} scale={scale} size="sm" />
          ))}
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="Props">
        <TokenTable rows={[
          { property: "scale", token: `"critical" | "high" | "medium" | "low"`, value: "required",  note: "Determines label and color" },
          { property: "size",  token: `"sm" | "lg"`,                             value: `"lg"`,      note: "Font size and padding" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Tokens">
        <TokenTable rows={[
          { property: "critical bg",  token: "--scale-critical-secondary", value: "var(--red-200)" },
          { property: "critical text", token: "--scale-critical-primary",  value: "var(--red-500)" },
          { property: "high bg",      token: "--scale-high-secondary",     value: "var(--orange-200)" },
          { property: "high text",    token: "--scale-high-primary",       value: "var(--orange-600)" },
          { property: "medium bg",    token: "--scale-medium-secondary",   value: "var(--yellow-100)" },
          { property: "medium text",  token: "--scale-medium-primary",     value: "var(--yellow-500)" },
          { property: "low bg",       token: "--scale-low-secondary",      value: "var(--green-100)" },
          { property: "low text",     token: "--scale-low-primary",        value: "var(--green-500)" },
          { property: "border-radius", token: "--radius-base",             value: "8px" },
        ]} />
      </SectionBlock>
    </SplitPage>
  );
}
