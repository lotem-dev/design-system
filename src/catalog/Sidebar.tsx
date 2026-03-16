import type React from "react";
import { useState } from "react";
import { LogoJit } from "../../components/icons/brand/LogoJit";

export type SectionId =
  // Styles
  | "globals-css" | "colors" | "spacing" | "radius"
  // Foundation
  | "typography" | "link" | "divider"
  // Icons
  | "icons-usecases" | "icons-chevrons" | "icons-sorting" | "icons-dropdown"
  | "icons-finding-type" | "icons-sidebar" | "icons-resources" | "icons-brand"
  // Illustrations
  | "illustrations"
  // Interactions
  | "button" | "fields-radio" | "toggle" | "fields-checkbox"
  // Fields
  | "fields-text" | "fields-select" | "fields-search"
  | "textarea" | "chat-field" | "form-field"
  // Badges
  | "badge-status" | "badge-severity" | "badge-priority"
  // Tables
  | "table" | "table-header-cell" | "resource-item"
  // Visualization
  | "findings-breakdown" | "priority-gauge" | "progress" | "spinner" | "skeleton" | "empty-state"
  // Overlays
  | "modal" | "dropdown-menu" | "tooltip" | "alert" | "toast"
  // Navigation
  | "tab" | "breadcrumb" | "pagination"
  // Layout
  | "card" | "avatar" | "icon-wrapper";

type NavItem  = { id: SectionId; label: string };
type NavGroup = { label: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    label: "Styles",
    items: [
      { id: "globals-css", label: "globals.css" },
      { id: "colors",      label: "Colors" },
      { id: "spacing",     label: "Spacing" },
      { id: "radius",      label: "Radius" },
    ],
  },
  {
    label: "Foundation",
    items: [
      { id: "typography", label: "Text" },
      { id: "link",       label: "Link" },
      { id: "divider",    label: "Divider" },
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
    ],
  },
  {
    label: "Tables",
    items: [
      { id: "table",             label: "Table" },
      { id: "table-header-cell", label: "Table Header Cell" },
      { id: "resource-item",     label: "Resource Item" },
    ],
  },
  {
    label: "Visualization",
    items: [
      { id: "findings-breakdown", label: "Findings Breakdown" },
      { id: "priority-gauge",     label: "Priority Gauge" },
      { id: "progress",           label: "Progress" },
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
      { id: "tab",        label: "Tabs" },
      { id: "breadcrumb", label: "Breadcrumb" },
      { id: "pagination", label: "Pagination" },
    ],
  },
  {
    label: "Layout",
    items: [
      { id: "card",         label: "Card" },
      { id: "avatar",       label: "Avatar" },
      { id: "icon-wrapper", label: "Icon Wrapper" },
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
    background: isActive ? "#F4F4F5" : isHovered ? "#F4F4F5" : "transparent",
    border: "none",
    borderRadius: "6px",
    color: isActive ? "#18181B" : isHovered ? "#18181B" : "#52525B",
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

export function Sidebar({ active, onSelect }: SidebarProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(NAV.map(g => g.label))
  );
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  function toggleGroup(label: string) {
    setOpenGroups(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

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
      <div style={{ padding: "20px 20px 18px", borderBottom: "1px solid #F4F4F5", flexShrink: 0 }}>
        <LogoJit variant="mono" style={{ width: "32px", height: "auto", color: "var(--jit-primary)", display: "block", marginBottom: "14px" }} />
        <div style={{ fontSize: "11px", fontWeight: 700, color: "#18181B", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
          Design System
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "12px 0 16px" }}>
        {NAV.map((group, gi) => {
          const isOpen = openGroups.has(group.label);
          return (
            <div key={group.label} style={{ marginBottom: gi < NAV.length - 1 ? "2px" : 0 }}>

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
