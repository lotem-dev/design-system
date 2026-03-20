// Text — renders any text in the design system using a named role.
// Each role is a complete, self-contained style: size, weight, line-height, and HTML tag.
// Only color can be overridden. Never apply font styles manually — always use <Text role="...">.
import * as React from "react";
import styles from "./Text.module.css";

const ROLE_TAG = {
  "headline":   "h1",
  "title":      "h2",
  "medium":     "p",
  "body":       "p",
  "body-bold":  "p",
  "label":      "span",
  "label-bold": "span",
  "label-caps": "span",
  "caption":    "span",
  "caption-bold": "span",
} as const;

export type TypographyRole = keyof typeof ROLE_TAG;

type TextProps = {
  // Which role to apply — fully locks in size, weight, line-height, and HTML tag.
  role: TypographyRole;
  children: React.ReactNode;
  // Optional color override using a design token, e.g. "var(--text-secondary)".
  color?: string;
};

export function Text({ role, children, color }: TextProps) {
  const Component = ROLE_TAG[role];
  return (
    <Component
      className={`${styles.root} ${styles[role]}`}
      style={color ? { color } : undefined}
    >
      {children}
    </Component>
  );
}
