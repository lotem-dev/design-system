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
    <SplitPage files={sources} alwaysOpen>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Radius</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          Border radius tokens control the roundness of components. Always use tokens instead of hardcoded values so the visual language stays consistent.
        </p>
      </div>

      <TokenTable
        hideProperty
        rows={RADIUS.map(({ token, value }) => ({
          property: "border-radius",
          token,
          value,
          example: (
            <div style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#18181B",
              borderRadius: value,
            }} />
          ),
        }))}
      />
    </SplitPage>
  );
}
