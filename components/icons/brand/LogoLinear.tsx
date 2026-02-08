import * as React from "react";

/**
 * Brand logo — keeps original colors.
 * Do NOT convert fills/strokes to currentColor.
 */
export function LogoLinear(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
<g clipPath="url(#clip0_231818_1055)">
<path d="M0.176331 16.3621L11.6379 27.8237C5.78486 26.8343 1.1657 22.2152 0.176331 16.3621Z" fill="#5E6AD2"/>
<path d="M0 13.2505L14.7495 28C15.6267 27.9531 16.4825 27.8256 17.3095 27.6246L0.375371 10.6905C0.174422 11.5176 0.0468694 12.3733 0 13.2505Z" fill="#5E6AD2"/>
<path d="M1.10947 8.48934L19.5107 26.8905C20.1809 26.6029 20.8241 26.2645 21.4356 25.8801L2.11987 6.56443C1.73552 7.17588 1.39711 7.81913 1.10947 8.48934Z" fill="#5E6AD2"/>
<path d="M3.36658 4.87581C5.93588 1.89041 9.74213 0 13.9899 0C21.7275 0 28 6.27253 28 14.0101C28 18.2579 26.1096 22.0641 23.1242 24.6334L3.36658 4.87581Z" fill="#5E6AD2"/>
</g>
<defs>
<clipPath id="clip0_231818_1055">
<rect width="28" height="28" fill="white"/>
</clipPath>
</defs>
</svg>
  );
}
