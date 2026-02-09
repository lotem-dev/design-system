// components/atoms/Link.tsx
// A minimal Link component for the design system.
//
// Key ideas:
// - We DO NOT set a color here. Color should come from the app/theme CSS.
// - We keep typography consistent by rendering Text inside the <a>.
// - We avoid complicated polymorphic typing by keeping Text as a <span>.

import React from "react";
import { Text } from "../typography/Text";
import type { TypographyPreset } from "../typography/tokens";

export type LinkProps = {
  href: string;

  // Same typography presets as Text
  preset?: TypographyPreset;

  // Underline behavior:
  // - "auto": don't force anything (let CSS decide)
  // - "always": always underline
  // - "hover": underline only on hover (requires a tiny CSS rule)
  underline?: "auto" | "always" | "hover";

  // Open in new tab (adds rel for security)
  newTab?: boolean;

  // Optional: pass className/style to the <a>
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
  // Decide underline style WITHOUT setting any color
  const underlineStyle: React.CSSProperties =
    underline === "always"
      ? { textDecoration: "underline" }
      : underline === "hover"
      ? { textDecoration: "none" } // hover underline handled via CSS hook below
      : {}; // "auto"

  // For underline="hover", we expose a data attribute hook for CSS
  const dataUnderlineHover = underline === "hover" ? true : undefined;

  // Target/rel handling for new tab
  const target = newTab ? "_blank" : rest.target;
  const rel = newTab
    ? [rest.rel, "noopener", "noreferrer"].filter(Boolean).join(" ")
    : rest.rel;

  return (
    <a
      href={href}
      className={className}
      style={{ ...underlineStyle, ...style }}
      data-underline-hover={dataUnderlineHover}
      target={target}
      rel={rel}
      {...rest}
    >
      {/* Keep Text simple: always render as a span inside the anchor */}
      <Text as="span" preset={preset}>
        {children}
      </Text>
    </a>
  );
}
