import React, { useState } from "react";
import { TableHeaderCell, type SortDirection, type TableHeaderCellColumn } from "../../../components/tables/TableHeaderCell";
import { TokenTable } from "../ui/TokenTable";
import { PropsTable } from "../ui/PropsTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import tableHeaderCellTsx from "../../../components/tables/TableHeaderCell.tsx?raw";
import tableHeaderCellCss from "../../../components/tables/TableHeaderCell.module.css?raw";

const sources = [
  { filename: "TableHeaderCell.tsx",        code: tableHeaderCellTsx },
  { filename: "TableHeaderCell.module.css", code: tableHeaderCellCss },
];

const INPUT_STYLE: React.CSSProperties = {
  padding: "4px 10px", fontSize: "12px",
  fontFamily: "'Open Sans', system-ui, sans-serif",
  border: "1px solid #E4E4E7", borderRadius: "6px",
  color: "#09090B", background: "#FFFFFF",
  outline: "none", width: "140px",
};

function generateSnippet(column: TableHeaderCellColumn, sort: SortDirection, checked: boolean, label: string): string {
  if (column === "checkbox") {
    return `<TableHeaderCell column="checkbox" checked={${checked}} onCheck={setChecked} />`;
  }
  if (column === "actions") {
    return `<TableHeaderCell column="actions" />`;
  }
  const props: string[] = [`column="${column}"`, `label="${label}"`];
  if (sort !== "none") props.push(`sort="${sort}"`);
  props.push(`onSort={() => {}}`);
  return `<TableHeaderCell ${props.join(" ")} />`;
}

function Playground() {
  const [column, setColumn]   = useState<TableHeaderCellColumn>("regular");
  const [sort, setSort]       = useState<SortDirection>("none");
  const [checked, setChecked] = useState(false);
  const [label, setLabel]     = useState("Column");
  const [copied, setCopied]   = useState(false);

  const snippet = generateSnippet(column, sort, checked, label);

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
    <PlaygroundShell
      preview={
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <TableHeaderCell
                column={column}
                label={label}
                sort={sort}
                onSort={column !== "checkbox" && column !== "actions" ? () => {
                  setSort(s => s === "none" ? "asc" : s === "asc" ? "desc" : "none");
                } : undefined}
                checked={checked}
                onCheck={setChecked}
              />
            </tr>
          </thead>
        </table>
      }
      controls={
        <>
          <ControlRow label="Column type">
            {(["checkbox", "first", "regular", "last", "actions"] as const).map(c => (
              <Pill key={c} active={column === c} onClick={() => setColumn(c)}>{c}</Pill>
            ))}
          </ControlRow>
          {column !== "checkbox" && column !== "actions" && (
            <ControlRow label="Label">
              <input value={label} onChange={e => setLabel(e.target.value)} style={INPUT_STYLE} />
            </ControlRow>
          )}
          <ControlRow label="Sort">
            {(["none", "asc", "desc"] as const).map(s => (
              <Pill key={s} active={sort === s} onClick={() => setSort(s)}>{s}</Pill>
            ))}
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

export function TableHeaderCellSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>TableHeaderCell</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A single <code>&lt;th&gt;</code> element for table headers. Supports five column roles - checkbox,
          first, regular, last, and actions - each with distinct padding. Text columns show a label and a
          sort icon that cycles through none → asc → desc.
        </p>
      </div>

      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>

      <SectionBlock title="All column types">
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <TableHeaderCell column="checkbox" checked={false} onCheck={() => {}} />
              <TableHeaderCell column="first"   label="Name"     sort="asc"  onSort={() => {}} />
              <TableHeaderCell column="regular" label="Status"   sort="none" onSort={() => {}} />
              <TableHeaderCell column="last"    label="Updated"  sort="desc" onSort={() => {}} />
              <TableHeaderCell column="actions" />
            </tr>
          </thead>
        </table>
      </SectionBlock>

      <SectionBlock title="Props">
        <PropsTable source={tableHeaderCellTsx} />
      </SectionBlock>

      <SectionBlock title="Tokens">
        <TokenTable rows={[
          { property: "background",    token: "--surface-secondary",  value: "var(--neutral-50)" },
          { property: "border bottom", token: "--stroke-secondary",   value: "var(--neutral-200)" },
          { property: "label color",   token: "--text-secondary",     value: "var(--neutral-500)" },
          { property: "icon color",    token: "--text-tertiary",      value: "var(--neutral-400)" },
        ]} />
      </SectionBlock>
    </SplitPage>
  );
}
