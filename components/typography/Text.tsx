import * as React from "react";
import { typographyScale } from "./scale";
import { typographyRoleTokens, type TypographyRole } from "./roles";

type TextProps = {
  role: TypographyRole;
  children: React.ReactNode;
  /** Optional color override as a token string — e.g. "var(--text-secondary)" */
  color?: string;
};

export function Text({ role, children, color }: TextProps) {
  // 1) Get the DS rules for this role (scale + weight + HTML tag).
  const roleTokens = typographyRoleTokens[role];

  // 2) Get the base styles for the chosen scale (fontSize/lineHeight/etc).
  const scaleStyles = typographyScale[roleTokens.scale];

  // 3) Choose which HTML element to render (h1 / p / span).
  //    This is locked by the role.
  const Component = roleTokens.as;

  return (
    <Component
      style={{
        ...scaleStyles,
        fontWeight: roleTokens.weight,
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
