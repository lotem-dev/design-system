export type TokenRow = {
  property: string;   // e.g. "background-color"
  token: string;      // e.g. "--status-open-secondary"
  value: string;      // e.g. "#FFE3E6"
  note?: string;      // optional explanation
};

type TokenTableProps = {
  rows: TokenRow[];
};

export function TokenTable({ rows }: TokenTableProps) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "13px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <thead>
        <tr style={{ borderBottom: "1px solid #E4E4E7" }}>
          {["CSS Property", "Token", "Value", ""].map((h) => (
            <th
              key={h}
              style={{
                textAlign: "left",
                padding: "8px 12px",
                color: "#71717A",
                fontWeight: 500,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            style={{
              borderBottom: "1px solid #F4F4F5",
              backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAFAFA",
            }}
          >
            {/* CSS Property */}
            <td style={{ padding: "10px 12px", color: "#3F3F46", fontFamily: "monospace" }}>
              {row.property}
            </td>

            {/* Token name */}
            <td style={{ padding: "10px 12px" }}>
              <code
                style={{
                  backgroundColor: "#F4F4F5",
                  color: "#18181B",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontFamily: "monospace",
                }}
              >
                {row.token}
              </code>
            </td>

            {/* Value + color swatch if it's a color */}
            <td style={{ padding: "10px 12px" }}>
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
                <code style={{ fontSize: "12px", color: "#52525B", fontFamily: "monospace" }}>
                  {row.value}
                </code>
              </div>
            </td>

            {/* Optional note */}
            <td style={{ padding: "10px 12px", color: "#A1A1AA", fontSize: "12px" }}>
              {row.note ?? ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Simple check: does this look like a color value?
function isColor(value: string): boolean {
  return value.startsWith("#") || value.startsWith("rgb") || value.startsWith("rgba");
}
