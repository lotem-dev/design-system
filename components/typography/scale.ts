// This file defines ALL text scales used in the app.
// It is part of a strict Design System.

// These are the ONLY low-level typography styles (scale).
// They are NOT tied to a specific UI place.
// Example: "title-lg" can be used by many roles.

// We import only TYPES from React, not React itself.
// This file does not render anything.
// We only need React types (for CSSProperties).
import type React from "react";

export type TypographyScale =
  | "headline"
  | "title"
  | "medium"
  | "body"
  | "label"
  | "xs";

type TextStyle = React.CSSProperties;

// Actual CSS styles for each scale preset.
export const typographyScale: Record<TypographyScale, TextStyle> = {
  "headline": {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-2xl)",
    lineHeight: "var(--line-height-2xl)",
    letterSpacing: "var(--letter-spacing-default)",
  },

  "title": {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-xl)",
    lineHeight: "var(--line-height-xl)",
    letterSpacing: "var(--letter-spacing-default)",
  },

  "medium": {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-lg)",
    lineHeight: "var(--line-height-lg)",
    letterSpacing: "var(--letter-spacing-default)",
  },

  "body": {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-base)",
    lineHeight: "var(--line-height-base)",
    letterSpacing: "var(--letter-spacing-default)",
  },

    "label": {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-sm)",
    lineHeight: "var(--line-height-sm)",
    letterSpacing: "var(--letter-spacing-default)",
  },

    "xs": {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-xs)",
    lineHeight: "var(--line-height-xs)",
    letterSpacing: "var(--letter-spacing-default)",
  },
};
