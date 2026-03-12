import type { ComponentType, SVGProps } from "react";
import { SplitPage } from "../ui/SplitPage";
import { IconWrapper } from "../../../components/atoms/IconWrapper";

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

const ICON_DESCRIPTIONS: Record<string, string> = {
  // Use cases
  IconAdd:                           "Add or create a new item",
  IconAddFile:                       "Add a new file",
  IconAgentCapabilities:             "View or configure AI agent capabilities",
  IconAskAi:                         "Open the AI assistant or chat",
  IconBack:                          "Go back to the previous screen",
  IconCollapseExpandArtifactToLeft:  "Collapse the artifact panel to the left",
  IconCollapseExpandArtifactToRight: "Expand the artifact panel to the right",
  IconCopy:                          "Copy content to clipboard",
  IconDashboard:                     "Go to the dashboard view",
  IconDelete:                        "Delete or remove an item",
  IconDislike:                       "Negative feedback",
  IconDownload:                      "Download a file or export data",
  IconEdit:                          "Edit or modify an item",
  IconExcelDocument:                 "Export to Excel spreadsheet",
  IconExpandView:                    "Expand to full view",
  IconExternalLink:                  "Open in a new tab or external page",
  IconFilter:                        "Filter a list or table",
  IconGallery:                       "Switch to gallery or grid view",
  IconHamburger:                     "Open the navigation menu",
  IconIgnore:                        "Ignore or suppress a finding",
  IconInformation:                   "Show more information or a tooltip",
  IconLike:                          "Positive feedback",
  IconNewChat:                       "Start a new AI chat session",
  IconPr:                            "Link to a pull request",
  IconRerun:                         "Re-run a scan or process",
  IconSavedView:                     "Access a saved filter view",
  IconSearch:                        "Search or find something",
  IconSend:                          "Send a message",
  IconShare:                         "Share a link or resource",
  IconStop:                          "Stop a running process",
  IconTicket:                        "Link to a ticket (Jira, Linear, etc.)",
  IconUnIgnore:                      "Restore a previously ignored finding",
  IconWarning:                       "Alert or warning state",
  IconWebSearch:                     "Search the web",
  IconX:                             "Close or dismiss",
  // Chevrons
  IconChevronDown:                   "Expand downward or open a dropdown",
  IconChevronUp:                     "Collapse upward or close a panel",
  IconChevronLeft:                   "Navigate left or go back",
  IconChevronRight:                  "Navigate right or go forward",
  // Sorting
  IconSortDefault:                   "Column is unsorted (default state)",
  IconSortAscending:                 "Sorted A to Z or low to high",
  IconSortDescending:                "Sorted Z to A or high to low",
  // Dropdown
  IconDropdownIndicator:             "Indicates this field opens a dropdown list",
  // Finding types
  IconCloudSecurity:                 "Cloud security finding type",
  IconContainerSecurity:             "Container security finding type",
  IconDAST:                          "Dynamic Application Security Testing",
  IconGitSecurity:                   "Git repository security finding type",
  IconIaCSecurity:                   "Infrastructure as Code security",
  IconLicenseCheck:                  "License compliance finding type",
  IconSAST:                          "Static Application Security Testing",
  IconSCA:                           "Software Composition Analysis",
  IconSecretDetection:               "Secret or credential leak detection",
  // Sidebar
  IconAIWorkspace:                   "AI Workspace section in the sidebar",
  IconFindings:                      "Findings section in the sidebar",
  IconMyEnvironment:                 "My Environment section in the sidebar",
  // Resources
  IconApi:                           "API resource type",
  IconGenericApp:                    "Generic application resource type",
  IconWeb:                           "Web application resource type",
};

function iconNameToLabel(name: string): string {
  const stripped = name.replace(/^(Icon|Logo)/, "");
  return stripped.replace(/([A-Z])/g, " $1").trim();
}

function getDescription(name: string): string {
  return ICON_DESCRIPTIONS[name] ?? iconNameToLabel(name);
}

function IconTable({ icons }: { icons: IconNamespace }) {
  const entries = Object.entries(icons).filter(([, v]) => typeof v === "function");
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
      <thead>
        <tr style={{ borderBottom: "1px solid #E4E4E7" }}>
          {["Icon", "Name", "Description"].map((h) => (
            <th
              key={h}
              style={{
                textAlign: "left",
                padding: "8px 12px",
                color: "#71717A",
                fontWeight: 500,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {entries.map(([name, Icon], i) => (
          <tr
            key={name}
            style={{
              borderBottom: "1px solid #F4F4F5",
              backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAFAFA",
            }}
          >
            <td style={{ padding: "10px 12px", width: "60px" }}>
              <IconWrapper
                icon={Icon as ComponentType<SVGProps<SVGSVGElement>>}
                size="lg"
                width={40}
                height={40}
                style={{ color: "#18181B", display: "block" }}
              />
            </td>
            <td style={{ padding: "10px 12px" }}>
              <code
                style={{
                  backgroundColor: "#F4F4F5",
                  color: "#18181B",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontFamily: "monospace",
                }}
              >
                {name}
              </code>
            </td>
            <td style={{ padding: "10px 12px", color: "#52525B" }}>
              {getDescription(name)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function IconCategorySection({ categoryId }: { categoryId: string }) {
  const cat = CATEGORIES[categoryId];
  if (!cat) return null;

  return (
    <SplitPage files={CATEGORY_SOURCES[categoryId] ?? []}>
      <div style={{ marginBottom: "32px" }}>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#71717A",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontFamily: "'Open Sans', system-ui, sans-serif",
          }}
        >
          🔷 Icons
        </span>
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
        <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#A1A1AA", lineHeight: "1.5" }}>
          All icons are React SVG components. They use{" "}
          <code style={{ backgroundColor: "#F4F4F5", padding: "1px 4px", borderRadius: "3px", fontSize: "11px" }}>currentColor</code>
          {" "}and should always be rendered through{" "}
          <code style={{ backgroundColor: "#F4F4F5", padding: "1px 4px", borderRadius: "3px", fontSize: "11px" }}>IconWrapper</code>.
        </p>
        <p
          style={{
            margin: "0 0 32px",
            fontSize: "15px",
            color: "#52525B",
            lineHeight: "1.6",
            maxWidth: "600px",
          }}
        >
          {CATEGORY_DESCRIPTIONS[categoryId]}
        </p>
      </div>

      <IconTable icons={cat.icons} />
    </SplitPage>
  );
}
