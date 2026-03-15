import { useState } from "react";
import { SearchInput } from "../../../components/atoms/SearchInput";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell } from "../ui/PlaygroundShell";

import searchInputTsx from "../../../components/atoms/SearchInput.tsx?raw";
import searchInputCss from "../../../components/atoms/SearchInput.module.css?raw";

const sources = [
  { filename: "SearchInput.tsx",        code: searchInputTsx },
  { filename: "SearchInput.module.css", code: searchInputCss },
];

function Playground() {
  const [value, setValue] = useState("");

  return (
    <PlaygroundShell
      preview={
        <div style={{ width: "240px" }}>
          <SearchInput value={value} onChange={setValue} placeholder="Search findings..." />
        </div>
      }
    />
  );
}

export function SearchInputSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atoms</span>
          <span style={{ fontSize: "11px", color: "#D4D4D8" }}>/</span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Fields</span>
        </div>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>SearchInput</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A search field with an inline magnifying glass icon. Same sizing and focus ring as the other field atoms.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
    </SplitPage>
  );
}
