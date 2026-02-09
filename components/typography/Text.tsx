import * as React from "react";
import { typographyScale } from "./scale";
import { typographyRoleTokens, type TypographyRole } from "./roles";

// Strict Text props:
// - role is REQUIRED (semantic meaning)
// - children is REQUIRED (text content)
// - color is OPTIONAL (only for text color)
type TextProps = {
  role: TypographyRole;
  children: React.ReactNode;
  color?: string;
};

export function Text({ role, children, color }: TextProps) {
  // Get the DS rules for this role (scale + weight + HTML tag).
  const roleTokens = typographyRoleTokens[role];

  // Get the base styles for the chosen scale (fontSize/lineHeight/etc).
  const scaleStyles = typographyScale[roleTokens.scale];

  // Choose which HTML element to render (h1 / p / span).
  const Component = roleTokens.as;

  return (
    <Component
      // Locked styling: scale styles + locked weight from role.
      // We allow ONLY the color to be customized.
      style={{
        ...scaleStyles,
        fontWeight: roleTokens.weight,
        color, // if undefined, nothing changes
      }}
    >
      {children}
    </Component>
  );
}
