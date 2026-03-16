// Spinner — an animated loading indicator.
// Use while content is loading or an action is in progress.
// SVG circle with a rotating partial stroke — no external dependencies.
// Three sizes and a configurable color.
import styles from "./Spinner.module.css";

type SpinnerProps = {
  // Visual size. sm=16px, md=24px, lg=32px. Defaults to "md".
  size?: "sm" | "md" | "lg";
  // CSS color value for the spinner arc. Defaults to var(--brand-primary).
  color?: string;
};

const SIZE_MAP = { sm: 16, md: 24, lg: 32 };

export function Spinner({ size = "md", color = "var(--brand-primary)" }: SpinnerProps) {
  const px = SIZE_MAP[size];
  const radius = (px - 4) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      className={styles.spinner}
      aria-label="Loading"
      role="status"
    >
      {/* Track circle */}
      <circle
        cx={px / 2}
        cy={px / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        style={{ color: "var(--stroke-secondary)" }}
      />
      {/* Animated arc */}
      <circle
        cx={px / 2}
        cy={px / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.75}
        style={{ transformOrigin: "center" }}
      />
    </svg>
  );
}
