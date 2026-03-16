// Divider — a thin line used to separate sections of content.
// Can run horizontally (between stacked rows) or vertically (between side-by-side items).
// Thickness, spacing, and color can all be adjusted, but the defaults match the design tokens.
// Used in sidebars, cards, menus, and anywhere a visual separation is needed without a header.
import * as React from "react";
import { cx } from "../utils";

// Whether the line runs left-to-right or top-to-bottom.
export type DividerOrientation = "horizontal" | "vertical";

type DividerProps = {
  // Whether the line runs horizontally (default) or vertically.
  orientation?: DividerOrientation;
  // How thick the line is, in pixels. Defaults to 1.
  thickness?: number;
  // How much space is added around the divider, in pixels.
  // For a horizontal divider this adds space above and below; for vertical, left and right.
  spacing?: number;
  // The line color — defaults to the "divider-primary" design token. Override only when necessary.
  color?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function Divider({
  orientation = "horizontal",
  thickness = 1,
  spacing = 12,
  color = "var(--divider-primary)",
  className,
  style,
}: DividerProps) {
  const isHorizontal = orientation === "horizontal";

  // Builds the size and spacing styles differently depending on orientation.
  const baseStyle: React.CSSProperties = isHorizontal
    ? {
        width: "100%",
        height: thickness,
        marginBlock: spacing,
      }
    : {
        height: "100%",
        width: thickness,
        marginInline: spacing,
        alignSelf: "stretch",
      };

  return (
    <div
      aria-hidden="true"
      className={cx(className)}
      style={{
        backgroundColor: color,
        flexShrink: 0,
        ...baseStyle,
        ...style,
      }}
    />
  );
}
