import type { ChangeEvent } from "react";
import styles from "./SearchInput.module.css";

type SearchInputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function SearchInput({ placeholder = "Search...", value, onChange }: SearchInputProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <svg className={styles.icon} width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
