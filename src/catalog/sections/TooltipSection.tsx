import { Tooltip } from "../../../components/atoms/Tooltip";
import { SectionBlock } from "../ui/SectionBlock";
import { PreviewBox } from "../ui/PreviewBox";
import { TokenTable } from "../ui/TokenTable";
import { CodeBlock } from "../ui/CodeBlock";

export function TooltipSection() {
  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "system-ui" }}>Atom</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "system-ui" }}>Tooltip</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A dark bubble for short contextual information. Supports a primary text, optional secondary text,
          and an optional link. Positioning behavior (show on hover, placement) to be added later.
        </p>
      </div>

      <SectionBlock title="Text only">
        <PreviewBox>
          <Tooltip text="Tooltip Text" />
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="With secondary text">
        <PreviewBox>
          <Tooltip text="Tooltip Text" secondaryText="Tooltip Secondary Text" />
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="With link">
        <PreviewBox>
          <Tooltip text="Tooltip Text" linkLabel="Learn more" linkHref="#" />
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="All options">
        <PreviewBox>
          <Tooltip
            text="CVSS Score: 9.8"
            secondaryText="Last seen 2 days ago"
            linkLabel="View details"
            linkHref="#"
          />
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="Tokens">
        <TokenTable rows={[
          { property: "background",    token: "--fill-tooltip",   value: "var(--neutral-900)" },
          { property: "text color",    token: "--text-invert",    value: "white" },
          { property: "link color",    token: "--text-secondary", value: "var(--neutral-400)" },
          { property: "padding",       token: "--space-base",     value: "12px" },
          { property: "gap",           token: "--space-sm",       value: "8px" },
          { property: "border radius", token: "--radius-base",    value: "8px" },
          { property: "max width",     token: "—",                value: "240px" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Usage">
        <CodeBlock code={`import { Tooltip } from "./components/atoms";

// Text only
<Tooltip text="This finding is critical" />

// With secondary text
<Tooltip
  text="CVSS Score: 9.8"
  secondaryText="Last seen 2 days ago"
/>

// With link
<Tooltip
  text="Remediation available"
  linkLabel="View fix"
  linkHref="/fix/123"
/>`} />
      </SectionBlock>
    </div>
  );
}
