import * as React from "react";
import {
  TEXT_BASE_STYLE,
  TEXT_VARIANT_STYLE,
  TEXT_WEIGHT_STYLE,
  TEXT_DECORATION_STYLE,
  TEXT_TRANSFORM_STYLE,
  TEXT_COLOR_STYLE,
  type TextVariant,
  type TextWeight,
  type TextDecoration,
  type TextTransform,
  type TextColor,
} from "../typography/tokens";
import { TEXT_ROLES, type TextRole as TextRoleName } from "../typography/roles";

export type { TextVariant, TextWeight, TextDecoration, TextTransform, TextColor } from "../typography/tokens";

type TextProps<T extends React.ElementType> = {
  as?: T;
  /** Use a semantic role preset (recommended). */
  role?: TextRoleName;
  /** Optional overrides for the role preset. */
  variant?: TextVariant;
  weight?: TextWeight;
  decoration?: TextDecoration;
  transform?: TextTransform;
  color?: TextColor;
  truncate?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "color" | "style">;

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export function Text<T extends React.ElementType = "p">({
  as,
  role,
  variant,
  weight,
  decoration,
  transform,
  color,
  truncate = false,
  className,
  style,
  children,
  ...props
}: TextProps<T>) {
  const Comp = (as ?? "p") as React.ElementType;

  const preset = role ? TEXT_ROLES[role] : undefined;
  const resolvedVariant: TextVariant = preset?.variant ?? variant ?? "Body";
  const resolvedWeight: TextWeight = (weight ?? preset?.weight ?? "regular") as TextWeight;
  const resolvedDecoration: TextDecoration =
    (decoration ?? preset?.decoration ?? "none") as TextDecoration;
  const resolvedTransform: TextTransform = (transform ?? preset?.transform ?? "none") as TextTransform;
  const resolvedColor: TextColor = (color ?? preset?.color ?? "primary") as TextColor;

  const mergedStyle: React.CSSProperties = {
    ...TEXT_BASE_STYLE,
    ...TEXT_VARIANT_STYLE[resolvedVariant],
    ...TEXT_WEIGHT_STYLE[resolvedWeight],
    ...TEXT_DECORATION_STYLE[resolvedDecoration],
    ...TEXT_TRANSFORM_STYLE[resolvedTransform],
    ...TEXT_COLOR_STYLE[resolvedColor],
    ...(truncate
      ? { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
      : null),
    ...style,
  };

  return (
    <Comp className={cx(className)} style={mergedStyle} {...props}>
      {children}
    </Comp>
  );
}
