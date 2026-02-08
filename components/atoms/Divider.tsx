import * as React from "react";

export type DividerOrientation = "horizontal" | "vertical";

type DividerProps = {
  orientation?: DividerOrientation;

  /** thickness in px (default 1) */
  thickness?: number;

  /**
   * spacing around the divider (in px).
   * horizontal => margin-block
   * vertical   => margin-inline
   */
  spacing?: number;

  /** override color if ever needed (prefer tokens) */
  color?: string;

  className?: string;
  style?: React.CSSProperties;
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export function Divider({
  orientation = "horizontal",
  thickness = 1,
  spacing = 12,
  color = "var(--divider-primary)",
  className,
  style,
}: DividerProps) {
  const isHorizontal = orientation === "horizontal";

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
