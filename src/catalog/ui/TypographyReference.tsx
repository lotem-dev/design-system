// TypographyReference — shared catalog UI block.
// Shows which typography role each visible text element in a component uses.
// Used in the Style Reference panel of every component section that has text.

export type TypographyEntry = {
  // The visible element name as a designer or developer would describe it.
  // e.g. "Label", "Input text", "Placeholder", "Title"
  element: string;
  // The typography role class name from typography-roles.module.css.
  // e.g. "body", "label-bold", "medium", "caption"
  role: string;
  // Optional short note for context, e.g. "secondary color", "error color"
  note?: string;
};

type TypographyReferenceProps = {
  rows: TypographyEntry[];
};

const TH: React.CSSProperties = {
  textAlign: "left", padding: "6px 12px 10px",
  fontSize: "11px", fontWeight: 600, color: "#A1A1AA",
  textTransform: "uppercase", letterSpacing: "0.06em",
  fontFamily: "'Open Sans', system-ui, sans-serif",
  whiteSpace: "nowrap", borderBottom: "2px solid #E4E4E7",
};

const TD: React.CSSProperties = {
  padding: "10px 12px", verticalAlign: "middle", borderBottom: "1px solid #F4F4F5",
};

export function TypographyReference({ rows }: TypographyReferenceProps) {
  return (
    <div style={{ overflowX: "auto", marginBottom: "28px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={TH}>Element</th>
            <th style={TH}>Typography Role</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.element}>
              <td style={{ ...TD, fontSize: "12px", fontFamily: "'Open Sans', system-ui, sans-serif", color: "#52525B" }}>
                {row.element}
              </td>
              <td style={TD}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <code style={{
                    fontSize: "12px",
                    fontFamily: "monospace",
                    color: "#6B4EFF",
                    backgroundColor: "#F0EDFF",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    whiteSpace: "nowrap",
                  }}>
                    {row.role}
                  </code>
                  {row.note && (
                    <span style={{ fontSize: "11px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
                      {row.note}
                    </span>
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
