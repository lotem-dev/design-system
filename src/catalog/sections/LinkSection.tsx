import { Link } from "../../../components/atoms/Link";
import { Text } from "../../../components/typography/Text";
import { CodeBlock } from "../ui/CodeBlock";
import { PreviewBox } from "../ui/PreviewBox";
import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";

import linkTsx from "../../../components/atoms/Link.tsx?raw";

const sources = [
  { filename: "Link.tsx", code: linkTsx },
];

export function LinkSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Atom</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Link</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A semantic anchor element. Link handles the interaction behavior (hover underline, focus ring, external tab safety)
          but does not control typography — wrap its children in a <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>{"<Text>"}</code> component for that.
        </p>
      </div>

      <SectionBlock title="Preview">
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <p style={{ margin: "0 0 8px", fontSize: "11px", color: "#71717A", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Brand color</p>
              <Link href="#" colorToken="var(--brand-primary)">
                <Text role="page-title">Visit the docs</Text>
              </Link>
            </div>
            <div>
              <p style={{ margin: "0 0 8px", fontSize: "11px", color: "#71717A", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Secondary text color</p>
              <Link href="#" colorToken="var(--text-secondary)">
                <Text role="badge-small">Learn more</Text>
              </Link>
            </div>
            <div>
              <p style={{ margin: "0 0 8px", fontSize: "11px", color: "#71717A", fontFamily: "'Open Sans', system-ui, sans-serif" }}>External link (opens in new tab)</p>
              <Link href="https://jit.io" colorToken="var(--brand-primary)" external>
                <Text role="badge-small">jit.io ↗</Text>
              </Link>
            </div>
          </div>
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="Props">
        <TokenTable rows={[
          { property: "href",        token: "string",  value: "required",    note: "The URL to navigate to" },
          { property: "colorToken",  token: "CSS color string", value: "undefined", note: "e.g. var(--brand-primary). Sets the link color." },
          { property: "external",    token: "boolean", value: "false",        note: "If true: opens in new tab + adds security attributes" },
          { property: "children",    token: "ReactNode", value: "required",   note: "Usually a <Text> component" },
        ]} />
      </SectionBlock>

      <SectionBlock title="CSS Properties">
        <TokenTable rows={[
          { property: "color",            token: "colorToken prop",     value: "inherits",        note: "Set via prop" },
          { property: "text-decoration",  token: "—",                   value: "none",            note: "Default state" },
          { property: "text-decoration",  token: "—",                   value: "underline",       note: "On hover + focus" },
          { property: "target",           token: "—",                   value: `"_blank"`,        note: "When external=true" },
          { property: "rel",              token: "—",                   value: `"noopener noreferrer"`, note: "Security: prevents the new tab from accessing the opener page" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Usage">
        <CodeBlock code={`import { Link } from "./components/atoms/Link";
import { Text } from "./components/typography/Text";

// Internal link
<Link href="/dashboard" colorToken="var(--brand-primary)">
  <Text role="badge-small">Go to dashboard</Text>
</Link>

// External link — opens in new tab safely
<Link href="https://jit.io" colorToken="var(--text-secondary)" external>
  <Text role="badge-small">Learn more ↗</Text>
</Link>`} />
      </SectionBlock>
    </SplitPage>
  );
}
