import type { ComponentType, SVGProps } from "react";
import { IconWrapper } from "../../../components/atoms/IconWrapper";
import { CodeBlock } from "../ui/CodeBlock";
import { SectionBlock } from "../ui/SectionBlock";
import { TokenTable } from "../ui/TokenTable";

import * as UsecaseIcons   from "../../../components/icons/usecases/index";
import * as ChevronIcons   from "../../../components/icons/chevrons/index";
import * as SortingIcons   from "../../../components/icons/sorting/index";
import * as DropdownIcons  from "../../../components/icons/dropdown/index";
import * as FindingIcons   from "../../../components/icons/finding_type/index";
import * as SidebarIcons   from "../../../components/icons/sidebar/index";
import * as ResourceIcons  from "../../../components/icons/resources_internal/index";
import * as BrandIcons     from "../../../components/icons/brand/index";

type IconNamespace = Record<string, unknown>;

function IconGrid({ icons, label }: { icons: IconNamespace; label: string }) {
  const entries = Object.entries(icons).filter(([, v]) => typeof v === "function");
  return (
    <div style={{ marginBottom: "32px" }}>
      <p style={{ margin: "0 0 12px", fontSize: "11px", fontWeight: 600, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>{label}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {entries.map(([name, Icon]) => (
          <div
            key={name}
            title={name}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", padding: "12px", backgroundColor: "#FFFFFF", border: "1px solid #E4E4E7", borderRadius: "6px", width: "80px" }}
          >
            <IconWrapper
              as={Icon as ComponentType<SVGProps<SVGSVGElement>>}
              size="md"
              style={{ color: "#18181B" }}
            />
            <span style={{ fontSize: "9px", color: "#A1A1AA", textAlign: "center", wordBreak: "break-all", lineHeight: "1.3", fontFamily: "monospace" }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function IconsSection() {
  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Foundation</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Icons</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          All icons are React SVG components. Use <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>IconWrapper</code> to render
          them at a standard size. Icons use <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>currentColor</code> so they
          inherit color from their parent automatically.
        </p>
      </div>

      <SectionBlock title="Usage">
        <CodeBlock code={`import { IconAdd } from "./components/icons/usecases";
import { IconWrapper } from "./components/atoms/IconWrapper";

<IconWrapper as={IconAdd} size="md" style={{ color: "var(--text-primary)" }} />`} />
      </SectionBlock>

      <SectionBlock title="Size Scale">
        <TokenTable rows={[
          { property: "xs", token: "—", value: "12px", note: "Inline with very small text" },
          { property: "sm", token: "—", value: "16px", note: "Inline with label/body text" },
          { property: "md", token: "—", value: "20px", note: "Default — most UI contexts" },
          { property: "lg", token: "—", value: "24px", note: "Standalone or large contexts" },
        ]} />
      </SectionBlock>

      <SectionBlock title="All Icons">
        <IconGrid icons={UsecaseIcons}  label="Usecases" />
        <IconGrid icons={ChevronIcons}  label="Chevrons" />
        <IconGrid icons={SortingIcons}  label="Sorting" />
        <IconGrid icons={DropdownIcons} label="Dropdown" />
        <IconGrid icons={FindingIcons}  label="Finding Types" />
        <IconGrid icons={SidebarIcons}  label="Sidebar" />
        <IconGrid icons={ResourceIcons} label="Resources" />
        <IconGrid icons={BrandIcons}    label="Brand Logos" />
      </SectionBlock>
    </div>
  );
}
