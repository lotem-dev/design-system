import { useState } from "react";
import { SelectInput } from "../../../components/atoms/SelectInput";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import selectInputTsx from "../../../components/atoms/SelectInput.tsx?raw";
import selectInputCss from "../../../components/atoms/SelectInput.module.css?raw";

const sources = [
  { filename: "SelectInput.tsx",        code: selectInputTsx },
  { filename: "SelectInput.module.css", code: selectInputCss },
];

const OPTIONS = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
];

function Playground() {
  const [value, setValue]       = useState("");
  const [disabled, setDisabled] = useState(false);

  return (
    <PlaygroundShell
      preview={
        <div style={{ width: "200px" }}>
          <SelectInput label="Field Name" options={OPTIONS} placeholder="Select..." value={value} onChange={setValue} disabled={disabled} />
        </div>
      }
      controls={
        <ControlRow label="State">
          <Pill active={!disabled} onClick={() => setDisabled(false)}>default</Pill>
          <Pill active={disabled}  onClick={() => setDisabled(true)}>disabled</Pill>
        </ControlRow>
      }
    />
  );
}

export function SelectInputSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atoms</span>
          <span style={{ fontSize: "11px", color: "#D4D4D8" }}>/</span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Fields</span>
        </div>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>SelectInput</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A dropdown select field. Uses a native <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>&lt;select&gt;</code> with the browser arrow hidden and replaced by a custom chevron icon.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
    </SplitPage>
  );
}
