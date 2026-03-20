import { useState } from "react";
import { SearchInput } from "../../../components/fields/SearchInput";
import { PropsTable } from "../ui/PropsTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import searchInputTsx from "../../../components/fields/SearchInput.tsx?raw";
import searchInputCss from "../../../components/fields/SearchInput.module.css?raw";

const sources = [
  { filename: "SearchInput.tsx",        code: searchInputTsx },
  { filename: "SearchInput.module.css", code: searchInputCss },
];

// ─── Code snippet ─────────────────────────────────────────────────────────────

function generateSnippet(filled: boolean): string {
  if (filled) return `<SearchInput value="react" onChange={setValue} />`;
  return `<SearchInput placeholder="Search findings..." onChange={setValue} />`;
}

// ─── Playground ───────────────────────────────────────────────────────────────

type PlaygroundProps = {
  filled: boolean; onFilled: (v: boolean) => void;
};

function Playground({ filled, onFilled }: PlaygroundProps) {
  const [copied, setCopied] = useState(false);
  const snippet = generateSnippet(filled);

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <PlaygroundShell
        preview={
          <div style={{ width: "240px" }}>
            <SearchInput
              value={filled ? "react" : ""}
              onChange={() => {}}
              placeholder="Search findings..."
            />
          </div>
        }
        controls={
          <ControlRow label="State">
            <Pill active={!filled} onClick={() => onFilled(false)}>empty</Pill>
            <Pill active={filled}  onClick={() => onFilled(true)}>filled</Pill>
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

function StyleReference() {
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
            {[
              {
                cls: ".wrapper",
                props: ["position: relative", "display: flex", "align-items: center", "width: 100%"],
              },
              {
                cls: ".icon",
                props: ["position: absolute", "left: var(--space-base)", "color: var(--text-secondary)", "pointer-events: none"],
              },
              {
                cls: ".input",
                props: ["composes: body", "height: 38px", "padding-left: 40px", "border: 1px solid var(--stroke-secondary)", "background: var(--surface-primary)", "border-radius: var(--radius-base)"],
              },
              {
                cls: ".input:focus",
                props: ["border: 2px solid var(--stroke-brand)", "box-shadow: 0 0 0 3px var(--focus-ring)"],
              },
            ].map(({ cls, props }) => (
              <tr key={cls}>
                <td style={{ ...TD, whiteSpace: "nowrap" }}>
                  <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>
                    {cls}
                  </code>
                </td>
                <td style={TD}>
                  {props.map(p => (
                    <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B", lineHeight: "1.9" }}>{p}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        No prop-driven styles - SearchInput has no variant or state props that change its appearance.
      </p>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function SearchInputSection() {
  const [filled, setFilled] = useState(false);

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>SearchInput</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A text field with an inline search icon for filtering content as the user types. Not for navigation - pair with a list or table.
        </p>
      </div>

      {/* Side-by-side: Playground + Style Reference in one viewport */}
      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0, position: "sticky", top: "24px", alignSelf: "flex-start" }}>
          <SectionBlock title="Playground">
            <Playground filled={filled} onFilled={setFilled} />
          </SectionBlock>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionBlock title="Style Reference">
            <StyleReference />
          </SectionBlock>
        </div>
      </div>

      <SectionBlock title="Props">
        <PropsTable source={searchInputTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
