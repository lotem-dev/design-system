import * as React from "react";

export type TextVariant = "XS" | "Label" | "Body" | "Medium" | "Title" | "Headline";
export type TextWeight = "regular" | "bold";
export type TextDecoration = "none" | "underline";
export type TextTransform = "none" | "uppercase";

export type TextColor =
  | "Text/Default"
  | "Text/Muted"
  | "Text/Danger"
  | "Text/Success"
  | "Text/Warning";

type TextProps<T extends React.ElementType> = {
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

const variantClasses: Record<TextVariant, string> = {
  XS: "text-[10px] leading-[14px]",
  Label: "text-xs leading-4",
  Body: "text-sm leading-[22px]",
  Medium: "text-lg leading-[25px]",
  Title: "text-[26px] leading-8",
  Headline: "text-[30px] leading-9",
};

const weightClasses: Record<TextWeight, string> = {
  regular: "font-normal",
  bold: "font-bold",
};

const decorationClasses: Record<TextDecoration, string> = {
  none: "",
  underline: "underline",
};

const transformClasses: Record<TextTransform, string> = {
  none: "",
  uppercase: "uppercase tracking-wide",
};

const colorClasses: Record<TextColor, string> = {
  "Text/Default": "text-slate-900",
  "Text/Muted": "text-slate-600",
  "Text/Danger": "text-red-600",
  "Text/Success": "text-emerald-600",
  "Text/Warning": "text-amber-600",
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
  color = "Text/Default",
  truncate = false,
  className,
  children,
  ...props
}: TextProps<T>) {
  const Comp = as ?? "p";

  return (
    <Comp
      className={cx(
        variantClasses[variant],
        weightClasses[weight],
        decorationClasses[decoration],
        transformClasses[transform],
        colorClasses[color],
        truncate && "truncate",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
