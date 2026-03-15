import styles from "./FindingsBreakdown.module.css";

export type FindingsBreakdownProps = {
  critical?: number;
  high?: number;
  medium?: number;
  low?: number;
};

export function FindingsBreakdown({
  critical = 0,
  high = 0,
  medium = 0,
  low = 0,
}: FindingsBreakdownProps) {
  const total = critical + high + medium + low;

  const pct = (n: number) => `${(n / total) * 100}%`;

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
