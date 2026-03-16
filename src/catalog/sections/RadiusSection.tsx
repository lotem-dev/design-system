import { TokenTable } from "../ui/TokenTable";
import { SplitPage } from "../ui/SplitPage";

import radiusCss from "../../../styles/tokens/radius.css?raw";

const sources = [{ filename: "radius.css", code: radiusCss }];

const RADIUS = [
  { token: "--radius-xs",    value: "4px"   },
  { token: "--radius-sm",    value: "6px"   },
  { token: "--radius-base",  value: "8px"   },
  { token: "--radius-lg",    value: "15px"  },
  { token: "--radius-round", value: "999px" },
];

export function RadiusSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Radius</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Border radius tokens control the roundness of components. Always use tokens instead of hardcoded values so the visual language stays consistent.
        </p>
      </div>

      <div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginBottom: "24px" }}>
          {RADIUS.map(({ token, value }) => (
            <div key={token} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "64px", height: "64px", backgroundColor: "#F4F4F5", border: "2px solid #18181B", borderRadius: value }} />
              <code style={{ fontSize: "10px", color: "#52525B", textAlign: "center", fontFamily: "monospace" }}>{token}</code>
              <code style={{ fontSize: "10px", color: "#A1A1AA", fontFamily: "monospace" }}>{value}</code>
            </div>
          ))}
        </div>
        <TokenTable rows={RADIUS.map(({ token, value }) => ({ property: "border-radius", token, value }))} />
      </div>
    </SplitPage>
  );
}
