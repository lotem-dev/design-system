// Pagination — allows the user to navigate through multiple pages of data.
// Shows page numbers around the current page with prev/next arrows.
// Use below tables or lists that are split into pages.
import styles from "./Pagination.module.css";

export type PaginationProps = {
  // The currently active page number. 1-indexed (first page = 1).
  page: number;
  // The total number of pages available.
  total: number;
  // Called with the new page number when the user clicks a page button.
  onChange: (page: number) => void;
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
    const leftRange = getRange(1, 3 + siblings * 2);
    return [...leftRange, "...", total];
  }

  if (showLeftDots && !showRightDots) {
    const rightRange = getRange(total - (2 + siblings * 2), total);
    return [1, "...", ...rightRange];
  }

  return [1, "...", ...getRange(leftSibling, rightSibling), "...", total];
}

export function Pagination({ page, total, onChange, siblings = 1 }: PaginationProps) {
  const pages = buildPages(page, total, siblings);

  return (
    <nav className={styles.root} aria-label="Pagination">
      {/* Previous button */}
      <button
        className={`${styles.btn} ${styles.arrow}`}
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className={styles.dots}>…</span>
        ) : (
          <button
            key={p}
            className={`${styles.btn} ${p === page ? styles.active : ""}`}
            onClick={() => onChange(p as number)}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}

      {/* Next button */}
      <button
        className={`${styles.btn} ${styles.arrow}`}
        onClick={() => onChange(page + 1)}
        disabled={page >= total}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
}
