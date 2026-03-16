// SearchInput — a text field with a built-in search icon on the left for filtering content.
// Designed for in-page filtering — not for navigating to a new page.
// The search icon is purely visual; there is no submit button (filtering happens as the user types).
// Used in tables, dropdowns, and sidebars wherever a list needs to be filtered.
import type { ChangeEvent } from "react";
import styles from "./SearchInput.module.css";

type SearchInputProps = {
  // The placeholder text shown when the field is empty. Defaults to "Search...".
  placeholder?: string;
  // The current text value in the field.
  value?: string;
  // Called every time the user types — receives the updated text string.
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
