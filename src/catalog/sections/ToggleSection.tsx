import { useState } from "react";
import { Toggle } from "../../../components/interactions/Toggle";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import toggleTsx from "../../../components/interactions/Toggle.tsx?raw";
import toggleCss from "../../../components/interactions/Toggle.module.css?raw";

const sources = [
  { filename: "Toggle.tsx",        code: toggleTsx },
  { filename: "Toggle.module.css", code: toggleCss },
];

function Playground() {
  const [checked, setChecked]   = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  return (
    <PlaygroundShell
      preview={
        <Toggle
          checked={checked}
          onChange={setChecked}
          disabled={disabled}
          label={showLabel ? "Enable feature" : undefined}
        />
      }
      controls={
        <>
          <ControlRow label="State">
            <Pill active={checked}  onClick={() => setChecked(true)}>on</Pill>
            <Pill active={!checked} onClick={() => setChecked(false)}>off</Pill>
          </ControlRow>
          <ControlRow label="Disabled">
            <Pill active={!disabled} onClick={() => setDisabled(false)}>no</Pill>
            <Pill active={disabled}  onClick={() => setDisabled(true)}>yes</Pill>
          </ControlRow>
          <ControlRow label="Label">
            <Pill active={showLabel}  onClick={() => setShowLabel(true)}>show</Pill>
            <Pill active={!showLabel} onClick={() => setShowLabel(false)}>hide</Pill>
          </ControlRow>
        </>
      }
    />
  );
}

export function ToggleSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Toggle</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          An on/off switch for settings and feature flags. More deliberate than a checkbox — use Toggle to enable or disable a feature, Checkbox to select items from a list.
        </p>
      </div>
      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
      <SectionBlock title="Props">
        <PropsTable source={toggleTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
