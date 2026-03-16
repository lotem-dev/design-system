// Table — a full-width data table with column headers and rows.
// Define columns once with id and label. Rows are plain objects keyed by column id.
// Use for structured data: findings, resources, audit results, etc.
import type { ReactNode } from "react";
import styles from "./Table.module.css";

export type TableColumn = {
  // A unique key used to look up the value for this column in each row object.
  id: string;
  // The human-readable heading shown in the header row.
  label: string;
  // Optional CSS width for this column, e.g. "120px" or "30%".
  width?: string;
};

export type TableProps = {
  // Column definitions — controls the header and which keys to read from rows.
  columns: TableColumn[];
  // Row data. Each row is a plain object keyed by column id. Values can be any React node.
  rows: Record<string, ReactNode>[];
};

export function Table({ columns, rows }: TableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {columns.map(col => (
              <th
                key={col.id}
                className={styles.th}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`${styles.tr} ${i % 2 === 1 ? styles.trAlt : ""}`}>
              {columns.map(col => (
                <td key={col.id} className={styles.td}>{row[col.id]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
