import * as React from "react";
import { typographyScale } from "./scale";
import { typographyRoleTokens, type TypographyRole } from "./roles";

// Strict Text props:
// - role is REQUIRED (semantic meaning)
// - children is REQUIRED (text content)
// No style/className/as/color props -> no overrides.
type TextProps = {
  role: TypographyRole;
  children: React.ReactNode;
};

export function Text({ role, children }: TextProps) {
  // 1) Get the DS rules for this role (scale + weight + HTML tag).
  const roleTokens = typographyRoleTokens[role];

  // 2) Get the base styles for the chosen scale (fontSize/lineHeight/etc).
  const scaleStyles = typographyScale[roleTokens.scale];

  // 3) Choose which HTML element to render (h1 / p / span).
  //    This is locked by the role.
  const Component = roleTokens.as;

  return (
    <Component
      // Locked styling:
      // - scaleStyles controls size/line-height/etc
      // - fontWeight comes from role (semantic)
      style={{
        ...scaleStyles,
        fontWeight: roleTokens.weight,
      }}
    >
      {children}
    </Component>
  );
}
