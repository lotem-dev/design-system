import { useState } from "react";
import { BadgeSeverity, type SeverityScale } from "../../../components/badges/BadgeSeverity";
import { PropsTable } from "../ui/PropsTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import badgeSeverityTsx from "../../../components/badges/BadgeSeverity.tsx?raw";
import badgeSeverityCss from "../../../components/badges/BadgeSeverity.module.css?raw";

const sources = [
  { filename: "BadgeSeverity.tsx",        code: badgeSeverityTsx },
  { filename: "BadgeSeverity.module.css", code: badgeSeverityCss },
];

const SCALES: SeverityScale[] = ["critical", "high", "medium", "low"];

// ─── Style Reference ──────────────────────────────────────────────────────────

type StyleRow = {
  prop:       string;
  value:      string;
  cssClass:   string;
  properties: string[];
};

const STYLE_ROWS: StyleRow[] = [
  { prop: "scale", value: "critical", cssClass: ".critical", properties: ["background: var(--scale-critical-secondary)", "color: var(--scale-critical-primary)"] },
  { prop: "scale", value: "high",     cssClass: ".high",     properties: ["background: var(--scale-high-secondary)",     "color: var(--scale-high-primary)"] },
  { prop: "scale", value: "medium",   cssClass: ".medium",   properties: ["background: var(--scale-medium-secondary)",   "color: var(--scale-medium-primary)"] },
  { prop: "scale", value: "low",      cssClass: ".low",      properties: ["background: var(--scale-low-secondary)",      "color: var(--scale-low-primary)"] },
  { prop: "size", value: "sm", cssClass: ".sm", properties: ["composes: label-bold", "padding: 2px 8px", "font-size: var(--font-size-sm)"] },
  { prop: "size", value: "lg", cssClass: ".lg", properties: ["composes: body-bold", "padding: 4px 12px", "font-size: var(--font-size-base)"] },
];

const STYLE_GROUPS = STYLE_ROWS.reduce<{ prop: string; rows: StyleRow[] }[]>((acc, row) => {
  const last = acc[acc.length - 1];
  if (last && last.prop === row.prop) { last.rows.push(row); }
  else { acc.push({ prop: row.prop, rows: [row] }); }
  return acc;
}, []);

const TH: React.CSSProperties = {
  textAlign: "left", padding: "6px 12px 10px",
  fontSize: "11px", fontWeight: 600, color: "#A1A1AA",
  textTransform: "uppercase", letterSpacing: "0.06em",
  fontFamily: "'Open Sans', system-ui, sans-serif",
  whiteSpace: "nowrap", borderBottom: "2px solid #E4E4E7",
};

const TD: React.CSSProperties = {
  padding: "10px 12px", verticalAlign: "top", borderBottom: "1px solid #F4F4F5",
};

type ActiveState = { scale: SeverityScale; size: "sm" | "lg" };

function isActive({ prop, value }: StyleRow, state: ActiveState): boolean {
  if (prop === "scale") return value === state.scale;
  if (prop === "size")  return value === state.size;
  return false;
}

function StyleReference(state: ActiveState) {
  return (
    <div>
      <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        Base - always applied regardless of props.
      </p>
      <div style={{ overflowX: "auto", marginBottom: "28px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={TH}>Class</th>
              <th style={TH}>Properties</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...TD, whiteSpace: "nowrap" }}>
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>.badge</code>
              </td>
              <td style={TD}>
                {["display: inline-flex", "align-items: center", "border-radius: var(--radius-round)", "font-weight: var(--font-weight-bold)", "white-space: nowrap"].map(p => (
                  <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B", lineHeight: "1.9" }}>{p}</div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        Prop-driven - updates as you interact with the playground above.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={TH}>Prop</th>
              <th style={TH}>Value</th>
              <th style={TH}>Class</th>
              <th style={TH}>Properties</th>
            </tr>
          </thead>
          <tbody>
            {STYLE_GROUPS.map(({ prop, rows }) =>
              rows.map((row, i) => {
                const active = isActive(row, state);
                return (
                  <tr key={`${prop}-${row.value}`} style={{ backgroundColor: active ? "#F4F4F5" : "transparent" }}>
                    {i === 0 && (
                      <td rowSpan={rows.length} style={{ ...TD, borderRight: "1px solid #F4F4F5", verticalAlign: "middle" }}>
                        <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#EBEBEB", padding: "2px 6px", borderRadius: "4px", whiteSpace: "nowrap" }}>{prop}</code>
                      </td>
                    )}
                    <td style={{ ...TD, whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#09090B" : "#71717A", fontWeight: active ? 700 : 400 }}>
                        {row.value}
                      </span>
                    </td>
                    <td style={{ ...TD, whiteSpace: "nowrap" }}>
                      <code style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#18181B" : "#A1A1AA", backgroundColor: active ? "#E4E4E7" : "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>
                        {row.cssClass}
                      </code>
                    </td>
                    <td style={TD}>
                      {row.properties.map(p => (
                        <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#18181B" : "#A1A1AA", lineHeight: "1.9" }}>{p}</div>
                      ))}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Playground ───────────────────────────────────────────────────────────────

type PlaygroundProps = {
  scale: SeverityScale; onScale: (s: SeverityScale) => void;
  size: "sm" | "lg";   onSize:  (s: "sm" | "lg")   => void;
};

function Playground({ scale, onScale, size, onSize }: PlaygroundProps) {
  const [copied, setCopied] = useState(false);
  const snippet = `<BadgeSeverity scale="${scale}" size="${size}" />`;

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <PlaygroundShell
        preview={<BadgeSeverity scale={scale} size={size} />}
        controls={
          <>
            <ControlRow label="Scale">
              {SCALES.map(s => <Pill key={s} active={scale === s} onClick={() => onScale(s)}>{s}</Pill>)}
            </ControlRow>
            <ControlRow label="Size">
              <Pill active={size === "lg"} onClick={() => onSize("lg")}>lg</Pill>
              <Pill active={size === "sm"} onClick={() => onSize("sm")}>sm</Pill>
            </ControlRow>
          </>
        }
      />

      <div style={{ marginTop: "12px" }}>
          <div style={{ position: "relative" }}>
            <pre style={{
              margin: 0, padding: "14px 52px 14px 16px",
              backgroundColor: "#18181B", borderRadius: "8px",
              fontSize: "12px", fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              color: "#E4E4E7", lineHeight: "1.7", overflowX: "auto", whiteSpace: "pre",
            }}>
              {snippet}
            </pre>
            <button onClick={copy} style={{
              position: "absolute", top: "10px", right: "10px",
              padding: "3px 10px", fontSize: "11px",
              fontFamily: "'Open Sans', system-ui, sans-serif", fontWeight: 600,
              color: copied ? "#A1A1AA" : "#71717A",
              backgroundColor: "#27272A", border: "1px solid #3F3F46",
              borderRadius: "5px", cursor: "pointer", transition: "color 0.15s",
            }}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
      </div>
    </>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function BadgeSeveritySection() {
  const [scale, setScale] = useState<SeverityScale>("critical");
  const [size, setSize]   = useState<"sm" | "lg">("lg");

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>BadgeSeverity</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Displays the severity level of a security finding. Comes in two sizes - large for prominent display, small for dense tables and lists.
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0, position: "sticky", top: "24px", alignSelf: "flex-start" }}>
          <SectionBlock title="Playground">
            <Playground scale={scale} onScale={setScale} size={size} onSize={setSize} />
          </SectionBlock>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionBlock title="Style Reference">
            <StyleReference scale={scale} size={size} />
          </SectionBlock>
        </div>
      </div>

      <SectionBlock title="Props">
        <PropsTable source={badgeSeverityTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
