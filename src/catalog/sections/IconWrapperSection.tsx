import React, { useState } from "react";
import { IconWrapper, type IconSize } from "../../../components/layout/IconWrapper";
import { IconSearch } from "../../../components/icons/usecases/IconSearch";
import { IconAdd } from "../../../components/icons/usecases/IconAdd";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import iconWrapperTsx from "../../../components/layout/IconWrapper.tsx?raw";

const sources = [{ filename: "IconWrapper.tsx", code: iconWrapperTsx }];

const SIZES: IconSize[] = ["xs", "sm", "md", "lg"];
const COLORS = [
  { label: "default", value: "var(--text-primary)"    },
  { label: "brand",   value: "var(--brand-primary)"   },
  { label: "error",   value: "var(--error-primary)"   },
  { label: "success", value: "var(--success-primary)" },
];

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

type SizeRow = { size: IconSize; dimensions: string };

const SIZE_ROWS: SizeRow[] = [
  { size: "xs", dimensions: "12 × 12px" },
  { size: "sm", dimensions: "16 × 16px" },
  { size: "md", dimensions: "20 × 20px" },
  { size: "lg", dimensions: "24 × 24px" },
];

// ─── Playground ───────────────────────────────────────────────────────────────

type PlaygroundProps = {
  size: IconSize;   onSize:  (s: IconSize) => void;
  color: string;    onColor: (c: string)   => void;
};

function Playground({ size, onSize, color, onColor }: PlaygroundProps) {
  const [copied, setCopied]     = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);

  const snippet = `<IconWrapper icon={IconAdd} size="${size}" />`;

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <PlaygroundShell
        preview={<IconWrapper icon={IconSearch} size={size} style={{ color }} />}
        controls={
          <>
            <ControlRow label="Size">
              {SIZES.map(s => <Pill key={s} active={size === s} onClick={() => onSize(s)}>{s}</Pill>)}
            </ControlRow>
            <ControlRow label="Color">
              {COLORS.map(c => (
                <Pill key={c.label} active={color === c.value} onClick={() => onColor(c.value)}>{c.label}</Pill>
              ))}
            </ControlRow>
          </>
        }
      />

      {/* Code drawer */}
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

// ─── Style Reference ──────────────────────────────────────────────────────────
// IconWrapper uses inline styles (no CSS module classes), so this shows a
// simple size reference table instead of the prop-driven class table.

function StyleReference({ size }: { size: IconSize }) {
  return (
    <div>
      <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        IconWrapper uses inline styles — no CSS module classes. Sizes are set directly as <code style={{ fontFamily: "monospace", fontSize: "12px" }}>width</code> and <code style={{ fontFamily: "monospace", fontSize: "12px" }}>height</code> attributes on the SVG element.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={TH}>Size</th>
              <th style={TH}>Width × Height</th>
              <th style={TH}>Typical use</th>
            </tr>
          </thead>
          <tbody>
            {SIZE_ROWS.map(row => {
              const active = row.size === size;
              return (
                <tr key={row.size} style={{ backgroundColor: active ? "#F4F4F5" : "transparent" }}>
                  <td style={{ ...TD, whiteSpace: "nowrap" }}>
                    <code style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#18181B" : "#A1A1AA", backgroundColor: active ? "#E4E4E7" : "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>
                      {row.size}
                    </code>
                  </td>
                  <td style={{ ...TD, whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: "12px", fontFamily: "monospace", color: active ? "#09090B" : "#71717A", fontWeight: active ? 700 : 400 }}>
                      {row.dimensions}
                    </span>
                  </td>
                  <td style={TD}>
                    <span style={{ fontSize: "12px", fontFamily: "'Open Sans', system-ui, sans-serif", color: active ? "#18181B" : "#A1A1AA", lineHeight: "1.6" }}>
                      {row.size === "xs" && "Tight list rows, inline labels"}
                      {row.size === "sm" && "Button icons, badges, dense UI"}
                      {row.size === "md" && "Standard controls, form fields"}
                      {row.size === "lg" && "Navigation, empty states, headers"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Inline style note */}
      <div style={{ marginTop: "24px" }}>
        <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
          Inline style always applied.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={TH}>Property</th>
                <th style={TH}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ ...TD, whiteSpace: "nowrap" }}>
                  <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>flex-shrink</code>
                </td>
                <td style={TD}>
                  <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B" }}>0</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function IconWrapperSection() {
  const [size, setSize]   = useState<IconSize>("md");
  const [color, setColor] = useState(COLORS[0].value);

  // Suppress unused import warning — IconAdd is referenced in the snippet only
  void IconAdd;

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>IconWrapper</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          The single way to render any icon in the system. Takes an icon component and outputs it
          at a standardized size. Never render icon SVGs directly — always go through IconWrapper.
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0 }}>
          <SectionBlock title="Playground">
            <Playground size={size} onSize={setSize} color={color} onColor={setColor} />
          </SectionBlock>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionBlock title="Style Reference">
            <StyleReference size={size} />
          </SectionBlock>
        </div>
      </div>

      <SectionBlock title="Props">
        <PropsTable source={iconWrapperTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
