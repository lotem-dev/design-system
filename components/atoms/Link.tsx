import * as React from "react";
import { Text, type TextVariant, type TextWeight } from "./Text";

type LinkProps = {
  href: string;
  children: React.ReactNode;

  textVariant?: TextVariant;
  weight?: TextWeight;

  external?: boolean;
  disabled?: boolean;

  className?: string;
  style?: React.CSSProperties;
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export function Link({
  href,
  children,
  textVariant,
  weight,
  external = false,
  disabled = false,
  className,
  style,
}: LinkProps) {
  return (
    <Text
      as="a"
      href={disabled ? undefined : href}
      role="link"
      variant={textVariant}
      weight={weight}
      className={cx("ds-link", className)}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      aria-disabled={disabled || undefined}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : undefined,
        ...style,
      }}
    >
      {children}
    </Text>
  );
}
