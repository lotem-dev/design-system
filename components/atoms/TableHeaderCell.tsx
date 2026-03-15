import { Checkbox } from "./Checkbox";
import { IconSortDefault }     from "../icons/sorting/IconSortDefault";
import { IconSortAscending }   from "../icons/sorting/IconSortAscending";
import { IconSortDescending }  from "../icons/sorting/IconSortDescending";
import styles from "./TableHeaderCell.module.css";

// ─── Types ────────────────────────────────────────────────

export type TableHeaderCellColumn =
  | "checkbox"   // leftmost cell — contains a checkbox
  | "first"      // first text column — wider left padding
  | "regular"    // any middle column — equal padding
  | "last"       // last text column — wider right padding
  | "actions";   // rightmost cell — empty, reserved for row actions

export type SortDirection = "none" | "asc" | "desc";

export type TableHeaderCellProps = {
  column?: TableHeaderCellColumn;
  /** Column label — shown in text columns, uppercase */
  label?: string;
  /** Current sort direction — shows the matching sort icon */
  sort?: SortDirection;
  /** Called when the user clicks to sort */
  onSort?: () => void;
  /** Checked state for the checkbox column */
  checked?: boolean;
  onCheck?: (checked: boolean) => void;
};

// ─── Sort icon ────────────────────────────────────────────

function SortIcon({ direction }: { direction: SortDirection }) {
  const Icon =
    direction === "asc"  ? IconSortAscending  :
    direction === "desc" ? IconSortDescending :
    IconSortDefault;
  return <Icon width={12} height={12} className={styles.sortIcon} />;
}

// ─── Component ────────────────────────────────────────────

export function TableHeaderCell({
  column   = "regular",
  label    = "Column",
  sort     = "none",
  onSort,
  checked  = false,
  onCheck,
}: TableHeaderCellProps) {
  const isTextColumn = column === "first" || column === "regular" || column === "last";

  const cellClass = [
    styles.cell,
    styles[column],
  ].join(" ");

  if (isTextColumn) {
    return (
      <th className={cellClass} onClick={onSort} style={{ cursor: onSort ? "pointer" : "default" }}>
        <div className={styles.inner}>
          <span className={styles.label}>{label}</span>
          <SortIcon direction={sort} />
        </div>
      </th>
    );
  }

  if (column === "checkbox") {
    return (
      <th className={cellClass}>
        <Checkbox checked={checked} onChange={onCheck ?? (() => {})} />
      </th>
    );
  }

  // actions — empty cell
  return <th className={cellClass} />;
}
