import type React from "react";
import { useState, useRef } from "react";
import { LogoJit } from "../../components/icons/brand/LogoJit";

export type SectionId =
  // Styles
  | "globals-css" | "colors" | "spacing" | "radius" | "typography"
  // Foundation
  | "text" | "divider"
  // Icons
  | "icons-usecases" | "icons-chevrons" | "icons-sorting" | "icons-dropdown"
  | "icons-finding-type" | "icons-sidebar" | "icons-resources" | "icons-brand"
  | "icon-wrapper"
  // Illustrations
  | "illustrations"
  // Interactions
  | "button" | "fields-radio" | "toggle" | "fields-checkbox"
  // Fields
  | "fields-text" | "fields-select" | "fields-search"
  | "textarea" | "chat-field" | "form-field"
  // Badges
  | "badge-status" | "badge-severity" | "badge-priority" | "resource-item"
  // Tables
  | "table" | "table-header-cell" | "pagination"
  // Visualization
  | "findings-breakdown" | "priority-gauge" | "spinner" | "skeleton" | "empty-state"
  // Overlays
  | "modal" | "dropdown-menu" | "tooltip" | "alert" | "toast"
  // Navigation
  | "tab"
  // Card
  | "card"
  // Pages
  | "page-findings";

type NavItem  = { id: SectionId; label: string };
type NavGroup = { label: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    label: "Styles",
    items: [
      { id: "globals-css", label: "Globals" },
      { id: "colors",      label: "Colors" },
      { id: "typography",  label: "Typography" },
      { id: "spacing",     label: "Spacing" },
      { id: "radius",      label: "Radius" },
    ],
  },
  {
    label: "Foundation",
    items: [
      { id: "text",    label: "Text" },
      { id: "divider", label: "Divider" },
    ],
  },
  {
    label: "Icons",
    items: [
      { id: "icons-usecases",     label: "Use Cases" },
      { id: "icons-chevrons",     label: "Chevrons" },
      { id: "icons-sorting",      label: "Sorting" },
      { id: "icons-dropdown",     label: "Dropdown" },
      { id: "icons-finding-type", label: "Finding Types" },
      { id: "icons-sidebar",      label: "Sidebar" },
      { id: "icons-resources",    label: "Resources" },
      { id: "icons-brand",        label: "Brand" },
      { id: "icon-wrapper",       label: "Icon Wrapper" },
    ],
  },
  {
    label: "Illustrations",
    items: [
      { id: "illustrations", label: "Illustrations" },
    ],
  },
  {
    label: "Interactions",
    items: [
      { id: "button",          label: "Button" },
      { id: "fields-radio",    label: "Radio" },
      { id: "toggle",          label: "Toggle" },
      { id: "fields-checkbox", label: "Checkbox" },
    ],
  },
  {
    label: "Fields",
    items: [
      { id: "fields-text",   label: "Text Input" },
      { id: "fields-select", label: "Select" },
      { id: "fields-search", label: "Search" },
      { id: "textarea",      label: "Textarea" },
      { id: "chat-field",    label: "Chat Field" },
      { id: "form-field",    label: "Form Field" },
    ],
  },
  {
    label: "Badges",
    items: [
      { id: "badge-status",   label: "Badge Status" },
      { id: "badge-severity", label: "Badge Severity" },
      { id: "badge-priority", label: "Badge Priority" },
      { id: "resource-item",  label: "Resource Item" },
    ],
  },
  {
    label: "Tables",
    items: [
      { id: "table",             label: "Table" },
      { id: "table-header-cell", label: "Table Header Cell" },
      { id: "pagination",        label: "Pagination" },
    ],
  },
  {
    label: "Visualization",
    items: [
      { id: "findings-breakdown", label: "Findings Breakdown" },
      { id: "priority-gauge",     label: "Priority Gauge" },
      { id: "spinner",            label: "Spinner" },
      { id: "skeleton",           label: "Skeleton" },
      { id: "empty-state",        label: "Empty State" },
    ],
  },
  {
    label: "Overlays",
    items: [
      { id: "modal",         label: "Modal" },
      { id: "dropdown-menu", label: "Dropdown Menu" },
      { id: "tooltip",       label: "Tooltip" },
      { id: "alert",         label: "Alert" },
      { id: "toast",         label: "Toast" },
    ],
  },
  {
    label: "Navigation",
    items: [
      { id: "tab", label: "Tabs" },
    ],
  },
  {
    label: "Card",
    items: [
      { id: "card", label: "Card" },
    ],
  },
  {
    label: "Pages",
    items: [
      { id: "page-findings", label: "Findings" },
    ],
  },
];

type SidebarProps = {
  active: SectionId;
  onSelect: (id: SectionId) => void;
};

function itemStyle(isActive: boolean, isHovered: boolean): React.CSSProperties {
  return {
    display: "block",
    width: "calc(100% - 16px)",
    margin: "0 8px",
    padding: "7px 12px",
    background: isActive ? "#F4F4F5" : isHovered ? "#F8F8F8" : "transparent",
    border: "none",
    borderRadius: "6px",
    color: isActive ? "#09090B" : isHovered ? "#3F3F46" : "#52525B",
    fontSize: "13px",
    textAlign: "left",
    cursor: "pointer",
    fontFamily: "'Open Sans', system-ui, sans-serif",
    fontWeight: isActive ? 600 : 400,
    transition: "background 0.1s, color 0.1s",
    letterSpacing: "0.01em",
  };
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10" height="10" viewBox="0 0 10 10" fill="none"
      style={{ flexShrink: 0, transform: open ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.15s ease" }}
    >
      <path d="M2 3.5L5 6.5L8 3.5" stroke="#A1A1AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const WORKSPACES = [
  { id: "design-system",  label: "Design System",  available: true  },
  { id: "decisions-hub",  label: "Decisions Hub",  available: false },
  { id: "playground",     label: "Playground",     available: false },
  { id: "dev-handoffs",   label: "Dev Handoffs",   available: false },
];

export function Sidebar({ active, onSelect }: SidebarProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(NAV.map(g => g.label))
  );
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const workspaceTimer = useRef<ReturnType<typeof setTimeout>>();

  function toggleGroup(label: string) {
    setOpenGroups(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  const allOpen = NAV.every(g => openGroups.has(g.label));
  function toggleAll() {
    if (allOpen) setOpenGroups(new Set());
    else setOpenGroups(new Set(NAV.map(g => g.label)));
  }

  const trimmed = query.trim().toLowerCase();
  const filteredNav = trimmed
    ? NAV.map(group => ({
        ...group,
        items: group.items.filter(item =>
          item.label.toLowerCase().includes(trimmed)
        ),
      })).filter(group => group.items.length > 0)
    : NAV;

  return (
    <aside style={{
      position: "fixed", left: "12px", top: "12px",
      width: "220px", height: "calc(100vh - 24px)", zIndex: 100,
      backgroundColor: "#FFFFFF",
      border: "1px solid #E4E4E7",
      borderRadius: "16px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
      display: "flex", flexDirection: "column",
    }}>

      {/* Header */}
      <div style={{ padding: "14px 14px 12px", flexShrink: 0 }}>

        {/* Tenant row: avatar + workspace dropdown */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

          {/* Jit tenant avatar */}
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
            backgroundColor: "#FFFFFF",
            border: "1.5px solid #E4E4E7",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}>
            <LogoJit variant="mono" style={{ width: "20px", height: "auto", color: "var(--jit-primary)", display: "block" }} />
          </div>

          {/* Workspace dropdown trigger */}
          <div style={{ flex: 1, position: "relative" }}>
            <button
              onClick={() => setWorkspaceOpen(o => !o)}
              onBlur={() => { workspaceTimer.current = setTimeout(() => setWorkspaceOpen(false), 150); }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", background: "none", border: "none", cursor: "pointer",
                padding: "3px 6px", borderRadius: "6px",
                transition: "background 0.1s",
                backgroundColor: workspaceOpen ? "#F4F4F5" : "transparent",
              }}
              onMouseEnter={e => { if (!workspaceOpen) e.currentTarget.style.backgroundColor = "#F4F4F5"; }}
              onMouseLeave={e => { if (!workspaceOpen) e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#18181B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
                Design System
              </span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                style={{ flexShrink: 0, transform: workspaceOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s", color: "#A1A1AA" }}>
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Workspace dropdown panel */}
            {workspaceOpen && (
              <div
                onMouseDown={e => e.preventDefault()}
                style={{
                  position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
                  backgroundColor: "#FFFFFF", border: "1px solid #E4E4E7", borderRadius: "10px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
                  padding: "4px", zIndex: 200,
                }}
              >
                {WORKSPACES.map(ws => (
                  <div
                    key={ws.id}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "7px 10px", borderRadius: "6px",
                      backgroundColor: ws.id === "design-system" ? "#F4F4F5" : "transparent",
                      cursor: ws.available ? "pointer" : "default",
                      opacity: ws.available ? 1 : 0.45,
                    }}
                  >
                    <span style={{ fontSize: "12px", fontWeight: ws.id === "design-system" ? 600 : 400, color: "#18181B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
                      {ws.label}
                    </span>
                    {ws.id === "design-system" && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5L3.8 7.5L8.5 2.5" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {!ws.available && (
                      <span style={{ fontSize: "9px", fontWeight: 600, color: "#A1A1AA", fontFamily: "'Open Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>Soon</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "0 12px 6px", flexShrink: 0 }}>
        <div style={{ position: "relative" }}>
          <svg
            width="13" height="13" viewBox="0 0 13 13" fill="none"
            style={{ position: "absolute", left: "9px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#A1A1AA" }}
          >
            <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.4" />
            <path d="M9 9L11.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "6px 10px 6px 28px",
              fontSize: "12px",
              fontFamily: "'Open Sans', system-ui, sans-serif",
              color: "#18181B",
              backgroundColor: "#F4F4F5",
              border: "1px solid transparent",
              borderRadius: "7px",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.1s",
            }}
            onFocus={e => { e.currentTarget.style.borderColor = "#D4D4D8"; e.currentTarget.style.backgroundColor = "#FFFFFF"; }}
            onBlur={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.backgroundColor = "#F4F4F5"; }}
          />
        </div>
      </div>

      {/* Collapse / Expand all icon button */}
      {!trimmed && (
        <div style={{ padding: "2px 16px 6px", flexShrink: 0, display: "flex", justifyContent: "flex-start" }}>
          <button
            onClick={toggleAll}
            title={allOpen ? "Collapse all" : "Expand all"}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "4px 5px", borderRadius: "5px",
              color: "#C4C4C8", transition: "color 0.1s, background 0.1s",
              display: "flex", alignItems: "center",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#71717A"; e.currentTarget.style.background = "#F4F4F5"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#C4C4C8"; e.currentTarget.style.background = "none"; }}
          >
            {allOpen ? (
              // Collapse all: two chevrons pointing up (fold everything)
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 8.5L7 4.5L11 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 12L11 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              // Expand all: two chevrons pointing down (unfold everything)
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 2L11 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3 5.5L7 9.5L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "4px 0 16px" }}>
        {filteredNav.map((group, gi) => {
          const isOpen = trimmed ? true : openGroups.has(group.label);
          return (
            <div key={group.label} style={{ marginBottom: gi < filteredNav.length - 1 ? "2px" : 0 }}>

              {/* Section label — clickable to toggle */}
              <button
                onClick={() => toggleGroup(group.label)}
                onMouseEnter={() => setHoveredGroup(group.label)}
                onMouseLeave={() => setHoveredGroup(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "8px 20px 4px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: hoveredGroup === group.label ? "#71717A" : "#A1A1AA",
                  fontFamily: "'Open Sans', system-ui, sans-serif",
                  transition: "color 0.1s",
                }}
              >
                <span style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}>
                  {group.label}
                </span>
                <Chevron open={isOpen} />
              </button>

              {/* Items — shown only when group is open */}
              {isOpen && group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={itemStyle(item.id === active, hovered === item.id && item.id !== active)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          );
        })}
      </nav>

    </aside>
  );
}
