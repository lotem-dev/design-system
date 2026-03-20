import type { ComponentType, SVGProps } from "react";
import { SplitPage } from "../ui/SplitPage";
import { IconWrapper } from "../../../components/layout/IconWrapper";

// Import all icon files per category as raw source strings using Vite's glob import.
// { eager: true } loads them synchronously at build time so no async needed.
// Filtering out index.ts files since those are just re-exports, not useful to show.
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

const CATEGORY_SOURCES: Record<string, { filename: string; code: string }[]> = {
  "icons-usecases":     toSources(rawUsecases),
  "icons-chevrons":     toSources(rawChevrons),
  "icons-sorting":      toSources(rawSorting),
  "icons-dropdown":     toSources(rawDropdown),
  "icons-finding-type": toSources(rawFinding),
  "icons-sidebar":      toSources(rawSidebar),
  "icons-resources":    toSources(rawResources),
  "icons-brand":        toSources(rawBrand),
};

import * as UsecaseIcons  from "../../../components/icons/usecases/index";
import * as ChevronIcons  from "../../../components/icons/chevrons/index";
import * as SortingIcons  from "../../../components/icons/sorting/index";
import * as DropdownIcons from "../../../components/icons/dropdown/index";
import * as FindingIcons  from "../../../components/icons/finding_type/index";
import * as SidebarIcons  from "../../../components/icons/sidebar/index";
import * as ResourceIcons from "../../../components/icons/resources_internal/index";
import * as BrandIcons    from "../../../components/icons/brand/index";

type IconNamespace = Record<string, unknown>;

const CATEGORIES: Record<string, { label: string; icons: IconNamespace }> = {
  "icons-usecases":     { label: "Use Cases",    icons: UsecaseIcons },
  "icons-chevrons":     { label: "Chevrons",      icons: ChevronIcons },
  "icons-sorting":      { label: "Sorting",       icons: SortingIcons },
  "icons-dropdown":     { label: "Dropdown",      icons: DropdownIcons },
  "icons-finding-type": { label: "Finding Types", icons: FindingIcons },
  "icons-sidebar":      { label: "Sidebar",       icons: SidebarIcons },
  "icons-resources":    { label: "Resources",     icons: ResourceIcons },
  "icons-brand":        { label: "Brand",         icons: BrandIcons },
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "icons-usecases":
    "The workhorse icon set. Covers the most common interactive patterns across the Jit UI: adding, deleting, editing, searching, filtering, and more. If a user can take an action, there is likely an icon here for it.",
  "icons-chevrons":
    "Four directional chevrons pointing up, down, left, and right. Used for expand/collapse toggles, navigation breadcrumbs, and any element that implies direction or movement.",
  "icons-sorting":
    "Three icons representing the sort state of a data column: unsorted (default), ascending, and descending. Always used as a set in table column headers - never in isolation.",
  "icons-dropdown":
    "A single chevron-based indicator that signals a field is expandable or selectable. Used inside select inputs, comboboxes, and any trigger that opens a list.",
  "icons-finding-type":
    "Icons representing Jit's security finding categories - SAST, SCA, cloud security, container security, secret detection, and more. Used to visually identify the type of security issue at a glance, without relying on text alone.",
  "icons-sidebar":
    "Navigation icons for the Jit app's main sidebar. Each icon maps to a primary section of the product: Findings, AI Workspace, and My Environment.",
  "icons-resources":
    "Icons representing the internal resource types that Jit monitors - APIs, web applications, and generic apps. Used to show what kind of software asset a security finding belongs to.",
  "icons-brand":
    "Third-party integration logos for AWS, GitHub, Slack, Jira, and every other service Jit connects to. Used in integration settings, connection cards, and anywhere Jit surfaces an external tool.",
};


function IconTh({ children }: { children: React.ReactNode }) {
  return (
    <th style={{
      textAlign: "left",
      padding: "6px 12px 10px",
      fontSize: "11px",
      fontWeight: 600,
      color: "#A1A1AA",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      whiteSpace: "nowrap",
      fontFamily: "'Open Sans', system-ui, sans-serif",
    }}>
      {children}
    </th>
  );
}

function IconTd({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <td style={{ padding: "10px 12px", verticalAlign: "middle", ...style }}>
      {children}
    </td>
  );
}

function IconTable({ icons }: { icons: IconNamespace }) {
  const entries = Object.entries(icons).filter(([, v]) => typeof v === "function");
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "13px",
        fontFamily: "'Open Sans', system-ui, sans-serif",
        tableLayout: "fixed",
      }}>
        <colgroup>
          <col style={{ width: "48px" }} />
          <col />
        </colgroup>
        <thead>
          <tr style={{ borderBottom: "2px solid #E4E4E7" }}>
            <IconTh>Icon</IconTh>
            <IconTh>Name</IconTh>
          </tr>
        </thead>
        <tbody>
          {entries.map(([name, Icon]) => (
            <tr key={name} style={{ borderBottom: "1px solid #F4F4F5" }}>
              <IconTd>
                <IconWrapper
                  icon={Icon as ComponentType<SVGProps<SVGSVGElement>>}
                  size="md"
                  width={20}
                  height={20}
                  style={{ color: "#18181B", display: "block" }}
                />
              </IconTd>
              <IconTd>
                <code style={{
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: "12px",
                  color: "#18181B",
                  backgroundColor: "#F4F4F5",
                  padding: "2px 6px",
                  borderRadius: "4px",
                }}>
                  {name}
                </code>
              </IconTd>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function IconCategorySection({ categoryId }: { categoryId: string }) {
  const cat = CATEGORIES[categoryId];
  if (!cat) return null;

  return (
    <SplitPage files={CATEGORY_SOURCES[categoryId] ?? []} alwaysOpen>
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            margin: "8px 0 12px",
            fontSize: "28px",
            fontWeight: 700,
            color: "#09090B",
            fontFamily: "'Open Sans', system-ui, sans-serif",
          }}
        >
          {cat.label}
        </h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          {CATEGORY_DESCRIPTIONS[categoryId]} All icons are React SVG components that use{" "}
          <code style={{ backgroundColor: "#F4F4F5", padding: "1px 4px", borderRadius: "3px", fontSize: "13px" }}>currentColor</code>
          {" "}and should be rendered through{" "}
          <code style={{ backgroundColor: "#F4F4F5", padding: "1px 4px", borderRadius: "3px", fontSize: "13px" }}>IconWrapper</code>.
        </p>
      </div>

      <IconTable icons={cat.icons} />
    </SplitPage>
  );
}
