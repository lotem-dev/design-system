import * as React from "react";
import { Text } from "../typography/Text";

export type BadgeStatus = "open" | "fixed" | "ignored";

type BadgeStatusProps = {
  status: BadgeStatus;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * We already have status color tokens in globals.css, so we reuse them.
 * No new tokens needed.
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

export function BadgeStatus({ status, children, className, style }: BadgeStatusProps) {
  const colors = STATUS_TOKENS[status];

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",

        // Reuse existing spacing tokens (no badge-specific tokens)
        paddingInline: "var(--space-xs)",
        paddingBlock: "var(--space-2xs)",

        // Reuse existing radius token
        borderRadius: "var(--radius-round)",

        border: "1px solid var(--stroke-primary)",
        backgroundColor: colors.bg,

        ...style,
      }}
    >
      {/* Reuse the new Text component for consistent typography */}
      <Text as="span" preset="caption" style={{ color: colors.fg }}>
        {children ?? status}
      </Text>
    </div>
  );
}
