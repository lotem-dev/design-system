import { useState } from "react";
import { Tab } from "../../../components/molecules/Tab";
import { TabGroup } from "../../../components/molecules/TabGroup";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import tabTsx    from "../../../components/molecules/Tab.tsx?raw";
import tabCss    from "../../../components/molecules/Tab.module.css?raw";
import groupTsx  from "../../../components/molecules/TabGroup.tsx?raw";
import groupCss  from "../../../components/molecules/TabGroup.module.css?raw";

const sources = [
  { filename: "Tab.tsx",             code: tabTsx   },
  { filename: "Tab.module.css",      code: tabCss   },
  { filename: "TabGroup.tsx",        code: groupTsx },
  { filename: "TabGroup.module.css", code: groupCss },
];

type TabTarget = "single" | "group";

function Playground() {
  const [target, setTarget]     = useState<TabTarget>("group");
  const [selected, setSelected] = useState(false);
  const [count, setCount]       = useState(false);

  const singlePreview = (
    <Tab
      label="Findings"
      count={count ? 12 : undefined}
      selected={selected}
    />
  );

  const groupPreview = (
    <TabGroup
      tabs={[
        { label: "Open",    count: 14 },
        { label: "Fixed" },
        { label: "Ignored", count: 3  },
      ]}
    />
  );

  return (
    <PlaygroundShell
      preview={target === "single" ? singlePreview : groupPreview}
      controls={
        <>
          <ControlRow label="View">
            <Pill active={target === "group"}  onClick={() => setTarget("group")}>group</Pill>
            <Pill active={target === "single"} onClick={() => setTarget("single")}>single tab</Pill>
          </ControlRow>
          {target === "single" && (
            <>
              <ControlRow label="Selected">
                <Pill active={!selected} onClick={() => setSelected(false)}>no</Pill>
                <Pill active={selected}  onClick={() => setSelected(true)}>yes</Pill>
              </ControlRow>
              <ControlRow label="Count">
                <Pill active={!count} onClick={() => setCount(false)}>none</Pill>
                <Pill active={count}  onClick={() => setCount(true)}>with count</Pill>
              </ControlRow>
            </>
          )}
        </>
      }
    />
  );
}

export function TabSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>🧬 Molecule</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Tab / TabGroup</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A single Tab item and a TabGroup that manages selection state. Tabs can show an optional count badge. Use TabGroup in practice — Tab alone is the building block.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
    </SplitPage>
  );
}
