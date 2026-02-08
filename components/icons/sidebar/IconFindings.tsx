import * as React from "react";

/** Sidebar icon (themable via currentColor) */
export function IconFindings(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
<path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12 8V12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12 16H12.01" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  );
}
