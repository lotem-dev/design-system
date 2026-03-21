import * as React from "react";

// Down chevron is active (primary), up chevron is muted.
export function IconSortDescending(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 12 19"
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ width: 12, height: 19, flexShrink: 0, ...props.style }}
    >
      <path d="M2 8L6 5L10 8" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 11L6 14L10 11" stroke="var(--text-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
