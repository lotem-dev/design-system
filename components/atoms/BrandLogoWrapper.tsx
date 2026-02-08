import * as React from "react";

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

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export function BrandLogo({ as: Logo, size = "md", className, title, ...props }: BrandLogoProps) {
  const px = sizeToPx[size];

  return (
    <Logo
      width={px}
      height={px}
      role="img"
      aria-label={title}
      className={cx("shrink-0", className)}
      {...props}
    />
  );
}
