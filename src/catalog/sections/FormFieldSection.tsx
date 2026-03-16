import { useState } from "react";
import { FormField } from "../../../components/fields/FormField";
import { TextInput } from "../../../components/fields/TextInput";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import formFieldTsx from "../../../components/fields/FormField.tsx?raw";
import formFieldCss from "../../../components/fields/FormField.module.css?raw";

const sources = [
  { filename: "FormField.tsx",        code: formFieldTsx },
  { filename: "FormField.module.css", code: formFieldCss },
];

function Playground() {
  const [value, setValue] = useState("");
  const [showHint, setShowHint] = useState(true);
  const [showError, setShowError] = useState(false);
  const [required, setRequired] = useState(false);

  return (
    <PlaygroundShell
      preview={
        <div style={{ width: "100%", maxWidth: "360px" }}>
          <FormField
            label="Repository URL"
            hint={showHint ? "Where your code lives, e.g. github.com/org/repo" : undefined}
            error={showError ? "This field is required" : undefined}
            required={required}
          >
            <TextInput value={value} onChange={setValue} placeholder="https://github.com/org/repo" />
          </FormField>
        </div>
      }
      controls={
        <>
          <ControlRow label="Hint">
            <Pill active={showHint}  onClick={() => setShowHint(true)}>show</Pill>
            <Pill active={!showHint} onClick={() => setShowHint(false)}>hide</Pill>
          </ControlRow>
          <ControlRow label="Error">
            <Pill active={!showError} onClick={() => setShowError(false)}>none</Pill>
            <Pill active={showError}  onClick={() => setShowError(true)}>show</Pill>
          </ControlRow>
          <ControlRow label="Required">
            <Pill active={!required} onClick={() => setRequired(false)}>no</Pill>
            <Pill active={required}  onClick={() => setRequired(true)}>yes</Pill>
          </ControlRow>
        </>
      }
    />
  );
}

export function FormFieldSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Form Field</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A wrapper that gives any input a consistent label, hint text, and error message. Wrap TextInput, SelectInput, Textarea, or any other input as children.
        </p>
      </div>
      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
      <SectionBlock title="Props">
        <PropsTable source={formFieldTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
