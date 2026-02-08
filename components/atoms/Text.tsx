import * as React from "react";

export type TextVariant = "XS" | "Label" | "Body" | "Medium" | "Title" | "Headline";
export type TextWeight = "regular" | "bold";
export type TextDecoration = "none" | "underline";
export type TextTransform = "none" | "uppercase";

/**
 * Semantic text colors (mapped to CSS variables from globals.css)
 * Feel free to expand later.
 */
export type TextColor = "primary" | "secondary" | "brand" | "invert";

type PolymorphicProps<T extends React.ElementType> = {
  as?: T;
  variant?: TextVariant;
  weight?: TextWeight;
  decoration?: TextDecoration;
  transform?: TextTransform;
  color?: TextColor;
  truncate?: boolean;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "color">;

const variantStyles: Record<TextVariant, React.CSSProperties> = {
  XS: {
    fontSize: "var(--font-size-xs)",
    lineHeight: "var(--line-height-xs)",
  },
  Label: {
    fontSize: "var(--font-size-sm)",
    lineHeight: "var(--line-height-sm)",
  },
  Body: {
    fontSize: "var(--font-size-base)",
    lineHeight: "var(--line-height-base)",
  },
  Medium: {
    fontSize: "var(--font-size-lg)",
    lineHeight: "var(--line-height-lg)",
  },
  Title: {
    fontSize: "var(--font-size-xl)",
    lineHeight: "var(--line-height-xl)",
  },
  Headline: {
    fontSize: "var(--font-size-2xl)",
    lineHeight: "var(--line-height-2xl)",
  },
};

const weightStyles: Record<TextWeight, React.CSSProperties> = {
  regular: { fontWeight: "var(--font-weight-regular)" as any },
  bold: { fontWeight: "var(--font-weight-bold)" as any },
};

const decorationStyles: Record<TextDecoration, React.CSSProperties> = {
  none: { textDecoration: "none" },
  underline: { textDecoration: "underline" },
};

const transformStyles: Record<TextTransform, React.CSSProperties> = {
  none: { textTransform: "none" },
  uppercase: { textTransform: "uppercase", letterSpacing: "0.04em" },
};

const colorStyles: Record<TextColor, React.CSSProperties> = {
  primary: { color: "var(--text-primary)" },
  secondary: { color: "var(--text-secondary)" },
  brand: { color: "var(--text-brand)" },
  invert: { color: "var(--text-invert)" },
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export function Text<T extends React.ElementType = "p">({
  as,
  variant = "Body",
  weight = "regular",
  decoration = "none",
  transform = "none",
  color = "primary",
  truncate = false,
  className,
  style,
  children,
  ...props
}: PolymorphicProps<T>) {
  const Comp = (as ?? "p") as React.ElementType;

  const mergedStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    letterSpacing: "var(--letter-spacing-default)",
    ...variantStyles[variant],
    ...weightStyles[weight],
    ...decorationStyles[decoration],
    ...transformStyles[transform],
    ...colorStyles[color],
    ...(truncate
      ? {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }
      : null),
    ...style,
  };

  return (
    <Comp className={cx(className)} style={mergedStyle} {...props}>
      {children}
    </Comp>
  );
}
