import { useState } from "react";
import { Spinner } from "../../../components/visualization/Spinner";
import { PropsTable } from "../ui/PropsTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import spinnerTsx from "../../../components/visualization/Spinner.tsx?raw";
import spinnerCss from "../../../components/visualization/Spinner.module.css?raw";

const sources = [
  { filename: "Spinner.tsx",        code: spinnerTsx },
  { filename: "Spinner.module.css", code: spinnerCss },
];

type SpinnerSize = "sm" | "md" | "lg";
const SIZES: SpinnerSize[] = ["sm", "md", "lg"];

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

const SIZE_PIXELS: Record<SpinnerSize, number> = { sm: 16, md: 24, lg: 32 };

type ActiveState = { size: SpinnerSize };

function StyleReference({ size }: ActiveState) {
  return (
    <div>
      <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        Base — always applied regardless of props.
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
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>.spinner</code>
              </td>
              <td style={TD}>
                {["animation: spin 0.75s linear infinite", "color: var(--brand-primary)", "display: block", "flex-shrink: 0"].map(p => (
                  <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B", lineHeight: "1.9" }}>{p}</div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        Size reference — controlled via inline style prop, not CSS classes.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={TH}>size</th>
              <th style={TH}>inline width</th>
              <th style={TH}>inline height</th>
            </tr>
          </thead>
          <tbody>
            {SIZES.map(s => {
              const active = s === size;
              const px = SIZE_PIXELS[s];
              return (
                <tr key={s} style={{ backgroundColor: active ? "#F4F4F5" : "transparent" }}>
                  <td style={{ ...TD, whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#09090B" : "#71717A", fontWeight: active ? 700 : 400 }}>
                      {s}
                    </span>
                  </td>
                  <td style={{ ...TD, whiteSpace: "nowrap" }}>
                    <code style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#18181B" : "#A1A1AA", backgroundColor: active ? "#E4E4E7" : "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>
                      {px}px
                    </code>
                  </td>
                  <td style={{ ...TD, whiteSpace: "nowrap" }}>
                    <code style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#18181B" : "#A1A1AA", backgroundColor: active ? "#E4E4E7" : "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>
                      {px}px
                    </code>
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
  size: SpinnerSize; onSize: (s: SpinnerSize) => void;
};

function Playground({ size, onSize }: PlaygroundProps) {
  const [copied, setCopied] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const snippet = `<Spinner size="${size}" />`;

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <PlaygroundShell
        preview={<Spinner size={size} />}
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

export function SpinnerSection() {
  const [size, setSize] = useState<SpinnerSize>("md");

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Spinner</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          An animated loading indicator for in-progress states. Use while content is fetching or an action hasn't resolved yet.
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
        <PropsTable source={spinnerTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
