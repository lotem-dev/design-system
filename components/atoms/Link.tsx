import * as React from "react";
import styles from "./Link.module.css";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  // Color control via token string only.
  // Example: "var(--brand-primary)" or "var(--text-primary)"
  colorToken?: string;
  // If true: opens in a new tab with rel="noopener noreferrer"
  external?: boolean;
};

export function Link({ href, children, colorToken, external }: LinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={styles.link}
      style={{ color: colorToken }}
    >
      {children}
    </a>
  );
}
