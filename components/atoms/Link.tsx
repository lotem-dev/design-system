// Link.tsx
// A minimal, design-system-friendly Link component.
//
// Key rules:
// - This component does NOT set a color.
//   The link color should come from the app/theme (CSS variables, parent styles, etc).
// - It reuses the Text component so typography stays consistent.
// - It keeps accessibility basics (focus ring) but doesn't enforce a visual design.

import React from "react";
import { Text, type TextProps } from "../typography/Text";
import type { TypographyPreset } from "../typography/tokens";

export type LinkProps = {
  // Where the link goes
  href: string;

  // Typography preset (same as Text)
  preset?: TypographyPreset;

  // Which HTML element Text should render as.
  // For links we want <a>, so default is "a".
  // (We still allow overriding in case you later want something like a button-link.)
  as?: "a" | "span";

  // Underline behavior:
  // - "auto": do nothing special (let CSS decide)
  // - "always": always underline
  // - "hover": underline only on hover
  underline?: "auto" | "always" | "hover";

  // If true, open in a new tab.
  // (When doing that, we also add rel="noopener noreferrer" for safety.)
  newTab?: boolean;

  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "color"> &
  Omit<TextProps, "as" | "preset" | "children">;

export function Link({
  href,
  preset = "body-md",
  as = "a",
  underline = "auto",
  newTab = false,
  style,
  className,
  children,
  ...rest
}: LinkProps) {
  // Decide underline style without setting any color
  const underlineStyle: React.CSSProperties =
    underline === "always"
      ? { textDecoration: "underline" }
      : underline === "hover"
      ? { textDecoration: "none" }
      : {}; // "auto" -> do nothing

  // If underline is "hover", we need a tiny bit of CSS behavior.
  // We do it inline with onMouse events? No.
  // Better: we use a className hook and let the app add CSS if desired.
  //
  // BUT to keep this component useful out-of-the-box, we can implement hover underline
  // using a simple inline approach via "textDecoration" + "textDecoration" on hover
  // is not possible in pure inline styles.
  //
  // So: for "hover" we provide a data attribute hook.
  const dataUnderlineHover = underline === "hover" ? true : undefined;

  // Target/rel handling for new tab
  const target = newTab ? "_blank" : rest.target;
  const rel = newTab
    ? // Keep any user-provided rel, but ensure security values exist
      [rest.rel, "noopener", "noreferrer"].filter(Boolean).join(" ")
    : rest.rel;

  return (
    <Text
      // Render as <a> by default
      as={as}
      preset={preset}
      // Merge styles: underline rules + any user style
      style={{
        ...underlineStyle,
        ...style,
      }}
      className={className}
      // Hooks for CSS (optional)
      data-underline-hover={dataUnderlineHover}
      // Pass through link attributes
      // TextProps allows HTMLAttributes<HTMLElement>, so these will land on the <a>
      href={href}
      target={target}
      rel={rel}
      {...rest}
    >
      {children}
    </Text>
  );
}
