import type { ChangeEvent } from "react";
import styles from "./TextInput.module.css";

type TextInputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
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
