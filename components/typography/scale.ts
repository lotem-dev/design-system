// scale.ts — defines the low-level text size presets used across the design system.
// These are NOT named after where they appear in the UI (like "page title") — they are named by size (like "headline").
// A single scale (e.g. "body") can be shared by many different roles (e.g. body-regular, body-bold).
// If a font size needs to change globally, update only this file.

// This file does not render anything — it only holds CSS style values.
import type React from "react";

// The six size steps in the type scale, from largest to smallest.
export type TypographyScale =
  | "headline"   // Largest — used for page-level headings (~30px)
  | "title"      // Section headings (~26px)
  | "medium"     // Subheadings or prominent body text (~18px)
  | "body"       // Default reading text (~14px)
  | "label"      // Small supporting text, badges, metadata (~12px)
  | "xs";        // Tiny text — timestamps, footnotes (~10px)

type TextStyle = React.CSSProperties;

// The actual CSS values for each scale step — font size, line height, and letter spacing
// are all pulled from design tokens defined in globals.css.
export const typographyScale: Record<TypographyScale, TextStyle> = {
  // ~30px / 36px line height — used for main page headings.
  "headline": {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-2xl)",
    lineHeight: "var(--line-height-2xl)",
    letterSpacing: "var(--letter-spacing-default)",
  },

  // ~26px / 32px line height — used for section titles.
  "title": {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-xl)",
    lineHeight: "var(--line-height-xl)",
    letterSpacing: "var(--letter-spacing-default)",
  },

  // ~18px / 25px line height — used for prominent body text or subheadings.
  "medium": {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-lg)",
    lineHeight: "var(--line-height-lg)",
    letterSpacing: "var(--letter-spacing-default)",
  },

  // ~14px / 22px line height — the default size for most UI text.
  "body": {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-base)",
    lineHeight: "var(--line-height-base)",
    letterSpacing: "var(--letter-spacing-default)",
  },

  // ~12px / 16px line height — used for small labels, badges, and metadata.
  "label": {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-sm)",
    lineHeight: "var(--line-height-sm)",
    letterSpacing: "var(--letter-spacing-default)",
  },

  // ~10px / 14px line height — the smallest text in the system, for timestamps or footnotes.
  "xs": {
    fontFamily: "var(--font-family-default)",
    fontSize: "var(--font-size-xs)",
    lineHeight: "var(--line-height-xs)",
    letterSpacing: "var(--letter-spacing-default)",
  },
};
