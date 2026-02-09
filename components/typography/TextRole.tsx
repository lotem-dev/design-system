import * as React from "react";
import { Text } from "../atoms/Text";
import type { TextRole as TextRoleName } from "./roles";

type TextRoleProps = {
  role: TextRoleName;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export function TextRole({ role, children, style, className }: TextRoleProps) {
  return (
    <Text as="span" role={role} style={style} className={className}>
      {children}
    </Text>
  );
}
