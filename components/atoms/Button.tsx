import type { ReactNode, MouseEvent } from "react";

export type ButtonVariant = "primary" | "ghost" | "destructive";
export type ButtonSize    = "sm" | "md";

type ButtonProps = {
  variant?: ButtonVariant;
  size?:    ButtonSize;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
};

// ─── Size scale ───────────────────────────────────────────────────────────────
const SIZE: Record<ButtonSize, { height: string; padding: string; fontSize: string; gap: string }> = {
  sm: { height: "28px", padding: "0 10px", fontSize: "12px", gap: "4px" },
  md: { height: "36px", padding: "0 14px", fontSize: "13px", gap: "6px" },
};

// ─── Variant tokens ───────────────────────────────────────────────────────────
const VARIANT: Record<ButtonVariant, { background: string; color: string; border: string }> = {
  primary: {
    background: "var(--brand-primary)",
    color:      "var(--text-invert)",
    border:     "1px solid transparent",
  },
  ghost: {
    background: "transparent",
    color:      "var(--text-primary)",
    border:     "1px solid var(--stroke-secondary)",
  },
  destructive: {
    background: "var(--error-secondary)",
    color:      "var(--error-primary)",
    border:     "1px solid transparent",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export function Button({
  variant  = "primary",
  size     = "md",
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  const s = SIZE[size];
  const v = VARIANT[variant];

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        justifyContent: "center",
        gap:            s.gap,
        height:         s.height,
        padding:        s.padding,
        fontSize:       s.fontSize,
        fontWeight:     500,
        fontFamily:     "system-ui, sans-serif",
        borderRadius:   "6px",
        border:         v.border,
        background:     v.background,
        color:          v.color,
        cursor:         disabled ? "not-allowed" : "pointer",
        opacity:        disabled ? 0.4 : 1,
        transition:     "opacity 120ms ease",
        whiteSpace:     "nowrap",
        lineHeight:     1,
      }}
    >
      {children}
    </button>
  );
}
