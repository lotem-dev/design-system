import * as React from "react";

export type IconSize = "xs" | "sm" | "md" | "lg";

type IconProps = {
  as: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: IconSize;
  className?: string;
  title?: string;
} & Omit<React.SVGProps<SVGSVGElement>, "color">;

const sizeToPx: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export function Icon({ as: Svg, size = "lg", className, title, ...props }: IconProps) {
  const px = sizeToPx[size];

  return (
    <Svg
      width={px}
      height={px}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={cx("shrink-0", className)}
      {...props}
    >
      {title ? <title>{title}</title> : null}
    </Svg>
  );
}
