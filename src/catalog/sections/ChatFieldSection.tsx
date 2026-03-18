import { useState } from "react";
import { ChatField } from "../../../components/fields/ChatField";
import { LogoGitHub }   from "../../../components/icons/brand/LogoGitHub";
import { LogoAWS }      from "../../../components/icons/brand/LogoAWS";
import { LogoSlack }    from "../../../components/icons/brand/LogoSlack";
import { LogoShortcut } from "../../../components/icons/brand/LogoShortcut";
import { LogoJira }     from "../../../components/icons/brand/LogoJira";
import { PropsTable }   from "../ui/PropsTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage }    from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import chatFieldTsx from "../../../components/fields/ChatField.tsx?raw";
import chatFieldCss from "../../../components/fields/ChatField.module.css?raw";

const sources = [
  { filename: "ChatField.tsx",        code: chatFieldTsx },
  { filename: "ChatField.module.css", code: chatFieldCss },
];

const DEMO_CONNECTORS = [LogoGitHub, LogoAWS, LogoSlack, LogoShortcut, LogoJira];

// ─── Code snippet ──────────────────────────────────────────────────────────────

function generateSnippet(showConnectors: boolean, isProcessing: boolean): string {
  const lines: string[] = ['<ChatField', '  value={value}', '  onChange={setValue}', '  onSend={handleSend}'];
  if (isProcessing)    lines.push('  isProcessing');
  if (showConnectors)  lines.push('  connectors={CONNECTORS}', '  connectorCount={8}');
  lines.push('/>');
  return lines.join('\n');
}

// ─── Playground ────────────────────────────────────────────────────────────────

type PlaygroundProps = {
  showConnectors: boolean; onShowConnectors: (v: boolean) => void;
  isProcessing:   boolean; onIsProcessing:   (v: boolean) => void;
};

function Playground({ showConnectors, onShowConnectors, isProcessing, onIsProcessing }: PlaygroundProps) {
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);
  const snippet = generateSnippet(showConnectors, isProcessing);

  function handleSend() {
    onIsProcessing(true);
    setTimeout(() => {
      setValue("");
      onIsProcessing(false);
    }, 1500);
  }

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <PlaygroundShell
        preview={
          <div style={{ width: "100%", maxWidth: "600px" }}>
            <ChatField
              value={value}
              onChange={setValue}
              onSend={handleSend}
              isProcessing={isProcessing}
              connectors={showConnectors ? DEMO_CONNECTORS : []}
              connectorCount={showConnectors ? 8 : 0}
            />
          </div>
        }
        controls={
          <>
            <ControlRow label="Connectors">
              <Pill active={showConnectors}  onClick={() => onShowConnectors(true)}>visible</Pill>
              <Pill active={!showConnectors} onClick={() => onShowConnectors(false)}>hidden</Pill>
            </ControlRow>
            <ControlRow label="Button state">
              <Pill active={!isProcessing && value === ""}  onClick={() => { setValue(""); onIsProcessing(false); }}>idle</Pill>
              <Pill active={!isProcessing && value !== ""}  onClick={() => { setValue("What are my open findings?"); onIsProcessing(false); }}>has text</Pill>
              <Pill active={isProcessing}                   onClick={() => onIsProcessing(true)}>processing</Pill>
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
  // showConnectors
  { prop: "showConnectors", value: "true",  cssClass: ".strip",      properties: ["background: var(--surface-secondary)", "border-top: 1px solid var(--stroke-secondary)"] },
  { prop: "showConnectors", value: "false", cssClass: ".stripOuter", properties: ["connectors strip is still rendered but contains no avatars"] },
  // isProcessing / send button
  { prop: "isProcessing", value: "false (has text)", cssClass: ".sendActive", properties: ["background: var(--brand-primary)", "cursor: pointer"] },
  { prop: "isProcessing", value: "true",             cssClass: ".sendIdle",   properties: ["background: var(--brand-tertiary)", "cursor: default", "spinner shown instead of send icon"] },
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

type ActiveState = { showConnectors: boolean; isProcessing: boolean };

function isActive(row: StyleRow, state: ActiveState): boolean {
  if (row.prop === "showConnectors") {
    return row.value === "true" ? state.showConnectors : !state.showConnectors;
  }
  if (row.prop === "isProcessing") {
    if (row.value === "true")             return state.isProcessing;
    if (row.value === "false (has text)") return !state.isProcessing;
  }
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
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>.card</code>
              </td>
              <td style={TD}>
                {[
                  "border-radius: var(--radius-lg)",
                  "border: 1px solid var(--stroke-brand)",
                  "background: var(--surface-primary)",
                  "box-shadow: 0 0 0 3px var(--focus-ring)",
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

export function ChatFieldSection() {
  const [showConnectors, setShowConnectors] = useState(true);
  const [isProcessing, setIsProcessing]     = useState(false);

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>ChatField</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          An AI chat input with a brand-colored border, glow ring, and a toolbar row
          (attach file, options, send). A connectors strip beneath it shows which integrations
          are active. The send button activates when text is present, and shows a spinner
          while processing.
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0 }}>
          <SectionBlock title="Playground">
            <Playground
              showConnectors={showConnectors} onShowConnectors={setShowConnectors}
              isProcessing={isProcessing}     onIsProcessing={setIsProcessing}
            />
          </SectionBlock>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionBlock title="Style Reference">
            <StyleReference showConnectors={showConnectors} isProcessing={isProcessing} />
          </SectionBlock>
        </div>
      </div>

      <SectionBlock title="Props">
        <PropsTable source={chatFieldTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
