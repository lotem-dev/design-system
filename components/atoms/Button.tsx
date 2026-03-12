import type { ReactNode, MouseEvent } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "ghost" | "destructive";
export type ButtonSize    = "sm" | "md";

type ButtonProps = {
  variant?: ButtonVariant;
  size?:    ButtonSize;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
};

export function Button({
  variant  = "primary",
  size     = "md",
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={[styles.button, styles[variant], styles[size]].join(" ")}
    >
      {children}
    </button>
  );
}
