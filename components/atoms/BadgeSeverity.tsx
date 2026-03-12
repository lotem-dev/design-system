import styles from "./BadgeSeverity.module.css";

export type SeverityScale = "critical" | "high" | "medium" | "low";
export type SeveritySize  = "sm" | "lg";

type BadgeSeverityProps = {
  scale: SeverityScale;
  size?: SeveritySize;
};

const LABELS: Record<SeverityScale, string> = {
  critical: "Critical",
  high:     "High",
  medium:   "Medium",
  low:      "Low",
};

export function BadgeSeverity({ scale, size = "lg" }: BadgeSeverityProps) {
  return (
    <span className={[styles.badge, styles[scale], styles[size]].join(" ")}>
      {LABELS[scale]}
    </span>
  );
}
