// Alert — an inline message that communicates important information to the user.
// Unlike Toast, Alert stays visible on the page and doesn't disappear automatically.
// Four semantic types each have a distinct icon, color, and left-border accent.
// Use for confirmations, warnings, validation errors, and contextual guidance.
import { IconX } from "../icons/usecases/IconX";
import styles from "./Alert.module.css";

export type AlertProps = {
  // Determines color and icon. Defaults to "info".
  type?: "info" | "success" | "warning" | "error";
  // Optional bold heading line shown above the message.
  title?: string;
  // The main message text.
  message: string;
  // If provided, shows a dismiss × button that calls this when clicked.
  onClose?: () => void;
};

const ICONS: Record<string, string> = {
  info:    "ℹ",
  success: "✓",
  warning: "⚠",
  error:   "✕",
};

export function Alert({ type = "info", title, message, onClose }: AlertProps) {
  return (
    <div className={`${styles.root} ${styles[type]}`} role="alert">
      <span className={styles.icon} aria-hidden="true">{ICONS[type]}</span>
      <div className={styles.body}>
        {title && <strong className={styles.title}>{title}</strong>}
        <p className={styles.message}>{message}</p>
      </div>
      {onClose && (
        <button className={styles.close} onClick={onClose} aria-label="Dismiss"><IconX width={14} height={14} /></button>
      )}
    </div>
  );
}
