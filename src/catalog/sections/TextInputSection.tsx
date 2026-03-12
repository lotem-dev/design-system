import { useState } from "react";
import { TextInput } from "../../../components/atoms/TextInput";
import { SectionBlock } from "../ui/SectionBlock";
import { PreviewBox } from "../ui/PreviewBox";
import { TokenTable } from "../ui/TokenTable";
import { SplitPage } from "../ui/SplitPage";

import textInputTsx from "../../../components/atoms/TextInput.tsx?raw";
import textInputCss from "../../../components/atoms/TextInput.module.css?raw";

const sources = [
  { filename: "TextInput.tsx",        code: textInputTsx },
  { filename: "TextInput.module.css", code: textInputCss },
];

export function TextInputSection() {
  const [value, setValue] = useState("");

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
          A single-line text field. Has an optional label above it. States: default, focused (purple ring), and disabled.
        </p>
      </div>

      <SectionBlock title="Default &amp; Disabled">
        <PreviewBox>
          <div style={{ width: "200px" }}>
            <TextInput label="Field Name" placeholder="Text" value={value} onChange={setValue} />
          </div>
          <div style={{ width: "200px" }}>
            <TextInput label="Field Name" placeholder="Text" disabled />
          </div>
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="Focus State">
        <p style={{ fontSize: "13px", color: "#71717A", fontFamily: "'Open Sans', system-ui, sans-serif", marginBottom: "12px" }}>
          Click the field below to see the focus ring - 2px brand border + purple glow.
        </p>
        <PreviewBox>
          <div style={{ width: "200px" }}>
            <TextInput label="Click me" placeholder="Focus me" />
          </div>
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="Tokens">
        <TokenTable rows={[
          { property: "height",          token: "—",                        value: "38px" },
          { property: "padding",         token: "--space-sm / --space-base", value: "8px 12px" },
          { property: "border radius",   token: "--radius-base",             value: "8px" },
          { property: "border default",  token: "--stroke-secondary",        value: "var(--neutral-200)" },
          { property: "border focused",  token: "--stroke-brand",            value: "var(--purple-500)" },
          { property: "bg default",      token: "--surface-primary",         value: "white" },
          { property: "bg disabled",     token: "--surface-secondary",       value: "var(--neutral-50)" },
          { property: "text color",      token: "--text-primary",            value: "var(--neutral-600)" },
          { property: "text disabled",   token: "--text-secondary",          value: "var(--neutral-400)" },
          { property: "label font",      token: "--font-size-sm / --font-weight-bold", value: "12px / 700" },
        ]} />
      </SectionBlock>
    </SplitPage>
  );
}
