import React, { useState } from "react";
import { Tab } from "../../../components/navigation/Tab";
import { TabGroup } from "../../../components/navigation/TabGroup";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import tabTsx    from "../../../components/navigation/Tab.tsx?raw";
import tabCss    from "../../../components/navigation/Tab.module.css?raw";
import groupTsx  from "../../../components/navigation/TabGroup.tsx?raw";
import groupCss  from "../../../components/navigation/TabGroup.module.css?raw";

const sources = [
  { filename: "Tab.tsx",             code: tabTsx   },
  { filename: "Tab.module.css",      code: tabCss   },
  { filename: "TabGroup.tsx",        code: groupTsx },
  { filename: "TabGroup.module.css", code: groupCss },
];

type TabTarget = "single" | "group";

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

type StyleRow = { prop: string; value: string; cssClass: string; properties: string[] };

const STYLE_ROWS: StyleRow[] = [
  { prop: "selected", value: "false", cssClass: ".label",  properties: ["color: var(--text-secondary)"] },
  { prop: "selected", value: "false", cssClass: ".badge",  properties: ["background: var(--surface-tertiary)", "color: var(--text-primary)"] },
  { prop: "selected", value: "false", cssClass: ".bar",    properties: ["background: var(--divider-primary)"] },
  { prop: "selected", value: "true",  cssClass: ".tab--selected .label", properties: ["color: var(--text-brand)"] },
  { prop: "selected", value: "true",  cssClass: ".tab--selected .badge", properties: ["background: var(--brand-primary)", "color: var(--text-invert)"] },
  { prop: "selected", value: "true",  cssClass: ".tab--selected .bar",   properties: ["background: var(--brand-primary)"] },
  { prop: "count",    value: "undefined", cssClass: ".badge", properties: ["display: none (not rendered)"] },
  { prop: "count",    value: "number",    cssClass: ".badge", properties: ["composes: label-bold", "display: flex", "padding: var(--space-xs) var(--space-sm)", "border-radius: var(--radius-round)"] },
];

const STYLE_GROUPS = STYLE_ROWS.reduce<{ prop: string; rows: StyleRow[] }[]>((acc, row) => {
  const last = acc[acc.length - 1];
  if (last && last.prop === row.prop) { last.rows.push(row); }
  else { acc.push({ prop: row.prop, rows: [row] }); }
  return acc;
}, []);

// ─── Playground ───────────────────────────────────────────────────────────────

type PlaygroundProps = {
  target: TabTarget;       onTarget:   (v: TabTarget) => void;
  selected: boolean;       onSelected: (v: boolean)   => void;
  count: boolean;          onCount:    (v: boolean)   => void;
};

function Playground({ target, onTarget, selected, onSelected, count, onCount }: PlaygroundProps) {
  const [copied, setCopied]     = useState(false);

  const snippet = target === "group"
    ? `<TabGroup tabs={[{ label: "Tab 1"${count ? ", count: 5" : ""} }, { label: "Tab 2" }, { label: "Tab 3" }]} />`
    : `<Tab label="Findings"${count ? " count={12}" : ""}${selected ? " selected" : ""} />`;

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const singlePreview = (
    <Tab
      label="Findings"
      count={count ? 12 : undefined}
      selected={selected}
    />
  );

  const groupPreview = (
    <TabGroup
      tabs={[
        { label: "Open",    count: count ? 14 : undefined },
        { label: "Fixed" },
        { label: "Ignored", count: count ? 3  : undefined },
      ]}
    />
  );

  return (
    <>
      <PlaygroundShell
        preview={target === "single" ? singlePreview : groupPreview}
        controls={
          <>
            <ControlRow label="View">
              <Pill active={target === "group"}  onClick={() => onTarget("group")}>group</Pill>
              <Pill active={target === "single"} onClick={() => onTarget("single")}>single tab</Pill>
            </ControlRow>
            {target === "single" && (
              <>
                <ControlRow label="Selected">
                  <Pill active={!selected} onClick={() => onSelected(false)}>no</Pill>
                  <Pill active={selected}  onClick={() => onSelected(true)}>yes</Pill>
                </ControlRow>
              </>
            )}
            <ControlRow label="Count">
              <Pill active={!count} onClick={() => onCount(false)}>none</Pill>
              <Pill active={count}  onClick={() => onCount(true)}>with count</Pill>
            </ControlRow>
          </>
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

type ActiveState = { selected: boolean; count: boolean };

function isActive(row: StyleRow, state: ActiveState): boolean {
  if (row.prop === "selected") return row.value === String(state.selected);
  if (row.prop === "count")    return row.value === (state.count ? "number" : "undefined");
  return false;
}

function StyleReference({ selected, count }: ActiveState) {
  return (
    <div>
      {/* Base styles */}
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
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>.tab</code>
              </td>
              <td style={TD}>
                {["display: inline-flex", "flex-direction: column", "align-items: flex-start", "cursor: pointer", "background: none", "border: none"].map(p => (
                  <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B", lineHeight: "1.9" }}>{p}</div>
                ))}
              </td>
            </tr>
            <tr>
              <td style={{ ...TD, whiteSpace: "nowrap" }}>
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>.inner</code>
              </td>
              <td style={TD}>
                {["display: flex", "align-items: center", "gap: var(--space-sm)", "padding: var(--space-sm)"].map(p => (
                  <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B", lineHeight: "1.9" }}>{p}</div>
                ))}
              </td>
            </tr>
            <tr>
              <td style={{ ...TD, whiteSpace: "nowrap" }}>
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>.label</code>
              </td>
              <td style={TD}>
                {["composes: body-bold", "font-size: var(--font-size-base)", "font-weight: var(--font-weight-bold)", "font-family: var(--font-sans)", "white-space: nowrap"].map(p => (
                  <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B", lineHeight: "1.9" }}>{p}</div>
                ))}
              </td>
            </tr>
            <tr>
              <td style={{ ...TD, whiteSpace: "nowrap" }}>
                <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>.bar</code>
              </td>
              <td style={TD}>
                {["height: 2px", "width: 100%"].map(p => (
                  <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#52525B", lineHeight: "1.9" }}>{p}</div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Prop-driven styles */}
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
                const active = isActive(row, { selected, count });
                return (
                  <tr key={`${prop}-${row.value}-${row.cssClass}`} style={{ backgroundColor: active ? "#F4F4F5" : "transparent" }}>
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

export function TabSection() {
  const [target, setTarget]     = useState<TabTarget>("group");
  const [selected, setSelected] = useState(false);
  const [count, setCount]       = useState(false);

  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Tab / TabGroup</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A single Tab item and a TabGroup that manages selection state. Tabs can show an optional count badge. Use TabGroup in practice - Tab alone is the building block.
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0, position: "sticky", top: "24px", alignSelf: "flex-start" }}>
          <SectionBlock title="Playground">
            <Playground
              target={target}     onTarget={setTarget}
              selected={selected} onSelected={setSelected}
              count={count}       onCount={setCount}
            />
          </SectionBlock>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionBlock title="Style Reference">
            <StyleReference selected={selected} count={count} />
          </SectionBlock>
        </div>
      </div>

      <SectionBlock title="Props">
        <PropsTable source={tabTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
