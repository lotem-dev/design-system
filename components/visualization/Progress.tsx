// Progress — shows how far along a task or process is, from 0% to 100%.
// Horizontal bar with a colored fill and a neutral track.
// Four semantic color variants and two height sizes.
// Use for file uploads, onboarding steps, or any measurable completion state.
import styles from "./Progress.module.css";

type ProgressProps = {
  // Current progress value, from 0 to max.
  value: number;
  // Maximum value. Defaults to 100.
  max?: number;
  // Color of the filled bar. Defaults to "brand".
  color?: "brand" | "success" | "warning" | "error";
  // Height of the bar. sm=4px, md=8px. Defaults to "md".
  size?: "sm" | "md";
};

export function Progress({ value, max = 100, color = "brand", size = "md" }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={`${styles.track} ${styles[size]}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className={`${styles.fill} ${styles[color]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
