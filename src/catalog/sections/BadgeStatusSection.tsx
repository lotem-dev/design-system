import { useState } from "react";
import { BadgeStatus } from "../../../components/badges/BadgeStatus";
import type { BadgeStatusValue as BadgeStatusType } from "../../../components/badges/BadgeStatus";
import { PropsTable } from "../ui/PropsTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { TypographyReference, type TypographyEntry } from "../ui/TypographyReference";

import badgeTsx from "../../../components/badges/BadgeStatus.tsx?raw";

const sources = [
  { filename: "BadgeStatus.tsx", code: badgeTsx },
];

const STATUSES: BadgeStatusType[] = ["open", "fixed", "ignored"];

// ─── Code snippet ─────────────────────────────────────────────────────────────

function generateSnippet(status: BadgeStatusType): string {
  return `<BadgeStatus status="${status}" />`;
}

// ─── Playground ───────────────────────────────────────────────────────────────

type PlaygroundProps = {
  status: BadgeStatusType; onStatus: (s: BadgeStatusType) => void;
};

function Playground({ status, onStatus }: PlaygroundProps) {
  const [copied, setCopied] = useState(false);
  const snippet = generateSnippet(status);

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <PlaygroundShell
        preview={<BadgeStatus status={status} />}
        controls={
          <ControlRow label="Status">
            {STATUSES.map(s => <Pill key={s} active={status === s} onClick={() => onStatus(s)}>{s}</Pill>)}
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

const TYPOGRAPHY_ROWS: TypographyEntry[] = [
  { element: "Badge label", role: "label-bold" },
];

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

type StyleRow = { prop: string; value: BadgeStatusType; properties: string[] };

const STYLE_ROWS: StyleRow[] = [
  { prop: "status", value: "open",    properties: ["color: var(--status-open-primary)", "background: var(--status-open-secondary)", "border-color: var(--status-open-primary)"] },
  { prop: "status", value: "fixed",   properties: ["color: var(--status-fixed-primary)", "background: var(--status-fixed-secondary)", "border-color: var(--status-fixed-primary)"] },
  { prop: "status", value: "ignored", properties: ["color: var(--status-ignored-primary)", "background: var(--status-ignored-secondary)", "border-color: var(--status-ignored-primary)"] },
];

function StyleReference({ status }: { status: BadgeStatusType }) {
  return (
    <div>
      <TypographyReference rows={TYPOGRAPHY_ROWS} />
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
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>root</code>
              </td>
              <td style={TD}>
                {["display: inline-flex", "align-items: center", "padding: var(--space-sm)", "border-radius: var(--radius-base)", "border: 1px solid {fg}"].map(p => (
                  <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B", lineHeight: "1.9" }}>{p}</div>
                ))}
              </td>
            </tr>
            <tr>
              <td style={{ ...TD, whiteSpace: "nowrap" }}>
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>label</code>
              </td>
              <td style={TD}>
                {["composes: label-bold"].map(p => (
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
              <th style={TH}>Tokens applied</th>
            </tr>
          </thead>
          <tbody>
            {STYLE_ROWS.map((row, i) => {
              const active = row.value === status;
              return (
                <tr key={row.value} style={{ backgroundColor: active ? "#F4F4F5" : "transparent" }}>
                  {i === 0 && (
                    <td rowSpan={STYLE_ROWS.length} style={{ ...TD, borderRight: "1px solid #F4F4F5", verticalAlign: "middle" }}>
                      <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#EBEBEB", padding: "2px 6px", borderRadius: "4px" }}>status</code>
                    </td>
                  )}
                  <td style={{ ...TD, whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#09090B" : "#71717A", fontWeight: active ? 700 : 400 }}>
                      {row.value}
                    </span>
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

export function BadgeStatusSection() {
  const [status, setStatus] = useState<BadgeStatusType>("open");

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>BadgeStatus</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A small colored label showing the current state of a security finding. Label, color, and border are all driven by the <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>status</code> prop - nothing else to configure.
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0, position: "sticky", top: "24px", alignSelf: "flex-start" }}>
          <SectionBlock title="Playground">
            <Playground status={status} onStatus={setStatus} />
          </SectionBlock>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionBlock title="Style Reference">
            <StyleReference status={status} />
          </SectionBlock>
        </div>
      </div>

      <SectionBlock title="Props">
        <PropsTable source={badgeTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
