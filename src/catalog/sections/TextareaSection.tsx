import { useState } from "react";
import { Textarea } from "../../../components/fields/Textarea";
import { PropsTable } from "../ui/PropsTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import textareaTsx from "../../../components/fields/Textarea.tsx?raw";
import textareaCss from "../../../components/fields/Textarea.module.css?raw";

const sources = [
  { filename: "Textarea.tsx",        code: textareaTsx },
  { filename: "Textarea.module.css", code: textareaCss },
];

// ─── Code snippet ──────────────────────────────────────────────────────────────

function generateSnippet(disabled: boolean, showError: boolean, label: string, placeholder: string): string {
  const lines: string[] = [`<Textarea`, `  label="${label}"`, `  placeholder="${placeholder}"`];
  if (disabled)   lines.push('  disabled');
  if (showError)  lines.push('  error="This field is required."');
  lines.push('/>');
  return lines.join('\n');
}

// ─── Playground ────────────────────────────────────────────────────────────────

type PlaygroundProps = {
  disabled: boolean;    onDisabled:    (d: boolean) => void;
  showError: boolean;   onShowError:   (e: boolean) => void;
  label: string;        onLabel:       (v: string)  => void;
  placeholder: string;  onPlaceholder: (v: string)  => void;
};

const INPUT_STYLE: React.CSSProperties = {
  padding: "4px 10px", fontSize: "12px",
  fontFamily: "'Open Sans', system-ui, sans-serif",
  border: "1px solid #E4E4E7", borderRadius: "6px",
  color: "#09090B", background: "#FFFFFF",
  outline: "none", width: "140px",
};

function Playground({ disabled, onDisabled, showError, onShowError, label, onLabel, placeholder, onPlaceholder }: PlaygroundProps) {
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);
  const snippet = generateSnippet(disabled, showError, label, placeholder);

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
            <Textarea
              label={label}
              placeholder={placeholder}
              value={value}
              onChange={setValue}
              disabled={disabled}
              error={showError ? "This field is required." : undefined}
            />
          </div>
        }
        controls={
          <>
            <ControlRow label="Label">
              <input value={label} onChange={e => onLabel(e.target.value)} style={INPUT_STYLE} />
            </ControlRow>
            <ControlRow label="Placeholder">
              <input value={placeholder} onChange={e => onPlaceholder(e.target.value)} style={INPUT_STYLE} />
            </ControlRow>
            <ControlRow label="Disabled">
              <Pill active={!disabled} onClick={() => onDisabled(false)}>no</Pill>
              <Pill active={disabled}  onClick={() => onDisabled(true)}>yes</Pill>
            </ControlRow>
            <ControlRow label="Error">
              <Pill active={!showError} onClick={() => onShowError(false)}>no</Pill>
              <Pill active={showError}  onClick={() => onShowError(true)}>yes</Pill>
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

// ─── Style Reference ───────────────────────────────────────────────────────────

type StyleRow = { prop: string; value: string; cssClass: string; properties: string[] };

const STYLE_ROWS: StyleRow[] = [
  // disabled
  { prop: "disabled", value: "false", cssClass: ".textarea",          properties: ["border: 1px solid var(--stroke-secondary)", "background: var(--surface-primary)", "resize: vertical"] },
  { prop: "disabled", value: "true",  cssClass: ".textarea:disabled", properties: ["background: var(--surface-secondary)", "color: var(--text-secondary)", "cursor: not-allowed"] },
  // error
  { prop: "error",    value: "undefined", cssClass: ".textarea",         properties: ["border-color: var(--stroke-secondary)"] },
  { prop: "error",    value: "string",    cssClass: ".hasError",         properties: ["border-color: var(--error-primary)", ".hasError:focus → box-shadow with var(--error-primary) 20% opacity"] },
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

type ActiveState = { disabled: boolean; showError: boolean };

function isActive(row: StyleRow, state: ActiveState): boolean {
  if (row.prop === "disabled") return row.value === "true" ? state.disabled : !state.disabled;
  if (row.prop === "error")    return row.value === "string" ? state.showError : !state.showError;
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
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>.textarea</code>
              </td>
              <td style={TD}>
                {[
                  "composes: body",
                  "border-radius: var(--radius-base)",
                  "font-size: var(--font-size-base)",
                  "font-family: var(--font-sans)",
                  "resize: vertical",
                  "transition: border 120ms ease, box-shadow 120ms ease",
                  ".textarea:focus → border-color: var(--stroke-brand), box-shadow: var(--focus-ring)",
                ].map(p => (
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

// ─── Section ───────────────────────────────────────────────────────────────────

export function TextareaSection() {
  const [disabled, setDisabled]         = useState(false);
  const [showError, setShowError]       = useState(false);
  const [label, setLabel]               = useState("Description");
  const [placeholder, setPlaceholder]   = useState("Write something...");

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Textarea</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A multi-line text field for longer content like descriptions, notes, or comments. Shares the same visual style as TextInput but grows vertically.
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0, position: "sticky", top: "24px", alignSelf: "flex-start" }}>
          <SectionBlock title="Playground">
            <Playground
              disabled={disabled}       onDisabled={setDisabled}
              showError={showError}     onShowError={setShowError}
              label={label}             onLabel={setLabel}
              placeholder={placeholder} onPlaceholder={setPlaceholder}
            />
          </SectionBlock>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionBlock title="Style Reference">
            <StyleReference disabled={disabled} showError={showError} />
          </SectionBlock>
        </div>
      </div>

      <SectionBlock title="Props">
        <PropsTable source={textareaTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
