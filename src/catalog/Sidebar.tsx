import type React from "react";
import { useState } from "react";
import { LogoJit } from "../../components/icons/brand/LogoJit";

export type SectionId =
  | "colors" | "typography" | "spacing" | "radius"
  | "icons-usecases" | "icons-chevrons" | "icons-sorting" | "icons-dropdown"
  | "icons-finding-type" | "icons-sidebar" | "icons-resources" | "icons-brand"
  | "badge-status" | "badge-severity" | "badge-priority"
  | "button" | "divider" | "icon-wrapper" | "link" | "tooltip"
  | "fields-text" | "fields-select" | "fields-search"
  | "fields-checkbox" | "fields-radio"
  | "resource-item" | "findings-breakdown" | "priority-gauge"
  | "table-header-cell" | "chat-field"
  | "tab";

type NavItem   = { kind: "item";   id: SectionId; label: string };
type NavBranch = { kind: "branch"; label: string; children: NavItem[] };
type NavGroup  = { label: string; emoji: string; items: (NavItem | NavBranch)[] };

const NAV: NavGroup[] = [
  {
    label: "Foundation", emoji: "🪨",
    items: [
      { kind: "item", id: "colors",     label: "Colors" },
      { kind: "item", id: "typography", label: "Typography" },
      { kind: "item", id: "spacing",    label: "Spacing" },
      { kind: "item", id: "radius",     label: "Radius" },
    ],
  },
  {
    label: "Icons", emoji: "🔷",
    items: [
      { kind: "item", id: "icons-usecases",     label: "Use Cases" },
      { kind: "item", id: "icons-chevrons",     label: "Chevrons" },
      { kind: "item", id: "icons-sorting",      label: "Sorting" },
      { kind: "item", id: "icons-dropdown",     label: "Dropdown" },
      { kind: "item", id: "icons-finding-type", label: "Finding Types" },
      { kind: "item", id: "icons-sidebar",      label: "Sidebar" },
      { kind: "item", id: "icons-resources",    label: "Resources" },
      { kind: "item", id: "icons-brand",        label: "Brand" },
    ],
  },
  {
    label: "Atoms", emoji: "⚛️",
    items: [
      { kind: "item", id: "icon-wrapper",  label: "IconWrapper" },
      { kind: "item", id: "button",        label: "Button" },
      { kind: "item", id: "link",          label: "Link" },
      { kind: "item", id: "divider",       label: "Divider" },
      { kind: "item", id: "tooltip",       label: "Tooltip" },
      { kind: "item", id: "resource-item",       label: "ResourceItem" },
      { kind: "item", id: "findings-breakdown",  label: "FindingsBreakdown" },
      { kind: "item", id: "priority-gauge",      label: "PriorityGauge" },
      { kind: "item", id: "table-header-cell",   label: "TableHeaderCell" },
      { kind: "item", id: "chat-field",          label: "ChatField" },
      {
        kind: "branch", label: "Badges",
        children: [
          { kind: "item", id: "badge-status",   label: "BadgeStatus" },
          { kind: "item", id: "badge-severity", label: "BadgeSeverity" },
          { kind: "item", id: "badge-priority", label: "BadgePriority" },
        ],
      },
      {
        kind: "branch", label: "Fields",
        children: [
          { kind: "item", id: "fields-text",     label: "TextInput" },
          { kind: "item", id: "fields-select",   label: "SelectInput" },
          { kind: "item", id: "fields-search",   label: "SearchInput" },
          { kind: "item", id: "fields-checkbox", label: "Checkbox" },
          { kind: "item", id: "fields-radio",    label: "Radio" },
        ],
      },
    ],
  },
  {
    label: "Molecules", emoji: "🧬",
    items: [
      { kind: "item", id: "tab", label: "Tab / TabGroup" },
    ],
  },
];

type SidebarProps = {
  active: SectionId;
  onSelect: (id: SectionId) => void;
};

const ITEM_STYLE = (isActive: boolean, isHovered: boolean): React.CSSProperties => ({
  display: "block",
  width: "calc(100% - 16px)",
  margin: "0 8px",
  padding: "8px 12px",
  background: isActive ? "#E4E4E7" : isHovered ? "#F4F4F5" : "transparent",
  border: "none",
  borderRadius: "8px",
  color: isActive ? "#18181B" : isHovered ? "#18181B" : "#52525B",
  fontSize: "13px",
  textAlign: "left",
  cursor: "pointer",
  fontFamily: "'Open Sans', system-ui, sans-serif",
  fontWeight: isActive ? 600 : 400,
  transition: "background 0.12s, color 0.12s",
});

const CHILD_STYLE = (isActive: boolean, isHovered: boolean): React.CSSProperties => ({
  ...ITEM_STYLE(isActive, isHovered),
  paddingLeft: "24px",
  fontSize: "12px",
});

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none"
      style={{ marginLeft: "auto", flexShrink: 0, transition: "transform 0.15s", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
    >
      <path d="M9 18l6-6-6-6" stroke="#C4C4C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Sidebar({ active, onSelect }: SidebarProps) {
  const [openGroups, setOpenGroups]     = useState<Record<string, boolean>>(() => Object.fromEntries(NAV.map(g => [g.label, true])));
  const [openBranches, setOpenBranches] = useState<Record<string, boolean>>({ Badges: true, Fields: true });
  const [hovered, setHovered]           = useState<string | null>(null);

  const h = (id: string) => ({ onMouseEnter: () => setHovered(id), onMouseLeave: () => setHovered(null) });

  return (
    <aside style={{
      position: "fixed", left: "12px", top: "12px",
      width: "220px", height: "calc(100vh - 24px)", zIndex: 100,
      backgroundColor: "#FFFFFF",
      border: "1px solid #E4E4E7",
      borderRadius: "16px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
      display: "flex", flexDirection: "column",
      padding: "24px 0",
    }}>

      {/* Header */}
      <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #F4F4F5" }}>
        <LogoJit variant="mono" style={{ width: "36px", height: "auto", color: "var(--jit-primary)", display: "block", marginBottom: "16px" }} />
        <div style={{ fontSize: "12px", fontWeight: 700, color: "#18181B", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
          Design System
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "16px 0", flex: 1, minHeight: 0, overflowY: "auto" }}>
        {NAV.map((group) => {
          const isOpen = openGroups[group.label] ?? true;
          return (
            <div key={group.label} style={{ marginBottom: "4px" }}>

              {/* Group header */}
              <button
                onClick={() => setOpenGroups(p => ({ ...p, [group.label]: !p[group.label] }))}
                {...h(`g-${group.label}`)}
                style={{
                  display: "flex", alignItems: "center",
                  width: "calc(100% - 16px)", margin: "0 8px 2px", padding: "8px 12px",
                  background: hovered === `g-${group.label}` ? "#F4F4F5" : "transparent",
                  border: "none", borderRadius: "8px", cursor: "pointer",
                  transition: "background 0.12s",
                }}
              >
                <span style={{ marginRight: "8px", fontSize: "14px", lineHeight: 1 }}>{group.emoji}</span>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
                  {group.label}
                </span>
                <Chevron open={isOpen} />
              </button>

              {isOpen && group.items.map((entry) => {
                if (entry.kind === "item") {
                  return (
                    <button key={entry.id} onClick={() => onSelect(entry.id)} {...h(entry.id)}
                      style={ITEM_STYLE(entry.id === active, hovered === entry.id && entry.id !== active)}>
                      {entry.label}
                    </button>
                  );
                }

                const branchOpen   = openBranches[entry.label] ?? true;
                const branchActive = entry.children.some(c => c.id === active);
                return (
                  <div key={entry.label}>
                    <button
                      onClick={() => setOpenBranches(p => ({ ...p, [entry.label]: !p[entry.label] }))}
                      {...h(`b-${entry.label}`)}
                      style={{
                        display: "flex", alignItems: "center",
                        width: "calc(100% - 16px)", margin: "0 8px", padding: "8px 12px",
                        background: hovered === `b-${entry.label}` ? "#F4F4F5" : "transparent",
                        border: "none", borderRadius: "8px",
                        cursor: "pointer", transition: "background 0.12s",
                      }}
                    >
                      <span style={{ fontSize: "12px", color: branchActive ? "#18181B" : "#71717A", fontWeight: branchActive ? 600 : 400, fontFamily: "'Open Sans', system-ui, sans-serif" }}>
                        {entry.label}
                      </span>
                      <Chevron open={branchOpen} />
                    </button>
                    {branchOpen && entry.children.map((child) => (
                      <button key={child.id} onClick={() => onSelect(child.id)} {...h(child.id)}
                        style={CHILD_STYLE(child.id === active, hovered === child.id && child.id !== active)}>
                        {child.label}
                      </button>
                    ))}
                  </div>
                );
              })}

              <div style={{ height: "12px" }} />
            </div>
          );
        })}
      </nav>

    </aside>
  );
}
