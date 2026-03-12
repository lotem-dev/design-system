import type { ReactNode } from "react";

type PreviewBoxProps = {
  children: ReactNode;
  align?: "center" | "left";
  direction?: "row" | "column";
};

export function PreviewBox({ children, align = "left", direction = "row" }: PreviewBoxProps) {
  return (
    <div
      style={{
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
      {children}
    </div>
  );
}
