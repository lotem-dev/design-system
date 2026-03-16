import { useState } from "react";
import { Radio } from "../../../components/interactions/Radio";
import { TokenTable } from "../ui/TokenTable";
import { PropsTable } from "../ui/PropsTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import radioTsx from "../../../components/interactions/Radio.tsx?raw";
import radioCss from "../../../components/interactions/Radio.module.css?raw";

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
        <PropsTable source={radioTsx} />
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
