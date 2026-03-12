import type React from "react";
import { useState } from "react";
import { LogoJit } from "../../components/icons/brand/LogoJit";

// Every page that can be shown in the catalog
export type SectionId =
  // Foundation
  | "colors" | "typography" | "spacing" | "radius"
  // Icons — one page per category
  | "icons-usecases" | "icons-chevrons" | "icons-sorting" | "icons-dropdown"
  | "icons-finding-type" | "icons-sidebar" | "icons-resources" | "icons-brand"
  // Badges (sub-group of Atoms)
  | "badge-status" | "badge-severity" | "badge-priority"
  // Atoms
  | "button" | "divider" | "icon-wrapper" | "link" | "tooltip"
  // Fields (sub-group of Atoms)
  | "fields-text" | "fields-select" | "fields-search"
  // Molecules
  | "tab";

// A flat link item
type NavItem = { kind: "item"; id: SectionId; label: string };

// A sub-group header with its own nested items (e.g. Fields inside Atoms)
type NavBranch = { kind: "branch"; label: string; children: NavItem[] };

// A top-level section (Foundation, Icons, Atoms, Molecules)
type NavGroup = {
  label: string;
  emoji: string;
  items: (NavItem | NavBranch)[];
};

const NAV: NavGroup[] = [
  {
    label: "Foundation",
    emoji: "🪨",
    items: [
      { kind: "item", id: "colors",     label: "Colors" },
      { kind: "item", id: "typography", label: "Typography" },
      { kind: "item", id: "spacing",    label: "Spacing" },
      { kind: "item", id: "radius",     label: "Radius" },
    ],
  },
  {
    label: "Icons",
    emoji: "🔷",
    items: [
      { kind: "item", id: "icons-usecases",    label: "Use Cases" },
      { kind: "item", id: "icons-chevrons",    label: "Chevrons" },
      { kind: "item", id: "icons-sorting",     label: "Sorting" },
      { kind: "item", id: "icons-dropdown",    label: "Dropdown" },
      { kind: "item", id: "icons-finding-type",label: "Finding Types" },
      { kind: "item", id: "icons-sidebar",     label: "Sidebar" },
      { kind: "item", id: "icons-resources",   label: "Resources" },
      { kind: "item", id: "icons-brand",       label: "Brand" },
    ],
  },
  {
    label: "Atoms",
    emoji: "⚛️",
    items: [
      {
        kind: "branch",
        label: "Badges",
        children: [
          { kind: "item", id: "badge-status",   label: "BadgeStatus" },
          { kind: "item", id: "badge-severity", label: "BadgeSeverity" },
          { kind: "item", id: "badge-priority", label: "BadgePriority" },
        ],
      },
      { kind: "item", id: "button",       label: "Button" },
      { kind: "item", id: "divider",      label: "Divider" },
      {
        kind: "branch",
        label: "Fields",
        children: [
          { kind: "item", id: "fields-text",   label: "TextInput" },
          { kind: "item", id: "fields-select", label: "SelectInput" },
          { kind: "item", id: "fields-search", label: "SearchInput" },
        ],
      },
      { kind: "item", id: "icon-wrapper", label: "Icon" },
      { kind: "item", id: "link",         label: "Link" },
      { kind: "item", id: "tooltip",      label: "Tooltip" },
    ],
  },
  {
    label: "Molecules",
    emoji: "🧬",
    items: [
      { kind: "item", id: "tab", label: "Tab / TabGroup" },
    ],
  },
];

type SidebarProps = {
  active: SectionId;
  onSelect: (id: SectionId) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

const LINK_STYLE = (isActive: boolean): React.CSSProperties => ({
  display: "block",
  width: "100%",
  padding: "9px 20px",
  background: isActive ? "#27272A" : "transparent",
  border: "none",
  borderLeft: isActive ? "2px solid #FAFAFA" : "2px solid transparent",
  color: isActive ? "#FAFAFA" : "#C4C4C7",
  fontSize: "13px",
  textAlign: "left",
  cursor: "pointer",
  fontFamily: "'Open Sans', system-ui, sans-serif",
  fontWeight: isActive ? 500 : 400,
});

const CHILD_LINK_STYLE = (isActive: boolean): React.CSSProperties => ({
  ...LINK_STYLE(isActive),
  paddingLeft: "32px",
  fontSize: "12px",
});

function Chevron({ open }: { open: boolean }) {
  return (
    <span style={{
      display: "inline-block",
      marginLeft: "auto",
      fontSize: "12px",
      color: "#A1A1AA",
      transform: open ? "rotate(90deg)" : "rotate(0deg)",
      transition: "transform 0.15s",
      lineHeight: 1,
    }}>
      ›
    </span>
  );
}

export function Sidebar({ active, onSelect, theme, onToggleTheme }: SidebarProps) {
  // All groups open by default
  const [openGroups, setOpenGroups]   = useState<Record<string, boolean>>(() =>
    Object.fromEntries(NAV.map(g => [g.label, true]))
  );
  // All branches open by default
  const [openBranches, setOpenBranches] = useState<Record<string, boolean>>({ Badges: true, Fields: true });

  function toggleGroup(label: string) {
    setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }));
  }

  function toggleBranch(label: string) {
    setOpenBranches(prev => ({ ...prev, [label]: !prev[label] }));
  }

  return (
    <aside style={{ width: "220px", flexShrink: 0, height: "100vh", backgroundColor: "#111111", overflowY: "hidden", display: "flex", flexDirection: "column", padding: "24px 0" }}>
      {/* Header */}
      <div style={{ padding: "0 20px 28px", borderBottom: "1px solid #27272A" }}>
        <LogoJit
          variant="mono"
          style={{ width: "36px", height: "auto", color: "var(--jit-primary)", display: "block", marginBottom: "16px" }}
        />
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

              {/* Group header — clickable, toggles expand/collapse */}
              <button
                onClick={() => toggleGroup(group.label)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  padding: "12px 20px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  marginBottom: "2px",
                }}
              >
                <span style={{ marginRight: "8px", fontSize: "14px", lineHeight: 1 }}>{group.emoji}</span>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#D4D4D8", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
                  {group.label}
                </span>
                <Chevron open={isOpen} />
              </button>

              {/* Group items — only shown when group is open */}
              {isOpen && group.items.map((entry) => {
                if (entry.kind === "item") {
                  return (
                    <button key={entry.id} onClick={() => onSelect(entry.id)} style={LINK_STYLE(entry.id === active)}>
                      {entry.label}
                    </button>
                  );
                }

                // NavBranch — collapsible sub-group
                const branchOpen   = openBranches[entry.label] ?? true;
                const branchActive = entry.children.some(c => c.id === active);
                return (
                  <div key={entry.label}>
                    <button
                      onClick={() => toggleBranch(entry.label)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        padding: "9px 20px",
                        background: "transparent",
                        border: "none",
                        borderLeft: "2px solid transparent",
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontSize: "12px", color: branchActive ? "#D4D4D8" : "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif", letterSpacing: "0.02em" }}>
                        {entry.label}
                      </span>
                      <Chevron open={branchOpen} />
                    </button>
                    {branchOpen && entry.children.map((child) => (
                      <button key={child.id} onClick={() => onSelect(child.id)} style={CHILD_LINK_STYLE(child.id === active)}>
                        {child.label}
                      </button>
                    ))}
                  </div>
                );
              })}

              {/* Spacing between groups */}
              <div style={{ height: "16px" }} />
            </div>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid #27272A" }}>
        <div style={{ fontSize: "10px", fontWeight: 700, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'Open Sans', system-ui, sans-serif", marginBottom: "8px" }}>
          Theme
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {(["light", "dark"] as const).map((t) => (
            <button
              key={t}
              onClick={onToggleTheme}
              style={{
                flex: 1,
                padding: "6px 0",
                fontSize: "12px",
                fontFamily: "'Open Sans', system-ui, sans-serif",
                cursor: "pointer",
                border: "none",
                borderRadius: "4px",
                background: theme === t ? "#FAFAFA" : "#27272A",
                color: theme === t ? "#09090B" : "#71717A",
                fontWeight: theme === t ? 600 : 400,
              }}
            >
              {t === "light" ? "☀ Light" : "☾ Dark"}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
