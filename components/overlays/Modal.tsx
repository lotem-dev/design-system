// Modal — a dialog that appears over the page to focus the user's attention.
// The backdrop dims the rest of the UI so the user must deal with the modal before continuing.
// Use for confirmations, forms, and tasks that need dedicated focus.
import type { ReactNode } from "react";
import styles from "./Modal.module.css";

export type ModalProps = {
  // When true, the modal is visible. When false, it is not rendered.
  open: boolean;
  // Called when the user clicks the backdrop or the × close button.
  onClose: () => void;
  // Optional heading shown at the top of the modal panel.
  title?: string;
  // The modal body content. Can be any React elements.
  children: ReactNode;
  // Controls the width of the modal panel. Defaults to "md".
  // sm = 400px, md = 560px, lg = 720px
  size?: "sm" | "md" | "lg";
};

const SIZE_MAP: Record<string, string> = {
  sm: "400px",
  md: "560px",
  lg: "720px",
};

export function Modal({ open, onClose, title, children, size = "md" }: ModalProps) {
  if (!open) return null;

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-label={title}>
      <div className={styles.panel} style={{ maxWidth: SIZE_MAP[size] }}>
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button className={styles.close} onClick={onClose} aria-label="Close modal">×</button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
