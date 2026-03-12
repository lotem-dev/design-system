import { useState } from "react";
import { TextInput } from "../../../components/atoms/TextInput";
import { SelectInput } from "../../../components/atoms/SelectInput";
import { SearchInput } from "../../../components/atoms/SearchInput";
import { SectionBlock } from "../ui/SectionBlock";
import { PreviewBox } from "../ui/PreviewBox";
import { TokenTable } from "../ui/TokenTable";
import { CodeBlock } from "../ui/CodeBlock";

const SELECT_OPTIONS = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
];

export function FieldsSection() {
  const [textValue, setTextValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "system-ui" }}>Atom</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "system-ui" }}>Fields</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Three input atoms for collecting user input — text, selection (dropdown), and search.
          All share the same sizing, border, and focus ring behavior.
        </p>
      </div>

      <SectionBlock title="TextInput">
        <PreviewBox>
          <div style={{ width: "200px" }}>
            <TextInput label="Field Name" placeholder="Text" value={textValue} onChange={setTextValue} />
          </div>
          <div style={{ width: "200px" }}>
            <TextInput label="Field Name" placeholder="Text" disabled />
          </div>
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="SelectInput">
        <PreviewBox>
          <div style={{ width: "200px" }}>
            <SelectInput label="Field Name" options={SELECT_OPTIONS} placeholder="Select..." value={selectValue} onChange={setSelectValue} />
          </div>
          <div style={{ width: "200px" }}>
            <SelectInput label="Field Name" options={SELECT_OPTIONS} placeholder="Select..." disabled />
          </div>
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="SearchInput">
        <PreviewBox>
          <div style={{ width: "200px" }}>
            <SearchInput value={searchValue} onChange={setSearchValue} />
          </div>
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="Focus State">
        <p style={{ fontSize: "13px", color: "#71717A", fontFamily: "system-ui", marginBottom: "12px" }}>
          Click into any field to see the focus ring — 2px brand border + purple glow.
        </p>
        <PreviewBox>
          <div style={{ width: "200px" }}>
            <TextInput label="Click me" placeholder="Focus me" />
          </div>
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="Tokens">
        <TokenTable rows={[
          { property: "height",          token: "—",                   value: "38px" },
          { property: "padding",         token: "--space-sm / --space-base", value: "8px 12px" },
          { property: "border radius",   token: "--radius-base",       value: "8px" },
          { property: "border default",  token: "--stroke-secondary",  value: "var(--neutral-200)" },
          { property: "border focused",  token: "--stroke-brand",      value: "var(--purple-500)" },
          { property: "bg default",      token: "--surface-primary",   value: "white" },
          { property: "bg disabled",     token: "--surface-secondary", value: "var(--neutral-50)" },
          { property: "text color",      token: "--text-primary",      value: "var(--neutral-600)" },
          { property: "text disabled",   token: "--text-secondary",    value: "var(--neutral-400)" },
          { property: "label font",      token: "--font-size-sm / --font-weight-bold", value: "12px / 700" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Usage">
        <CodeBlock code={`import { TextInput, SelectInput, SearchInput } from "./components/atoms";

<TextInput
  label="Field Name"
  placeholder="Enter text..."
  value={value}
  onChange={(val) => setValue(val)}
/>

<SelectInput
  label="Status"
  options={[
    { label: "Open",   value: "open" },
    { label: "Fixed",  value: "fixed" },
  ]}
  value={selected}
  onChange={(val) => setSelected(val)}
/>

<SearchInput
  placeholder="Search findings..."
  value={query}
  onChange={(val) => setQuery(val)}
/>`} />
      </SectionBlock>
    </div>
  );
}
