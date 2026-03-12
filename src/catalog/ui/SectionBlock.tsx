import type { ReactNode } from "react";

// Shared section wrapper used inside every catalog section.
// Renders a small uppercase title + content below it.
export function SectionBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <h2
        style={{
          margin: "0 0 16px",
          fontSize: "13px",
          fontWeight: 600,
          color: "#71717A",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontFamily: "'Open Sans', system-ui, sans-serif",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
