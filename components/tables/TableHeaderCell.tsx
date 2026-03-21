// TableHeaderCell — a single header cell in a data table, with built-in support for sorting and row selection.
// Five column roles are supported: checkbox (leftmost, select-all), first, regular, last (text columns), and actions (empty rightmost).
// Text columns show the column label in uppercase and a sort icon that cycles between default, ascending, and descending.
// Used inside table header rows wherever data needs to be labeled and optionally sorted.
import { Checkbox } from "../interactions/Checkbox";
import { IconSortDefault }     from "../icons/sorting/IconSortDefault";
import { IconSortAscending }   from "../icons/sorting/IconSortAscending";
import { IconSortDescending }  from "../icons/sorting/IconSortDescending";
import styles from "./TableHeaderCell.module.css";

// ─── Types ────────────────────────────────────────────────

// The role of this cell in the table — controls padding and what content is shown.
export type TableHeaderCellColumn =
  | "checkbox"   // leftmost cell — contains a checkbox for selecting all rows
  | "first"      // first text column — has wider left padding
  | "regular"    // any middle column — equal padding on both sides
  | "last"       // last text column — has wider right padding
  | "actions";   // rightmost cell — always empty, reserved for row action buttons

// The current sort state of this column — controls which sort icon is displayed.
export type SortDirection = "none" | "asc" | "desc";

export type TableHeaderCellProps = {
  // The role of this cell — controls layout and content. Defaults to "regular".
  column?: TableHeaderCellColumn;
  // The column heading text — shown uppercase in text columns. Defaults to "Column".
  label?: string;
  // Which sort direction is currently active — determines the sort icon shown.
  sort?: SortDirection;
  // Called when the user clicks the cell to toggle the sort direction.
  onSort?: () => void;
  // Whether the select-all checkbox is checked (only used when column is "checkbox").
  checked?: boolean;
  // Called when the select-all checkbox is toggled.
  onCheck?: (checked: boolean) => void;
};

// ─── Sort icon ────────────────────────────────────────────

// Picks the correct sort icon based on the current sort direction.
function SortIcon({ direction }: { direction: SortDirection }) {
  const Icon =
    direction === "asc"  ? IconSortAscending  :
    direction === "desc" ? IconSortDescending :
    IconSortDefault;
  return <Icon width={12} height={19} className={styles.sortIcon} />;
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
  // True for any column that shows a label and a sort icon (not checkbox or actions).
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
