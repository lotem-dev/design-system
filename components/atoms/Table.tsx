import type { ReactNode } from "react";
import styles from "./Table.module.css";

// ─── Container ───────────────────────────────────────────────────────────────

type TableProps = {
  children: ReactNode;
  /** Makes the table scroll horizontally when the content is wider than the container */
  scrollable?: boolean;
};

export function Table({ children, scrollable = true }: TableProps) {
  return (
    <div className={scrollable ? styles.scrollWrapper : undefined}>
      <table className={styles.table}>
        {children}
      </table>
    </div>
  );
}

// ─── Head / Body ─────────────────────────────────────────────────────────────

export function TableHead({ children }: { children: ReactNode }) {
  return <thead className={styles.thead}>{children}</thead>;
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

// ─── Row ─────────────────────────────────────────────────────────────────────

export function TableRow({ children }: { children: ReactNode }) {
  return <tr className={styles.row}>{children}</tr>;
}

// ─── Header Cell ─────────────────────────────────────────────────────────────

type TableHeaderCellProps = {
  children: ReactNode;
  /** Shows a sort icon and makes the header interactive */
  sortable?: boolean;
  width?: string | number;
};

export function TableHeaderCell({ children, sortable = false, width }: TableHeaderCellProps) {
  return (
    <th className={styles.th} style={width ? { width } : undefined}>
      <span className={styles.thContent}>
        {children}
        {sortable && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M6 2L4 4.5h4L6 2ZM6 10L4 7.5h4L6 10Z" fill="currentColor" />
          </svg>
        )}
      </span>
    </th>
  );
}

// ─── Body Cell ───────────────────────────────────────────────────────────────

type TableCellProps = {
  children: ReactNode;
  width?: string | number;
  /** Muted secondary text color — for sub-text like file paths */
  muted?: boolean;
};

export function TableCell({ children, width, muted = false }: TableCellProps) {
  return (
    <td
      className={[styles.td, muted ? styles.tdMuted : ""].join(" ")}
      style={width ? { width } : undefined}
    >
      {children}
    </td>
  );
}
