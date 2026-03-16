// TextInput — a single-line text field for entering freeform text in forms.
// Shows an optional label above the field and placeholder text inside when empty.
// Includes a disabled state that grays out the field and prevents typing.
// Used in settings forms, dialogs, and any screen where a user needs to enter a short text value.
import type { ChangeEvent } from "react";
import styles from "./TextInput.module.css";

type TextInputProps = {
  // An optional label shown above the input field.
  label?: string;
  // Placeholder text shown inside the field when it is empty.
  placeholder?: string;
  // The current text value in the field.
  value?: string;
  // When true, the field is grayed out and the user cannot type in it.
  disabled?: boolean;
  // Called every time the user types — receives the updated text string.
  onChange?: (value: string) => void;
};

export function TextInput({ label, placeholder, value, disabled = false, onChange }: TextInputProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.value);
  }

  return (
    <div className={styles.field}>
      {label && <span className={styles.label}>{label}</span>}
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={handleChange}
      />
    </div>
  );
}
