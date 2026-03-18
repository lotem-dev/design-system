import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";

import globalsCss from "../../../styles/globals.css?raw";

const sources = [{ filename: "globals.css", code: globalsCss }];

const LAYERS = [
  {
    file: "colors.css",
    description: "All color primitives (neutrals, purple, pink, red…) and semantic tokens (--brand-primary, --text-primary, etc.)",
  },
  {
    file: "typography.css",
    description: "Font families, sizes, line heights, and font weights used across the system.",
  },
  {
    file: "spacing.css",
    description: "A 6-step spacing scale from 2px to 40px. Always use these instead of hardcoded values.",
  },
  {
    file: "radius.css",
    description: "Border radius values from sharp (2px) to pill (9999px).",
  },
];

export function GlobalsCssSection() {
  return (
    <SplitPage files={sources} alwaysOpen>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Globals</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          The entry point for the entire design system. It does two things: imports all token layers in the correct order, and applies a CSS reset that zeroes out browser defaults so our tokens are the only thing influencing how elements look.
        </p>
      </div>

      <SectionBlock title="Token layers imported">
        <p style={{ fontSize: "14px", color: "#52525B", lineHeight: "1.6", marginBottom: "20px" }}>
          These four files are the source of truth for every visual decision. Changing a value here changes it everywhere.
        </p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {LAYERS.map(({ file, description }, i) => (
            <div key={file} style={{
              display: "flex", gap: "16px", alignItems: "flex-start",
              padding: "10px 0",
              borderBottom: i < LAYERS.length - 1 ? "1px solid #F4F4F5" : "none",
            }}>
              <code style={{
                fontSize: "12px", fontWeight: 600, color: "#18181B",
                fontFamily: "monospace", whiteSpace: "nowrap", flexShrink: 0,
                paddingTop: "1px", minWidth: "120px",
              }}>
                {file}
              </code>
              <span style={{ fontSize: "13px", color: "#52525B", lineHeight: "1.5" }}>
                {description}
              </span>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="CSS Reset">
        <p style={{ fontSize: "14px", color: "#52525B", lineHeight: "1.6" }}>
          After the token imports, globals.css applies a minimal reset. Every browser ships with its own default styles - margins, paddings, font sizes. The reset wipes all of that out so components look the same in every browser. It also sets <code style={{ fontFamily: "monospace", fontSize: "13px", background: "#F4F4F5", padding: "1px 5px", borderRadius: "4px" }}>box-sizing: border-box</code> globally, which means padding is included inside element widths rather than added on top.
        </p>
      </SectionBlock>
    </SplitPage>
  );
}
