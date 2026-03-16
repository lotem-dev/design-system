// Tag — a small pill label for categorizing or filtering content.
// Can be dismissed with an × button when onRemove is provided.
// Five color variants map to semantic meanings: default, brand, success, warning, error.
// Used in filter bars, metadata rows, and list item labels.
import styles from "./Tag.module.css";

type TagProps = {
  // The text shown inside the tag.
  label: string;
  // If provided, shows an × button that calls this when clicked.
  onRemove?: () => void;
  // Color variant. Defaults to "default".
  color?: "default" | "brand" | "success" | "warning" | "error";
};

export function Tag({ label, onRemove, color = "default" }: TagProps) {
  return (
    <span className={`${styles.root} ${styles[color]}`}>
      <span className={styles.label}>{label}</span>
      {onRemove && (
        <button className={styles.remove} onClick={onRemove} aria-label={`Remove ${label}`}>
          ×
        </button>
      )}
    </span>
  );
}
