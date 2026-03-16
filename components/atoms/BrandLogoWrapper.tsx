// BrandLogoWrapper — a consistent container for third-party brand logos (e.g. GitHub, AWS, Snyk).
// It renders any logo SVG at a fixed, token-based size so logos never scale arbitrarily.
// Four sizes are available: xs (16px), sm (20px), md (24px, default), lg (32px).
// Used anywhere a partner or integration logo appears in the UI.
import * as React from "react";
import { cx } from "../utils";

// The four logo sizes available — maps to pixel dimensions: xs=16, sm=20, md=24, lg=32.
export type BrandLogoSize = "xs" | "sm" | "md" | "lg";

type BrandLogoProps = {
  // The logo SVG component to render — pass the imported logo directly (e.g. LogoGitHub).
  as: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  // Controls the width and height of the logo. Defaults to "md" (24px).
  size?: BrandLogoSize;
  className?: string;
  // Accessible label for the logo — used by screen readers to identify the brand.
  title?: string;
} & React.SVGProps<SVGSVGElement>;

// Maps each size name to its pixel value.
const sizeToPx: Record<BrandLogoSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
};

export function BrandLogoWrapper({ as: Logo, size = "md", className, title, ...props }: BrandLogoProps) {
  // Resolve the size name to an actual pixel number before passing it to the SVG.
  const px = sizeToPx[size];

  return (
    <Logo
      width={px}
      height={px}
      role="img"
      aria-label={title}
      className={cx(className)}
      // Prevents the logo from shrinking when placed inside a flex container.
      style={{ flexShrink: 0 }}
      {...props}
    />
  );
}
