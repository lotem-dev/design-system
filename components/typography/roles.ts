// typography/roles.ts
// This file defines SEMANTIC roles.
// A role describes "what this text is" (page title, badge text),
// NOT "what size it is".

import type React from "react";
import type { TypographyScale } from "./scale";

// These are the ONLY text roles allowed in the app.
// Developers must pick one of these.
export type TypographyRole =
  | "page-title"
  | "badge-small";

// We store the tokens we want each role to use.
// - scale: which size/line-height preset from scale.ts
// - weight: bold/regular/etc (we lock it here)
// - as: which HTML tag we render (span, h1, etc)
export type RoleTokens = {
  scale: TypographyScale;
  weight: React.CSSProperties["fontWeight"];
  as: "span" | "p" | "h1";
};

// This is the central decision table for typography.
// If design changes, update THIS map (not 100 screens).
export const typographyRoleTokens: Record<TypographyRole, RoleTokens> = {
  "page-title": {
    scale: "headline",
    weight: "var(--font-weight-bold)" as React.CSSProperties["fontWeight"],
    as: "h1",
  },

  "badge-small": {
    scale: "label",
    weight: "var(--font-weight-bold)" as React.CSSProperties["fontWeight"],
    as: "span",
  },
};