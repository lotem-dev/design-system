import { useState } from "react";
import { TextInput } from "../../../components/atoms/TextInput";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import textInputTsx from "../../../components/atoms/TextInput.tsx?raw";
import textInputCss from "../../../components/atoms/TextInput.module.css?raw";

const sources = [
  { filename: "TextInput.tsx",        code: textInputTsx },
  { filename: "TextInput.module.css", code: textInputCss },
];

function Playground() {
  const [value, setValue]       = useState("");
  const [disabled, setDisabled] = useState(false);

  return (
    <PlaygroundShell
      preview={
        <div style={{ width: "200px" }}>
          <TextInput label="Field Name" placeholder="Text" value={value} onChange={setValue} disabled={disabled} />
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

export function TextInputSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atoms</span>
          <span style={{ fontSize: "11px", color: "#D4D4D8" }}>/</span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Fields</span>
        </div>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>TextInput</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A single-line text field with an optional label. States: default, focused (purple ring), and disabled.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
    </SplitPage>
  );
}
