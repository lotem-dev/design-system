import { DropdownMenu } from "../../../components/atoms/DropdownMenu";
import { Button } from "../../../components/atoms/Button";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import dropdownTsx from "../../../components/atoms/DropdownMenu.tsx?raw";
import dropdownCss from "../../../components/atoms/DropdownMenu.module.css?raw";

const sources = [
  { filename: "DropdownMenu.tsx",        code: dropdownTsx },
  { filename: "DropdownMenu.module.css", code: dropdownCss },
];

const DEMO_ITEMS = [
  { label: "Edit",        onClick: () => alert("Edit") },
  { label: "Duplicate",   onClick: () => alert("Duplicate") },
  { label: "Move to...",  onClick: () => alert("Move"), disabled: true },
  { label: "Delete",      onClick: () => alert("Delete"), destructive: true },
];

function Playground() {
  return (
    <PlaygroundShell
      preview={
        <DropdownMenu
          trigger={<Button variant="ghost">Actions ▾</Button>}
          items={DEMO_ITEMS}
        />
      }
      controls={null}
    />
  );
}

export function DropdownMenuSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Overlay</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Dropdown Menu</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A floating list of actions triggered by clicking any element. Closes automatically when you click outside or select an item. Supports disabled and destructive states.
        </p>
      </div>
      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
      <SectionBlock title="Props">
        <PropsTable source={dropdownTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
