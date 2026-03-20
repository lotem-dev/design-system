import React, { useState } from "react";
import { Card } from "../../../components/layout/Card";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import cardTsx from "../../../components/layout/Card.tsx?raw";
import cardCss from "../../../components/layout/Card.module.css?raw";

const sources = [
  { filename: "Card.tsx",        code: cardTsx },
  { filename: "Card.module.css", code: cardCss },
];

type CardPadding = "sm" | "md" | "lg";
const PADDINGS: CardPadding[] = ["sm", "md", "lg"];

// ─── Style Reference data ──────────────────────────────────────────────────────

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

type StyleRow = { prop: string; value: string; cssClass: string; properties: string[] };

const STYLE_ROWS: StyleRow[] = [
  { prop: "padding", value: "sm", cssClass: ".sm", properties: ["padding: 12px"] },
  { prop: "padding", value: "md", cssClass: ".md", properties: ["padding: 20px"] },
  { prop: "padding", value: "lg", cssClass: ".lg", properties: ["padding: 32px"] },
  { prop: "shadow",  value: "true",  cssClass: ".shadow", properties: ["box-shadow: 0 1px 4px rgba(0,0,0,0.06)"] },
  { prop: "shadow",  value: "false", cssClass: "(none)",  properties: ["no shadow applied"] },
];

const STYLE_GROUPS = STYLE_ROWS.reduce<{ prop: string; rows: StyleRow[] }[]>((acc, row) => {
  const last = acc[acc.length - 1];
  if (last && last.prop === row.prop) { last.rows.push(row); }
  else { acc.push({ prop: row.prop, rows: [row] }); }
  return acc;
}, []);

// ─── Playground ───────────────────────────────────────────────────────────────

type PlaygroundProps = {
  padding: CardPadding; onPadding: (p: CardPadding) => void;
  shadow: boolean;      onShadow:  (s: boolean)     => void;
};

function Playground({ padding, onPadding, shadow, onShadow }: PlaygroundProps) {
  const [copied, setCopied]     = useState(false);

  const snippet = `<Card padding="${padding}"${shadow ? " shadow" : ""}><p>Content</p></Card>`;

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <PlaygroundShell
        preview={
          <div style={{ width: "280px" }}>
            <Card padding={padding} shadow={shadow}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Card title</div>
                <div style={{ fontSize: "13px", color: "#71717A", lineHeight: "1.5", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
                  This is the card body. Any content can go inside - text, inputs, tables, or other components.
                </div>
              </div>
            </Card>
          </div>
        }
        controls={
          <>
            <ControlRow label="Padding">
              {PADDINGS.map(p => <Pill key={p} active={padding === p} onClick={() => onPadding(p)}>{p}</Pill>)}
            </ControlRow>
            <ControlRow label="Shadow">
              <Pill active={shadow}  onClick={() => onShadow(true)}>yes</Pill>
              <Pill active={!shadow} onClick={() => onShadow(false)}>no</Pill>
            </ControlRow>
          </>
        }
      />

      {/* Code drawer */}
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

// ─── Style Reference ──────────────────────────────────────────────────────────

type ActiveState = { padding: CardPadding; shadow: boolean };

function isActive(row: StyleRow, state: ActiveState): boolean {
  if (row.prop === "padding") return row.value === state.padding;
  if (row.prop === "shadow")  return row.value === String(state.shadow);
  return false;
}

function StyleReference({ padding, shadow }: ActiveState) {
  return (
    <div>
      {/* Base styles */}
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
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>.root</code>
              </td>
              <td style={TD}>
                {[
                  "background: var(--surface-primary)",
                  "border: 1px solid var(--stroke-secondary)",
                  "border-radius: var(--radius-lg)",
                ].map(p => (
                  <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B", lineHeight: "1.9" }}>{p}</div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Prop-driven styles */}
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
                const active = isActive(row, { padding, shadow });
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

// ─── Section ──────────────────────────────────────────────────────────────────

export function CardSection() {
  const [padding, setPadding] = useState<CardPadding>("md");
  const [shadow, setShadow]   = useState(true);

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Card</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A white surface that groups related content together. The most basic layout container in the system - use it for forms, list items, panels, and any self-contained block.
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0, position: "sticky", top: "24px", alignSelf: "flex-start" }}>
          <SectionBlock title="Playground">
            <Playground padding={padding} onPadding={setPadding} shadow={shadow} onShadow={setShadow} />
          </SectionBlock>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionBlock title="Style Reference">
            <StyleReference padding={padding} shadow={shadow} />
          </SectionBlock>
        </div>
      </div>

      <SectionBlock title="Props">
        <PropsTable source={cardTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
