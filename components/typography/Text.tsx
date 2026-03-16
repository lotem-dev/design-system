// Text — renders any text in the design system using a named role.
// A role locks in the size, weight, line-height, and correct HTML tag.
// Never apply font styles manually in components — always use <Text role="...">.
import * as React from "react";
import styles from "./Text.module.css";

// Role → HTML tag. The tag is part of the role's meaning:
// headings get h1/h2, paragraphs get p, inline text gets span.
const ROLE_TAG = {
  "headline-regular": "h1",
  "headline-bold":    "h1",
  "title-regular":    "h2",
  "title-bold":       "h2",
  "medium-regular":   "p",
  "medium-bold":      "p",
  "body-regular":     "p",
  "body-bold":        "p",
  "label-regular":    "span",
  "label-bold":       "span",
  "label-caps":       "span",
  "xs-regular":       "span",
  "xs-bold":          "span",
} as const;

export type TypographyRole = keyof typeof ROLE_TAG;

type TextProps = {
  // Which text role to apply — controls size, weight, line-height, and HTML tag.
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
