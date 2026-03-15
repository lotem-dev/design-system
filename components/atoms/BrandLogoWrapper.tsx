import * as React from "react";
import { cx } from "../utils";

export type BrandLogoSize = "xs" | "sm" | "md" | "lg";

type BrandLogoProps = {
  as: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: BrandLogoSize;
  className?: string;
  title?: string;
} & React.SVGProps<SVGSVGElement>;

const sizeToPx: Record<BrandLogoSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
};

export function BrandLogoWrapper({ as: Logo, size = "md", className, title, ...props }: BrandLogoProps) {
  const px = sizeToPx[size];

  return (
    <Logo
      width={px}
      height={px}
      role="img"
      aria-label={title}
      className={cx(className)}
      style={{ flexShrink: 0 }}
      {...props}
    />
  );
}
