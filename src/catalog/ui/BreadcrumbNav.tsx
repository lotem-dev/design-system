import { useState, useRef } from "react";
import type { SectionId } from "../Sidebar";

// ─── File system paths (reflects actual repo structure post-reorganization) ───

const PATHS: Record<SectionId, string[]> = {
  // styles/
  "globals-css": ["styles", "globals.css"],
  "colors":      ["styles", "tokens", "colors.css"],
  "spacing":     ["styles", "tokens", "spacing.css"],
  "radius":      ["styles", "tokens", "radius.css"],
  // foundation/
  "typography": ["foundation", "Text.tsx"],
  "link":       ["foundation", "Link.tsx"],
  "divider":    ["foundation", "Divider.tsx"],
  // icons/
  "icons-usecases":     ["icons", "usecases"],
  "icons-chevrons":     ["icons", "chevrons"],
  "icons-sorting":      ["icons", "sorting"],
  "icons-dropdown":     ["icons", "dropdown"],
  "icons-finding-type": ["icons", "finding_type"],
  "icons-sidebar":      ["icons", "sidebar"],
  "icons-resources":    ["icons", "resources_internal"],
  "icons-brand":        ["icons", "brand"],
  // illustrations/
  "illustrations": ["illustrations"],
  // interactions/
  "button":          ["interactions", "Button.tsx"],
  "fields-radio":    ["interactions", "Radio.tsx"],
  "toggle":          ["interactions", "Toggle.tsx"],
  "fields-checkbox": ["interactions", "Checkbox.tsx"],
  // fields/
  "fields-text":   ["fields", "TextInput.tsx"],
  "fields-select": ["fields", "SelectInput.tsx"],
  "fields-search": ["fields", "SearchInput.tsx"],
  "textarea":      ["fields", "Textarea.tsx"],
  "chat-field":    ["fields", "ChatField.tsx"],
  "form-field":    ["fields", "FormField.tsx"],
  // badges/
  "badge-status":   ["badges", "BadgeStatus.tsx"],
  "badge-severity": ["badges", "BadgeSeverity.tsx"],
  "badge-priority": ["badges", "BadgePriority.tsx"],
  // tables/
  "table":             ["tables", "Table.tsx"],
  "table-header-cell": ["tables", "TableHeaderCell.tsx"],
  "resource-item":     ["tables", "ResourceItem.tsx"],
  // visualization/
  "findings-breakdown": ["visualization", "FindingsBreakdown.tsx"],
  "priority-gauge":     ["visualization", "PriorityGauge.tsx"],
  "progress":           ["visualization", "Progress.tsx"],
  "spinner":            ["visualization", "Spinner.tsx"],
  "skeleton":           ["visualization", "Skeleton.tsx"],
  "empty-state":        ["visualization", "EmptyState.tsx"],
  // overlays/
  "modal":         ["overlays", "Modal.tsx"],
  "dropdown-menu": ["overlays", "DropdownMenu.tsx"],
  "tooltip":       ["overlays", "Tooltip.tsx"],
  "alert":         ["overlays", "Alert.tsx"],
  "toast":         ["overlays", "Toast.tsx"],
  // navigation/
  "tab":        ["navigation", "Tab.tsx"],
  "breadcrumb": ["navigation", "Breadcrumb.tsx"],
  "pagination": ["navigation", "Pagination.tsx"],
  // layout/
  "card":         ["layout", "Card.tsx"],
  "avatar":       ["layout", "Avatar.tsx"],
  "icon-wrapper": ["layout", "IconWrapper.tsx"],
};

// Returns sections that share the same path prefix through segmentIndex (for dropdown content).
// Returns [] for the last segment (no dropdown) or when path has only 1 segment.
function getDropdownItems(active: SectionId, segIndex: number, isLast: boolean): SectionId[] {
  if (isLast || PATHS[active].length === 1) return [];
  const prefix = PATHS[active].slice(0, segIndex + 1);
  return (Object.keys(PATHS) as SectionId[]).filter(id =>
    prefix.every((seg, i) => PATHS[id][i] === seg)
  );
}

// ─── Dropdown panel ───────────────────────────────────────────────────────────

function DropdownPanel({
  items, active, onSelect, onMouseEnter, onMouseLeave,
}: {
  items: SectionId[];
  active: SectionId;
  onSelect: (id: SectionId) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const [hovered, setHovered] = useState<SectionId | null>(null);
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        left: "-8px",
        zIndex: 400,
        backgroundColor: "#FFFFFF",
        border: "1px solid #E4E4E7",
        borderRadius: "10px",
        boxShadow: "0 12px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
        padding: "4px",
        minWidth: "200px",
      }}
    >
      {items.map(id => {
        const label = PATHS[id][PATHS[id].length - 1];
        const isActive = id === active;
        const isHov = hovered === id;
        return (
          <button
            key={id}
            onClick={() => { onSelect(id); }}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              width: "100%",
              padding: "7px 10px",
              background: isActive ? "#F4F4F5" : isHov ? "#F8F8F8" : "transparent",
              border: "none",
              borderRadius: "6px",
              color: isActive ? "#09090B" : "#3F3F46",
              fontSize: "12px",
              textAlign: "left",
              cursor: "pointer",
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
              fontWeight: isActive ? 600 : 400,
              transition: "background 0.08s",
              whiteSpace: "nowrap",
            }}
          >
            {/* active checkmark */}
            <span style={{ width: "14px", flexShrink: 0, display: "flex", alignItems: "center" }}>
              {isActive && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5L3.8 7.5L8.5 2.5" stroke="#09090B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Single breadcrumb segment ────────────────────────────────────────────────

function BreadcrumbSegment({
  label, isLast, dropdownItems, active, onSelect,
}: {
  label: string;
  isLast: boolean;
  dropdownItems: SectionId[];
  active: SectionId;
  onSelect: (id: SectionId) => void;
}) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const hasDropdown = dropdownItems.length > 0;

  function reveal() {
    clearTimeout(timer.current);
    setOpen(true);
  }

  function conceal() {
    timer.current = setTimeout(() => setOpen(false), 160);
  }

  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <button
        onMouseEnter={hasDropdown ? reveal : undefined}
        onMouseLeave={hasDropdown ? conceal : undefined}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "3px",
          background: open ? "#F4F4F5" : "transparent",
          border: "none",
          borderRadius: "5px",
          padding: "3px 6px",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
          fontSize: "12px",
          color: isLast ? "#09090B" : "#A1A1AA",
          fontWeight: isLast ? 600 : 400,
          cursor: hasDropdown ? "default" : "default",
          transition: "background 0.1s, color 0.1s",
          letterSpacing: "0.01em",
        }}
      >
        {label}
        {hasDropdown && (
          <svg
            width="9" height="9" viewBox="0 0 9 9" fill="none"
            style={{ opacity: 0.45, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s ease" }}
          >
            <path d="M1.5 3L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {open && hasDropdown && (
        <DropdownPanel
          items={dropdownItems}
          active={active}
          onSelect={(id) => { onSelect(id); setOpen(false); }}
          onMouseEnter={reveal}
          onMouseLeave={conceal}
        />
      )}
    </div>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

export function BreadcrumbNav({
  active, onSelect,
}: {
  active: SectionId;
  onSelect: (id: SectionId) => void;
}) {
  const path = PATHS[active];

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "1px",
      padding: "16px 48px 12px",
    }}>
      {path.map((seg, i) => {
        const isLast = i === path.length - 1;
        const dropdownItems = getDropdownItems(active, i, isLast);
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "1px" }}>
            {i > 0 && (
              <span style={{
                color: "#D4D4D8",
                fontSize: "13px",
                padding: "0 1px",
                userSelect: "none",
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                /
              </span>
            )}
            <BreadcrumbSegment
              label={seg}
              isLast={isLast}
              dropdownItems={dropdownItems}
              active={active}
              onSelect={onSelect}
            />
          </div>
        );
      })}
    </div>
  );
}
