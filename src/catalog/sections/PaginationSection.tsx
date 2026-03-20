import { useState } from "react";
import { Pagination } from "../../../components/navigation/Pagination";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import paginationTsx from "../../../components/navigation/Pagination.tsx?raw";
import paginationCss from "../../../components/navigation/Pagination.module.css?raw";

const sources = [
  { filename: "Pagination.tsx",        code: paginationTsx },
  { filename: "Pagination.module.css", code: paginationCss },
];

const TOTALS = [3, 10, 20] as const;

// ─── Code snippet ─────────────────────────────────────────────────────────────

function generateSnippet(page: number, total: number): string {
  return `<Pagination\n  page={${page}}\n  total={${total}}\n  pageSize={50}\n  totalItems={${total * 50}}\n  onChange={setPage}\n/>`;
}

// ─── Playground ───────────────────────────────────────────────────────────────

function Playground() {
  const [page, setPage]   = useState(1);
  const [total, setTotal] = useState(10);
  const [copied, setCopied] = useState(false);
  const snippet = generateSnippet(page, total);

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <PlaygroundShell
        preview={
          <div style={{ width: "100%", border: "1px solid #F4F4F5", borderRadius: "8px", overflow: "hidden" }}>
            <Pagination
              page={page}
              total={total}
              pageSize={50}
              totalItems={total * 50}
              onChange={setPage}
            />
          </div>
        }
        controls={
          <ControlRow label="Total pages">
            {TOTALS.map(t => (
              <Pill key={t} active={total === t} onClick={() => { setTotal(t); setPage(1); }}>{t}</Pill>
            ))}
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

type StyleRow = { prop: string; value: string; cssClass: string; properties: string[] };

const STYLE_ROWS: StyleRow[] = [
  { prop: "page", value: "other",   cssClass: ".pageBtn",        properties: ["font-weight: var(--font-weight-regular)", "color: var(--text-primary)"] },
  { prop: "page", value: "current", cssClass: ".pageBtn.active", properties: ["font-weight: var(--font-weight-bold)", "color: var(--brand-primary)", "pointer-events: none"] },
  { prop: "page <= 1",    value: "true", cssClass: ".chevronBtn:disabled", properties: ["opacity: 0.4", "cursor: not-allowed"] },
  { prop: "page >= total", value: "true", cssClass: ".chevronBtn:disabled", properties: ["opacity: 0.4", "cursor: not-allowed"] },
];

const STYLE_GROUPS = STYLE_ROWS.reduce<{ prop: string; rows: StyleRow[] }[]>((acc, row) => {
  const last = acc[acc.length - 1];
  if (last && last.prop === row.prop) { last.rows.push(row); }
  else { acc.push({ prop: row.prop, rows: [row] }); }
  return acc;
}, []);

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
              { cls: ".root",    props: ["display: flex", "justify-content: space-between", "padding: var(--space-lg)"] },
              { cls: ".meta",    props: ["font-size: var(--font-label-size)", "color: var(--text-secondary)"] },
              { cls: ".right",   props: ["display: flex", "gap: var(--space-xl)"] },
              { cls: ".nav",     props: ["display: flex", "gap: var(--space-base)"] },
              { cls: ".pageBtn", props: ["background: none", "border: none", "color: var(--text-primary)"] },
              { cls: ".chevronBtn", props: ["background: none", "border: none", "color: var(--text-primary)"] },
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
        Prop-driven - updates as you interact with the playground above.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={TH}>Condition</th>
              <th style={TH}>Value</th>
              <th style={TH}>Class</th>
              <th style={TH}>Properties</th>
            </tr>
          </thead>
          <tbody>
            {STYLE_GROUPS.map(({ prop, rows }) =>
              rows.map((row, i) => (
                <tr key={`${prop}-${row.value}`}>
                  {i === 0 && (
                    <td rowSpan={rows.length} style={{ ...TD, borderRight: "1px solid #F4F4F5", verticalAlign: "middle" }}>
                      <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#18181B", backgroundColor: "#EBEBEB", padding: "2px 6px", borderRadius: "4px", whiteSpace: "nowrap" }}>{prop}</code>
                    </td>
                  )}
                  <td style={{ ...TD, whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#71717A" }}>{row.value}</span>
                  </td>
                  <td style={{ ...TD, whiteSpace: "nowrap" }}>
                    <code style={{ fontSize: "12px", fontFamily: "monospace", color: "#A1A1AA", backgroundColor: "#F4F4F5", padding: "2px 6px", borderRadius: "4px" }}>
                      {row.cssClass}
                    </code>
                  </td>
                  <td style={TD}>
                    {row.properties.map(p => (
                      <div key={p} style={{ fontSize: "12px", fontFamily: "monospace", color: "#A1A1AA", lineHeight: "1.9" }}>{p}</div>
                    ))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function PaginationSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Pagination</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A footer bar for navigating pages of data. Shows items-per-page on the left and the result range with page navigation on the right. Active page is bold and brand-colored - no bordered buttons.
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "8px" }}>
        <div style={{ flex: "0 0 52%", minWidth: 0, position: "sticky", top: "24px", alignSelf: "flex-start" }}>
          <SectionBlock title="Playground">
            <Playground />
          </SectionBlock>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionBlock title="Style Reference">
            <StyleReference />
          </SectionBlock>
        </div>
      </div>

      <SectionBlock title="Props">
        <PropsTable source={paginationTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
