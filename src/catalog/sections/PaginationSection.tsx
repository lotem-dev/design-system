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

const TOTALS = [5, 10, 20] as const;

function Playground() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);

  return (
    <PlaygroundShell
      preview={
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
          <Pagination page={page} total={total} onChange={setPage} />
          <span style={{ fontSize: "12px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
            Page {page} of {total}
          </span>
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
  );
}

export function PaginationSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Pagination</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Allows navigation through pages of data. Shows page numbers around the current page with previous and next arrows. Automatically adds ellipsis for large page counts.
        </p>
      </div>
      <SectionBlock title="Playground">
        <Playground />
      </SectionBlock>
      <SectionBlock title="Props">
        <PropsTable source={paginationTsx} />
      </SectionBlock>
    </SplitPage>
  );
}
