// EmptyState — shown when a list or table has no items to display.
// Guides the user toward the next action instead of leaving a blank space.
// Use in tables, search results, dashboards, and filtered views.
import type { ReactNode } from "react";
import styles from "./EmptyState.module.css";

export type EmptyStateProps = {
  // The main heading — what is empty.
  title: string;
  // Supporting text that explains why it's empty or what to do next.
  description?: string;
  // An optional CTA — usually a Button or Link component.
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className={styles.root}>
      <div className={styles.illustration} aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="12" fill="var(--surface-secondary)" />
          <rect x="14" y="20" width="20" height="3" rx="1.5" fill="var(--stroke-primary, #64748B)" opacity="0.3" />
          <rect x="14" y="26" width="14" height="3" rx="1.5" fill="var(--stroke-primary, #64748B)" opacity="0.2" />
          <circle cx="24" cy="15" r="4" fill="var(--stroke-primary, #64748B)" opacity="0.15" />
        </svg>
      </div>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
