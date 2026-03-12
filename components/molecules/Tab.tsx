import type { MouseEvent } from "react";
import styles from "./Tab.module.css";

type TabProps = {
  label: string;
  count?: number;
  selected?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export function Tab({ label, count, selected = false, onClick }: TabProps) {
  return (
    <button
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      className={[styles.tab, selected ? styles["tab--selected"] : ""].join(" ")}
    >
      <div className={styles.inner}>
        <span className={styles.label}>{label}</span>
        {count !== undefined && (
          <span className={styles.badge}>{count}</span>
        )}
      </div>
      <div className={styles.bar} />
    </button>
  );
}
