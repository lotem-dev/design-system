import { useState } from "react";
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

const TABLE_SNIPPET = `<Table
  columns={[
    { id: "name",     label: "Finding",  width: "220px" },
    { id: "severity", label: "Severity" },
    { id: "source",   label: "Source" },
    { id: "date",     label: "Detected" },
  ]}
  rows={rows}
/>`;

function Playground() {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(TABLE_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
    <PlaygroundShell
      preview={<Table columns={COLUMNS} rows={ROWS} />}
      controls={null}
    />

    <div style={{ marginTop: "12px" }}>
      <div style={{ position: "relative" }}>
        <pre style={{
          margin: 0, padding: "14px 52px 14px 16px",
          backgroundColor: "#18181B", borderRadius: "8px",
          fontSize: "12px", fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          color: "#E4E4E7", lineHeight: "1.7", overflowX: "auto", whiteSpace: "pre",
        }}>
          {TABLE_SNIPPET}
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
