// FindingsBreakdown — a horizontal segmented bar that visualizes the distribution of security findings by severity.
// Each colored segment represents a severity level (Critical, High, Medium, Low) proportional to its count.
// Below the bar, the critical count is shown prominently, and the other three counts appear together separated by slashes.
// Used in summary cards and dashboards where a quick visual breakdown of finding counts is needed.
import styles from "./FindingsBreakdown.module.css";

export type FindingsBreakdownProps = {
  // Number of critical-severity findings. Defaults to 0.
  critical?: number;
  // Number of high-severity findings. Defaults to 0.
  high?: number;
  // Number of medium-severity findings. Defaults to 0.
  medium?: number;
  // Number of low-severity findings. Defaults to 0.
  low?: number;
};

export function FindingsBreakdown({
  critical = 0,
  high = 0,
  medium = 0,
  low = 0,
}: FindingsBreakdownProps) {
  // The sum of all findings — used to calculate each segment's width as a percentage.
  const total = critical + high + medium + low;

  // Converts a count into a CSS percentage width relative to the total.
  const pct = (n: number) => `${(n / total) * 100}%`;

  // One entry per severity level — each carries its count and the CSS class that sets its color.
  const segments = [
    { key: "critical", value: critical, cls: styles.critical },
    { key: "high",     value: high,     cls: styles.high },
    { key: "medium",   value: medium,   cls: styles.medium },
    { key: "low",      value: low,      cls: styles.low },
  ];

  return (
    <div className={styles.wrapper}>

      {/* Segmented bar */}
      <div className={styles.bar}>
        {/* If there are no findings at all, show a single gray empty bar instead of nothing. */}
        {total === 0
          ? <span className={`${styles.segment} ${styles.empty}`} style={{ width: "100%" }} />
          : segments.map(({ key, value, cls }) =>
              value > 0 && <span key={key} className={`${styles.segment} ${cls}`} style={{ width: pct(value) }} />
            )
        }
      </div>

      {/* Counts */}
      <div className={styles.counts}>
        <span className={styles.criticalCount}>{critical}</span>
        <span className={styles.otherCounts}>
          {high}<span className={styles.slash}>/</span>
          {medium}<span className={styles.slash}>/</span>
          {low}
        </span>
      </div>

    </div>
  );
}
