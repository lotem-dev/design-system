import { useState } from "react";
import { Divider } from "../../../components/foundation/Divider";
import { PropsTable } from "../ui/PropsTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import dividerTsx from "../../../components/foundation/Divider.tsx?raw";

const sources = [
  { filename: "Divider.tsx", code: dividerTsx },
];

// ─── Style reference data ──────────────────────────────────────────────────────

const TH: React.CSSProperties = {
  textAlign: "left", padding: "6px 12px 10px",
  fontSize: "11px", fontWeight: 600, color: "#A1A1AA",
  textTransform: "uppercase", letterSpacing: "0.06em",
  fontFamily: "'Open Sans', system-ui, sans-serif",
  whiteSpace: "nowrap", borderBottom: "2px solid #E4E4E7",
};
const TD: React.CSSProperties = {
  padding: "10px 12px", verticalAlign: "top",
  borderBottom: "1px solid #F4F4F5",
};

type StyleRow = { condition: string; properties: string[] };

const BASE_ROWS: StyleRow[] = [
  { condition: "always",               properties: ["backgroundColor: color", "flexShrink: 0"] },
];

const ORIENTATION_ROWS: StyleRow[] = [
  { condition: 'orientation="horizontal"', properties: ["width: 100%", "height: thickness", "marginBlock: spacing"] },
  { condition: 'orientation="vertical"',   properties: ["height: 100%", "width: thickness", "marginInline: spacing", "alignSelf: stretch"] },
];

// ─── Playground ───────────────────────────────────────────────────────────────

function Playground({ orientation, onOrientation }: {
  orientation: "horizontal" | "vertical";
  onOrientation: (o: "horizontal" | "vertical") => void;
}) {
  const preview = orientation === "horizontal" ? (
    <div style={{ width: "200px", display: "flex", flexDirection: "column" }}>
      <span style={{ fontSize: "13px", color: "var(--text-primary)", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Section A</span>
      <Divider orientation="horizontal" />
      <span style={{ fontSize: "13px", color: "var(--text-primary)", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Section B</span>
    </div>
  ) : (
    <div style={{ display: "flex", alignItems: "center", height: "48px" }}>
      <span style={{ fontSize: "13px", color: "var(--text-primary)", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Item A</span>
      <Divider orientation="vertical" />
      <span style={{ fontSize: "13px", color: "var(--text-primary)", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Item B</span>
    </div>
  );

  return (
    <PlaygroundShell
      preview={preview}
      controls={
        <ControlRow label="Orient.">
          <Pill active={orientation === "horizontal"} onClick={() => onOrientation("horizontal")}>horizontal</Pill>
          <Pill active={orientation === "vertical"}   onClick={() => onOrientation("vertical")}>vertical</Pill>
        </ControlRow>
      }
    />
  );
}

// ─── Style Reference ──────────────────────────────────────────────────────────

function StyleReference({ orientation }: { orientation: "horizontal" | "vertical" }) {
  return (
    <div>
      <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        Base - always applied regardless of props.
      </p>
      <div style={{ marginBottom: "28px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><th style={TH}>Condition</th><th style={TH}>Properties</th></tr></thead>
          <tbody>
            {BASE_ROWS.map(row => (
              <tr key={row.condition}>
                <td style={{ ...TD, whiteSpace: "nowrap" }}>
                  <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>{row.condition}</code>
                </td>
                <td style={TD}>
                  {row.properties.map(p => (
                    <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B", lineHeight: "1.9" }}>{p}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        Prop-driven - updates as you interact with the playground above.
      </p>
      <div>
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: "40%" }} />
            <col style={{ width: "60%" }} />
          </colgroup>
          <thead>
            <tr>
              <th style={TH}>Condition</th>
              <th style={TH}>Properties</th>
            </tr>
          </thead>
          <tbody>
            {ORIENTATION_ROWS.map(row => {
              const active = row.condition.includes(`"${orientation}"`);
              return (
                <tr key={row.condition} style={{ backgroundColor: active ? "#F4F4F5" : "transparent" }}>
                  <td style={{ ...TD, wordBreak: "break-word" }}>
                    <code style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#18181B" : "#A1A1AA", backgroundColor: active ? "#E4E4E7" : "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>{row.condition}</code>
                  </td>
                  <td style={TD}>
                    {row.properties.map(p => (
                      <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#18181B" : "#A1A1AA", lineHeight: "1.9" }}>{p}</div>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function DividerSection() {
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Divider</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A visual separator between sections of content. Supports horizontal (between rows) and vertical (between side-by-side elements).
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0, position: "sticky", top: "24px", alignSelf: "flex-start" }}>
          <SectionBlock title="Playground">
            <Playground orientation={orientation} onOrientation={setOrientation} />
          </SectionBlock>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionBlock title="Style Reference">
            <StyleReference orientation={orientation} />
          </SectionBlock>
        </div>
      </div>

      <SectionBlock title="Props">
        <PropsTable source={dividerTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
