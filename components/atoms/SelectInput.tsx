import type { ChangeEvent } from "react";
import styles from "./SelectInput.module.css";

type SelectOption = {
  label: string;
  value: string;
};

type SelectInputProps = {
  label?: string;
  options: SelectOption[];
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
};

export function SelectInput({ label, options, value, disabled = false, placeholder, onChange }: SelectInputProps) {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange?.(e.target.value);
  }

  return (
    <div className={styles.field}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.wrapper}>
        <select
          className={styles.select}
          value={value}
          disabled={disabled}
          onChange={handleChange}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <svg className={styles.chevron} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
