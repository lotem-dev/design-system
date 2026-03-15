import { useState } from "react";
import { Tooltip } from "../../../components/atoms/Tooltip";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import tooltipTsx from "../../../components/atoms/Tooltip.tsx?raw";
import tooltipCss from "../../../components/atoms/Tooltip.module.css?raw";

const sources = [
  { filename: "Tooltip.tsx",        code: tooltipTsx },
  { filename: "Tooltip.module.css", code: tooltipCss },
];

function Playground() {
  const [secondary, setSecondary] = useState(false);
  const [link, setLink]           = useState(false);

  return (
    <PlaygroundShell
      preview={
        <Tooltip
          text="CVSS Score: 9.8"
          secondaryText={secondary ? "Last seen 2 days ago" : undefined}
          linkLabel={link ? "View details" : undefined}
          linkHref={link ? "#" : undefined}
        />
      }
      controls={
        <>
          <ControlRow label="Secondary">
            <Pill active={!secondary} onClick={() => setSecondary(false)}>none</Pill>
            <Pill active={secondary}  onClick={() => setSecondary(true)}>with text</Pill>
          </ControlRow>
          <ControlRow label="Link">
            <Pill active={!link} onClick={() => setLink(false)}>none</Pill>
            <Pill active={link}  onClick={() => setLink(true)}>with link</Pill>
          </ControlRow>
        </>
      }
    />
  );
}

export function TooltipSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atom</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Tooltip</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A dark bubble for short contextual information. Supports primary text, optional secondary text, and an optional link.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
    </SplitPage>
  );
}
