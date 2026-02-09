import type * as React from "react";

// Single source of truth for typography tokens.
// Atoms should consume these mappings instead of hardcoding values.

export type TextVariant = "XS" | "Label" | "Body" | "Medium" | "Title" | "Headline";
export type TextWeight = "regular" | "bold";
export type TextDecoration = "none" | "underline";
export type TextTransform = "none" | "uppercase";
export type TextColor = "primary" | "secondary" | "brand" | "invert";

export const TEXT_BASE_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  letterSpacing: "var(--letter-spacing-default)",
};

export const TEXT_VARIANT_STYLE: Record<TextVariant, React.CSSProperties> = {
  XS: { fontSize: "var(--font-size-xs)", lineHeight: "var(--line-height-xs)" },
  Label: { fontSize: "var(--font-size-sm)", lineHeight: "var(--line-height-sm)" },
  Body: { fontSize: "var(--font-size-base)", lineHeight: "var(--line-height-base)" },
  Medium: { fontSize: "var(--font-size-lg)", lineHeight: "var(--line-height-lg)" },
  Title: { fontSize: "var(--font-size-xl)", lineHeight: "var(--line-height-xl)" },
  Headline: { fontSize: "var(--font-size-2xl)", lineHeight: "var(--line-height-2xl)" },
};

export const TEXT_WEIGHT_STYLE: Record<TextWeight, React.CSSProperties> = {
  // NOTE: CSS vars are stringy; cast to satisfy React.CSSProperties.
  regular: { fontWeight: "var(--font-weight-regular)" as any },
  bold: { fontWeight: "var(--font-weight-bold)" as any },
};

export const TEXT_DECORATION_STYLE: Record<TextDecoration, React.CSSProperties> = {
  none: { textDecoration: "none" },
  underline: { textDecoration: "underline", textUnderlineOffset: "2px" },
};

export const TEXT_TRANSFORM_STYLE: Record<TextTransform, React.CSSProperties> = {
  none: { textTransform: "none" },
  uppercase: { textTransform: "uppercase", letterSpacing: "var(--letter-spacing-caps)" },
};

export const TEXT_COLOR_STYLE: Record<TextColor, React.CSSProperties> = {
  primary: { color: "var(--text-primary)" },
  secondary: { color: "var(--text-secondary)" },
  brand: { color: "var(--text-brand)" },
  invert: { color: "var(--text-invert)" },
};
