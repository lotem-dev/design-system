// This file defines ALL text styles used in the app.
// It is part of a strict Design System.
//
// The idea:
// - Developers do NOT choose font-size or line-height
// - They only choose a preset name (like "body-md")
// - The actual CSS lives here, in one place

// We import only TYPES from React, not React itself.
// This file does not render anything.
// We only need React types (for CSSProperties).
import type React from "react";

// This type lists ALL allowed typography presets.
// A developer can ONLY use one of these exact strings.
export type TypographyPreset =
  | "page-title"
  | "badge-small";

// This is a shortcut type.
// React.CSSProperties describes an object that looks like inline CSS.
//
// Example:
// {
//   fontSize: "16px",
//   lineHeight: "24px"
// }
type TextStyle = React.CSSProperties;

// This object connects a preset name to its actual CSS styles.
//
// Key   = preset name (like "page-title")
// Value = CSS styles for that preset
//
// TypeScript enforces:
// - Every preset MUST exist here
// - No extra presets are allowed
export const typographyPresets: Record<TypographyPreset, TextStyle> = {

  "page-title": {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-2xl)",
    lineHeight: "var(--line-height-2xl)",
    fontWeight: "var(--font-weight-bold)" as React.CSSProperties["fontWeight"],
    letterSpacing: "var(--letter-spacing-default)",
  },

  "badge-small": {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-sm)",
    lineHeight: "var(--line-height-sm)",
    fontWeight: "var(--font-weight-bold)" as React.CSSProperties["fontWeight"],
    letterSpacing: "var(--letter-spacing-default)",
  },

};
