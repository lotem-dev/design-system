import { useState } from "react";
import { Modal } from "../../../components/overlays/Modal";
import { Button } from "../../../components/interactions/Button";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import modalTsx from "../../../components/overlays/Modal.tsx?raw";
import modalCss from "../../../components/overlays/Modal.module.css?raw";

const sources = [
  { filename: "Modal.tsx",        code: modalTsx },
  { filename: "Modal.module.css", code: modalCss },
];

const SIZES = ["sm", "md", "lg"] as const;
type ModalSize = typeof SIZES[number];

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

type SizeRow = { value: ModalSize; maxWidth: string; note: string };

const SIZE_ROWS: SizeRow[] = [
  { value: "sm", maxWidth: "400px",  note: "Confirmations, simple prompts" },
  { value: "md", maxWidth: "560px",  note: "Forms, standard dialogs" },
  { value: "lg", maxWidth: "720px",  note: "Complex content, data tables" },
];

function StyleReference({ size }: { size: ModalSize }) {
  return (
    <div>
      {/* Base */}
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
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>.backdrop</code>
              </td>
              <td style={TD}>
                {["background: rgba(0,0,0,0.48)", "position: fixed", "z-index: 1000"].map(p => (
                  <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B", lineHeight: "1.9" }}>{p}</div>
                ))}
              </td>
            </tr>
            <tr>
              <td style={{ ...TD, whiteSpace: "nowrap" }}>
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>.panel</code>
              </td>
              <td style={TD}>
                {["background: var(--surface-primary)", "border-radius: var(--radius-lg)", "box-shadow: 0 20px 60px rgba(0,0,0,0.18)"].map(p => (
                  <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B", lineHeight: "1.9" }}>{p}</div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Size reference - inline styles, no CSS class */}
      <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        Size - applied as inline <code style={{ fontFamily: "monospace" }}>max-width</code>, not a CSS class.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={TH}>Size</th>
              <th style={TH}>max-width</th>
              <th style={TH}>Use for</th>
            </tr>
          </thead>
          <tbody>
            {SIZE_ROWS.map(row => {
              const active = row.value === size;
              return (
                <tr key={row.value} style={{ backgroundColor: active ? "#F4F4F5" : "transparent" }}>
                  <td style={{ ...TD, whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#09090B" : "#71717A", fontWeight: active ? 700 : 400 }}>
                      {row.value}
                    </span>
                  </td>
                  <td style={{ ...TD, whiteSpace: "nowrap" }}>
                    <code style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#18181B" : "#A1A1AA", backgroundColor: active ? "#E4E4E7" : "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>
                      {row.maxWidth}
                    </code>
                  </td>
                  <td style={TD}>
                    <span style={{ fontSize: "12px", fontFamily: "'Open Sans', system-ui, sans-serif", color: active ? "#18181B" : "#A1A1AA" }}>
                      {row.note}
                    </span>
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

// ─── Playground ───────────────────────────────────────────────────────────────

type PlaygroundProps = {
  size: ModalSize; onSize: (s: ModalSize) => void;
};

function generateSnippet(size: ModalSize): string {
  return `<Modal open onClose={() => {}} title="Title" size="${size}">\n  Content\n</Modal>`;
}

function Playground({ size, onSize }: PlaygroundProps) {
  const [open, setOpen]         = useState(false);
  const [copied, setCopied]     = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const snippet = generateSnippet(size);

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <PlaygroundShell
        preview={
          <>
            <Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>
            <Modal open={open} onClose={() => setOpen(false)} title="Confirm action" size={size}>
              <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#52525B", lineHeight: "1.6", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
                This is the modal body. You can put a form, confirmation message, or any content here.
              </p>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
              </div>
            </Modal>
          </>
        }
        controls={
          <ControlRow label="Size">
            {SIZES.map(s => <Pill key={s} active={size === s} onClick={() => onSize(s)}>{s}</Pill>)}
          </ControlRow>
        }
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
        )}
      </div>
    </>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ModalSection() {
  const [size, setSize] = useState<ModalSize>("md");

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Modal</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A dialog that appears over the page to focus the user's attention on a single task. The backdrop dims the rest of the UI. Click outside or the x button to close.
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0 }}>
          <SectionBlock title="Playground">
            <Playground size={size} onSize={setSize} />
          </SectionBlock>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionBlock title="Style Reference">
            <StyleReference size={size} />
          </SectionBlock>
        </div>
      </div>

      <SectionBlock title="Props">
        <PropsTable source={modalTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
