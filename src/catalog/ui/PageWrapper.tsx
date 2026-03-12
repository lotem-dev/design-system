import type { ReactNode } from "react";

/** Wraps foundation/documentation pages with standard padding and max-width. */
export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div style={{ maxWidth: "800px", padding: "48px" }}>
      {children}
    </div>
  );
}
