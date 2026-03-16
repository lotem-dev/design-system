// SelectInput — a dropdown that lets the user choose one option from a list.
// Shows an optional label above the dropdown and a custom chevron arrow on the right.
// Can display a placeholder option at the top (greyed out, not selectable) as a prompt.
// Used in filters, settings forms, and anywhere a single choice from a fixed list is needed.
import type { ChangeEvent } from "react";
import styles from "./SelectInput.module.css";

// Defines a single option in the dropdown — "label" is what the user sees, "value" is what the code uses.
type SelectOption = {
  label: string;
  value: string;
};

type SelectInputProps = {
  // An optional label text shown above the dropdown.
  label?: string;
  // The list of choices to show in the dropdown.
  options: SelectOption[];
  // The currently selected value — should match one of the option values.
  value?: string;
  // When true, the dropdown is grayed out and cannot be interacted with.
  disabled?: boolean;
  // A non-selectable prompt shown at the top of the list, e.g. "Select a region…".
  placeholder?: string;
  // Called when the user picks an option — receives the selected option's value.
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
