// BadgeSeverity — a small colored label that communicates how severe a security finding is.
// Four severity levels are supported: Critical, High, Medium, and Low — each with a distinct color.
// Available in two sizes: sm (compact, for dense tables) and lg (default, more prominent).
// Used in findings tables, detail panels, and anywhere a severity level needs to be communicated clearly.
import styles from "./BadgeSeverity.module.css";

// The four severity levels — matches the "Scale" options in Figma.
export type SeverityScale = "critical" | "high" | "medium" | "low";
// The two size options — "lg" is the default and used in most contexts; "sm" is for tight spaces.
export type SeveritySize  = "sm" | "lg";

type BadgeSeverityProps = {
  // Which severity level to show — controls both the label text and the badge color.
  scale: SeverityScale;
  // Controls the visual size of the badge. Defaults to "lg".
  size?: SeveritySize;
};

// The display text for each severity level — always capitalized exactly this way.
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
