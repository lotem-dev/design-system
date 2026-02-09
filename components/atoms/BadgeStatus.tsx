// Import everything from the React library.
// React lets us create components and use JSX (HTML-like syntax in JavaScript).
import * as React from "react";

// Import a Text component from another file in the project.
// This is probably a reusable typography component (for font size, style, etc).
import { Text } from "../typography/Text";

// Define a TypeScript type called BadgeStatus.
// This means: status can ONLY be one of these three strings.

export type BadgeStatus = "open" | "fixed" | "ignored";

// Strict Design System props:
// - Only status is allowed.
// - No children, no className, no style overrides.

type BadgeStatusProps = {
  status: BadgeStatus;
};

/*
  Colors for each status.
  fg = foreground (text color)
  bg = background (badge background)
  We reuse existing CSS variables (tokens) from globals.css.
*/
const STATUS_TOKENS: Record<BadgeStatus, { fg: string; bg: string }> = {
  open: {
    fg: "var(--status-open-primary)",
    bg: "var(--status-open-secondary)",
  },
  fixed: {
    fg: "var(--status-fixed-primary)",
    bg: "var(--status-fixed-secondary)",
  },
  ignored: {
    fg: "var(--status-ignored-primary)",
    bg: "var(--status-ignored-secondary)",
  },
};

/*
  Locked label text.
  This prevents any developer from changing the badge text via props.
*/
const STATUS_LABELS: Record<BadgeStatus, string> = {
  open: "Open",
  fixed: "Fixed",
  ignored: "Ignored",
};

export function BadgeStatus({ status }: BadgeStatusProps) {
  // Pick colors based on the status.
  const colors = STATUS_TOKENS[status];

  // Pick the locked text label for the status.
  const label = STATUS_LABELS[status];

  return (
    <div
      // Optional: data attribute can help with testing/debugging (doesn't affect styling).
      data-status={status}
      // Locked styling: no outside overrides.
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",

        paddingInline: "var(--space-sm)",
        paddingBlock: "var(--space-sm)",

        borderRadius: "var(--radius-base)",

        // Border matches the text color (foreground).
        border: `1px solid ${colors.fg}`,

        backgroundColor: colors.bg,
      }}
    >
      {/* Locked typography + locked text */}
      <Text as="span" preset="caption" style={{ color: colors.fg }}>
        {label}
      </Text>
    </div>
  );
}
