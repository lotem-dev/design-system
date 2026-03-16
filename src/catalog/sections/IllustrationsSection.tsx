export function IllustrationsSection() {
  return (
    <div style={{ padding: "48px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "0 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
          Illustrations
        </h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Illustrations live in <code style={{ fontFamily: "monospace", fontSize: "13px", background: "#F4F4F5", padding: "1px 5px", borderRadius: "4px" }}>components/illustrations/</code>. This category is reserved for decorative assets — empty states, onboarding visuals, error pages, and other bespoke artwork used across the product.
        </p>
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "64px 32px",
        border: "1px dashed #E4E4E7",
        borderRadius: "12px",
        backgroundColor: "#FAFAFA",
      }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="4" y="8" width="32" height="24" rx="3" stroke="#D4D4D8" strokeWidth="1.5" />
          <circle cx="14" cy="16" r="3" stroke="#D4D4D8" strokeWidth="1.5" />
          <path d="M4 26L12 20L18 25L25 18L36 26" stroke="#D4D4D8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p style={{ margin: 0, fontSize: "14px", color: "#A1A1AA", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
          No illustrations yet — coming soon.
        </p>
      </div>
    </div>
  );
}
