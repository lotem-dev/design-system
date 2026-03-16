// roles.ts — maps every named text role in the design system to its visual settings.
// A "role" describes what a piece of text IS (e.g. "page-title", "body-regular", "badge-small").
// Each role points to a scale size, a font weight, the correct HTML tag, and whether it's uppercase.
// This is the single source of truth for typography decisions — change a role here to update every screen that uses it.

import type React from "react";
import type { TypographyScale } from "./scale";

// Every text role available in the app — pass one of these to the Text component's "role" setting.
export type TypographyRole =
  // Legacy roles already in use across the app
  | "page-title"        // The main title at the top of a page
  | "badge-small"       // Text inside small badges (e.g. status, severity badges)
  // Large headings (~30px)
  | "headline-regular"
  | "headline-bold"
  // Section headings (~26px)
  | "title-regular"
  | "title-bold"
  // Prominent body or subheadings (~18px)
  | "medium-regular"
  | "medium-bold"
  // Default reading text (~14px)
  | "body-regular"
  | "body-bold"
  // Small labels and metadata (~12px)
  | "label-regular"
  | "label-bold"
  | "label-caps"        // Same as label-bold but rendered in uppercase with wider spacing
  // Tiny text (~10px)
  | "xs-regular"
  | "xs-bold";

// The settings stored for each role:
// - scale: which size preset to use (from scale.ts)
// - weight: how heavy the font is (regular or bold)
// - as: the HTML element to render — e.g. h1 for headings, p for paragraphs, span for inline text
// - caps: if true, renders the text in uppercase with wider letter spacing
export type RoleTokens = {
  scale: TypographyScale;
  weight: React.CSSProperties["fontWeight"];
  as: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "li";
  caps?: true;
};

// The central lookup table for all text roles.
// To change how any text looks across the entire app, update the entry here.
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
