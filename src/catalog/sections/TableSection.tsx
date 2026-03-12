import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from "../../../components/atoms/Table";
import { BadgeSeverity } from "../../../components/atoms/BadgeSeverity";
import { BadgePriority } from "../../../components/atoms/BadgePriority";
import { BadgeStatus } from "../../../components/atoms/BadgeStatus";
import { SectionBlock } from "../ui/SectionBlock";
import { TokenTable } from "../ui/TokenTable";
import { CodeBlock } from "../ui/CodeBlock";
import { SplitPage } from "../ui/SplitPage";

import tableTsx from "../../../components/atoms/Table.tsx?raw";
import tableCss from "../../../components/atoms/Table.module.css?raw";

const sources = [
  { filename: "Table.tsx",        code: tableTsx },
  { filename: "Table.module.css", code: tableCss },
];

const SAMPLE_ROWS = [
  { finding: "SQL Injection in auth handler",       path: "src/auth/login.ts:42",      priority: "95", severity: "critical" as const, status: "open" as const },
  { finding: "Exposed S3 bucket policy",            path: "infra/storage/bucket.tf:18", priority: "67", severity: "high"     as const, status: "open" as const },
  { finding: "Outdated lodash dependency",           path: "package.json:31",            priority: "28", severity: "medium"   as const, status: "ignored" as const },
  { finding: "Missing HTTPS redirect",              path: "src/server/config.ts:9",     priority: "95", severity: "critical" as const, status: "fixed" as const },
];

export function TableSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Atom</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Table</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Primitive table atoms — purely visual, no data logic. Use these as building blocks.
          A full <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>DataTable</code> molecule with sorting and pagination will be built on top of these.
        </p>
      </div>

      <SectionBlock title="Preview — Findings Table">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell sortable>Finding</TableHeaderCell>
              <TableHeaderCell sortable width={110}>Priority</TableHeaderCell>
              <TableHeaderCell sortable width={110}>Severity</TableHeaderCell>
              <TableHeaderCell width={110}>Status</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SAMPLE_ROWS.map((row) => (
              <TableRow key={row.finding}>
                <TableCell>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontFamily: "'Open Sans', system-ui, sans-serif" }}>{row.finding}</span>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: "'Open Sans', system-ui, sans-serif" }}>{row.path}</span>
                  </div>
                </TableCell>
                <TableCell width={110}>
                  <BadgePriority priorityScore={row.severity === "medium" || row.severity === "high" || row.severity === "critical" ? row.severity : "medium"} text={row.priority} />
                </TableCell>
                <TableCell width={110}>
                  <BadgeSeverity scale={row.severity} size="sm" />
                </TableCell>
                <TableCell width={110}>
                  <BadgeStatus status={row.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionBlock>

      <SectionBlock title="Anatomy">
        <TokenTable rows={[
          { property: "Table",           token: "<table>",  value: "Container — border, radius, overflow hidden" },
          { property: "TableHead",       token: "<thead>",  value: "Header wrapper — secondary surface background" },
          { property: "TableBody",       token: "<tbody>",  value: "Body wrapper — no styling, just semantic" },
          { property: "TableRow",        token: "<tr>",     value: "Row — hover state, bottom border" },
          { property: "TableHeaderCell", token: "<th>",     value: "50px height, bold 12px uppercase, optional sort icon" },
          { property: "TableCell",       token: "<td>",     value: "60px height, 14px regular — or muted (12px secondary color)" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Tokens">
        <TokenTable rows={[
          { property: "container border",    token: "--stroke-secondary",  value: "var(--neutral-200)" },
          { property: "container radius",    token: "--radius-lg",          value: "15px" },
          { property: "header background",   token: "--surface-secondary",  value: "var(--neutral-50)" },
          { property: "row background",      token: "--surface-primary",    value: "white" },
          { property: "row hover",           token: "--surface-secondary",  value: "var(--neutral-50)" },
          { property: "row border",          token: "--stroke-secondary",   value: "var(--neutral-200)" },
          { property: "header text",         token: "--text-secondary",     value: "var(--neutral-400)" },
          { property: "body text",           token: "--text-primary",       value: "var(--neutral-600)" },
          { property: "header cell height",  token: "—",                    value: "50px" },
          { property: "body cell height",    token: "—",                    value: "60px" },
          { property: "cell padding",        token: "--space-base",         value: "12px" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Usage">
        <CodeBlock code={`import {
  Table, TableHead, TableBody,
  TableRow, TableHeaderCell, TableCell
} from "./components/atoms";

<Table>
  <TableHead>
    <TableRow>
      <TableHeaderCell sortable>Finding</TableHeaderCell>
      <TableHeaderCell sortable width={110}>Severity</TableHeaderCell>
      <TableHeaderCell width={110}>Status</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {rows.map((row) => (
      <TableRow key={row.id}>
        <TableCell>{row.finding}</TableCell>
        <TableCell><BadgeSeverity scale={row.severity} size="sm" /></TableCell>
        <TableCell><BadgeStatus status={row.status} /></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`} />
      </SectionBlock>
    </SplitPage>
  );
}
