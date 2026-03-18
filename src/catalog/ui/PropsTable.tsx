// PropsTable.tsx
// Auto-generates a props reference table from a component's raw source file.
// It reads the // comments and TypeScript types directly — so the table is
// always in sync with the component code, no manual updates needed.

import { parseProps } from "./parseProps";

type PropsTableProps = {
  // The raw source code of the component file — import it with ?raw in Vite.
  source: string;
};

export function PropsTable({ source }: PropsTableProps) {
  const props = parseProps(source);

  if (props.length === 0) {
    return (
      <p style={{ fontSize: "13px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
        No props found.
      </p>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "13px",
        fontFamily: "'Open Sans', system-ui, sans-serif",
        tableLayout: "fixed",
      }}>
        <colgroup>
          <col style={{ width: "160px" }} />
          <col style={{ width: "200px" }} />
          <col style={{ width: "90px" }} />
          <col />
        </colgroup>
        <thead>
          <tr style={{ borderBottom: "2px solid #E4E4E7" }}>
            <Th>Prop</Th>
            <Th>Type</Th>
            <Th>Required</Th>
            <Th>Description</Th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr
              key={p.name}
              style={{ borderBottom: "1px solid #F4F4F5" }}
            >
              <Td>
                <code style={{
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: "12px",
                  color: "#18181B",
                  backgroundColor: "#F4F4F5",
                  padding: "2px 6px",
                  borderRadius: "4px",
                }}>
                  {p.name}
                </code>
              </Td>
              <Td>
                <code style={{
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: "11px",
                  color: "#52525B",
                  backgroundColor: "#F4F4F5",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}>
                  {p.type}
                </code>
              </Td>
              <Td>
                <span style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: p.required ? "#D1002A" : "#A1A1AA",
                }}>
                  {p.required ? "yes" : "no"}
                </span>
              </Td>
              <Td style={{ color: "#52525B", lineHeight: "1.5" }}>
                {p.description || <span style={{ color: "#D4D4D8" }}>—</span>}
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th style={{
      textAlign: "left",
      padding: "6px 12px 10px",
      fontSize: "11px",
      fontWeight: 600,
      color: "#A1A1AA",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      whiteSpace: "nowrap",
      fontFamily: "'Open Sans', system-ui, sans-serif",
    }}>
      {children}
    </th>
  );
}

function Td({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <td style={{ padding: "10px 12px", verticalAlign: "top", ...style }}>
      {children}
    </td>
  );
}
