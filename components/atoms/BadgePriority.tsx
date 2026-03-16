// BadgePriority — a small colored label that shows a numeric priority score for a finding.
// The background color reflects the priority tier: Critical, High, or Medium.
// Unlike BadgeSeverity, this badge displays a number (e.g. "87") rather than a word.
// Used in findings tables where a score-based priority ranking is shown alongside severity.
import styles from "./BadgePriority.module.css";

// The three priority tiers — controls the badge color. Matches the "Priority" options in Figma.
export type PriorityScore = "critical" | "high" | "medium";

type BadgePriorityProps = {
  // Which priority tier to show — controls the badge background color.
  priorityScore: PriorityScore;
  // The numeric score to display inside the badge, e.g. "87". Defaults to "100".
  text?: string;
};

export function BadgePriority({ priorityScore, text = "100" }: BadgePriorityProps) {
  return (
    <span className={[styles.badge, styles[priorityScore]].join(" ")}>
      {text}
    </span>
  );
}
