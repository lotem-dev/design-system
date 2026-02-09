import React from "react";
import { Text } from "../typography/Text";
import type { TypographyPreset } from "../typography/tokens";

export type LinkProps = {
  href: string;
  preset?: TypographyPreset;
  underline?: "auto" | "always" | "hover";
  newTab?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "color">;

export function Link({
  href,
  preset = "body-md",
  underline = "auto",
  newTab = false,
  className,
  style,
  children,
  ...rest
}: LinkProps) {
  const [isHover, setIsHover] = React.useState(false);

  const shouldUnderline =
    underline === "always" || (underline === "hover" && isHover);

  const target = newTab ? "_blank" : rest.target;
  const rel = newTab
    ? [rest.rel, "noopener", "noreferrer"].filter(Boolean).join(" ")
    : rest.rel;

  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onMouseEnter={(e) => {
        if (underline === "hover") setIsHover(true);
        rest.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (underline === "hover") setIsHover(false);
        rest.onMouseLeave?.(e);
      }}
      style={{
        // Important: do NOT force a color, just inherit
        color: "inherit",

        // Underline behavior
        textDecoration: shouldUnderline ? "underline" : "none",
        textDecorationColor: "currentColor",

        ...style,
      }}
      {...rest}
    >
      <Text as="span" preset={preset}>
        {children}
      </Text>
    </a>
  );
}
