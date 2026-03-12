// typography/roles.ts
// This file defines SEMANTIC roles.
// A role describes "what this text is" (page title, badge text),
// NOT "what size it is".

import type React from "react";
import type { TypographyScale } from "./scale";

// These are the ONLY text roles allowed in the app.
// Developers must pick one of these.
export type TypographyRole =
  // ── Kept from before (already in use) ──
  | "page-title"
  | "badge-small"
  // ── Headline (30/36) ──
  | "headline-regular"
  | "headline-bold"
  // ── Title (26/32) ──
  | "title-regular"
  | "title-bold"
  // ── Medium (18/25) ──
  | "medium-regular"
  | "medium-bold"
  // ── Body (14/22) ──
  | "body-regular"
  | "body-bold"
  // ── Label (12/16) ──
  | "label-regular"
  | "label-bold"
  | "label-caps"
  // ── XS (10/14) ──
  | "xs-regular"
  | "xs-bold";

// We store the tokens we want each role to use.
// - scale: which size/line-height preset from scale.ts
// - weight: bold/regular
// - as: which HTML tag we render
// - caps: optional — renders uppercase with wider letter spacing
export type RoleTokens = {
  scale: TypographyScale;
  weight: React.CSSProperties["fontWeight"];
  as: "span" | "p" | "h1" | "h2";
  caps?: true;
};

// This is the central decision table for typography.
// If design changes, update THIS map (not 100 screens).
export const typographyRoleTokens: Record<TypographyRole, RoleTokens> = {
  // ── Kept from before ────────────────────────────────────────
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

  // ── Headline (30/36) ─────────────────────────────────────────
  "headline-regular": {
    scale: "headline",
    weight: "var(--font-weight-regular)" as React.CSSProperties["fontWeight"],
    as: "h1",
  },
  "headline-bold": {
    scale: "headline",
    weight: "var(--font-weight-bold)" as React.CSSProperties["fontWeight"],
    as: "h1",
  },

  // ── Title (26/32) ─────────────────────────────────────────────
  "title-regular": {
    scale: "title",
    weight: "var(--font-weight-regular)" as React.CSSProperties["fontWeight"],
    as: "h2",
  },
  "title-bold": {
    scale: "title",
    weight: "var(--font-weight-bold)" as React.CSSProperties["fontWeight"],
    as: "h2",
  },

  // ── Medium (18/25) ────────────────────────────────────────────
  "medium-regular": {
    scale: "medium",
    weight: "var(--font-weight-regular)" as React.CSSProperties["fontWeight"],
    as: "p",
  },
  "medium-bold": {
    scale: "medium",
    weight: "var(--font-weight-bold)" as React.CSSProperties["fontWeight"],
    as: "p",
  },

  // ── Body (14/22) ──────────────────────────────────────────────
  "body-regular": {
    scale: "body",
    weight: "var(--font-weight-regular)" as React.CSSProperties["fontWeight"],
    as: "p",
  },
  "body-bold": {
    scale: "body",
    weight: "var(--font-weight-bold)" as React.CSSProperties["fontWeight"],
    as: "p",
  },

  // ── Label (12/16) ─────────────────────────────────────────────
  "label-regular": {
    scale: "label",
    weight: "var(--font-weight-regular)" as React.CSSProperties["fontWeight"],
    as: "span",
  },
  "label-bold": {
    scale: "label",
    weight: "var(--font-weight-bold)" as React.CSSProperties["fontWeight"],
    as: "span",
  },
  "label-caps": {
    scale: "label",
    weight: "var(--font-weight-bold)" as React.CSSProperties["fontWeight"],
    as: "span",
    caps: true,
  },

  // ── XS (10/14) ────────────────────────────────────────────────
  "xs-regular": {
    scale: "xs",
    weight: "var(--font-weight-regular)" as React.CSSProperties["fontWeight"],
    as: "span",
  },
  "xs-bold": {
    scale: "xs",
    weight: "var(--font-weight-bold)" as React.CSSProperties["fontWeight"],
    as: "span",
  },
};
