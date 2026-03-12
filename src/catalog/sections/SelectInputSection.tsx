import { useState } from "react";
import { SelectInput } from "../../../components/atoms/SelectInput";
import { SectionBlock } from "../ui/SectionBlock";
import { PreviewBox } from "../ui/PreviewBox";
import { TokenTable } from "../ui/TokenTable";
import { CodeBlock } from "../ui/CodeBlock";

const OPTIONS = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
];

export function SelectInputSection() {
  const [value, setValue] = useState("");

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Fields</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>SelectInput</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A dropdown select field. Uses a native <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>&lt;select&gt;</code> with the browser arrow hidden and replaced by a custom chevron icon.
        </p>
      </div>

      <SectionBlock title="Default &amp; Disabled">
        <PreviewBox>
          <div style={{ width: "200px" }}>
            <SelectInput label="Field Name" options={OPTIONS} placeholder="Select..." value={value} onChange={setValue} />
          </div>
          <div style={{ width: "200px" }}>
            <SelectInput label="Field Name" options={OPTIONS} placeholder="Select..." disabled />
          </div>
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="Focus State">
        <p style={{ fontSize: "13px", color: "#71717A", fontFamily: "'Open Sans', system-ui, sans-serif", marginBottom: "12px" }}>
          Click to open — the same purple focus ring as TextInput applies.
        </p>
        <PreviewBox>
          <div style={{ width: "200px" }}>
            <SelectInput label="Click me" options={OPTIONS} placeholder="Select..." />
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
          { property: "chevron color",   token: "--text-secondary",          value: "var(--neutral-400)" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Usage">
        <CodeBlock code={`import { SelectInput } from "./components/atoms";

<SelectInput
  label="Status"
  placeholder="Select..."
  options={[
    { label: "Open",   value: "open" },
    { label: "Fixed",  value: "fixed" },
  ]}
  value={selected}
  onChange={(val) => setSelected(val)}
/>

{/* Disabled */}
<SelectInput label="Status" options={[]} placeholder="Select..." disabled />`} />
      </SectionBlock>
    </div>
  );
}
