// typography/tokens.ts
// This file defines ALL text styles used in the app.
//
// Think of it as the code version of Figma Text Styles.
// Each "preset" here = one text style in Figma (body-md, title-lg, etc).
//
// The goal:
// - Keep typography consistent
// - Avoid writing font-size / line-height all over the app
// - Make code + Figma match 1:1

import type React from "react";

// All allowed typography presets
export type TypographyPreset =
  | "title-lg"
  | "title-md"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "caption";

// A shortcut type for text styles in React
type TextStyle = React.CSSProperties;

// Map between a preset name and its actual CSS styles
export const typographyPresets: Record<TypographyPreset, TextStyle> = {
  "title-lg": {
    // Font family token (defined in globals.css)
    fontFamily: "var(--font-family-default)",

    // Size + spacing tokens
    fontSize: "var(--font-size-title-lg)",
    lineHeight: "var(--line-height-title-lg)",

    // Weight token
    fontWeight: "var(--font-weight-bold)" as React.CSSProperties["fontWeight"],

    // Letter spacing token
    letterSpacing: "var(--letter-spacing-default)",
  },

  "title-md": {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-title-md)",
    lineHeight: "var(--line-height-title-md)",
    fontWeight: "var(--font-weight-bold)" as React.CSSProperties["fontWeight"],
    letterSpacing: "var(--letter-spacing-default)",
  },

  "body-lg": {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-body-lg)",
    lineHeight: "var(--line-height-body-lg)",
    fontWeight: "var(--font-weight-regular)" as React.CSSProperties["fontWeight"],
    letterSpacing: "var(--letter-spacing-default)",
  },

  "body-md": {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-body-md)",
    lineHeight: "var(--line-height-body-md)",
    fontWeight: "var(--font-weight-regular)" as React.CSSProperties["fontWeight"],
    letterSpacing: "var(--letter-spacing-default)",
  },

  "body-sm": {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-body-sm)",
    lineHeight: "var(--line-height-body-sm)",
    fontWeight: "var(--font-weight-regular)" as React.CSSProperties["fontWeight"],
    letterSpacing: "var(--letter-spacing-default)",
  },

  caption: {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-caption)",
    lineHeight: "var(--line-height-caption)",
    fontWeight: "var(--font-weight-regular)" as React.CSSProperties["fontWeight"],
    letterSpacing: "var(--letter-spacing-default)",
  },
};
