// Skeleton — a placeholder that mimics the shape of real content while it's loading.
// Shows users where content will appear without leaving a blank screen.
// Three shape variants: text (rounded), circle, and rect (square corners).
// Optional shimmer animation gives the impression of active loading.
import styles from "./Skeleton.module.css";

type SkeletonProps = {
  // Width of the skeleton block. Defaults to "100%".
  width?: string | number;
  // Height of the skeleton block. Defaults to "16px".
  height?: string | number;
  // Shape of the placeholder. "text" has small radius, "circle" is round, "rect" has no radius. Defaults to "text".
  variant?: "text" | "circle" | "rect";
  // Whether to show a shimmer animation. Defaults to true.
  animated?: boolean;
};

function toCss(val: string | number): string {
  return typeof val === "number" ? `${val}px` : val;
}

export function Skeleton({ width = "100%", height = "16px", variant = "text", animated = true }: SkeletonProps) {
  return (
    <div
      className={`${styles.root} ${styles[variant]} ${animated ? styles.animated : ""}`}
      style={{ width: toCss(width), height: toCss(height) }}
      aria-hidden="true"
    />
  );
}
