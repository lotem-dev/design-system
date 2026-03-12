import { IconWrapper } from "../../../components/atoms/IconWrapper";
import { IconAdd } from "../../../components/icons/usecases/IconAdd";
import { IconSearch } from "../../../components/icons/usecases/IconSearch";
import { CodeBlock } from "../ui/CodeBlock";
import { PreviewBox } from "../ui/PreviewBox";
import { TokenTable } from "../ui/TokenTable";
import { SectionBlock } from "../ui/SectionBlock";
import { SplitPage } from "../ui/SplitPage";

import iconWrapperTsx from "../../../components/atoms/IconWrapper.tsx?raw";

const sources = [
  { filename: "IconWrapper.tsx", code: iconWrapperTsx },
];

export function IconWrapperSection() {
  return (
    <SplitPage files={sources}>
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#71717A", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Atom</span>
        <h1 style={{ margin: "8px 0 12px", fontSize: "28px", fontWeight: 700, color: "#09090B", fontFamily: "'Open Sans', system-ui, sans-serif" }}>Icon</h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#52525B", lineHeight: "1.6", maxWidth: "600px" }}>
          A wrapper that renders any SVG icon component at a standard size. Icons use <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>currentColor</code>,
          so they automatically inherit the text color from their parent — just set <code style={{ backgroundColor: "#F4F4F5", padding: "1px 5px", borderRadius: "3px", fontSize: "13px" }}>color</code> on the wrapper or a parent element.
        </p>
      </div>

      <SectionBlock title="Preview — Sizes">
        <PreviewBox align="center">
          {(["xs", "sm", "md", "lg"] as const).map((size) => (
            <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <IconWrapper as={IconAdd} size={size} style={{ color: "#18181B" }} />
              <code style={{ fontSize: "10px", color: "#71717A", fontFamily: "monospace" }}>{size}</code>
            </div>
          ))}
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="Preview — Color Inheritance">
        <p style={{ margin: "0 0 12px", fontSize: "13px", color: "#71717A" }}>
          Set <code style={{ fontFamily: "monospace", backgroundColor: "#F4F4F5", padding: "1px 4px", borderRadius: "3px" }}>color</code> on
          the parent and the icon inherits it automatically via <code style={{ fontFamily: "monospace", backgroundColor: "#F4F4F5", padding: "1px 4px", borderRadius: "3px" }}>currentColor</code>.
        </p>
        <PreviewBox>
          {[
            { color: "var(--text-primary)",   label: "text-primary" },
            { color: "var(--brand-primary)",  label: "brand-primary" },
            { color: "var(--error-primary)",  label: "error-primary" },
            { color: "var(--success-primary)",label: "success-primary" },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <IconWrapper as={IconSearch} size="md" style={{ color }} />
              <code style={{ fontSize: "10px", color: "#A1A1AA", fontFamily: "monospace" }}>{label}</code>
            </div>
          ))}
        </PreviewBox>
      </SectionBlock>

      <SectionBlock title="Props">
        <TokenTable rows={[
          { property: "as",        token: "React SVG component", value: "required",        note: "The icon component to render" },
          { property: "size",      token: `"xs" | "sm" | "md" | "lg"`, value: `"lg"`,     note: "Controls width + height" },
          { property: "title",     token: "string",             value: "undefined",         note: "Adds accessible label for screen readers" },
          { property: "className", token: "string",             value: "undefined",         note: "Extra CSS class" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Size Scale">
        <TokenTable rows={[
          { property: "xs", token: "—", value: "12px", note: "Inline with very small text" },
          { property: "sm", token: "—", value: "16px", note: "Inline with label / body text" },
          { property: "md", token: "—", value: "20px", note: "Default — most UI contexts" },
          { property: "lg", token: "—", value: "24px", note: "Standalone or prominent icons" },
        ]} />
      </SectionBlock>

      <SectionBlock title="Usage">
        <CodeBlock code={`import { IconWrapper } from "./components/atoms/IconWrapper";
import { IconSearch } from "./components/icons/usecases";

// Basic usage
<IconWrapper as={IconSearch} size="md" style={{ color: "var(--text-primary)" }} />

// With accessible label (for standalone icons that need to be read by screen readers)
<IconWrapper as={IconSearch} size="md" title="Search" />`} />
      </SectionBlock>
    </SplitPage>
  );
}
