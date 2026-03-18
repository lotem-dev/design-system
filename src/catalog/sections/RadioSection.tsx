import { useState } from "react";
import { Radio } from "../../../components/interactions/Radio";
import { PropsTable } from "../ui/PropsTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import radioTsx from "../../../components/interactions/Radio.tsx?raw";
import radioCss from "../../../components/interactions/Radio.module.css?raw";

const sources = [
  { filename: "Radio.tsx",        code: radioTsx },
  { filename: "Radio.module.css", code: radioCss },
];

const OPTIONS = ["Option A", "Option B", "Option C"] as const;
type Option = typeof OPTIONS[number];

// ─── Code snippet ─────────────────────────────────────────────────────────────

function generateSnippet(checked: boolean, disabled: boolean): string {
  const props: string[] = [];
  props.push(`checked={${checked}}`);
  if (disabled) props.push("disabled");
  props.push(`label="Label"`);
  props.push(`onChange={() => {}}`);
  return `<Radio ${props.join(" ")} />`;
}

// ─── Playground ───────────────────────────────────────────────────────────────

type PlaygroundProps = {
  selected: Option;  onSelected:  (v: Option)  => void;
  disabled: boolean; onDisabled:  (v: boolean) => void;
};

function Playground({ selected, onSelected, disabled, onDisabled }: PlaygroundProps) {
  const [copied, setCopied]     = useState(false);
  const snippet = generateSnippet(selected === "Option A", disabled);

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <PlaygroundShell
        preview={
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {OPTIONS.map((opt) => (
              <Radio
                key={opt}
                checked={selected === opt}
                onChange={() => onSelected(opt)}
                label={opt}
                disabled={disabled}
                name="playground-radio"
                value={opt}
              />
            ))}
          </div>
        }
        controls={
          <ControlRow label="Disabled">
            <Pill active={!disabled} onClick={() => onDisabled(false)}>no</Pill>
            <Pill active={disabled}  onClick={() => onDisabled(true)}>yes</Pill>
          </ControlRow>
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

type StyleRow = {
  prop:       string;
  value:      string;
  cssClass:   string;
  properties: string[];
};

const STYLE_ROWS: StyleRow[] = [
  // checked state
  { prop: "checked", value: "false", cssClass: ".circle",         properties: ["background: var(--surface-primary)", "border: 1px solid var(--stroke-secondary)"] },
  { prop: "checked", value: "true",  cssClass: ".circle.checked", properties: ["background: var(--brand-primary)", "border-color: var(--brand-primary)"] },
  // disabled
  { prop: "disabled", value: "true", cssClass: ".wrapper.disabled", properties: ["opacity: 0.5", "cursor: not-allowed"] },
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
  padding: "10px 12px", verticalAlign: "top",
  borderBottom: "1px solid #F4F4F5",
};

type ActiveState = { checked: boolean; disabled: boolean };

function isActive({ prop, value }: StyleRow, state: ActiveState): boolean {
  if (prop === "checked")  return value === String(state.checked);
  if (prop === "disabled") return value === "true" && state.disabled;
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
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>.circle</code>
              </td>
              <td style={TD}>
                {["width: 16px", "height: 16px", "border-radius: var(--radius-round)", "transition: background 120ms ease, border-color 120ms ease"].map(p => (
                  <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B", lineHeight: "1.9" }}>{p}</div>
                ))}
              </td>
            </tr>
            <tr>
              <td style={{ ...TD, whiteSpace: "nowrap" }}>
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>.dot</code>
              </td>
              <td style={TD}>
                {["width: 6px", "height: 6px", "border-radius: var(--radius-round)", "background: var(--surface-primary)"].map(p => (
                  <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B", lineHeight: "1.9" }}>{p}</div>
                ))}
              </td>
            </tr>
            <tr>
              <td style={{ ...TD, whiteSpace: "nowrap" }}>
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>:focus-within .circle</code>
              </td>
              <td style={TD}>
                {["box-shadow: 0 0 0 2px var(--brand-tertiary)"].map(p => (
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

// ─── Section ──────────────────────────────────────────────────────────────────

export function RadioSection() {
  const [selected, setSelected] = useState<Option>("Option A");
  const [disabled, setDisabled] = useState(false);

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Radio</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A single-select control used in groups. Each Radio is a controlled component - the parent
          tracks which option is selected and passes the matching <code>checked</code> value to each one.
        </p>
      </div>

      {/* Side-by-side: Playground + Style Reference in one viewport */}
      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0 }}>
          <SectionBlock title="Playground">
            <Playground
              selected={selected}  onSelected={setSelected}
              disabled={disabled}  onDisabled={setDisabled}
            />
          </SectionBlock>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionBlock title="Style Reference">
            <StyleReference checked={selected === "Option A"} disabled={disabled} />
          </SectionBlock>
        </div>
      </div>

      <SectionBlock title="Props">
        <PropsTable source={radioTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
