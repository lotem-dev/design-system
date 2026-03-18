import { Table } from "../../../components/tables/Table";
import { BadgeSeverity } from "../../../components/badges/BadgeSeverity";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";
import { PlaygroundShell } from "../ui/PlaygroundShell";
import { PropsTable } from "../ui/PropsTable";

import tableTsx from "../../../components/tables/Table.tsx?raw";
import tableCss from "../../../components/tables/Table.module.css?raw";

const sources = [
  { filename: "Table.tsx",        code: tableTsx },
  { filename: "Table.module.css", code: tableCss },
];

const COLUMNS = [
  { id: "name",     label: "Finding",   width: "220px" },
  { id: "severity", label: "Severity" },
  { id: "source",   label: "Source" },
  { id: "date",     label: "Detected" },
];

const ROWS = [
  { name: "CVE-2024-12345",           severity: <BadgeSeverity scale="critical" />, source: "SCA",    date: "Mar 12, 2026" },
  { name: "Hardcoded secret in .env", severity: <BadgeSeverity scale="high" />,     source: "Secret", date: "Mar 11, 2026" },
  { name: "Outdated npm dependency",  severity: <BadgeSeverity scale="medium" />,   source: "SCA",    date: "Mar 10, 2026" },
  { name: "Open S3 bucket",           severity: <BadgeSeverity scale="high" />,     source: "IaC",    date: "Mar 9, 2026" },
  { name: "SQL injection risk",       severity: <BadgeSeverity scale="low" />,      source: "SAST",   date: "Mar 8, 2026" },
];

function Playground() {
  return (
    <PlaygroundShell
      preview={<Table columns={COLUMNS} rows={ROWS} />}
      controls={null}
    />
  );
}

export function TableSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Table</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A full-width data table with column headers and rows. Define your columns once and pass row data as plain objects. Cell values can be any React node - text, badges, buttons.
        </p>
      </div>
      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
      <SectionBlock title="Props">
        <PropsTable source={tableTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
