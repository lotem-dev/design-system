import type React from "react";
import { useState } from "react";
import { LogoJit } from "../../components/icons/brand/LogoJit";

export type SectionId =
  // Foundation
  | "colors" | "typography" | "spacing" | "radius"
  // Icons
  | "icons-usecases" | "icons-chevrons" | "icons-sorting" | "icons-dropdown"
  | "icons-finding-type" | "icons-sidebar" | "icons-resources" | "icons-brand"
  // Actions
  | "button" | "link"
  // Inputs
  | "fields-text" | "fields-select" | "fields-search"
  | "fields-checkbox" | "fields-radio"
  | "toggle" | "textarea" | "form-field"
  // Display
  | "avatar" | "tag"
  | "badge-status" | "badge-severity" | "badge-priority"
  | "icon-wrapper"
  // Data
  | "findings-breakdown" | "priority-gauge" | "resource-item"
  | "table-header-cell" | "table" | "pagination"
  // Feedback
  | "alert" | "toast" | "spinner" | "skeleton" | "progress" | "empty-state"
  // Overlay
  | "tooltip" | "dropdown-menu" | "modal"
  // Navigation
  | "tab" | "breadcrumb" | "divider"
  // Layout
  | "card" | "chat-field";

type NavItem  = { id: SectionId; label: string };
type NavGroup = { label: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    label: "Foundation",
    items: [
      { id: "colors",     label: "Colors" },
      { id: "typography", label: "Typography" },
      { id: "spacing",    label: "Spacing" },
      { id: "radius",     label: "Radius" },
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
    label: "Actions",
    items: [
      { id: "button", label: "Button" },
      { id: "link",   label: "Link" },
    ],
  },
  {
    // "Inputs" = all form controls, including ChatField which is an input pattern
    label: "Inputs",
    items: [
      { id: "fields-text",     label: "Text Input" },
      { id: "fields-select",   label: "Select" },
      { id: "fields-search",   label: "Search" },
      { id: "fields-checkbox", label: "Checkbox" },
      { id: "fields-radio",    label: "Radio" },
      { id: "toggle",          label: "Toggle" },
      { id: "textarea",        label: "Textarea" },
      { id: "chat-field",      label: "Chat Field" },
      { id: "form-field",      label: "Form Field" },
    ],
  },
  {
    // "Status & Labels" = things that communicate a state, level, or category (Atlassian calls this "Status indicators")
    label: "Status & Labels",
    items: [
      { id: "badge-status",   label: "Badge Status" },
      { id: "badge-severity", label: "Badge Severity" },
      { id: "badge-priority", label: "Badge Priority" },
      { id: "tag",            label: "Tag" },
    ],
  },
  {
    // "Feedback" = system responses to user actions: alerts, notifications, loading states, empty states
    label: "Feedback",
    items: [
      { id: "alert",       label: "Alert" },
      { id: "toast",       label: "Toast" },
      { id: "empty-state", label: "Empty State" },
      { id: "spinner",     label: "Spinner" },
      { id: "skeleton",    label: "Skeleton" },
      { id: "progress",    label: "Progress" },
    ],
  },
  {
    // "Data & Tables" = structured data presentation, specific to Jit's domain
    label: "Data & Tables",
    items: [
      { id: "table",              label: "Table" },
      { id: "table-header-cell",  label: "Table Header Cell" },
      { id: "findings-breakdown", label: "Findings Breakdown" },
      { id: "priority-gauge",     label: "Priority Gauge" },
      { id: "resource-item",      label: "Resource Item" },
    ],
  },
  {
    // "Overlays" = floating UI that appears above the page
    label: "Overlays",
    items: [
      { id: "modal",         label: "Modal" },
      { id: "dropdown-menu", label: "Dropdown Menu" },
      { id: "tooltip",       label: "Tooltip" },
    ],
  },
  {
    // "Navigation" = components that move users between pages or sections
    label: "Navigation",
    items: [
      { id: "tab",        label: "Tabs" },
      { id: "breadcrumb", label: "Breadcrumb" },
      { id: "pagination", label: "Pagination" },
    ],
  },
  {
    // "Layout" = structural containers and display primitives (Avatar, IconWrapper live here alongside Polaris "Images and icons" pattern)
    label: "Layout",
    items: [
      { id: "card",        label: "Card" },
      { id: "divider",     label: "Divider" },
      { id: "avatar",      label: "Avatar" },
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
    background: isActive ? "#F3F0FF" : isHovered ? "#F4F4F5" : "transparent",
    border: "none",
    borderRadius: "6px",
    color: isActive ? "#5E32FF" : isHovered ? "#18181B" : "#52525B",
    fontSize: "13px",
    textAlign: "left",
    cursor: "pointer",
    fontFamily: "'Open Sans', system-ui, sans-serif",
    fontWeight: isActive ? 600 : 400,
    transition: "background 0.1s, color 0.1s",
    letterSpacing: "0.01em",
  };
}

export function Sidebar({ active, onSelect }: SidebarProps) {
  const [hovered, setHovered] = useState<string | null>(null);

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
        {NAV.map((group, gi) => (
          <div key={group.label} style={{ marginBottom: gi < NAV.length - 1 ? "4px" : 0 }}>

            {/* Section label */}
            <div style={{
              padding: "10px 20px 4px",
              fontSize: "10px",
              fontWeight: 700,
              color: "#A1A1AA",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "'Open Sans', system-ui, sans-serif",
            }}>
              {group.label}
            </div>

            {/* Items */}
            {group.items.map((item) => (
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
        ))}
      </nav>

    </aside>
  );
}
