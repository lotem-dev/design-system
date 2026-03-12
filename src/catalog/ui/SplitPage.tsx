import type { ReactNode } from "react";
import type { SourceFile } from "./SourcePanel";
import { SourcePanel } from "./SourcePanel";

type SplitPageProps = {
  /** The spec content — previews, tables, usage examples */
  children: ReactNode;
  /** Source files to show on the right — imported via Vite's ?raw loader */
  files: SourceFile[];
};

/**
 * Two-column layout for component pages.
 *
 * Left  (55%) — spec: interactive previews, token tables, usage examples
 * Right (45%) — source: the actual component file(s), always up to date via ?raw imports
 *
 * The right panel is sticky — it stays in view as you scroll through the spec on the left.
 */
export function SplitPage({ children, files }: SplitPageProps) {
  return (
    <div style={{ display: "flex", width: "100%" }}>

      {/* Left — spec content */}
      <div style={{ flex: "0 0 55%", minWidth: 0, padding: "48px" }}>
        {children}
      </div>

      {/* Right — source panel. position:sticky keeps it in view as the left scrolls. */}
      <div style={{
        flex: "0 0 45%",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
        borderLeft: "1px solid #27272A",
      }}>
        <SourcePanel files={files} />
      </div>

    </div>
  );
}
