// Breadcrumb — shows the user's current location within the page hierarchy.
// Each item except the last is typically a link. The last item is the current page.
// Use at the top of pages that are nested within a navigation tree.
import styles from "./Breadcrumb.module.css";

export type BreadcrumbItem = {
  // The human-readable label for this level of the hierarchy.
  label: string;
  // If provided, this item is rendered as an anchor link. Omit for the current (last) page.
  href?: string;
};

export type BreadcrumbProps = {
  // The hierarchy from root down to the current page.
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className={styles.root} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className={styles.item}>
              {item.href && !isLast
                ? <a href={item.href} className={styles.link}>{item.label}</a>
                : <span className={isLast ? styles.current : styles.link}>{item.label}</span>
              }
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">/</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
