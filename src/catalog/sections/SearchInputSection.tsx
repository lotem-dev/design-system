import { useState } from "react";
import { SearchInput } from "../../../components/atoms/SearchInput";
import { SectionBlock } from "../ui/SectionBlock";
import { PreviewBox } from "../ui/PreviewBox";
import { TokenTable } from "../ui/TokenTable";
import { CodeBlock } from "../ui/CodeBlock";
import { SplitPage } from "../ui/SplitPage";

import searchInputTsx from "../../../components/atoms/SearchInput.tsx?raw";
import searchInputCss from "../../../components/atoms/SearchInput.module.css?raw";

const sources = [
  { filename: "SearchInput.tsx",        code: searchInputTsx },
  { filename: "SearchInput.module.css", code: searchInputCss },
];

export function SearchInputSection() {
  const [value, setValue] = useState("");

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Fields</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>SearchInput</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A search field with an inline magnifying glass icon. No label — it's always visually obvious what it's for. Same sizing and focus ring as the other field atoms.
        </p>
      </div>

      <SectionBlock title="Default">
        <PreviewBox>
          <div style={{ width: "240px" }}>
            <SearchInput value={value} onChange={setValue} />
          </div>
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="Focus State">
        <p style={{ fontSize: "13px", color: "#71717A", fontFamily: "'Open Sans', system-ui, sans-serif", marginBottom: "12px" }}>
          Click the field to see the same purple focus ring shared by all field atoms.
        </p>
        <PreviewBox>
          <div style={{ width: "240px" }}>
            <SearchInput placeholder="Search findings..." />
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
          { property: "icon color",      token: "--text-secondary",          value: "var(--neutral-400)" },
          { property: "text color",      token: "--text-primary",            value: "var(--neutral-600)" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Usage">
        <CodeBlock code={`import { SearchInput } from "./components/atoms";

<SearchInput
  placeholder="Search findings..."
  value={query}
  onChange={(val) => setQuery(val)}
/>`} />
      </SectionBlock>
    </SplitPage>
  );
}
