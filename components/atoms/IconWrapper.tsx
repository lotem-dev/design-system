// IconWrapper — a consistent container for rendering any SVG icon from the design system icon set.
// It enforces standard sizes and handles accessibility automatically (hidden from screen readers unless a title is provided).
// Four sizes are available: xs (12px), sm (16px), md (20px), lg (24px, default).
// Used everywhere a standalone icon appears — buttons, labels, table cells, and navigation items.
import * as React from "react";
import { cx } from "../utils";

// The four icon sizes — maps to pixel dimensions: xs=12, sm=16, md=20, lg=24.
export type IconSize = "xs" | "sm" | "md" | "lg";

type IconProps = {
  // The icon SVG component to render — pass any icon from the icons folder (e.g. IconArrow).
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  // Controls the width and height of the icon. Defaults to "lg" (24px).
  size?: IconSize;
  className?: string;
  // An accessible label for the icon — only needed when the icon conveys meaning on its own (no nearby text).
  title?: string;
} & Omit<React.SVGProps<SVGSVGElement>, "color">;

// Maps each size name to its pixel value.
const sizeToPx: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
};

export function IconWrapper({ icon: Svg, size = "lg", className, title, ...props }: IconProps) {
  // Resolve the size name to an actual pixel number before passing it to the SVG.
  const px = sizeToPx[size];

  return (
    <Svg
      width={px}
      height={px}
      // If no title is given, the icon is hidden from screen readers (it's purely decorative).
      // If a title is given, it's announced as an image with that label.
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={cx(className)}
      // Prevents the icon from shrinking when placed inside a flex container.
      style={{ flexShrink: 0 }}
      {...props}
    >
      {title ? <title>{title}</title> : null}
    </Svg>
  );
}
