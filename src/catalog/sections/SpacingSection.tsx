import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";

import globalsCss from "../../../styles/globals.css?raw";

const sources = [{ filename: "globals.css", code: globalsCss }];

const SPACING = [
  { token: "--space-2xs", value: "2px",  px: 2  },
  { token: "--space-xs",  value: "4px",  px: 4  },
  { token: "--space-sm",  value: "8px",  px: 8  },
  { token: "--space-base",value: "12px", px: 12 },
  { token: "--space-lg",  value: "20px", px: 20 },
  { token: "--space-xl",  value: "40px", px: 40 },
];

export function SpacingSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>🪨 Foundation</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Spacing</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Always use spacing tokens instead of hardcoded pixel values. This keeps layout consistent and makes global scale changes possible from one place.
        </p>
      </div>

      <SectionBlock title="Spacing Scale">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
          {SPACING.map(({ token, value, px }) => (
            <div key={token} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <code style={{ fontSize: "12px", color: "#18181B", width: "140px", flexShrink: 0, fontFamily: "monospace" }}>{token}</code>
              <div style={{ width: `${px * 2}px`, height: "20px", backgroundColor: "#5E32FF", borderRadius: "3px", flexShrink: 0 }} />
              <code style={{ fontSize: "12px", color: "#71717A", fontFamily: "monospace" }}>{value}</code>
            </div>
          ))}
        </div>
        <TokenTable rows={SPACING.map(({ token, value }) => ({ property: "spacing", token, value }))} />
      </SectionBlock>
    </SplitPage>
  );
}
