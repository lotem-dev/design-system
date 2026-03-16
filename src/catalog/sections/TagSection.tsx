import { useState } from "react";
import { Tag } from "../../../components/atoms/Tag";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import tagTsx from "../../../components/atoms/Tag.tsx?raw";
import tagCss from "../../../components/atoms/Tag.module.css?raw";

const sources = [
  { filename: "Tag.tsx",        code: tagTsx },
  { filename: "Tag.module.css", code: tagCss },
];

const COLORS = ["default", "brand", "success", "warning", "error"] as const;

function Playground() {
  const [removable, setRemovable] = useState(false);

  return (
    <PlaygroundShell
      preview={
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {COLORS.map(c => (
            <Tag key={c} label={c} color={c} onRemove={removable ? () => {} : undefined} />
          ))}
        </div>
      }
      controls={
        <ControlRow label="Removable">
          <Pill active={!removable} onClick={() => setRemovable(false)}>no</Pill>
          <Pill active={removable} onClick={() => setRemovable(true)}>yes</Pill>
        </ControlRow>
      }
    />
  );
}

export function TagSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Display</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Tag</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A small pill label for categorizing or filtering content. Five color variants cover semantic meanings. Shows an × dismiss button when onRemove is provided.
        </p>
      </div>
      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
      <SectionBlock title="Props">
        <PropsTable source={tagTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
