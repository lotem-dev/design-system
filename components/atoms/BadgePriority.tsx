import styles from "./BadgePriority.module.css";

export type PriorityScore = "critical" | "high" | "medium";

type BadgePriorityProps = {
  priorityScore: PriorityScore;
  /** The numeric score to display, e.g. "87" */
  text?: string;
};

export function BadgePriority({ priorityScore, text = "100" }: BadgePriorityProps) {
  return (
    <span className={[styles.badge, styles[priorityScore]].join(" ")}>
      {text}
    </span>
  );
}
