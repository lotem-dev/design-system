import { useState } from "react";
import type { ReactNode } from "react";
import type { SourceFile } from "./SourcePanel";
import { SourcePanel } from "./SourcePanel";

type SplitPageProps = {
  children: ReactNode;
  files: SourceFile[];
};

export function SplitPage({ children, files }: SplitPageProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex", width: "100%" }}>

      {/* Left — spec content */}
      <div style={{ flex: open ? "0 0 55%" : "1 1 100%", minWidth: 0, padding: "20px 32px 32px", overflowX: "auto" }}>

        {/* Source toggle — sits top-right, doesn't affect content flow */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              background: open ? "#F4F4F5" : "none",
              border: "1px solid #E4E4E7",
              borderRadius: "6px",
              padding: "4px 10px",
              fontSize: "11px",
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              color: open ? "#18181B" : "#A1A1AA",
              cursor: "pointer",
              transition: "background 0.1s, color 0.1s, border-color 0.1s",
            }}
            onMouseEnter={e => { if (!open) { e.currentTarget.style.borderColor = "#D4D4D8"; e.currentTarget.style.color = "#52525B"; }}}
            onMouseLeave={e => { if (!open) { e.currentTarget.style.borderColor = "#E4E4E7"; e.currentTarget.style.color = "#A1A1AA"; }}}
          >
            {/* Code brackets icon */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 2.5L1 6L4 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 2.5L11 6L8 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {open ? "Hide source" : "View source"}
          </button>
        </div>

        {children}
      </div>

      {/* Right — source drawer. Mounts/unmounts cleanly. */}
      {open && (
        <div style={{
          flex: "0 0 45%",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          borderLeft: "1px solid #E4E4E7",
        }}>
          <SourcePanel files={files} />
        </div>
      )}

    </div>
  );
}
