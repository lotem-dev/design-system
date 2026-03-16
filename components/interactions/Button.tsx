// Button — the primary interactive element in the design system.
// Comes in three visual styles (primary, ghost, destructive) and two sizes (sm, md).
// Can show a text label, an icon, or both — with the icon placed before or after the label.
// Used anywhere the user needs to take an action: forms, dialogs, toolbars.
import type { ReactNode, MouseEvent, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

// The three visual styles of the button — matches the "Variant" property in Figma.
export type ButtonVariant = "primary" | "ghost" | "destructive";
// The two size options — matches the "Size" property in Figma.
export type ButtonSize = "sm" | "md";

type BaseProps = {
  // Controls the visual style: "primary" (filled), "ghost" (outlined/transparent), or "destructive" (red/warning).
  variant?: ButtonVariant;
  // Controls the size: "sm" (small) or "md" (medium, the default).
  size?: ButtonSize;
  // When true, the button is grayed out and cannot be clicked.
  disabled?: boolean;
  // An icon to display inside the button — pass any SVG icon component here.
  icon?: ReactNode;
  // Whether the icon appears before or after the label text. Defaults to "start" (before).
  iconPosition?: "start" | "end";
  // The function that runs when the button is clicked.
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  // The HTML behavior of the button — usually left as the default "button".
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

// When the button has visible text, the label is required and a screen-reader label is optional.
type TextButtonProps = {
  children: ReactNode;
  ariaLabel?: string;
};

// When the button shows only an icon (no text), a screen-reader label is required for accessibility.
type IconOnlyButtonProps = {
  children?: undefined;
  icon: ReactNode;
  ariaLabel: string;
};

export type ButtonProps = BaseProps & (TextButtonProps | IconOnlyButtonProps);

export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  icon,
  iconPosition = "start",
  onClick,
  type = "button",
  children,
  ariaLabel,
}: ButtonProps) {
  // True when an icon is provided but there is no label text — triggers the icon-only layout.
  const isIconOnly = Boolean(icon) && !children;

  // Builds the CSS class list by combining the base class, the chosen variant, size, and icon-only flag.
  const className = [
    styles.button,
    styles[variant],
    styles[size],
    isIconOnly ? styles.iconOnly : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
    >
      {icon && iconPosition === "start" && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}

      {children && <span className={styles.label}>{children}</span>}

      {icon && iconPosition === "end" && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
}
