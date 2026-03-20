// Text — renders any text in the design system using a named role.
// A role controls the scale (size + line-height + HTML tag).
// A variant controls the weight (regular, bold, caps).
// Never apply font styles manually in components — always use <Text role="..." variant="...">.
import * as React from "react";
import styles from "./Text.module.css";

const ROLE_TAG = {
  "headline": "h1",
  "title":    "h2",
  "medium":   "p",
  "body":     "p",
  "label":    "span",
  "xs":       "span",
} as const;

export type TypographyRole    = keyof typeof ROLE_TAG;
export type TypographyVariant = "regular" | "bold" | "caps";

type TextProps = {
  // The scale - controls font-size, line-height, and HTML tag.
  role: TypographyRole;
  // The weight variant. "caps" is only meaningful on "label".
  variant?: TypographyVariant;
  children: React.ReactNode;
  // Optional color override using a design token, e.g. "var(--text-secondary)".
  color?: string;
};

export function Text({ role, variant = "regular", children, color }: TextProps) {
  const Component = ROLE_TAG[role];
  return (
    <Component
      className={`${styles.root} ${styles[`${role}-${variant}`]}`}
      style={color ? { color } : undefined}
    >
      {children}
    </Component>
  );
}
