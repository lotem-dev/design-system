export type TokenRow = {
  property: string;
  token: string;
  value: string;
  note?: string;
  example?: React.ReactNode;
};

type TokenTableProps = {
  rows: TokenRow[];
  hideProperty?: boolean;
};

const HEADER_STYLE: React.CSSProperties = {
  textAlign: "left",
  padding: "6px 12px 10px",
  fontSize: "11px",
  fontWeight: 600,
  color: "#A1A1AA",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  fontFamily: "'Open Sans', system-ui, sans-serif",
  whiteSpace: "nowrap",
};

export function TokenTable({ rows, hideProperty = false }: TokenTableProps) {
  const hasNotes    = rows.some(r => r.note);
  const hasExamples = rows.some(r => r.example !== undefined);

  // Column widths (percentages) based on which columns are visible
  const colWidths = getColWidths(hideProperty, hasNotes, hasExamples);

  return (
    <div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "13px",
          fontFamily: "'Open Sans', system-ui, sans-serif",
          tableLayout: "fixed",
        }}
      >
        <colgroup>
          {colWidths.map((w, i) => <col key={i} style={{ width: w }} />)}
        </colgroup>
        <thead>
          <tr style={{ borderBottom: "2px solid #E4E4E7" }}>
            {!hideProperty && <th style={HEADER_STYLE}>CSS Property</th>}
            <th style={HEADER_STYLE}>Token</th>
            <th style={HEADER_STYLE}>Value</th>
            {hasExamples && <th style={HEADER_STYLE}>Example</th>}
            {hasNotes    && <th style={HEADER_STYLE}>Note</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #F4F4F5" }}>

              {/* CSS Property */}
              {!hideProperty && (
                <td style={{ padding: "10px 12px", color: "#3F3F46", fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: "12px", wordBreak: "break-word" }}>
                  {row.property}
                </td>
              )}

              {/* Token name */}
              <td style={{ padding: "10px 12px" }}>
                <code style={{ backgroundColor: "#F4F4F5", color: "#18181B", padding: "2px 6px", borderRadius: "4px", fontSize: "12px", fontFamily: "'JetBrains Mono', 'Fira Code', monospace", wordBreak: "break-word" }}>
                  {row.token}
                </code>
              </td>

              {/* Value */}
              <td style={{ padding: "10px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {isColor(row.value) && (
                    <div style={{ width: "16px", height: "16px", borderRadius: "3px", backgroundColor: row.value, border: "1px solid rgba(0,0,0,0.1)", flexShrink: 0 }} />
                  )}
                  <code style={{ fontSize: "12px", color: "#52525B", fontFamily: "'JetBrains Mono', 'Fira Code', monospace", wordBreak: "break-word" }}>
                    {row.value}
                  </code>
                </div>
              </td>

              {/* Example */}
              {hasExamples && (
                <td style={{ padding: "10px 12px", verticalAlign: "middle" }}>
                  {row.example ?? null}
                </td>
              )}

              {/* Note */}
              {hasNotes && (
                <td style={{ padding: "10px 12px", color: "#A1A1AA", fontSize: "12px" }}>
                  {row.note ?? ""}
                </td>
              )}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getColWidths(hideProperty: boolean, hasNotes: boolean, hasExamples: boolean): string[] {
  if (hideProperty && hasExamples && hasNotes)  return ["30%", "20%", "35%", "15%"];
  if (hideProperty && hasExamples)              return ["35%", "20%", "45%"];
  if (hideProperty && hasNotes)                 return ["35%", "40%", "25%"];
  if (hideProperty)                             return ["40%", "60%"];
  if (hasNotes)                                 return ["15%", "28%", "32%", "25%"];
  return ["20%", "35%", "45%"];
}

function isColor(value: string): boolean {
  return value.startsWith("#") || value.startsWith("rgb") || value.startsWith("rgba");
}
