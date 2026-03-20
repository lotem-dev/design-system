// Checkbox — a standard toggle for selecting one or more items in a list or form.
// Shows a checkmark inside the box when selected; empty when unselected.
// Supports a disabled state that prevents interaction.
// Used in table rows for multi-select, settings screens, and filter panels.
import type { ChangeEvent } from "react";
import styles from "./Checkbox.module.css";

export type CheckboxProps = {
  // Whether the checkbox is currently checked (selected).
  checked: boolean;
  // Called whenever the user toggles the checkbox — receives the new true/false value.
  onChange: (checked: boolean) => void;
  // When true, the checkbox is grayed out and cannot be interacted with.
  disabled?: boolean;
};

export function Checkbox({ checked, onChange, disabled = false }: CheckboxProps) {
  return (
    <label className={`${styles.wrapper} ${disabled ? styles.disabled : ""}`}>
      {/* The real browser checkbox — hidden visually but accessible to screen readers. */}
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        // Extracts the true/false value from the browser event and passes it up.
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
        disabled={disabled}
      />
      {/* The custom-styled visible box — shows the checkmark SVG when checked. */}
      <span className={`${styles.box} ${checked ? styles.checked : ""}`} aria-hidden="true">
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </label>
  );
}
