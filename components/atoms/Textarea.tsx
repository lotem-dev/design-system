// Textarea — a multi-line text input for longer content like descriptions, notes, or comments.
// Shows an optional label above and an error message below when validation fails.
// Shares the same visual style as TextInput but grows vertically.
// Use when the expected input is more than one line.
import type { ChangeEvent } from "react";
import styles from "./Textarea.module.css";

type TextareaProps = {
  // Optional label shown above the field.
  label?: string;
  // Ghost text shown when the field is empty.
  placeholder?: string;
  // The current text content.
  value: string;
  // Called every time the user types.
  onChange: (value: string) => void;
  // When true, the field is read-only and grayed out.
  disabled?: boolean;
  // Number of visible lines. Defaults to 4.
  rows?: number;
  // An error message shown below the field in red.
  error?: string;
};

export function Textarea({
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  rows = 4,
  error,
}: TextareaProps) {
  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    onChange(e.target.value);
  }

  return (
    <div className={styles.field}>
      {label && <span className={styles.label}>{label}</span>}
      <textarea
        className={`${styles.textarea} ${error ? styles.hasError : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        rows={rows}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
