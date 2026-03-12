import { useState } from "react";
import type { ReactNode } from "react";

type PreviewBoxProps = {
  children: ReactNode;
  align?: "center" | "left";
  direction?: "row" | "column";
};

export function PreviewBox({ children, align = "left", direction = "row" }: PreviewBoxProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div
      data-theme={theme}
      style={{
        position: "relative",
        padding: "32px 24px",
        backgroundColor: "var(--surface-primary)",
        border: "1px solid #E4E4E7",
        borderRadius: "8px",
        display: "flex",
        flexDirection: direction,
        flexWrap: direction === "row" ? "wrap" : undefined,
        gap: "12px",
        alignItems: direction === "column" ? "flex-start" : "center",
        justifyContent: align === "center" ? "center" : "flex-start",
        backgroundImage:
          "linear-gradient(45deg, var(--surface-secondary) 25%, transparent 25%), linear-gradient(-45deg, var(--surface-secondary) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--surface-secondary) 75%), linear-gradient(-45deg, transparent 75%, var(--surface-secondary) 75%)",
        backgroundSize: "16px 16px",
        backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
      }}
    >
      <button
        onClick={() => setTheme(t => t === "light" ? "dark" : "light")}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          padding: "3px 10px",
          fontSize: "11px",
          fontFamily: "'Open Sans', system-ui, sans-serif",
          fontWeight: 500,
          cursor: "pointer",
          border: "1px solid",
          borderColor: theme === "dark" ? "#3F3F46" : "#E4E4E7",
          borderRadius: "999px",
          backgroundColor: theme === "dark" ? "#27272A" : "#FFFFFF",
          color: theme === "dark" ? "#D4D4D8" : "#71717A",
          lineHeight: "1.4",
        }}
      >
        {theme === "light" ? "☾ Dark" : "☀ Light"}
      </button>
      {children}
    </div>
  );
}
