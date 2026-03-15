import { useState } from "react";
import { Radio } from "../../../components/atoms/Radio";
import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import radioTsx from "../../../components/atoms/Radio.tsx?raw";
import radioCss from "../../../components/atoms/Radio.module.css?raw";

const sources = [
  { filename: "Radio.tsx",        code: radioTsx },
  { filename: "Radio.module.css", code: radioCss },
];

const OPTIONS = ["Option A", "Option B", "Option C"] as const;
type Option = typeof OPTIONS[number];

function Playground() {
  const [selected, setSelected] = useState<Option>("Option A");
  const [disabled, setDisabled] = useState(false);

  return (
    <PlaygroundShell
      preview={
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {OPTIONS.map((opt) => (
            <Radio
              key={opt}
              checked={selected === opt}
              onChange={() => setSelected(opt)}
              label={opt}
              disabled={disabled}
              name="playground-radio"
              value={opt}
            />
          ))}
        </div>
      }
      controls={
        <ControlRow label="Disabled">
          <Pill active={!disabled} onClick={() => setDisabled(false)}>no</Pill>
          <Pill active={disabled}  onClick={() => setDisabled(true)}>yes</Pill>
        </ControlRow>
      }
    />
  );
}

export function RadioSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atoms</span>
          <span style={{ fontSize: "11px", color: "#D4D4D8" }}>/</span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Fields</span>
        </div>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Radio</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A single-select control used in groups. Each Radio is a controlled component — the parent
          tracks which option is selected and passes the matching <code>checked</code> value to each one.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>

      <SectionBlock title="Props">
        <TokenTable rows={[
          { property: "checked",  token: "boolean",                    value: "—",     note: "Whether this option is selected" },
          { property: "onChange", token: "(checked: boolean) => void", value: "—",     note: "Called when the user selects this option" },
          { property: "label",    token: "string",                     value: "—",     note: "Optional text label shown to the right" },
          { property: "name",     token: "string",                     value: "—",     note: "Groups radios together — same name = one selection" },
          { property: "value",    token: "string",                     value: "—",     note: "The value this option represents" },
          { property: "disabled", token: "boolean",                    value: "false", note: "Reduces opacity, blocks interaction" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Tokens">
        <TokenTable rows={[
          { property: "circle (unchecked) border", token: "--stroke-secondary",  value: "var(--neutral-200)" },
          { property: "circle (checked) fill",     token: "--brand-primary",     value: "var(--purple-500)" },
          { property: "circle background",         token: "--surface-primary",   value: "var(--white-100)" },
          { property: "inner dot",                 token: "--surface-primary",   value: "var(--white-100)" },
          { property: "focus ring",                token: "--brand-tertiary",    value: "var(--purple-200)" },
          { property: "border radius",             token: "--radius-round",      value: "999px" },
        ]} />
      </SectionBlock>
    </SplitPage>
  );
}
