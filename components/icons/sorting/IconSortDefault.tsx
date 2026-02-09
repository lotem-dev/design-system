import * as React from "react";

export function IconSortDefault(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 6L8 18"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M16 6L16 18"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M6 8L8 6L10 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 16L16 18L18 16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
