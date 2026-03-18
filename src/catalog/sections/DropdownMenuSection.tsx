import { useState } from "react";
import { DropdownMenu } from "../../../components/overlays/DropdownMenu";
import { Button } from "../../../components/interactions/Button";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import dropdownTsx from "../../../components/overlays/DropdownMenu.tsx?raw";
import dropdownCss from "../../../components/overlays/DropdownMenu.module.css?raw";

const sources = [
  { filename: "DropdownMenu.tsx",        code: dropdownTsx },
  { filename: "DropdownMenu.module.css", code: dropdownCss },
];

const DEMO_ITEMS = [
  { label: "Edit",        onClick: () => alert("Edit") },
  { label: "Duplicate",   onClick: () => alert("Duplicate") },
  { label: "Move to...",  onClick: () => alert("Move"), disabled: true },
  { label: "Delete",      onClick: () => alert("Delete"), destructive: true },
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
    { cssClass: ".menu",          properties: ["background: var(--surface-primary)", "border: 1px solid var(--stroke-secondary)", "border-radius: var(--radius-base)", "box-shadow: 0 4px 16px rgba(0,0,0,0.1)", "padding: 4px"] },
    { cssClass: ".item",          properties: ["border-radius: var(--radius-sm)", "padding: var(--space-sm) var(--space-base)", "color: var(--text-primary)", "font-size: var(--font-body-size)"] },
    { cssClass: ".item:hover",    properties: ["background: var(--surface-secondary)"] },
    { cssClass: ".destructive",   properties: ["color: var(--error-primary)"] },
    { cssClass: ".destructive:hover", properties: ["background: var(--error-secondary)"] },
    { cssClass: ".item:disabled", properties: ["opacity: 0.4", "cursor: not-allowed"] },
  ];

  return (
    <div>
      <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        Base - styling is controlled by item data (destructive, disabled), not a top-level variant prop.
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

const SNIPPET = `<DropdownMenu
  trigger={<Button variant="ghost">Actions ▾</Button>}
  items={[
    { label: "Edit", onClick: () => {} },
    { label: "Duplicate", onClick: () => {} },
    { label: "Move to...", onClick: () => {}, disabled: true },
    { label: "Delete", onClick: () => {}, destructive: true },
  ]}
/>`;

function Playground() {
  const [copied, setCopied]     = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);

  function copy() {
    navigator.clipboard.writeText(SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <PlaygroundShell
        preview={
          <DropdownMenu
            trigger={<Button variant="ghost">Actions ▾</Button>}
            items={DEMO_ITEMS}
          />
        }
        controls={null}
      />

      <div style={{ marginTop: "12px" }}>
        <button
          onClick={() => setCodeOpen(o => !o)}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "none", border: "1px solid #E4E4E7", borderRadius: "6px",
            padding: "5px 12px", cursor: "pointer",
            fontSize: "12px", fontFamily: "'Open Sans', system-ui, sans-serif",
            color: "#52525B", fontWeight: 500,
            transition: "background 0.1s, border-color 0.1s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#F4F4F5"; e.currentTarget.style.borderColor = "#D4D4D8"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "#E4E4E7"; }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M4 3.5L1.5 6.5L4 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 3.5L11.5 6.5L9 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {codeOpen ? "Hide code" : "Show code"}
        </button>

        {codeOpen && (
          <div style={{ marginTop: "8px", position: "relative" }}>
            <pre style={{
              margin: 0, padding: "14px 52px 14px 16px",
              backgroundColor: "#18181B", borderRadius: "8px",
              fontSize: "12px", fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              color: "#E4E4E7", lineHeight: "1.7", overflowX: "auto", whiteSpace: "pre",
            }}>
              {SNIPPET}
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
        )}
      </div>
    </>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function DropdownMenuSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Dropdown Menu</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A floating list of actions triggered by clicking any element. Closes automatically when you click outside or select an item. Supports disabled and destructive states.
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0 }}>
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
        <PropsTable source={dropdownTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
