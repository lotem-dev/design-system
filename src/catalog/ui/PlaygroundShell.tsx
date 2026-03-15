import { useState } from "react";
import type { ReactNode } from "react";

// ── PlaygroundShell ───────────────────────────────────────────────────────────
// Shared container for all component playgrounds.
// Wraps the preview in a themed checkerboard area with a light/dark toggle.
// Pass controls (ControlRow + Pill) as the second child slot.

type PlaygroundShellProps = {
  preview: ReactNode;
  controls?: ReactNode;
};

export function PlaygroundShell({ preview, controls }: PlaygroundShellProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div style={{ border: "1px solid #E4E4E7", borderRadius: "12px", overflow: "hidden", marginBottom: "12px" }}>

      {/* Preview */}
      <div
        data-theme={theme}
        style={{
          position: "relative",
          minHeight: "140px",
          display: "flex", alignItems: "center", justifyContent: "center",
          backgroundColor: "var(--surface-primary)",
          backgroundImage:
            "linear-gradient(45deg, var(--surface-secondary) 25%, transparent 25%), linear-gradient(-45deg, var(--surface-secondary) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--surface-secondary) 75%), linear-gradient(-45deg, transparent 75%, var(--surface-secondary) 75%)",
          backgroundSize: "16px 16px",
          backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
          padding: "32px 24px",
        }}
      >
        {/* Theme toggle */}
        <div style={{ position: "absolute", top: "8px", right: "8px", display: "flex", gap: "2px", padding: "3px", backgroundColor: "#F4F4F5", borderRadius: "8px" }}>
          {(["light", "dark"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              style={{
                padding: "4px 12px", fontSize: "11px",
                fontFamily: "'Open Sans', system-ui, sans-serif", fontWeight: 500,
                cursor: "pointer", border: "none", borderRadius: "6px",
                backgroundColor: theme === t ? "#FFFFFF" : "transparent",
                color: theme === t ? "#18181B" : "#71717A",
                boxShadow: theme === t ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.15s",
              }}
            >
              {t === "light" ? "☀ Light" : "☾ Dark"}
            </button>
          ))}
        </div>

        {preview}
      </div>

      {/* Controls */}
      {controls && (
        <div style={{
          borderTop: "1px solid #F4F4F5", padding: "16px 20px",
          display: "flex", flexWrap: "wrap", gap: "20px",
          backgroundColor: "#FFFFFF",
        }}>
          {controls}
        </div>
      )}
    </div>
  );
}

// ── ControlRow ────────────────────────────────────────────────────────────────

export function ControlRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{
        fontSize: "11px", fontWeight: 600, color: "#A1A1AA",
        textTransform: "uppercase", letterSpacing: "0.06em",
        fontFamily: "'Open Sans', system-ui, sans-serif",
        minWidth: "52px",
      }}>
        {label}
      </span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>{children}</div>
    </div>
  );
}

// ── Pill ──────────────────────────────────────────────────────────────────────

export function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "4px 10px", fontSize: "12px",
        fontFamily: "'Open Sans', system-ui, sans-serif",
        border: active ? "1px solid #5E32FF" : "1px solid #E4E4E7",
        borderRadius: "6px", cursor: "pointer",
        background: active ? "#5E32FF" : hovered ? "#F4F4F5" : "#FFFFFF",
        color: active ? "#FFFFFF" : "#52525B",
        fontWeight: active ? 600 : 400,
        transition: "all 100ms ease",
      }}
    >
      {children}
    </button>
  );
}
