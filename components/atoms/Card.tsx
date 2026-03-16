// Card — a white box that groups related content together.
// The most basic layout container in the system.
// Three padding sizes and an optional drop shadow.
// Use as a surface for forms, list items, dashboard panels, and any self-contained content block.
import type { ReactNode } from "react";
import styles from "./Card.module.css";

type CardProps = {
  // The content inside the card.
  children: ReactNode;
  // Inner padding. sm=12px, md=20px, lg=32px. Defaults to "md".
  padding?: "sm" | "md" | "lg";
  // Whether the card has a subtle drop shadow. Defaults to true.
  shadow?: boolean;
};

export function Card({ children, padding = "md", shadow = true }: CardProps) {
  return (
    <div className={`${styles.root} ${styles[padding]} ${shadow ? styles.shadow : ""}`}>
      {children}
    </div>
  );
}
