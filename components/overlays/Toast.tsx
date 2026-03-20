// Toast — a brief notification that appears and can be dismissed.
// Unlike Alert, Toast is transient: it floats over the UI and disappears.
// Use for non-blocking feedback like "Saved", "Copied", or "Error saving".
import { IconX } from "../icons/usecases/IconX";
import styles from "./Toast.module.css";

export type ToastProps = {
  // The notification text shown to the user.
  message: string;
  // Semantic color and icon. Defaults to "info".
  type?: "info" | "success" | "warning" | "error";
  // When false, the toast is hidden (unmount it or animate out). Defaults to true.
  visible?: boolean;
  // Called when the user clicks the × dismiss button.
  onClose?: () => void;
};

const ICONS: Record<string, string> = {
  info:    "ℹ",
  success: "✓",
  warning: "⚠",
  error:   "✕",
};

export function Toast({ message, type = "info", visible = true, onClose }: ToastProps) {
  if (!visible) return null;

  return (
    <div className={`${styles.root} ${styles[type]}`} role="status" aria-live="polite">
      <span className={styles.accent} aria-hidden="true" />
      <span className={styles.icon} aria-hidden="true">{ICONS[type]}</span>
      <span className={styles.message}>{message}</span>
      {onClose && (
        <button className={styles.close} onClick={onClose} aria-label="Dismiss notification"><IconX width={14} height={14} /></button>
      )}
    </div>
  );
}
