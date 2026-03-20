import { useState } from "react";
import { Tooltip } from "../../../components/overlays/Tooltip";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import tooltipTsx from "../../../components/overlays/Tooltip.tsx?raw";
import tooltipCss from "../../../components/overlays/Tooltip.module.css?raw";

const sources = [
  { filename: "Tooltip.tsx",        code: tooltipTsx },
  { filename: "Tooltip.module.css", code: tooltipCss },
];

// ─── Style Reference ──────────────────────────────────────────────────────────

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

function StyleReference() {
  const rows: { cssClass: string; properties: string[] }[] = [
    { cssClass: ".tooltip", properties: ["background: var(--fill-tooltip)", "border-radius: var(--radius-base)", "padding: var(--space-base)", "max-width: 240px"] },
    { cssClass: ".text",    properties: ["composes: label", "color: var(--text-invert)"] },
    { cssClass: ".link",    properties: ["composes: label", "color: var(--text-secondary)", "text-decoration: underline on hover"] },
  ];

  return (
    <div>
      <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        Base - all styles are static; no variant props map to CSS classes.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={TH}>Class</th>
              <th style={TH}>Properties</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.cssClass}>
                <td style={{ ...TD, whiteSpace: "nowrap" }}>
                  <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>{row.cssClass}</code>
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
    </div>
  );
}

// ─── Playground ───────────────────────────────────────────────────────────────

function generateSnippet(secondary: boolean, link: boolean): string {
  const lines: string[] = ["<Tooltip"];
  lines.push(`  text="CVSS Score: 9.8"`);
  if (secondary) lines.push(`  secondaryText="Last seen 2 days ago"`);
  if (link) {
    lines.push(`  linkLabel="View details"`);
    lines.push(`  linkHref="#"`);
  }
  lines.push("/>");
  return lines.join("\n");
}

function Playground() {
  const [secondary, setSecondary] = useState(false);
  const [link, setLink]           = useState(false);
  const [copied, setCopied]       = useState(false);
  const snippet = generateSnippet(secondary, link);

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <PlaygroundShell
        preview={
          <Tooltip
            text="CVSS Score: 9.8"
            secondaryText={secondary ? "Last seen 2 days ago" : undefined}
            linkLabel={link ? "View details" : undefined}
            linkHref={link ? "#" : undefined}
          />
        }
        controls={
          <>
            <ControlRow label="Secondary">
              <Pill active={!secondary} onClick={() => setSecondary(false)}>none</Pill>
              <Pill active={secondary}  onClick={() => setSecondary(true)}>with text</Pill>
            </ControlRow>
            <ControlRow label="Link">
              <Pill active={!link} onClick={() => setLink(false)}>none</Pill>
              <Pill active={link}  onClick={() => setLink(true)}>with link</Pill>
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

export function TooltipSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Tooltip</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A dark bubble for short contextual information. Supports primary text, optional secondary text, and an optional link.
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0, position: "sticky", top: "24px", alignSelf: "flex-start" }}>
          <SectionBlock title="Playground">
            <Playground />
          </SectionBlock>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionBlock title="Style Reference">
            <StyleReference />
          </SectionBlock>
        </div>
      </div>

      <SectionBlock title="Props">
        <PropsTable source={tooltipTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
