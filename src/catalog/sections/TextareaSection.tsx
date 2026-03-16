import { useState } from "react";
import { Textarea } from "../../../components/fields/Textarea";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import textareaTsx from "../../../components/fields/Textarea.tsx?raw";
import textareaCss from "../../../components/fields/Textarea.module.css?raw";

const sources = [
  { filename: "Textarea.tsx",        code: textareaTsx },
  { filename: "Textarea.module.css", code: textareaCss },
];

function Playground() {
  const [value, setValue]     = useState("");
  const [disabled, setDisabled] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <PlaygroundShell
      preview={
        <div style={{ width: "280px" }}>
          <Textarea
            label="Description"
            placeholder="Write something..."
            value={value}
            onChange={setValue}
            disabled={disabled}
            error={showError ? "This field is required." : undefined}
          />
        </div>
      }
      controls={
        <>
          <ControlRow label="Disabled">
            <Pill active={!disabled} onClick={() => setDisabled(false)}>no</Pill>
            <Pill active={disabled}  onClick={() => setDisabled(true)}>yes</Pill>
          </ControlRow>
          <ControlRow label="Error">
            <Pill active={!showError} onClick={() => setShowError(false)}>no</Pill>
            <Pill active={showError}  onClick={() => setShowError(true)}>yes</Pill>
          </ControlRow>
        </>
      }
    />
  );
}

export function TextareaSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Textarea</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A multi-line text field for longer content like descriptions, notes, or comments. Shares the same visual style as TextInput but grows vertically.
        </p>
      </div>
      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
      <SectionBlock title="Props">
        <PropsTable source={textareaTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
