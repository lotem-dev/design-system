import styles from "./PriorityGauge.module.css";

export type PriorityGaugeProps = {
  /** 0–100. Controls needle position and displayed number. */
  score: number;
  priority: "P1" | "P2" | "P3";
};

// ─── SVG geometry ─────────────────────────────────────────

const CX = 50;          // circle center x
const CY = 50;          // circle center y (sits below visible area)
const R_OUTER = 46;
const R_INNER = 30;
const NEEDLE_R = 38;    // needle tip reaches into the arc

/** Convert SVG-degree angle to x,y on circle of radius r */
function polar(r: number, deg: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
}

/**
 * Build a donut-arc SVG path.
 * Angles are in SVG degrees (0° = right, clockwise).
 * The arc travels counterclockwise (sweep=0) from startDeg to endDeg.
 */
function arcSeg(startDeg: number, endDeg: number): string {
  const [x1, y1] = polar(R_OUTER, startDeg);
  const [x2, y2] = polar(R_OUTER, endDeg);
  const [x3, y3] = polar(R_INNER, endDeg);
  const [x4, y4] = polar(R_INNER, startDeg);
  const span  = ((startDeg - endDeg) + 360) % 360;
  const large = span > 180 ? 1 : 0;
  const f = (n: number) => n.toFixed(2);
  return [
    `M ${f(x1)} ${f(y1)}`,
    `A ${R_OUTER} ${R_OUTER} 0 ${large} 0 ${f(x2)} ${f(y2)}`,
    `L ${f(x3)} ${f(y3)}`,
    `A ${R_INNER} ${R_INNER} 0 ${large} 1 ${f(x4)} ${f(y4)}`,
    "Z",
  ].join(" ");
}

// ─── Static arc paths (precomputed — score-independent) ───

const ARC_YELLOW = arcSeg(239, 181); // low score zone
const ARC_ORANGE = arcSeg(299, 241); // mid score zone
const ARC_RED    = arcSeg(359, 301); // high score zone

// ─── Component ────────────────────────────────────────────

export function PriorityGauge({ score, priority }: PriorityGaugeProps) {
  const s = Math.max(0, Math.min(100, score));

  // Needle angle: score 0 → SVG 180° (left), score 100 → SVG 360°/0° (right)
  // Travelling counterclockwise through the top of the arc.
  const needleAngle = 180 + s * 1.8;
  const [nx, ny] = polar(NEEDLE_R, needleAngle);

  return (
    <div className={styles.wrapper}>

      {/* Gauge arc */}
      <svg viewBox="0 0 100 52" width={100} height={52} className={styles.svg}>
        <path d={ARC_YELLOW} fill="var(--warning-primary)" />
        <path d={ARC_ORANGE} fill="var(--scale-high-primary)" />
        <path d={ARC_RED}    fill="var(--scale-critical-primary)" />

        {/* Needle */}
        <line
          x1={CX} y1={CY}
          x2={nx.toFixed(2)} y2={ny.toFixed(2)}
          stroke="var(--neutral-700)" strokeWidth="1.5" strokeLinecap="round"
        />
        <circle cx={CX} cy={CY} r="3" fill="var(--neutral-700)" />
      </svg>

      {/* Score + priority label */}
      <div className={styles.labels}>
        <span className={styles.score}>{score}</span>
        <span className={styles.priority}>{priority}</span>
      </div>

    </div>
  );
}
