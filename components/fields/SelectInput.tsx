// SelectInput — a dropdown that lets the user choose one option from a list.
// Shows an optional label above the trigger and opens the design system DropdownMenu on click.
// Can display a placeholder prompt when no option is selected.
// Used in filters, settings forms, and anywhere a single choice from a fixed list is needed.
import styles from "./SelectInput.module.css";
import { DropdownMenu } from "../overlays/DropdownMenu";
import { IconDropdownIndicator } from "../icons/dropdown/IconDropdownIndicator";

// Defines a single option — "label" is what the user sees, "value" is what the code uses.
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
  // A prompt shown when no option is selected.
  placeholder?: string;
  // Called when the user picks an option — receives the selected option's value.
  onChange?: (value: string) => void;
};

export function SelectInput({ label, options, value, disabled = false, placeholder, onChange }: SelectInputProps) {
  const selectedLabel = options.find(o => o.value === value)?.label;
  const isPlaceholder = !selectedLabel;

  // The visible button — shared between enabled (inside DropdownMenu) and disabled (standalone).
  const trigger = (
    <button className={styles.trigger} type="button" disabled={disabled}>
      <span className={isPlaceholder ? styles.placeholder : undefined}>
        {selectedLabel ?? placeholder ?? ""}
      </span>
      <IconDropdownIndicator width={12} height={12} className={styles.icon} />
    </button>
  );

  return (
    <div className={styles.field}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.wrapper}>
        {disabled ? (
          trigger
        ) : (
          <DropdownMenu
            trigger={trigger}
            items={options.map(opt => ({
              label: opt.label,
              onClick: () => onChange?.(opt.value),
            }))}
          />
        )}
      </div>
    </div>
  );
}
