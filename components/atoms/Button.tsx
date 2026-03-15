import type { ReactNode, MouseEvent, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

type TextButtonProps = {
  children: ReactNode;
  ariaLabel?: string;
};

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
  const isIconOnly = Boolean(icon) && !children;

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
