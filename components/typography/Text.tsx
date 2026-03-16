// Text — the single component used for all text rendering in the design system.
// Instead of choosing a font size directly, you pick a "role" that describes what the text is (e.g. page title, body copy, badge label).
// The role automatically determines the size, weight, letter spacing, and the correct HTML heading or paragraph tag.
// Never use raw HTML text tags (h1, p, span) elsewhere in the app — always use this component.
import * as React from "react";
import { typographyScale } from "./scale";
import { typographyRoleTokens, type TypographyRole } from "./roles";

type TextProps = {
  // The semantic role of this text — controls size, weight, HTML tag, and casing. See roles.ts for all options.
  role: TypographyRole;
  // The text content (or any nested elements) to render.
  children: React.ReactNode;
  // Optional color override using a design token — e.g. "var(--text-secondary)". Only use when the role's default color isn't right.
  color?: string;
};

export function Text({ role, children, color }: TextProps) {
  // Look up the role definition — this tells us which scale, weight, HTML tag, and whether to use caps.
  const roleTokens = typographyRoleTokens[role];

  // Look up the base CSS styles (font size, line height) for the scale this role uses.
  const scaleStyles = typographyScale[roleTokens.scale];

  // The HTML element to render (e.g. h1, p, span) — determined by the role, not the caller.
  const Component = roleTokens.as;

  return (
    <Component
      style={{
        ...scaleStyles,
        fontWeight: roleTokens.weight,
        // If the role uses caps (e.g. "label-caps"), apply uppercase styling and wider letter spacing.
        ...(roleTokens.caps && {
          textTransform: "uppercase",
          letterSpacing: "var(--letter-spacing-caps)",
        }),
        ...(color && { color }),
      }}
    >
      {children}
    </Component>
  );
}
