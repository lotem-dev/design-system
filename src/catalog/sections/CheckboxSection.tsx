import { useState } from "react";
import { Checkbox } from "../../../components/atoms/Checkbox";
import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import checkboxTsx from "../../../components/atoms/Checkbox.tsx?raw";
import checkboxCss from "../../../components/atoms/Checkbox.module.css?raw";

const sources = [
  { filename: "Checkbox.tsx",        code: checkboxTsx },
  { filename: "Checkbox.module.css", code: checkboxCss },
];

function Playground() {
  const [checked, setChecked]   = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [hasLabel, setHasLabel] = useState(true);

  return (
    <PlaygroundShell
      preview={
        <Checkbox
          checked={checked}
          onChange={setChecked}
          label={hasLabel ? "Enable notifications" : undefined}
          disabled={disabled}
        />
      }
      controls={
        <>
          <ControlRow label="State">
            <Pill active={!checked}  onClick={() => setChecked(false)}>unchecked</Pill>
            <Pill active={checked}   onClick={() => setChecked(true)}>checked</Pill>
          </ControlRow>
          <ControlRow label="Disabled">
            <Pill active={!disabled} onClick={() => setDisabled(false)}>no</Pill>
            <Pill active={disabled}  onClick={() => setDisabled(true)}>yes</Pill>
          </ControlRow>
          <ControlRow label="Label">
            <Pill active={hasLabel}  onClick={() => setHasLabel(true)}>with label</Pill>
            <Pill active={!hasLabel} onClick={() => setHasLabel(false)}>none</Pill>
          </ControlRow>
        </>
      }
    />
  );
}

export function CheckboxSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atoms</span>
          <span style={{ fontSize: "11px", color: "#D4D4D8" }}>/</span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Fields</span>
        </div>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Checkbox</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A binary toggle for a single option. Controlled component — the parent owns the checked state.
          Supports an optional label and a disabled state.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>

      <SectionBlock title="Props">
        <TokenTable rows={[
          { property: "checked",  token: "boolean",                    value: "—",     note: "Whether the checkbox is checked" },
          { property: "onChange", token: "(checked: boolean) => void", value: "—",     note: "Called when the user toggles it" },
          { property: "label",    token: "string",                     value: "—",     note: "Optional text label shown to the right" },
          { property: "disabled", token: "boolean",                    value: "false", note: "Reduces opacity, blocks interaction" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Tokens">
        <TokenTable rows={[
          { property: "box (unchecked) border", token: "--stroke-secondary",  value: "var(--neutral-200)" },
          { property: "box (checked) fill",     token: "--brand-primary",     value: "var(--purple-500)" },
          { property: "box background",         token: "--surface-primary",   value: "var(--white-100)" },
          { property: "focus ring",             token: "--brand-tertiary",    value: "var(--purple-200)" },
          { property: "border radius",          token: "--radius-xs",         value: "4px" },
        ]} />
      </SectionBlock>
    </SplitPage>
  );
}
