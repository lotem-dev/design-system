import { useState } from "react";
import { TableHeaderCell, type SortDirection, type TableHeaderCellColumn } from "../../../components/atoms/TableHeaderCell";
import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell, ControlRow, Pill } from "../ui/PlaygroundShell";

import tableHeaderCellTsx from "../../../components/atoms/TableHeaderCell.tsx?raw";
import tableHeaderCellCss from "../../../components/atoms/TableHeaderCell.module.css?raw";

const sources = [
  { filename: "TableHeaderCell.tsx",        code: tableHeaderCellTsx },
  { filename: "TableHeaderCell.module.css", code: tableHeaderCellCss },
];

function Playground() {
  const [column, setColumn]   = useState<TableHeaderCellColumn>("regular");
  const [sort, setSort]       = useState<SortDirection>("none");
  const [checked, setChecked] = useState(false);

  return (
    <PlaygroundShell
      preview={
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <TableHeaderCell
                column={column}
                label="Column"
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
          <ControlRow label="Sort">
            {(["none", "asc", "desc"] as const).map(s => (
              <Pill key={s} active={sort === s} onClick={() => setSort(s)}>{s}</Pill>
            ))}
          </ControlRow>
        </>
      }
    />
  );
}

export function TableHeaderCellSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atom</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>TableHeaderCell</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A single <code>&lt;th&gt;</code> element for table headers. Supports five column roles — checkbox,
          first, regular, last, and actions — each with distinct padding. Text columns show a label and a
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
        <TokenTable rows={[
          { property: "column",   token: '"checkbox" | "first" | "regular" | "last" | "actions"', value: '"regular"', note: "Sets padding and content type" },
          { property: "label",    token: "string",                                                 value: '"Column"',  note: "Uppercase column heading text" },
          { property: "sort",     token: '"none" | "asc" | "desc"',                               value: '"none"',    note: "Controls which sort icon is shown" },
          { property: "onSort",   token: "() => void",                                            value: "—",         note: "Click handler — adds pointer cursor when provided" },
          { property: "checked",  token: "boolean",                                                value: "false",     note: "Checkbox column only" },
          { property: "onCheck",  token: "(checked: boolean) => void",                            value: "—",         note: "Checkbox column only" },
        ]} />
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
