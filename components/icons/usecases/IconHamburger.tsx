import * as React from "react";

/** Usecase icon */
export function IconHamburger(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
<path d="M12.5 4H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
<path d="M12.5 12H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
<path d="M12.5 20H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
</svg>
  );
}
