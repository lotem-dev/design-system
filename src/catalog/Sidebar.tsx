import { LogoJit } from "../../components/icons/brand/LogoJit";

export type SectionId =
  | "colors" | "typography" | "spacing" | "icons"
  | "badge-status" | "button" | "divider" | "icon-wrapper" | "link"
  | "fields" | "tooltip"
  | "tab";

type NavGroup = {
  label: string;
  items: { id: SectionId; label: string }[];
};

const NAV: NavGroup[] = [
  {
    label: "Foundation",
    items: [
      { id: "colors",      label: "Colors" },
      { id: "typography",  label: "Typography" },
      { id: "spacing",     label: "Spacing & Radius" },
      { id: "icons",       label: "Icons" },
    ],
  },
  {
    label: "Atoms",
    items: [
      { id: "badge-status",  label: "BadgeStatus" },
      { id: "button",        label: "Button" },
      { id: "divider",       label: "Divider" },
      { id: "fields",        label: "Fields" },
      { id: "icon-wrapper",  label: "Icon" },
      { id: "link",          label: "Link" },
      { id: "tooltip",       label: "Tooltip" },
    ],
  },
  {
    label: "Molecules",
    items: [
      { id: "tab", label: "Tab / TabGroup" },
    ],
  },
];

type SidebarProps = {
  active: SectionId;
  onSelect: (id: SectionId) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

export function Sidebar({ active, onSelect, theme, onToggleTheme }: SidebarProps) {
  return (
    <aside style={{ width: "220px", flexShrink: 0, height: "100vh", backgroundColor: "#111111", overflowY: "hidden", display: "flex", flexDirection: "column", padding: "24px 0" }}>
      {/* Header */}
      <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #27272A" }}>
        <LogoJit
          variant="mono"
          style={{ width: "48px", height: "auto", color: "var(--jit-primary)", display: "block", marginBottom: "12px" }}
        />
        <div style={{ fontSize: "11px", fontWeight: 600, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "system-ui" }}>Design System</div>
        <div style={{ fontSize: "10px", color: "#3F3F46", marginTop: "2px", fontFamily: "system-ui" }}>Component Catalog</div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "16px 0", flex: 1, minHeight: 0, overflowY: "auto" }}>
        {NAV.map((group) => (
          <div key={group.label} style={{ marginBottom: "24px" }}>
            <div style={{ padding: "0 20px 8px", fontSize: "10px", fontWeight: 700, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "system-ui" }}>
              {group.label}
            </div>
            {group.items.map((item) => {
              const isActive = item.id === active;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "7px 20px",
                    background: isActive ? "#27272A" : "transparent",
                    border: "none",
                    borderLeft: isActive ? "2px solid #FAFAFA" : "2px solid transparent",
                    color: isActive ? "#FAFAFA" : "#A1A1AA",
                    fontSize: "13px",
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: "system-ui",
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Theme Toggle */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid #27272A" }}>
        <div style={{ fontSize: "10px", fontWeight: 700, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "system-ui", marginBottom: "8px" }}>
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
                fontFamily: "system-ui",
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
