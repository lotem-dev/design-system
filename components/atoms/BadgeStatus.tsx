import * as React from "react";
import { Text } from "../typography/Text";

export type BadgeStatus = "open" | "fixed" | "ignored";

// Strict props: only status.
// No children/className/style overrides.
type BadgeStatusProps = {
  status: BadgeStatus;
};

// Colors per status (from existing CSS tokens).
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

// Locked label text (capitalized exactly).
const STATUS_LABELS: Record<BadgeStatus, string> = {
  open: "Open",
  fixed: "Fixed",
  ignored: "Ignored",
};

export function BadgeStatus({ status }: BadgeStatusProps) {
  const colors = STATUS_TOKENS[status];
  const label = STATUS_LABELS[status];

  return (
    <div
      data-status={status}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",

        paddingInline: "var(--space-sm)",
        paddingBlock: "var(--space-sm)",

        borderRadius: "var(--radius-base)",

        border: `1px solid ${colors.fg}`,
        backgroundColor: colors.bg,

        // IMPORTANT:
        // We set the text color on the wrapper.
        // Text inside will inherit this color automatically.
        color: colors.fg,
      }}
    >
      {/* Text controls typography ONLY (size/weight/tag) */}
      <Text role="badge-small">{label}</Text>
    </div>
  );
}
