// Text.tsx
// A generic text component used across the app.
//
// It connects typography presets (from tokens.ts)
// with actual HTML elements (p, span, h1, etc).
//
// This is the ONLY place where text styling should be decided.

import React from "react";
import { typographyPresets, type TypographyPreset } from "./tokens";

// Allowed HTML tags for the Text component
type TextTag =
  | "span"
  | "p"
  | "div"
  | "label"
  | "strong"
  | "em"
  | "h1"
  | "h2"
  | "h3";

// Props accepted by the Text component
export type TextProps = {
  // Which typography preset to use (body-md, title-lg, etc)
  preset?: TypographyPreset;

  // Which HTML element should be rendered
  // Default is "span"
  as?: TextTag;

  // Optional text color
  color?: string;

  // Extra inline styles (can override preset styles)
  style?: React.CSSProperties;

  // Optional className (for layout or special cases)
  className?: string;

  // The text (or elements) inside the component
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>; // Allows onClick, id, aria-*, etc

export function Text({
  preset = "body-md", // Default typography preset
  as = "span",        // Default HTML tag
  color,
  style,
  className,
  children,
  ...rest             // Any additional HTML props
}: TextProps) {
  // Get the style object for the selected preset
  const presetStyle = typographyPresets[preset];

  // Merge styles in a clear priority order:
  // 1. Preset styles
  // 2. Optional color
  // 3. Custom styles passed by the user (can override everything)
  const combinedStyle: React.CSSProperties = {
    ...presetStyle,
    ...(color ? { color } : null),
    ...style,
  };

  // Create a dynamic HTML element (span, p, h2, etc)
  const Component = as as any;

  return (
    <Component
      style={combinedStyle}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
