// FormField — a layout wrapper that gives any input a consistent label, hint, and error.
// Wrap any input (TextInput, SelectInput, Textarea, etc.) as the children.
// When error is provided it replaces the hint and is shown in red.
import type { ReactNode } from "react";
import styles from "./FormField.module.css";

export type FormFieldProps = {
  // The label shown above the input.
  label: string;
  // The input element (TextInput, SelectInput, Textarea, etc.).
  children: ReactNode;
  // Helper text shown below the input in gray.
  hint?: string;
  // Validation error shown below the input in red. Overrides hint when both are set.
  error?: string;
  // When true, a red asterisk is appended to the label to signal the field is required.
  required?: boolean;
};

export function FormField({ label, children, hint, error, required }: FormFieldProps) {
  return (
    <div className={styles.root}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.asterisk} aria-hidden="true"> *</span>}
      </label>
      <div className={styles.input}>{children}</div>
      {error
        ? <p className={styles.error}>{error}</p>
        : hint
          ? <p className={styles.hint}>{hint}</p>
          : null
      }
    </div>
  );
}
