// Link — a styled anchor element for navigating to URLs, both internal and external.
// The color can be customized using a design token; by default it inherits the surrounding text color.
// External links automatically open in a new tab and include security attributes.
// Used in body text, tooltips, empty states, and anywhere a clickable URL is shown.
import * as React from "react";
import styles from "./Link.module.css";

type LinkProps = {
  // The URL to navigate to when clicked.
  href: string;
  // The visible clickable text (or any content) inside the link.
  children: React.ReactNode;
  // Optional color override using a design token — e.g. "var(--brand-primary)" or "var(--text-secondary)".
  colorToken?: string;
  // When true, the link opens in a new browser tab. Also adds security attributes automatically.
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
