import { Breadcrumb } from "../../../components/atoms/Breadcrumb";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import breadcrumbTsx from "../../../components/atoms/Breadcrumb.tsx?raw";
import breadcrumbCss from "../../../components/atoms/Breadcrumb.module.css?raw";

const sources = [
  { filename: "Breadcrumb.tsx",        code: breadcrumbTsx },
  { filename: "Breadcrumb.module.css", code: breadcrumbCss },
];

const DEMO_ITEMS = [
  { label: "Dashboard",   href: "#" },
  { label: "Findings",    href: "#" },
  { label: "CVE-2024-123" },
];

function Playground() {
  return (
    <PlaygroundShell
      preview={<Breadcrumb items={DEMO_ITEMS} />}
      controls={null}
    />
  );
}

export function BreadcrumbSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Navigation</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Breadcrumb</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Shows the user's current location within the page hierarchy. Each step except the last is a link. The last item is the current page and is not clickable.
        </p>
      </div>
      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
      <SectionBlock title="Props">
        <PropsTable source={breadcrumbTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
