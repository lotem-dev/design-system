// Radio — a single-select toggle used when only one option in a group can be active at a time.
// Shows a circle outline with a filled dot inside when selected; empty when unselected.
// Supports a disabled state that prevents interaction.
// Always used in groups (multiple Radio components sharing the same "name") so only one can be selected.
import type { ChangeEvent } from "react";
import styles from "./Radio.module.css";

export type RadioProps = {
  // Whether this radio option is currently selected.
  checked: boolean;
  // Called when the user selects this option — receives true when selected.
  onChange: (checked: boolean) => void;
  // When true, the radio is grayed out and cannot be interacted with.
  disabled?: boolean;
  // Groups multiple radio buttons together so only one in the group can be selected at a time.
  name?: string;
  // The internal value of this radio option — used to identify which option was selected.
  value?: string;
};

export function Radio({ checked, onChange, disabled = false, name, value }: RadioProps) {
  return (
    <label className={`${styles.wrapper} ${disabled ? styles.disabled : ""}`}>
      {/* The real browser radio input — hidden visually but accessible to screen readers. */}
      <input
        type="radio"
        className={styles.input}
        checked={checked}
        // Extracts the true/false value from the browser event and passes it up.
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
        disabled={disabled}
        name={name}
        value={value}
      />
      {/* The custom-styled visible circle — shows the filled dot when selected. */}
      <span className={`${styles.circle} ${checked ? styles.checked : ""}`} aria-hidden="true">
        {checked && <span className={styles.dot} />}
      </span>
    </label>
  );
}
