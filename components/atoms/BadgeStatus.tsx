import * as React from "react";
import { TextRole } from "../typography/TextRole";

export type BadgeStatus = "open" | "fixed" | "ignored";

type BadgeStatusProps = {
  status: BadgeStatus;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

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
        paddingInline: "var(--badge-padding-x)",
        paddingBlock: "var(--badge-padding-y)",
        borderRadius: "var(--badge-radius)",
        border: "1px solid var(--stroke-primary)",
        backgroundColor: colors.bg,
        ...style,
      }}
    >
      <TextRole role="badgeStatus" style={{ color: colors.fg }}>
        {children ?? status}
      </TextRole>
    </div>
  );
}
