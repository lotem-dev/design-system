import { Tab } from "../../../components/molecules/Tab";
import { TabGroup } from "../../../components/molecules/TabGroup";
import { SectionBlock } from "../ui/SectionBlock";
import { PreviewBox } from "../ui/PreviewBox";
import { TokenTable } from "../ui/TokenTable";
import { CodeBlock } from "../ui/CodeBlock";
import { SplitPage } from "../ui/SplitPage";

import tabTsx    from "../../../components/molecules/Tab.tsx?raw";
import tabCss    from "../../../components/molecules/Tab.module.css?raw";
import groupTsx  from "../../../components/molecules/TabGroup.tsx?raw";
import groupCss  from "../../../components/molecules/TabGroup.module.css?raw";

const sources = [
  { filename: "Tab.tsx",           code: tabTsx   },
  { filename: "Tab.module.css",    code: tabCss   },
  { filename: "TabGroup.tsx",      code: groupTsx },
  { filename: "TabGroup.module.css", code: groupCss },
];

export function TabSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Molecule</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Tab / TabGroup</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A single Tab item and a TabGroup that manages selection state.
          Tabs can show an optional count badge. Use TabGroup in practice — Tab alone is the building block.
        </p>
      </div>

      <SectionBlock title="Tab — States">
        <PreviewBox>
          <Tab label="Default" />
          <Tab label="With count" count={12} />
          <Tab label="Selected" selected />
          <Tab label="Selected + count" count={4} selected />
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="TabGroup">
        <PreviewBox direction="column">
          <TabGroup
            tabs={[
              { label: "Open", count: 14 },
              { label: "Fixed" },
              { label: "Ignored", count: 3 },
            ]}
          />
          <TabGroup
            tabs={[
              { label: "All findings" },
              { label: "Critical", count: 2 },
              { label: "High", count: 8 },
              { label: "Medium", count: 21 },
            ]}
            defaultSelected={1}
          />
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="Tokens">
        <TokenTable rows={[
          { property: "default text",    token: "--text-secondary",  value: "var(--neutral-400)" },
          { property: "selected text",   token: "--text-brand",      value: "var(--purple-500)" },
          { property: "default badge bg", token: "--surface-tertiary", value: "var(--neutral-200)" },
          { property: "selected badge bg", token: "--brand-primary",  value: "var(--purple-500)" },
          { property: "indicator bar",   token: "--brand-primary",   value: "var(--purple-500)" },
          { property: "padding",         token: "--space-sm",        value: "8px" },
          { property: "gap",             token: "--space-sm",        value: "8px" },
          { property: "font size",       token: "--font-size-base",  value: "14px" },
          { property: "badge font size", token: "--font-size-sm",    value: "12px" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Usage">
        <CodeBlock code={`import { TabGroup } from "./components/molecules";

<TabGroup
  tabs={[
    { label: "Open",    count: 14 },
    { label: "Fixed" },
    { label: "Ignored", count: 3 },
  ]}
  defaultSelected={0}
  onChange={(index) => console.log("active tab:", index)}
/>`} />
      </SectionBlock>
    </SplitPage>
  );
}
