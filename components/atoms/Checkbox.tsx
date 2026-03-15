import type { ChangeEvent } from "react";
import styles from "./Checkbox.module.css";

export type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export function Checkbox({ checked, onChange, label, disabled = false }: CheckboxProps) {
  return (
    <label className={`${styles.wrapper} ${disabled ? styles.disabled : ""}`}>
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className={`${styles.box} ${checked ? styles.checked : ""}`} aria-hidden="true">
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
