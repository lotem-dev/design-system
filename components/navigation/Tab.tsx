// Tab — a single tab button used inside a TabGroup to switch between views.
// Shows a text label and an optional count badge (e.g. the number of items in that view).
// When selected, a colored underline bar appears below the tab label.
// Should always be used inside a TabGroup — not placed on its own.
import type { MouseEvent } from "react";
import styles from "./Tab.module.css";

type TabProps = {
  // The text label displayed on the tab.
  label: string;
  // An optional number shown as a small badge next to the label — e.g. item count.
  count?: number;
  // Whether this tab is currently the active/selected one. Controls the underline and text style.
  selected?: boolean;
  // Called when the user clicks this tab.
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
      {/* The colored underline bar — only visible when this tab is selected. */}
      <div className={styles.bar} />
    </button>
  );
}
