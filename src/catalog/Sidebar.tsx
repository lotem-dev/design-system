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
      { kind: "item", id: "icon-wrapper", label: "IconWrapper" },
      { kind: "item", id: "button",       label: "Button" },
      { kind: "item", id: "link",         label: "Link" },
      { kind: "item", id: "divider",      label: "Divider" },
      { kind: "item", id: "tooltip",      label: "Tooltip" },
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
          { kind: "item", id: "fields-text",   label: "TextInput" },
          { kind: "item", id: "fields-select", label: "SelectInput" },
          { kind: "item", id: "fields-search", label: "SearchInput" },
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
  width: "100%",
  padding: "9px 20px",
  background: isActive ? "#27272A" : isHovered ? "rgba(255,255,255,0.06)" : "transparent",
  border: "none",
  borderLeft: isActive ? "2px solid #FAFAFA" : "2px solid transparent",
  color: isActive ? "#FAFAFA" : isHovered ? "#E4E4E7" : "#C4C4C7",
  fontSize: "13px",
  textAlign: "left",
  cursor: "pointer",
  fontFamily: "'Open Sans', system-ui, sans-serif",
  fontWeight: isActive ? 500 : 400,
  transition: "background 0.12s, color 0.12s",
});

const CHILD_STYLE = (isActive: boolean, isHovered: boolean): React.CSSProperties => ({
  ...ITEM_STYLE(isActive, isHovered),
  paddingLeft: "32px",
  fontSize: "12px",
});

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none"
      style={{ marginLeft: "auto", flexShrink: 0, transition: "transform 0.15s", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
    >
      <path d="M9 18l6-6-6-6" stroke="#52525B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
      position: "fixed", left: 0, top: 0,
      width: "220px", height: "100vh", zIndex: 100,
      backgroundColor: "#111111",
      borderRight: "1px solid #27272A",
      display: "flex", flexDirection: "column",
      padding: "24px 0",
    }}>

      {/* Header */}
      <div style={{ padding: "0 20px 28px", borderBottom: "1px solid #27272A" }}>
        <LogoJit variant="mono" style={{ width: "36px", height: "auto", color: "var(--jit-primary)", display: "block", marginBottom: "16px" }} />
        <div style={{ fontSize: "12px", fontWeight: 700, color: "#E4E4E7", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
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
                  width: "100%", padding: "12px 20px",
                  background: hovered === `g-${group.label}` ? "rgba(255,255,255,0.04)" : "transparent",
                  border: "none", cursor: "pointer", marginBottom: "2px",
                  transition: "background 0.12s",
                }}
              >
                <span style={{ marginRight: "8px", fontSize: "14px", lineHeight: 1 }}>{group.emoji}</span>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#D4D4D8", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
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
                        width: "100%", padding: "9px 20px",
                        background: hovered === `b-${entry.label}` ? "rgba(255,255,255,0.06)" : "transparent",
                        border: "none", borderLeft: "2px solid transparent",
                        cursor: "pointer", transition: "background 0.12s",
                      }}
                    >
                      <span style={{ fontSize: "12px", color: branchActive ? "#D4D4D8" : "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
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

              <div style={{ height: "16px" }} />
            </div>
          );
        })}
      </nav>

    </aside>
  );
}
