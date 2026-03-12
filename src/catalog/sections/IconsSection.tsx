import type { ComponentType, SVGProps } from "react";
import { IconWrapper } from "../../../components/atoms/IconWrapper";
import { SectionBlock } from "../ui/SectionBlock";
import { TokenTable } from "../ui/TokenTable";
import { SplitPage } from "../ui/SplitPage";

const rawUsecases  = import.meta.glob("../../../components/icons/usecases/*.tsx",           { eager: true, as: "raw" }) as Record<string, string>;
const rawChevrons  = import.meta.glob("../../../components/icons/chevrons/*.tsx",            { eager: true, as: "raw" }) as Record<string, string>;
const rawSorting   = import.meta.glob("../../../components/icons/sorting/*.tsx",             { eager: true, as: "raw" }) as Record<string, string>;
const rawDropdown  = import.meta.glob("../../../components/icons/dropdown/*.tsx",            { eager: true, as: "raw" }) as Record<string, string>;
const rawFinding   = import.meta.glob("../../../components/icons/finding_type/*.tsx",        { eager: true, as: "raw" }) as Record<string, string>;
const rawSidebar   = import.meta.glob("../../../components/icons/sidebar/*.tsx",             { eager: true, as: "raw" }) as Record<string, string>;
const rawResources = import.meta.glob("../../../components/icons/resources_internal/*.tsx",  { eager: true, as: "raw" }) as Record<string, string>;
const rawBrand     = import.meta.glob("../../../components/icons/brand/*.tsx",               { eager: true, as: "raw" }) as Record<string, string>;

function toSources(raw: Record<string, string>) {
  return Object.entries(raw)
    .map(([path, code]) => ({ filename: path.split("/").pop() ?? path, code }))
    .sort((a, b) => a.filename.localeCompare(b.filename));
}

const sources = [
  ...toSources(rawUsecases),
  ...toSources(rawChevrons),
  ...toSources(rawSorting),
  ...toSources(rawDropdown),
  ...toSources(rawFinding),
  ...toSources(rawSidebar),
  ...toSources(rawResources),
  ...toSources(rawBrand),
];

import * as UsecaseIcons  from "../../../components/icons/usecases/index";
import * as ChevronIcons  from "../../../components/icons/chevrons/index";
import * as SortingIcons  from "../../../components/icons/sorting/index";
import * as DropdownIcons from "../../../components/icons/dropdown/index";
import * as FindingIcons  from "../../../components/icons/finding_type/index";
import * as SidebarIcons  from "../../../components/icons/sidebar/index";
import * as ResourceIcons from "../../../components/icons/resources_internal/index";
import * as BrandIcons    from "../../../components/icons/brand/index";

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
              icon={Icon as ComponentType<SVGProps<SVGSVGElement>>}
              size="lg"
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
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>🔷 Icons</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Icons</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          All icons are React SVG components drawn on a 24x24 grid. They use{" "}
          <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>currentColor</code>{" "}
          so they inherit color from their parent automatically. Always render them through{" "}
          <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>IconWrapper</code>{" "}
          - never use the SVG component directly.
        </p>
      </div>

      <SectionBlock title="Size Scale">
        <TokenTable rows={[
          { property: "xs", token: "—", value: "12px", note: "Inline with very small text" },
          { property: "sm", token: "—", value: "16px", note: "Inline with label or body text" },
          { property: "md", token: "—", value: "20px", note: "Default in most UI contexts" },
          { property: "lg", token: "—", value: "24px", note: "Standalone or large contexts" },
        ]} />
      </SectionBlock>

      <SectionBlock title="All Icons">
        <IconGrid icons={UsecaseIcons}  label="Use Cases" />
        <IconGrid icons={ChevronIcons}  label="Chevrons" />
        <IconGrid icons={SortingIcons}  label="Sorting" />
        <IconGrid icons={DropdownIcons} label="Dropdown" />
        <IconGrid icons={FindingIcons}  label="Finding Types" />
        <IconGrid icons={SidebarIcons}  label="Sidebar" />
        <IconGrid icons={ResourceIcons} label="Resources" />
        <IconGrid icons={BrandIcons}    label="Brand Logos" />
      </SectionBlock>
    </SplitPage>
  );
}
