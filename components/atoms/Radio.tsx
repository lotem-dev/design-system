import type { ChangeEvent } from "react";
import styles from "./Radio.module.css";

export type RadioProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  name?: string;
  value?: string;
};

export function Radio({ checked, onChange, label, disabled = false, name, value }: RadioProps) {
  return (
    <label className={`${styles.wrapper} ${disabled ? styles.disabled : ""}`}>
      <input
        type="radio"
        className={styles.input}
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
        disabled={disabled}
        name={name}
        value={value}
      />
      <span className={`${styles.circle} ${checked ? styles.checked : ""}`} aria-hidden="true">
        {checked && <span className={styles.dot} />}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
