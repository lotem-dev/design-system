import * as React from "react";

// Up chevron is active (primary), down chevron is muted.
export function IconSortAscending(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 12 19"
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M2 8L6 5L10 8" stroke="var(--text-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 11L6 14L10 11" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
