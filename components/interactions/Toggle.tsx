// Toggle — an on/off switch for settings and preferences.
// More intentional than a checkbox — use Toggle for enabling/disabling a feature,
// Checkbox for selecting items in a list.
// Pill-shaped track with a sliding circular thumb.
import styles from "./Toggle.module.css";

type ToggleProps = {
  // Whether the toggle is on (true) or off (false).
  checked: boolean;
  // Called when the user flips the toggle.
  onChange: (checked: boolean) => void;
  // When true, the toggle can't be interacted with.
  disabled?: boolean;
  // A description of what this toggle controls — required for screen readers.
  ariaLabel: string;
};

export function Toggle({ checked, onChange, disabled = false, ariaLabel }: ToggleProps) {
  function handleClick() {
    if (!disabled) onChange(!checked);
  }

  return (
    <label className={`${styles.wrapper} ${disabled ? styles.disabled : ""}`}>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        className={`${styles.track} ${checked ? styles.on : styles.off}`}
        onClick={handleClick}
        disabled={disabled}
        type="button"
      >
        <span className={`${styles.thumb} ${checked ? styles.thumbOn : styles.thumbOff}`} />
      </button>
    </label>
  );
}
