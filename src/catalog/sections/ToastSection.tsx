import { useState } from "react";
import { Toast } from "../../../components/overlays/Toast";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import toastTsx from "../../../components/overlays/Toast.tsx?raw";
import toastCss from "../../../components/overlays/Toast.module.css?raw";

const sources = [
  { filename: "Toast.tsx",        code: toastTsx },
  { filename: "Toast.module.css", code: toastCss },
];

const TYPES = ["info", "success", "warning", "error"] as const;
type ToastType = typeof TYPES[number];

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

type StyleRow = { prop: string; value: string; cssClass: string; properties: string[] };

const STYLE_ROWS: StyleRow[] = [
  { prop: "type", value: "info",    cssClass: ".info .accent",    properties: ["background: var(--brand-primary)"] },
  { prop: "type", value: "success", cssClass: ".success .accent", properties: ["background: var(--success-primary)"] },
  { prop: "type", value: "warning", cssClass: ".warning .accent", properties: ["background: var(--warning-primary)"] },
  { prop: "type", value: "error",   cssClass: ".error .accent",   properties: ["background: var(--error-primary)"] },
];

const STYLE_GROUPS = STYLE_ROWS.reduce<{ prop: string; rows: StyleRow[] }[]>((acc, row) => {
  const last = acc[acc.length - 1];
  if (last && last.prop === row.prop) { last.rows.push(row); }
  else { acc.push({ prop: row.prop, rows: [row] }); }
  return acc;
}, []);

type ActiveState = { type: ToastType };

function isActive({ prop, value }: StyleRow, state: ActiveState): boolean {
  if (prop === "type") return value === state.type;
  return false;
}

function StyleReference({ type }: ActiveState) {
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
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>.toast</code>
              </td>
              <td style={TD}>
                {["background: var(--surface-primary)", "border: 1px solid var(--stroke-secondary)", "border-radius: var(--radius-base)", "box-shadow: 0 4px 16px rgba(0,0,0,0.12)"].map(p => (
                  <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B", lineHeight: "1.9" }}>{p}</div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Prop-driven */}
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
                const active = isActive(row, { type });
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
  type: ToastType;      onType:        (t: ToastType) => void;
  dismissable: boolean; onDismissable: (v: boolean)   => void;
  message: string;      onMessage:     (v: string)    => void;
};

const INPUT_STYLE: React.CSSProperties = {
  padding: "4px 10px", fontSize: "12px",
  fontFamily: "'Open Sans', system-ui, sans-serif",
  border: "1px solid #E4E4E7", borderRadius: "6px",
  color: "#09090B", background: "#FFFFFF",
  outline: "none", width: "200px",
};

function generateSnippet(type: ToastType, dismissable: boolean, message: string): string {
  return `<Toast\n  message="${message}"\n  type="${type}"\n  visible\n  onClose=${dismissable ? "{() => {}}" : "{undefined}"}\n/>`;
}

function Playground({ type, onType, dismissable, onDismissable, message, onMessage }: PlaygroundProps) {
  const [visible, setVisible]   = useState(true);
  const [copied, setCopied]     = useState(false);
  const snippet = generateSnippet(type, dismissable, message);

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <PlaygroundShell
        preview={
          <div style={{ position: "relative", minHeight: "64px" }}>
            <Toast
              message={message}
              type={type}
              visible={visible}
              onClose={dismissable ? () => setVisible(false) : undefined}
            />
            {!visible && (
              <button
                onClick={() => setVisible(true)}
                style={{ fontSize: "13px", color: "#18181B", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "'Open Sans', system-ui, sans-serif" }}
              >
                Show again
              </button>
            )}
          </div>
        }
        controls={
          <>
            <ControlRow label="Message">
              <input value={message} onChange={e => { onMessage(e.target.value); setVisible(true); }} style={INPUT_STYLE} />
            </ControlRow>
            <ControlRow label="Type">
              {TYPES.map(t => <Pill key={t} active={type === t} onClick={() => { onType(t); setVisible(true); }}>{t}</Pill>)}
            </ControlRow>
            <ControlRow label="Dismissable">
              <Pill active={dismissable}  onClick={() => onDismissable(true)}>yes</Pill>
              <Pill active={!dismissable} onClick={() => onDismissable(false)}>no</Pill>
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

export function ToastSection() {
  const [type, setType]               = useState<ToastType>("success");
  const [dismissable, setDismissable] = useState(true);
  const [message, setMessage]         = useState("Your changes have been saved.");

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Toast</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A brief notification that floats over the UI. Unlike Alert, Toast is transient - use it for non-blocking feedback like "Saved", "Copied", or action confirmations.
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0, position: "sticky", top: "24px", alignSelf: "flex-start" }}>
          <SectionBlock title="Playground">
            <Playground
              type={type}           onType={setType}
              dismissable={dismissable} onDismissable={setDismissable}
              message={message}     onMessage={setMessage}
            />
          </SectionBlock>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionBlock title="Style Reference">
            <StyleReference type={type} />
          </SectionBlock>
        </div>
      </div>

      <SectionBlock title="Props">
        <PropsTable source={toastTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
