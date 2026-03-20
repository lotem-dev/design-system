// Pagination — a footer bar for navigating pages of data.
// Left side shows items per page; right side shows the result range and page navigation.
// Active page is bold and brand-colored — no bordered buttons.
// Use below tables or lists that are split into pages.
import styles from "./Pagination.module.css";
import { IconChevronLeft } from "../icons/chevrons/IconChevronLeft";
import { IconChevronRight } from "../icons/chevrons/IconChevronRight";

export type PaginationProps = {
  // The currently active page number. 1-indexed (first page = 1).
  page: number;
  // The total number of pages available.
  total: number;
  // Called with the new page number when the user clicks a page button or chevron.
  onChange: (page: number) => void;
  // Number of items shown per page. Shown as "View N items per page". Defaults to 50.
  pageSize?: number;
  // Total number of items across all pages. Used to show "Results: X - Y of Z".
  totalItems?: number;
  // How many page numbers to show on each side of the current page. Defaults to 1.
  siblings?: number;
};

function getRange(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function buildPages(page: number, total: number, siblings: number): (number | "...")[] {
  const totalShown = siblings * 2 + 5; // siblings on each side + current + 2 ends + 2 dots

  if (total <= totalShown) {
    return getRange(1, total);
  }

  const leftSibling  = Math.max(page - siblings, 1);
  const rightSibling = Math.min(page + siblings, total);

  const showLeftDots  = leftSibling > 2;
  const showRightDots = rightSibling < total - 1;

  if (!showLeftDots && showRightDots) {
    return [...getRange(1, 3 + siblings * 2), "...", total];
  }

  if (showLeftDots && !showRightDots) {
    return [1, "...", ...getRange(total - (2 + siblings * 2), total)];
  }

  return [1, "...", ...getRange(leftSibling, rightSibling), "...", total];
}

export function Pagination({ page, total, onChange, pageSize = 50, totalItems, siblings = 1 }: PaginationProps) {
  const pages = buildPages(page, total, siblings);

  const resultStart = totalItems != null ? (page - 1) * pageSize + 1 : null;
  const resultEnd   = totalItems != null ? Math.min(page * pageSize, totalItems) : null;

  return (
    <div className={styles.root}>
      <span className={styles.meta}>View {pageSize} items per page</span>

      <div className={styles.right}>
        {totalItems != null && (
          <span className={styles.meta}>
            Results: {resultStart} - {resultEnd} of {totalItems}
          </span>
        )}

        <nav className={styles.nav} aria-label="Pagination">
          <button
            className={styles.chevronBtn}
            onClick={() => onChange(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
          >
            <IconChevronLeft width={15} height={15} />
          </button>

          {pages.map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className={styles.dots}>...</span>
            ) : (
              <button
                key={p}
                className={`${styles.pageBtn} ${p === page ? styles.active : ""}`}
                onClick={() => onChange(p as number)}
                aria-current={p === page ? "page" : undefined}
              >
                {p}
              </button>
            )
          )}

          <button
            className={styles.chevronBtn}
            onClick={() => onChange(page + 1)}
            disabled={page >= total}
            aria-label="Next page"
          >
            <IconChevronRight width={15} height={15} />
          </button>
        </nav>
      </div>
    </div>
  );
}
