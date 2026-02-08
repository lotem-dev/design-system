import * as React from "react";
import { Text } from "../atoms/Text";
import { TEXT_ROLES, type TextRole as TextRoleName } from "./roles";

type TextRoleProps<T extends React.ElementType> = {
  role: TextRoleName;
  as?: T;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "style">;

export function TextRole<T extends React.ElementType = "span">({
  role,
  as,
  className,
  style,
  children,
  ...props
}: TextRoleProps<T>) {
  const preset = TEXT_ROLES[role];
  return (
    <Text
      as={(as ?? "span") as any}
      variant={preset.variant}
      weight={preset.weight}
      decoration={preset.decoration}
      transform={preset.transform}
      color={preset.color}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </Text>
  );
}
