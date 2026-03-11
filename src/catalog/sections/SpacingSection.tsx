import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";

const SPACING = [
  { token: "--space-2xs", value: "2px",  px: 2  },
  { token: "--space-xs",  value: "4px",  px: 4  },
  { token: "--space-sm",  value: "8px",  px: 8  },
  { token: "--space-base",value: "12px", px: 12 },
  { token: "--space-lg",  value: "20px", px: 20 },
  { token: "--space-xl",  value: "40px", px: 40 },
];

const RADIUS = [
  { token: "--radius-xs",    value: "4px",   note: "Inputs, small chips" },
  { token: "--radius-sm",    value: "6px",   note: "Buttons, dropdowns" },
  { token: "--radius-base",  value: "8px",   note: "Cards, modals" },
  { token: "--radius-lg",    value: "15px",  note: "Large panels" },
  { token: "--radius-round", value: "999px", note: "Pills, avatars, full-round" },
];

export function SpacingSection() {
  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "system-ui" }}>Foundation</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "system-ui" }}>Spacing & Radius</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Always use tokens instead of hardcoded pixel values. This ensures spacing stays consistent if the scale ever changes.
        </p>
      </div>

      <SectionBlock title="Spacing Scale">
        <p style={{ margin: "0 0 20px", fontSize: "13px", color: "#71717A" }}>
          Used for padding, margin, and gap values.
        </p>
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

      <SectionBlock title="Border Radius Scale">
        <p style={{ margin: "0 0 20px", fontSize: "13px", color: "#71717A" }}>
          Used for rounded corners on components.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginBottom: "24px" }}>
          {RADIUS.map(({ token, value }) => (
            <div key={token} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "64px", height: "64px", backgroundColor: "#EDE9FE", border: "2px solid #5E32FF", borderRadius: value }} />
              <code style={{ fontSize: "10px", color: "#52525B", textAlign: "center", fontFamily: "monospace" }}>{token}</code>
              <code style={{ fontSize: "10px", color: "#A1A1AA", fontFamily: "monospace" }}>{value}</code>
            </div>
          ))}
        </div>
        <TokenTable rows={RADIUS.map(({ token, value, note }) => ({ property: "border-radius", token, value, note }))} />
      </SectionBlock>
    </div>
  );
}
