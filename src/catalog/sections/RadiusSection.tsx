import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";

const RADIUS = [
  { token: "--radius-xs",    value: "4px",   note: "Inputs, small chips" },
  { token: "--radius-sm",    value: "6px",   note: "Buttons, dropdowns" },
  { token: "--radius-base",  value: "8px",   note: "Cards, modals" },
  { token: "--radius-lg",    value: "15px",  note: "Large panels" },
  { token: "--radius-round", value: "999px", note: "Pills, avatars, full-round" },
];

export function RadiusSection() {
  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Foundation</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Radius</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Border radius tokens control the roundness of components. Always use tokens instead of hardcoded values so the visual language stays consistent.
        </p>
      </div>

      <SectionBlock title="Radius Scale">
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
