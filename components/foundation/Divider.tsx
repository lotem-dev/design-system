// Divider — a thin 1px line used to separate sections of content.
// Can run horizontally (between stacked rows) or vertically (between side-by-side items).
// Used in sidebars, cards, menus, and anywhere a visual separation is needed without a header.
import * as React from "react";
import { cx } from "../utils";
import styles from "./Divider.module.css";

// Whether the line runs left-to-right or top-to-bottom.
export type DividerOrientation = "horizontal" | "vertical";

type DividerProps = {
  // Whether the line runs horizontally (default) or vertically.
  orientation?: DividerOrientation;
  // The line color — defaults to the "divider-primary" design token. Override only when necessary.
  color?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function Divider({
  orientation = "horizontal",
  color,
  className,
  style,
}: DividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cx(styles.root, orientation === "horizontal" ? styles.horizontal : styles.vertical, className)}
      style={{
        ...(color ? { backgroundColor: color } : {}),
        ...style,
      }}
    />
  );
}
