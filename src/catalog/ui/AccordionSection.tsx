import { useState } from "react";

type AccordionSectionProps = {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

export function AccordionSection({ title, open, onToggle, children }: AccordionSectionProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      marginBottom: "16px",
      border: "1px solid #E4E4E7",
      borderRadius: "8px",
      overflow: "hidden",
    }}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", padding: "16px 20px",
          background: hovered ? "#F4F4F5" : "#FAFAFA",
          border: "none", cursor: "pointer", textAlign: "left",
          transition: "background 0.15s",
        }}
      >
        <span style={{
          fontSize: "13px", fontWeight: 600, color: "#3F3F46",
          textTransform: "uppercase", letterSpacing: "0.08em",
          fontFamily: "'Open Sans', system-ui, sans-serif",
        }}>
          {title}
        </span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ flexShrink: 0, transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
        >
          <path d="M6 4l4 4-4 4" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div style={{ padding: "20px" }}>
          {children}
        </div>
      )}
    </div>
  );
}
