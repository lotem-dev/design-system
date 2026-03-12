import { Divider } from "../../../components/atoms/Divider";
import { PreviewBox } from "../ui/PreviewBox";
import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";

import dividerTsx from "../../../components/atoms/Divider.tsx?raw";

const sources = [
  { filename: "Divider.tsx", code: dividerTsx },
];

export function DividerSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>⚛️ Atom</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Divider</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A visual separator between sections of content. Supports horizontal (between rows) and vertical (between side-by-side elements).
          Color defaults to <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>--divider-primary</code> but can be overridden with any color token.
        </p>
      </div>

      <SectionBlock title="Preview">
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <p style={{ margin: "0 0 12px", fontSize: "12px", color: "#71717A", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Horizontal</p>
            <PreviewBox>
              <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "13px", color: "#52525B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Section A</span>
                <Divider orientation="horizontal" />
                <span style={{ fontSize: "13px", color: "#52525B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Section B</span>
              </div>
            </PreviewBox>
          </div>
          <div>
            <p style={{ margin: "0 0 12px", fontSize: "12px", color: "#71717A", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Vertical</p>
            <PreviewBox>
              <div style={{ display: "flex", alignItems: "center", height: "48px" }}>
                <span style={{ fontSize: "13px", color: "#52525B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Item A</span>
                <Divider orientation="vertical" />
                <span style={{ fontSize: "13px", color: "#52525B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Item B</span>
              </div>
            </PreviewBox>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock title="Props">
        <TokenTable rows={[
          { property: "orientation", token: `"horizontal" | "vertical"`, value: `"horizontal"`, note: "Default" },
          { property: "thickness",   token: "number (px)",               value: "1",            note: "Line thickness" },
          { property: "spacing",     token: "number (px)",               value: "12",           note: "Margin around the divider" },
          { property: "color",       token: "CSS color string",          value: "--divider-primary", note: "Override if needed" },
        ]} />
      </SectionBlock>

      <SectionBlock title="CSS Properties">
        <TokenTable rows={[
          { property: "background-color", token: "--divider-primary",  value: "#E2E8F0", note: "Default color" },
          { property: "height (horiz.)",  token: "thickness prop",     value: "1px" },
          { property: "width (vert.)",    token: "thickness prop",     value: "1px" },
          { property: "margin-block",     token: "spacing prop",       value: "12px",    note: "Horizontal only" },
          { property: "margin-inline",    token: "spacing prop",       value: "12px",    note: "Vertical only" },
          { property: "flex-shrink",      token: "—",                  value: "0",       note: "Prevents compression in flex" },
        ]} />
      </SectionBlock>
    </SplitPage>
  );
}
