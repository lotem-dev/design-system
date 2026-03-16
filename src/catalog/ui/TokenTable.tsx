export type TokenRow = {
  property: string;   // e.g. "background-color"
  token: string;      // e.g. "--status-open-secondary"
  value: string;      // e.g. "#FFE3E6"
  note?: string;      // optional explanation
};

type TokenTableProps = {
  rows: TokenRow[];
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

export function TokenTable({ rows }: TokenTableProps) {
  const hasNotes = rows.some(r => r.note);

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "13px",
          fontFamily: "'Open Sans', system-ui, sans-serif",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid #E4E4E7" }}>
            <th style={HEADER_STYLE}>CSS Property</th>
            <th style={HEADER_STYLE}>Token</th>
            <th style={HEADER_STYLE}>Value</th>
            {hasNotes && <th style={HEADER_STYLE}>Note</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #F4F4F5" }}>
              {/* CSS Property */}
              <td style={{ padding: "10px 12px", color: "#3F3F46", fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: "12px", whiteSpace: "nowrap" }}>
                {row.property}
              </td>

              {/* Token name */}
              <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>
                <code
                  style={{
                    backgroundColor: "#F4F4F5",
                    color: "#18181B",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  }}
                >
                  {row.token}
                </code>
              </td>

              {/* Value + color swatch if it's a color */}
              <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {isColor(row.value) && (
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "3px",
                        backgroundColor: row.value,
                        border: "1px solid rgba(0,0,0,0.1)",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <code style={{ fontSize: "12px", color: "#52525B", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
                    {row.value}
                  </code>
                </div>
              </td>

              {/* Optional note */}
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

// Simple check: does this look like a color value?
function isColor(value: string): boolean {
  return value.startsWith("#") || value.startsWith("rgb") || value.startsWith("rgba");
}
