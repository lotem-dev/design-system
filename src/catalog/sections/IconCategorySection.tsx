import type { ComponentType, SVGProps } from "react";
import { PageWrapper } from "../ui/PageWrapper";
import { IconWrapper } from "../../../components/atoms/IconWrapper";
import { SectionBlock } from "../ui/SectionBlock";
import { CodeBlock } from "../ui/CodeBlock";

import * as UsecaseIcons   from "../../../components/icons/usecases/index";
import * as ChevronIcons   from "../../../components/icons/chevrons/index";
import * as SortingIcons   from "../../../components/icons/sorting/index";
import * as DropdownIcons  from "../../../components/icons/dropdown/index";
import * as FindingIcons   from "../../../components/icons/finding_type/index";
import * as SidebarIcons   from "../../../components/icons/sidebar/index";
import * as ResourceIcons  from "../../../components/icons/resources_internal/index";
import * as BrandIcons     from "../../../components/icons/brand/index";

type IconNamespace = Record<string, unknown>;

const CATEGORIES: Record<string, { label: string; icons: IconNamespace }> = {
  "icons-usecases":     { label: "Use Cases",     icons: UsecaseIcons },
  "icons-chevrons":     { label: "Chevrons",       icons: ChevronIcons },
  "icons-sorting":      { label: "Sorting",        icons: SortingIcons },
  "icons-dropdown":     { label: "Dropdown",       icons: DropdownIcons },
  "icons-finding-type": { label: "Finding Types",  icons: FindingIcons },
  "icons-sidebar":      { label: "Sidebar",        icons: SidebarIcons },
  "icons-resources":    { label: "Resources",      icons: ResourceIcons },
  "icons-brand":        { label: "Brand",          icons: BrandIcons },
};

function IconGrid({ icons }: { icons: IconNamespace }) {
  const entries = Object.entries(icons).filter(([, v]) => typeof v === "function");
  return (
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
  );
}

export function IconCategorySection({ categoryId }: { categoryId: string }) {
  const cat = CATEGORIES[categoryId];
  if (!cat) return null;

  return (
    <PageWrapper>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Icons</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>{cat.label}</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          All icons are React SVG components that use <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>currentColor</code> — they inherit color from their parent automatically.
          Always render them through <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>IconWrapper</code>.
        </p>
      </div>

      <SectionBlock title={`${cat.label} Icons`}>
        <IconGrid icons={cat.icons} />
      </SectionBlock>

      <SectionBlock title="Usage">
        <CodeBlock code={`import { IconWrapper } from "./components/atoms/IconWrapper";
import { /* IconName */ } from "./components/icons/${categoryId.replace("icons-", "")}";

<IconWrapper as={IconName} size="md" style={{ color: "var(--text-primary)" }} />`} />
      </SectionBlock>
    </PageWrapper>
  );
}
